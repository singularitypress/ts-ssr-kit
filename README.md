# How the sausage is made

## Basics.

There's two apps in this repo, the client-side react app, and a server-side react app; their entry points are `client.tsx` and `server.tsx` respectively. We essentially take our react app and pass it into `client.tsx` and `server.tsx` so that each of our webpack configs can build a different bundle file. The client one would run on the browser, the server one would run in node and express would take the stringified app and send it to the browser.

## 1.
`matchRoutes` will return an array of routes whose path that match `req.path`. Then we map over the routes that match whatever the user has requested and execute the `.loadData` function on that route if it exists. 

The `.loadData` function is defined and exported from select components if they need to load/request data. We're doing this so that components/pages that need to load/request data, can do so server side. The flow is: 
* `loadData` is defined in some Components
* `loadData` is imported and used in `Routes.tsx`
* `loadData` is used here based on routes found in `Routes.tsx`
* we pass in `store` into `loadData` which will be used in the component to execute the `dispatch` to load/request data
* we have a `return`, and since `loadData` is for loading/requesting data, the value is a `promise`.
* thus we... have an array of promises
* `Promises.all` is a native js function where you pass in an array of promises and it'll be "resolved" once all promises in the array are resolved.
* we put `res.send` in the `.then` of `Promise.all` so that we only send data back to the user once the `.loadData` functions for the routes are resolved. We basically need to run the Redux Action to do a data request for components that need it before any JSX enters the picture. `renderer` will actually render the HTML, so obviously that should be place in the `.then` since we only want it to run after all promises are resolved.

### 1a.
As we can see in #1, the `Promises` array contains an... array of promises; we can see that the map function that's being run on `matchRoutes` has a ternary that eithe returns `loadData` (a promise) or `null`. To both get rid of the instances of `null` from the array, and to ensure that none of the promises in the array are rejected, we're going to run a `.map` again and if a promise exist (i.e. not `null`) return a new promise that can only be resolved, including in its `catch`.

## 2.
The following: `<script>window.INIT = ${serialize(store.getState())}</script>` is designed to take the redux state that exists server-side and have it added to the Window object client-side so that we don't go from:
1. Redux store with requested data (server-side)
2. Redux store with no data yet (client-side)
3. Redux store with requested data (client-side)

Instead we'll have
1. Redux store with requested data (server-side)
    1. Redux action will make the API request server side
    2. then in the server-side file that renders stringified HTML, we set the current server-side redux store into a window.INIT object so the data is immediately accessible client-side.
2. Redux store with data that we got from the window.INIT object (client-side)
    1. The default store for redux client-side (client.tsx `createStore`) sets the default state to window.INIT as set on the rendering server.
3. Redux store with requested data (client-side)
    1. The clientside redux action will make an API request itself.

## 3.
We're using .hydrate instead of .render because it's an SSR app and we want to update what the server is already rendering versus replacing the DOM node entirely. As per stackoverflow: If you call ReactDOM.hydrate() on a node that already has this server-rendered markup,   React will *preserve it and only attach event handlers*, allowing you to have a very   performant first-load experience.   Render may change your node if there is a difference between the initial DOM and the   current DOM. hydrate will only attach event handlers. https://stackoverflow.com/questions/46516395/whats-the-difference-between-hydrate-and-render-in-react-16 

TL;DR, only useful for SSR React.

## 4.
Using `compression()` in our express `app` will compress what we deliver over express to the browser.

## 5.
Using `express.static("/public")` in our express `app` will allow us to access files in `/public` from the browser- such as JS, CSS, and images. The client-side JS/CSS bundles are here so this is necessary.

## 6.
We'll use the `proxy` middleware in express to forward API requests to the API service itself. Rather than have the client-side make seperate requests to express for our site, and another request to an API service, we'll make our API request to our express server and have *that* forward requests to the API service. The use of the `proxyOptions` params after the `proxyHost` string is needed for this particular API. This is specifically needed because we're going to use the OAuth that this API service had built in, and that API service has localhost:3000 whitelisted.

## 7.
The following and 7a are client-side (hence client.tsx). Here we're creating a custom axios instance (i.e. instead of axios.get and etc, you can do myAxios.get and etc). The purpose of this is to be able to set up custom configs for our instance of axios. Setting `baseURL` to `"/api"` for example will mean any routes we use in our custom axios instance will prepend with `"/api"`. It's `"/api"` because the request is going to our rendering server which will subsequently make its request to the actual API server.

### 7a.
If you use `thunk.withExtraArgument(...)`, you can pass in whatever you want into your action functions.

### 7b.
The async function gets automatically invoked by redux thunk. It doesn't *need* to be an async function, but it is because of how we're making an async request in it (axios). Redux Thunk can be boiled down to the following: https://github.com/reduxjs/redux-thunk/blob/master/src/index.js where you can see that you can pass in 3 items into action- a `dispatch`, a `getState`, and an `extraArgument`. We probably won't really need to use `getState`, but it's the second argument as per redux-thunk's action so...

Also, to see what `api` is here, review footnote 7.

## 8.
Create a custom axios instance so that we can prepend requests we make with it (i.e. `axiosInstance.get`) with the `baseURL`. We're going to set it to the fully qualified API url since the only place that actually hits the API service directly should be the node (rendering) server.

### 8a.
Making a request to the API service from the node/rendering server requires... credentials. The user's cookie. Obviously this doesn't natively exist on the rendering server. What we can do though, is take the `req` object that contains the end-users Request information in `server.tsx` and pass it into `setStore` wherein we're defining our custom `axiosInstance` so we can take the cookie in `req` and set it inside `axiosInstance` via `headers.cookie`. We default the cookie value to empty string because this whole this could go bad if the value were to be undefined in the header.

## 9.
Each object in the `Routes.ts` array by default a `component`, `path`, `exact`, and `routes`. The `routes` property lets you have global components on the parent object and have the child objects on the `routes` property (array of routes) render inside the parent object's component. https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config

## 10.
Hit the /current_user route on the API, piggybacking off of what we did in #7, 7a, 7b.

## 11.
Auth is the reducer that's going to add the authenticated current user to the redux state. Note that the `state` of this reducer is set to `null` by default and consequently is set to a type of `any` because we don't want to have an actual default user value for data that needs to be authenticated. We're using a switch-case here vs a ternary operator (like `users.ts`) for the same reason. What we want to do is return `null` if the action type isn't `FETCH_CURRENT_USER` in the first place (i.e. the default in the switch-case), but also a `false` if the user isn't authenticated as the `action.payload.data` would be otherwise `undefined`.

## 12.
We're gonna add `loadData` to the Base component that all current pages are loaded through since we want to have the authentication/current user stuff happen on every page. To know how `loadData` stuff works, review #1, and to know how the `Base` stuff works check #9.

## 13.
If React Router can't find a matching route, it'll fall back to this since it doesn't have a `path` set.

## 14.
We're going to create a variable called `serverContext` in `server.tsx`, and pass that into `renderer` (which exists to take our react app and turn it into a string for our server to send to the browser as HTML) in order to pass in any `req`/`res` information from express into the react app (i.e. status code). The `context` prop on `StaticRouter` makes whatever we pass in there available to all route components in their `props` as `staticContext` (effectively `props.staticContext`). For emphasis, this is all static server-side only stuff.

## 15.
The `renderer` function from `renderer.tsx` contains our JSX transformed into a string to be returned from express, thus assigned to the variable `content`.

## 16.
As per #13, this page is only reached when none of the routes match, thus we set `notFound` on the `staticContext` to `true`.

## 17.
When `staticContext` is set to `true` in #16, this change to `staticContext` (or as we know the variable in `server.tsx` as `serverContext`) gets propagated everywhere server-side, thus when we're on the `NotFoundPage`, `serverContext.notFound` is `true`, and we can send `404` (and obviously right after, the content which in this case is `NotFoundPage`).

## 18.
Lets just put all of our authentication checking and handling (in case users aren't authenticated) into this higher order component (check react docs for what this is), it'll check to see if we're authenticated and return the component that's passed in if we are.

### 18a.
Using react router's `<Redirect to="" />` isn't meaningful on the server. So we have to check the context to see if there's a `url` property and thus do an express redirect.