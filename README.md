# ReadMe

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
* we put `res.send` in the `.then` of `Promise.all` so that we only send data back to the user once the `.loadData` functions for the routes are resolved. We basically need to run the Redux Action to do a data request for components that need it before any JSX enters the picture.

## 2.
The following: `<script>window.INIT = ${serialize(store.getState())}</script>` is designed to take the redux state that exists server-side and have it added to the Window object client-side so that we don't go from:
1. Redux store with requested data (server-side)
2. Redux store with no data yet (client-side)
3. Redux store with requested data (client-side)

Instead we'll have
1. Redux store with requested data (server-side)
2. Redux store with data that we got from the window.INIT object (client-side)
3. Redux store with requested data (client-side)

## 3.
We're using .hydrate instead of .render because it's an SSR app and we want to update what the server is already rendering versus replacing the DOM node entirely. As per stackoverflow: If you call ReactDOM.hydrate() on a node that already has this server-rendered markup,   React will *preserve it and only attach event handlers*, allowing you to have a very   performant first-load experience.   Render may change your node if there is a difference between the initial DOM and the   current DOM. hydrate will only attach event handlers. https://stackoverflow.com/questions/46516395/whats-the-difference-between-hydrate-and-render-in-react-16 

TL;DR, only useful for SSR React.