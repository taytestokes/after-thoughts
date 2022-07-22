---
title: 'Session And Token Based Authentication Flows'
publishedAt: '2022-06-18'
author: 'Tayte Stokes'
excerpt: 'An introduction to the different authentication flows between using a session or token based authentication system'
featured: false
---

There are a few common authentication flows that web applications will follow. These flows typically follow the server session approach or the token based strategy.

## Session Flow

In more traditional web applications, a server session authentication flow is more apparent.

1. The client submits a request containing the user credentials to the server
2. The server authenticates the credentials it has received and stores the related user data in a new session
3. The server will send a response back to the client with a cookie that contains the id of the session
4. Every subsequent request from the client to the server will contain the cookie with the session id
5. The server will collect the user data from the session it has been stored in using the session id received through the cookies
6. The server will then send an appropiate response with the content that has been requested

Here is flow chart that will help visualize what the process looks like.

![cookie session auth flow](/blog/token-authentication-with-guardian/session-auth-flow.png)

This sort of authentication flow comes with a handful of its own benefits and challenges. One of the benefits of this approach is the simplicity of using cookies and server sessions with the built in mechanisms of the browser. However, there are also many challenges which include things such as being more prone to [CSRF attacks](https://owasp.org/www-community/attacks/csrf), scalability issues especially when systems start scaling horizontally, and size limitations since cookies are supposed to be small and can only hold up to a max of 4KB of data.

## Token Based Flow

In more modern web applications, a token based authentication flow is more common and usually the prefered way to handle authentication.

1. The client submits a request containing the user credentials to the server
2. The server will authenticate the it has received credentials, get the related user data, and generate a new token with the user data and sign it with a secret
3. The server will send a response to the client with the token
4. The client will store the new token either through the clients state management system or local storage
5. Every subsequent request made to the server that requires authorization will include the token in the authorization header of the request
6. The server will validate the token it has received through the token signature and then decode the user from the token
7. The server will then send a response to the client with the content associated to that user

Here is another chart that will hopefully help visualize the token based authentication flow.

![token auth flow](/blog/token-authentication-with-guardian/token-auth-flow.png)

Just like the session authentication flow, the token based flow comes with its own set of benefits and challenges. Tokens can still be prone to [XSS attacks](https://owasp.org/www-community/attacks/xss/) and can be hijacked. However, a token based authentication approach is can often be much more scalable since we have the client manage that token.
