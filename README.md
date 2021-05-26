# How the sausage is made

## Basics.

There's two apps in this repo, the client-side react app, and a server-side react app; their entry points are `client.tsx` and `server.tsx` respectively. We essentially take our react app and pass it into `client.tsx` and `server.tsx` so that each of our webpack configs can build a different bundle file. The client one would run on the browser, the server one would run in node and express would take the stringified app and send it to the browser.

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

## 9.
Each object in the `Routes.ts` array by default a `component`, `path`, `exact`, and `routes`. The `routes` property lets you have global components on the parent object and have the child objects on the `routes` property (array of routes) render inside the parent object's component. https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config


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

## 19.
Too many tutorials have this weird fixation with having D3 draw the DOM instead of letting the virtual DOM through React handle it. We'll still use D3 for math, but `svg`, `g`, `rect`, etc elements are going to be made in React.

### 19a.
* `x` will denote the width of the graph, defaulting to `420`
* `y` will denote the width of each bar, defaulting to `20`
* `data` is the `number[]` that we're using to make this chart
* `barBackground` is the what we'll use the colour the bars with, in theory you could probably use a background image.

### 19b.
`xScale` is what we'll use for calculating the width of the bar. The `domain` says the minimum and maximum data points we're scaling with, the `range` says the minimum and maximum x-axis range we're working with.
i.e. Your data's `domain` can be `0` and `42`, and your `range` can be `0` and `400`. So if you try `xScale(15)`, it'll calculate- how many times bigger is `400` versus `42` and multiply that by `15`.

### 19c.
This is a little more obscure, how we're using it though is to calculate the height of bars. `.range([0, y * data.length])` contains a range of `0` and the `y` multiplier (defaulted to `20`) times the size of the dataset (e.g. `6` items), giving us a range of `0` and `120` for example. If you wanted `yScale.bandwidth()`, you'd get the effective value of the multiplier- `20` in this running example. If you want some space between bars, set the `height` of them to be `yScale.bandwidth() - 1` so it's the size of each item in the range minus `1` so there's a pixel of space between each one.

### 19d.
I had to make a note for this- we're putting the text at the ass-end of the bar with `xScale(d)` which itself returns the length of the bar, then you're subtracting the almost-thiccness of the bar `y` so it's not ALL the way at the end.