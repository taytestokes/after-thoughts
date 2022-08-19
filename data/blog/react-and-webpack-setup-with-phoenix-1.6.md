---
title: 'React and Webpack with Phoenix 1.6'
publishedAt: '2022-08-14'
author: 'Tayte Stokes'
excerpt: 'A quick guide for setting up a new Phoenix 1.6 application to use Webpack and React.'
featured: true
---

Recently as of Phoenix v1.6, the framework replaced bootstrapping the application assets using Node, Npm, and Webpack with Esbuild. There are many good reasons for this change and this [blog post](https://fly.io/blog/phoenix-moves-to-esbuild-for-assets/) authored by Mark Ericksen is an easy read that highlights why this change was made.

However, if you are like me and have been using Webpack as the choice of bundler for some time now and aren't ready to give it up just yet, then you're in the right place.

In this post I'll be going over how to setup a new application using Phoenix v1.6 that will render a single page application for the frontend that utilizes Webpack as the asset bundler, Babel as the Javascript compiler, and React as the view library.

## Creating A New Phoenix Application

I'm assuming that your machine is already setup with Node, Elixir, and Phoenix so we won't be covering how to get your machine setup for development.

First, let's create a new Phoenix project using a mix task and provide the flag telling Phoenix not to generate frontend assets.

If you are interested, you can read more about what options are available to pass with this command [here](https://hexdocs.pm/phoenix/Mix.Tasks.Phx.New.html).

```
$ mix phx.new --no-assets
```

Now with the new Phoenix application created, we are ready to get started building out the frontend portion of our application using Webpack, React, and Babel.

However, before we start building out the frontend, I think it's important to understand how Phoenix serves the static assets that make up the frontend.

## How Phoenix Serves Static Assets

Phoenix handles serving static assets by using the Plug.Static plug. This plug is be found inside the Endpoint module that every request that is made to the server goes through.

```
## lib/example_web_app/endpoint.ex

plug Plug.Static,
    at: "/",
    from: :example_app,
    gzip: false,
    only: ~w(assets fonts images favicon.ico robots.txt)
```

The Plug.Static plug will serve static assets from the `priv/static` directory of the application.

If you look at the snippit above, the Plug.Static plug has a few configuration options that are being set by default that are important to call out.

The `at` configuration defines where to reach for static assets, in our case this will be the default request path at `/`. This needs to be a string.

The `from` option defines the file path to read the static assets from. This will be an atom that represents that applications name where assets will be served from the `priv/static` directory.

The `only` option is used to filter which requests to serve. This is useful to prevent file system access on every request when the `at` option is set to the default path of `/`. This will take a list of folder and file names that exist inside the `priv/static` folder that will only be served by the Plug.Static plug.

If you're interested, you can read more about the configuration options available for the Plug.Static plug [here](https://hexdocs.pm/plug/Plug.Static.html).

As of version 1.6, Phoenix uses Esbuild to prepare assets that need to be preprocessed and extract them to the `priv/static/assets` directory. This file migration happens during development mode using a watcher and in production by running a deploy script.

Instead of Esbuild, we will be using Webpack to prepare our assets and migrate the processed assets to the `priv/static/assets` directory.

Now with that in mind, let's move on and finally start building our frontend portion of the application.

## Initializing The Frontend Directory

The standard convention for a Phoenix application is to store all frontend code in the `assets` folder, so we will be using that folder to build our fronntend application in.

Now let's set this folder up as it's own project with npm and get a `package.json` file created to manage the dependencies and scripts that the frontend application will rely on.

Inside of the `assets` folder, execute the npm command to initialize the folder as it's own project and pass it the _-y_ flag to accept all of the default configuration for the package.json file that will be created.

```
$ npm init -y
```

We should now have a `package.json` file inside of the `assets` folder that looks like the following.

```
## assets/package.json

{
  "name": "assets",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

We won't worry about modifying the `package.json` for now and leave as it is.

The only thing left to finish initializing our frontend application is to define the entry point file for our frontend application.

Since we are planning on turning this into a React application, we will follow some common React patterns and store all of our application code in a `src` folder that sits next to all of the configuration files. Go ahead and create an `index.js` file that will live in the `src` folder.

```
## assets/src/index.js

console.log("Hello, world!")
```

In tradition with every new web application, it's just a simple script that logs "Hello, world!" to the console. We will be coming back and updating this file later once we start implementing React.

With that in place, we can start installing the dependencies we will need and configure the build tools for our frontend application.

## Setting Up Webpack and Babel

This isn't a comprehensive guide around Webpack and Babel so I won't be going into too much detail about configuring these tools, but I will be highlighting the important parts that are related to what makes them work with our Phoenix application.

In order for us to start using Webpack and Babel, we need to install the required dependencies from npm.

Inside of the `assets` directory, go ahead and execute the following command to install the dependencies we need for the Webpack and Babel configurations.

```
$ npm install webpack webpack-cli @babel/core @babel/preset-env babel-loader css-loader style-loader url-loader --save-dev
```

Before we configure Webpack and Babel, let's do some good samaritan work annd make sure that we ignore pushing the node modules to the cloud. Add the file path to the `node_modules` folder in the `assets` directory to the `.gitignore` that exists at the root of the Phoenix application.

```
## .gitignore

/assets/node_modules
```

Now let's add a `.babelrc` and add the appropriate Babel presets that we will need to help compile our Javascript.

```
## assets/.babelrc

{
  "presets": ["@babel/preset-env"]
}
```

Now it's time to add the config file for Webpack.

```
## assets/webpack.config.js

const path = require("path");

module.exports = {
  entry: {
    main: "./src/index.js",
  },
  output: {
    path: path.resolve(__dirname, "../priv/static/js"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: "url-loader",
        options: { limit: false },
      },
    ],
  },
};
```

That should be good enough to get us going with creating a simple application. If you're absolutely dying to know more about these configurations you can check out the [Webpack](https://webpack.js.org/) and [Babel](https://babeljs.io/) docs.

Above, we define that the entry point file for the frontend application is that one that we created earlier which is `assets/src/index.js` and bundle which gets created from Webpack will be called `main`.

```
entry: {
    main: "./src/index.js",
},
```

Remember earlier how we talked about how Phoenix uses the Plug.Static plug to serve assets for our application from the `priv/static` directory?

If you look at the Webpack config, you can see that we define that the output of the bundled Javascript for our frontend application should be dumped into that directory.

```
output: {
    path: path.resolve(__dirname, "../priv/static/assets/js"),
},
```

With this configuration set in place, a `priv/static/assets/js/main.js` file will be generated which houses the bundled Javascript code for our frontend application and will allow the Plug.Static to serve our bundled Javascript assets.

Next we need to actually trigger Webpack to create a bundle when we spin up our development server and watch for any changes.

## Running Webpack During Development

We want our frontend application to be bundled and watched for any changes during the development process. We can do this by using a Phoenix Watcher.

The Phoenix Endpoint can be configured with a set of watchers that will run other processes alongside the main server process.

You can find the configuration for the Endpoint for the development environment in the `config/dev.ex` file.

```
## config/dev.ex

config :example_app, ExampleAppWeb.Endpoint,
  http: [ip: {127, 0, 0, 1}, port: 4000],
  check_origin: false,
  code_reloader: true,
  debug_errors: true,
  secret_key_base: "qJGuNZL8BUCEA343B51qWkIVyl1MS7taLsOBamVOacWKR6pwRDTiSRtngLSqRAKR",
  watchers: []
```

We can configure the `watchers` option to execute a Node process to watch Webpack for bundling our frontend portion of the application when we run the `mix phx.server` command to start our Phoenix server.

```
watchers: [
    node: [
      "node_modules/webpack/bin/webpack.js",
      "watch",
      "--mode",
      "development",
      cd: Path.expand("../assets", __DIR__)
    ]
]
```

Above, we are basically setting up the watcher to run the `node node_modules/webpack/bin/webpack.js watch --mode development` script which will run Webpack in development mode and watch for any changes. The last part, which is the `cd` option, tells the watcher which directory to run that script from.

If you're not familiar with the `watch` option for Webpack, you find out more about it [here](https://webpack.js.org/configuration/watch/).

Now when we start up our Phoenix application using `mix phx.server`, we can validate Webpack is also being executed by a the watcher we created by checking the terminal logs and seeing a message that declares Webpack was succesfully compiled.

```
Generated example_app app
[info] Running ExampleAppWeb.Endpoint with cowboy 2.9.0 at 127.0.0.1:4000 (http)
[info] Access ExampleAppWeb.Endpoint at http://localhost:4000
asset main.js 1.21 KiB [compared for emit] (name: main)
./src/index.js 29 bytes [built] [code generated]
webpack 5.74.0 compiled successfully in 696 ms
```

## Using The Webpack Bundle

Even though we are now generating a bundle for our frontend code, it still isn't being used since it's not being linked to the HTML file that will be delivered to the browser from our Phoenix application.

When a client makes a request to our Phoenix application, we will return an HTML file that will contain the contents of our web page. We will need to include a `script` tag that will reference our bundled Javascript code to embed into the HTML file.

If you're not familiar with how Phoenix uses views, layouts, and templates to create HTML files, you can find out more about it from the [docs](https://hexdocs.pm/phoenix/views.html#layouts).

We will inject that `script` tag into the main layout of the application that wraps every template, which is the `root.html.heex` file.

At the end of the `body` tag in that layout file, go ahead and add this script tag.

```
## lib/example_app_web/templates/layout/root.html.heex

<body>
    <%= @inner_content %>

    <script defer type="text/javascript" src={Routes.static_path(@conn, "/assets/js/main.js")}></script>
</body>
```

We are using the Routes path helper function provided by Phoenix to generate a path to the Javascript bundle that is created from Webpack.

We also want to include this `script` tag under the embedded `<%= @inner_content %>` tag. This will be important later when we start adding React because we need the content for the template to be rendered first in order to render our React application.

If you were to visit `http://localhost:4000` in your browser and open the developer console, you would see the console log of "Hello, world!" that comes from the `assets/src/index.js` file.

## Setting Up React

Now that the bundle created by Webpack is being delivered to the client, let's start setting up the React application.

Inside of the `assets` folder, we need to install a few more dependencies to use React.

```
$ npm install react react-dom
```

We also want to get the Babel React presets to compile the React code correctly.

```
$ npm install @babel/preset-react --save-dev
```

With those dependencies now installed, we start setting up the React application.

Let's add the new Babel preset to the `assets/.babelrc` file.

```
## assets/.babelrc

{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

Now let's revisit the `assets/src/index.js file and get it to render our React application.

```
## assets/src/index.js

import React from "react";
import ReactDOM from "react-dom";

ReactDOM.render(<div>Hello from React!</div>, document.getElementById("root"));
```

That should be enough to get a very simple single element React application. However, we haven't actually created the elemennt that will be used as the anchor point to rendwer our React application. Let's get that added.

Since the `lib/example_app_web/templates/page/index.html.heex` tempalte file is the template that will be rendered in place of the `<%= @inner_content =>` tag inside of the `lib/example_app_web/templates/layout/root.html.heex` when a client makes a request to the default base route `/` of the Phoenix application, it would be a good idea to put that element in that template.

If you are unsure as of why this is the template file that will be rendered at that route, we can check out the Router module of the Phoenix application.

```
## lib/example_app_web/router.ex

scope "/", ExampleAppWeb do
  pipe_through :browser

  get "/", PageController, :index
end
```

For the scope of the base route `/`, we define that `get` request made to the base route should be forwarded to the PageController's index action, which in turn delivers the associated `index.html` template.

Now let's add the element to the HTML template to use to render our React application.

```
## lib/example_app_web/templates/page/index.html.heex

<div id="root" />
```

If you visit the application at `http://localhost:4000`, you should now see that the string "Welcome from React!" is being rendered to the web page.

Obviously this is an extremely simple React application, but all of the scaffolding is now in place to start building out a complex React application for the frontend.

## Client Side Routing

Let's start expanding on the React application and build it out a little more to give it a better SPA experience by adding some client side routing with React Router.

We need to install `react-router-dom` as another dependency for our application. In the `assets` folder, run the npm command to install it.

```
$ npm install react-router-dom
```

Now once that's installed, let's create a few more components for our React application to render per route. We'll create these components in a new folder called `components`. These will be some simple components that render what page they would reflect in our application.

```
## assets/src/components/Home.js

import React from "react";

export const Home = () => {
  return <div>Home</div>;
};
```

```
## assets/src/components/Dashboard.js

import React from "react";

export const Dashboard = () => {
  return <div>Dashboard</div>;
};
```

With those created, let's hop back to the entry point of our frontend application and setup the router and use those components.

```
## assets/src/index

import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { Home } from "./components/Home";
import { Dashboard } from "./components/Dashboard";

ReactDOM.render(
  <Router>
    <header>
      <nav role="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>
      </nav>
    </header>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </Router>,
  document.getElementById("root")
);
```

We now have a very simple navigation menu that allows you to navigate to different pages of the frontend application via client side routing. However, what happesn if you visit the dashboard page and refresh? Or try to visit a specific path through the url bar?

Phoenix will receive this HTTP get request and try to route the request to a specific route setup in the Phoenix Router. We need to configure the Phoenix router to deliver all requests to our PageController's index action to render our React application which will then manage the client side routing.

In the Phoenicx Router, we can use a wildcard pattern in the route definition to tell the Router to catch all requests and send them to a specific controller action.

In our case, we will configure Phoenix so that all requests made to the server that get processed through the `/` scope, will be sent the Page Controllers index action by setting the route path to `/*path`.

```
## lib/example_app_web/router.ex

scope "/", ExampleAppWeb do
  pipe_through :browser

  get "/*page", PageController, :index
end
```

Now every request made to the default scope, will render our React application.

Validate the refreshes and direct requests through the url bar will render our React application by visiting the `/dashboard` route directly or through the navigation in the UI and refresh the browser.
