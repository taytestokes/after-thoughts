---
title: 'How to setup a Phoenix 1.6 application using Webpack, Babel, and React'
publishedAt: '2022-08-14'
author: 'Tayte Stokes'
excerpt: ''
featured: true
---

Recently as of Phoenix v1.6, the framework replaced bootstrapping the application assets using Node, Npm, and Webpack with Esbuild. There are many good reasons for this change and this [blog post](https://fly.io/blog/phoenix-moves-to-esbuild-for-assets/) authored by Mark Ericksen is an easy read that highlights why this change was made.

However, if you are like me and have been using Webpack as the choice of bundler for some time now and aren't ready to give it up just yet, then you're in the right place.

In this post I'll be going over how to setup a new application using Phoenix v1.6 that will render a single page application for the frontend that utlizes Webpack as the asset bundler, Babel as the Javascript compiler, and React as the view library.

## Creating A New Phoenix Application

I'm assuming that your machine is already setup with Node, Elixir, and Phoenix so we won't be covering how to get your machine setup for development.

First, let's create a new phoenix project using a mix task and provide the flag telling phoenix not to generate frontend assets. You can read more about what options are available to pass with this command [here](https://hexdocs.pm/phoenix/Mix.Tasks.Phx.New.html), if you are interested.

```
$ mix phx.new --no-assets
```

Now with the new phoenix application created, we are ready to get started.

## Initializing The Assets Folder With Npm

The top level assets folder is where we will store our frontend asset code that will be delivered to the browser by our phoenix backend.

This folder will be treated as it's own frontend application it's own configuration, which in our case is a React application using Webpack to bundle the assets and Babel to compile our Javascript code.

We first need to initialize the asset folder with it's own package.json to manage configuration for our frontend application using npm.

Inside of the assets folder, execute the npm command to initialize the folder as it's own project and pass it the _-y_ flag to accept all of the default configuration for the package.json file that will be created.

```
$ npm init -y
```

We should now have a package.json file inside of the assets folder that looks like the following.

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

With the assets folder now initalized as project with npm and having it's own package.json, we can start building our frontend application.

## Setting Up Webpack and Babel

<!-- Pick up here -->

Let's install the dependencies we need to setup Webpack for our frontend application. Make sure that you are currently in the assets directory when executing npm commands.

```
$ npm install webpack webpack-cli --save-dev
```

After the installation of those packages completes, you will see that webpack and webpack-cli have been added as dev dependencies in the package.json as well as the creation of a package-lock.json file and node_modules folder.

Let's make sure that we ignore the node_modules from being pushed up by adding a path to the node_modules in the .gitignore file.

```
## .gitignore

/assets/node_modules
```

Now let's add the Webpack configuration for our frontend application.

```
## assets/webpack.config.js

const path = require("path");

module.exports = (env, options) => ({
  entry: "./src/index.js",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "../priv/static/assets/js"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
});
```
