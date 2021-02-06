# Load Testing

Install the loadtest module globally on your machine:

```
npm install -g loadtest
```

A few scripts have been added to the package.json file to run specific tests in three different environments:

- `npm run loadtest:local` runs a load test against your local dev server (and the development database) - you will need to start the node server first with `npm start` from the project root directory.
- `npm run loadtest:dev` runs a load test against the development environment and development server.
- `npm run loadtest:prod` runs a load test agains the production environment

You may want to adjust the load testing parameters by modifying some of the options as documented [here](https://github.com/alexfernandez/loadtest).
