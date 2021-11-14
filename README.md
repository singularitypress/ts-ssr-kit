# How the sausage is made

## Getting Started
Copy `.env-boilerplate` and rename it to `.env`
### Dev
1. `npm run dev`
2. Visit http://localhost:3000
### Prod
`npm run build`
## Basics.

- [React Router v6 documentation on creating a SSR setup.](https://reactrouter.com/docs/en/v6/guides/ssr)
- Undecided between swc-loader and esbuild-loader, they're both pretty fast as Rust and GoLang based binaries.
- The .env having `NODE_OPTIONS=--openssl-legacy-provider` is a product of incompatibility between webpack and Node 17, once it's resolved it'll be removed from the boilerplate.

## TODO
1. bring back tailwindcss
2. figure out treeshaking
3. rebuild my pages
4. refactor for Helmet