---
title: 'Authentication In Phoenix Using Guardian'
publishedAt: '2022-07-10'
author: 'Tayte Stokes'
excerpt: 'How to implement a JWT based authentication system in a Phoenix REST API using Guardian'
featured: true
---

Modern web applications usually require some sort of authentication and authorization mechanism to create a truly rich user experience. In this post, we will go over implementing that technique in a Phoenix REST API using Guardian and JSON Web Tokens (JWT).

If you are unfamiliar with JWT's, you should check out [jwt.io](https://jwt.io/introduction/) for a great introduction and breakdown about JSON Web Tokens.

## What is Guardian?

Guardian is a token based authentication library for use with Elixir applications. Out of the box, Guardian uses JSON Web Tokens by default and these tokens will be used to handle authorization.

Before we start diving into the details of implementing Guardian into a Phoenix API, we should first understand how the authentication flow will work.

## Understanding Authentication Flows

In more traditional and archaic web applications, a cookie based server session authentication flow is more apparent.

This is where the client submits their user credentials to a server, the server then authenticates those credentials and stores that user into a server session, the server will send a response to the client with the server session id that will be saved to the clients cookie storage, then on every subsequent request from the client to the server the cookie storing the session id will be sent and used on the server to identify which user is making the request and send a response with data that's specific to that user.

Here is flow chart that will help visualize what the process looks like.

![cookie session auth flow](/session-cookie-auth-flow.png)

This sort of authentication flow comes with a handful of its own benefits and challenges. One of the benefits of this approach is the simplicity of using cookies and server sessions with the built in mechanisms of the browser. However, there are also many challenges which include things such as being more prone to [CSRF attacks](https://owasp.org/www-community/attacks/csrf), scalability issues especially when systems start scaling horizontally, and size limitations since cookies are supposed to be small and can only hold up to a max of 4KB of data.

In more modern web applications, a token based authentication flow is more common and usually the prefered way to handle authentication. This is how we will be handling the authentication with Guardian in our Phoenix API.

In a token based authentication flow, the client will submit credentials to the server, the server will authenticate those credentials and generates token based on the user associated with the valid credentials the server received and sign it with a secret, the server will respond to the client with the token and the client will store that token usually in local storage (there's a lot of discussion wether or not this is the correct storage for the token on the client as opposed to the web applications state management system but that's a rabbit hole we won't go down in this post), then on every subsequent request to the server that requires authorization the token will be sent through the request's authorization header, the server now only needs to validate that tokens signature and will send an appropriate response to the client with the data that has been requested.

Here is another chart that will hopefully help visualize the token based authentication flow.

![token auth flow](/token-auth-flow.png)

Just like the cookie based session authentication flow, the token based flow comes with its own set of benefits and challenges. Tokens can still be prone to [XSS attacks](https://owasp.org/www-community/attacks/xss/) and can be hijacked. However, a token based authentication approach is much more scalable since we have the client manage that token.

The big take away between these two authentication flows is that the cookie based session approach is mainly managed by the server and the token based approached is managed by the client.

Now that we had a brief overview of some authentication flows, let's take a look into how we can implement the token based approached using a access and refresh tokens in a Phoenix API using Guardian.
