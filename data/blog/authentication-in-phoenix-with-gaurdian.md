---
title: 'Token Authentication Using Guardian In Phoenix'
publishedAt: '2022-07-10'
author: 'Tayte Stokes'
excerpt: 'How to implement a token based authentication system in a Phoenix REST API using Guardian'
featured: true
---

Most modern web applications usually require some sort of authentication mechanism to create a truly rich user experience. This post will go over implementing that technique in a Phoenix REST API using Guardian and JSON Web Tokens (JWT).

Guardian is a token based authentication library for use with Elixir applications. Guardian uses JSON Web Tokens (JWT) by default for the token.

If you are unfamiliar with JWT's, you should check out [jwt.io](https://jwt.io/introduction/) for a great introduction to JSON Web Tokens.

Before we start diving into the details of implementing Guardian into a Phoenix API, we should first take a look at a few common authentication flows and understand how the flow works for the technique that we will be using.

## Understanding Authentication Flows

There are a few common authentication flows that web applications will follow. These flows typically follow the cookie based server session approach or the web token based strategy.

### Cookie Based Session Flow

In more traditional web applications, a cookie based server session authentication flow is more apparent.

1. The client submits a request containing the user credentials to the server
2. The server authenticates the credentials it has received and stores the related user data in a new session
3. The server will send a response back to the client with a cookie that contains the id of the session
4. Every subsequent request from the client to the server will contain the cookie with the session id
5. The server will collect the user data from the session it has been stored in using the session id received through the cookies
6. The server will then send an appropiate response with the content that has been requested

Here is flow chart that will help visualize what the process looks like.

![cookie session auth flow](/session-auth-flow.png)

This sort of authentication flow comes with a handful of its own benefits and challenges. One of the benefits of this approach is the simplicity of using cookies and server sessions with the built in mechanisms of the browser. However, there are also many challenges which include things such as being more prone to [CSRF attacks](https://owasp.org/www-community/attacks/csrf), scalability issues especially when systems start scaling horizontally, and size limitations since cookies are supposed to be small and can only hold up to a max of 4KB of data.

### Token Based Flow

In more modern web applications, a token based authentication flow is more common and usually the prefered way to handle authentication.

1. The client submits a request containing the user credentials to the server
2. The server will authenticate the it has received credentials, get the related user data, and generate a new token with the user data and sign it with a secret
3. The server will send a response to the client with the token
4. The client will store the new token either through the clients state management system or local storage
5. Every subsequent request made to the server that requires authorization will include the token in the authorization header of the request
6. The server will validate the token it has received through the token signature and then decode the user from the token
7. The server will then send a response to the client with the content associated to that user

Here is another chart that will hopefully help visualize the token based authentication flow.

![token auth flow](/token-auth-flow.png)

Just like the cookie based session authentication flow, the token based flow comes with its own set of benefits and challenges. Tokens can still be prone to [XSS attacks](https://owasp.org/www-community/attacks/xss/) and can be hijacked. However, a token based authentication approach is can often be much more scalable since we have the client manage that token.

The big take away between these two authentication flows is that the cookie based session approach is mainly managed by the server and the token based approached is managed by the client.

Now that we had a brief overview of some authentication flows, lets take a look into how we can implement the token based approached using a access and refresh tokens in a Phoenix API using Guardian.

## Setting Up The Application

First we need to setup a new Phoenix application. If you already have a Phoenix application up and running with user authentication, go ahead and skip this part, but if not it will help get you going.

```
$ mix phx.new auth_example --no-assets --no-html
```

After the new Phoenix application has been generated, we need to use Ecto to setup or database and create a simple users table.

```
$ mix ecto.create
```

Now we will generate a migration to create a simple users table in our database to store our user data.

```
$ mix ecto.gen.migration add_users_table
```

Now we need to go ahead and setup that migration to add the columns that we want in our users table.

```
## priv/repo/migrations/{migration_id}_add_users_table.exs

defmodule AuthExample.Repo.Migrations.AddUsersTable do
  use Ecto.Migration

  def change do
    create table(:users) do
      add(:username, :string)
      add(:password_hash, :string)

      timestamps()
    end

    create(unique_index(:users, [:username]))
  end
end
```

The migration that we setup is fairly simple. It adds two string columns to the table for the username and password_hash of the user. It's important to note that we will be storing a hash of the user password rather than the actual password for security reasons. It also includes timestamps for when the user record is created and updated. We also include a unique index on the user's username for a quick database lookup.

Now with the migration setup, let's go ahead and actually run that migration against our database.

```
$ mix ecto.migrate
```

We should now have our users table created. Now we need to setup our user context and schema to handle the transactions made to the database for user records.

Let's start by creating the user schema.

```
## lib/auth_example/users/user

defmodule AuthExample.Users.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field(:username, :string)
    field(:password, :string, virtual: true)
    field(:password_hash, :string)

    timestamps()
  end

  def changeset(user, attrs) do
    user
    |> cast(attrs, [:username, :password])
    |> validate_required([:username, :password])
  end
end
```

This schema will be used to create Ecto structs that represent the user and will be used to make a transaction with that database. If you look closely, you will notice that we also added the password field and set it to virtual. This is because we want to construct a user struct with the password field and run validations against it, but we don't want it to to be stored in the database.

The changeset is what will be used to execute validations and modifications to any data on the user struct before making a transaction with the database.

There's one more thing to call out here, we aren't following any security practices with our password so let's implement a step in the changeset validation to hash the virtual password and set it to the value of the password_hash field before saving the struct as a record to the database.

We will be using a library called Argon2 to handle hashing the password. Let's go ahead and add it as a dependency at the bottom of the dependency list.

```
## mix.exs

defp deps do
  [
    {:argon2_elixir, "~> 3.0"},
  ]
end
```

Now let's install that library into our dependencies.

```
$ mix deps.get
```

We should now be setup to use hashing functionality from Argon in our user schema module, let's go ahead and add that functionality.

```
## lib/auth_example/users/user

defmodule AuthExample.Users.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field(:username, :string)
    field(:password, :string, virtual: true)
    field(:password_hash, :string)

    timestamps()
  end

  def changeset(user, attrs) do
    user
    |> cast(attrs, [:username, :password])
    |> validate_required([:username, :password])
    |> hash_password()
  end

  defp hash_password(changeset) do
    case changeset do
      %Ecto.Changeset{valid?: true, changes: %{password: password}} ->
        put_change(changeset, :password_hash, Argon2.hash_pwd_salt(password))

      _ ->
        changeset
    end
  end
end
```

As you can see, we wrote a private function in our module to handle hasing the user password and then we use it as the last step in the changeset to update the password_hash field before saving that data to the database and now our password is securely being stored. We will this password_hash later when we implement user authentication.

Now we need to create a user context module that will be used as the api that uses our users ecto schema under the hood to make transactions with the database for our user resources.

```
## lib/auth_example/users.ex

defmodule AuthExample.Users do
  import Ecto.Query
  alias AuthExample.Repo

  alias AuthExample.Users.User

  def list_users do
    Repo.all(User)
  end

  def get_user!(id), do: Repo.get!(User, id)

  def create_user(attrs \\ %{}) do
    %User{}
    |> User.changeset(attrs)
    |> Repo.insert()
  end
end
```

We've included all the basic functionality we will need for interacting with our user resources from the database.

Side note, there is a way to quickly scaffold the schema and context modules for a resource using the content generator mix task that ships with Phoenix. You can read more about it [here](https://hexdocs.pm/phoenix/Mix.Tasks.Phx.Gen.Context.html).

Now with our application backed by a database and ready to handle user resources, we are ready to start implementing our authentication process in our Phoenix API using Guardian. Before we start setting up our routes and endpoints to handle requests, let's take a look into installing and configuring Guardian in our application.

## Guardian Installation And Configuration

We'll get started by adding Guardian as a dependency to our application.

```
## mix.exs

defp deps do
  [
    {:guardian, "~> 2.2"},
  ]
end
```

And now we just need to install the dependencies.

```
$ mix deps.get
```

The next step is create an implementation module of Guardian that we will configure our application to use. This module will encapsulate the configuration and behavior that we specifify for Guardian and will expose all of the functions that we will need to encode and sign a new token as well as decode and get the resource from the token.

```
## lib/auth_example_web/auth/guardian.ex

defmodule ExampleAuthWeb.Auth.Guardian do
  use Guardian, otp_app: :example_auth

  alias ExampleAuth.Models.Users

  def subject_for_token(resource, _claims) do
    {:ok, to_string(resource.id)}
  end

  def resource_from_claims(claims) do
    resource = Users.get_user!(claims["sub"])
    {:ok, resource}
  rescue
    Ecto.NoResultsError -> {:error, :resource_not_found}
  end
end
```

There are a few modules that we will create to implement Guardian in our app, so I created an auth directory inside of the web directory to house these modules.

Lets breakdown what's going on inside of the implementation module. There are two callback functions required to correctly implement Guardian, these are the subject_for_token/2 and resource_from_claims/2 functions.

The subject_for_token/2 is used to encode the resource into a token as the subject, in our case it will be the user id. This function will receive the resource that we want to encode into a token and a set of claims, we won't be using the claims so we can signify that it won't be used by prefixing that parameter with an underscore. We should store a value that will be useful in getting the related resource later on, so something like the resources unique id will be perfect for this.

The resource_from_claims/2 is the inverse of subject_for_token/2. We will get the subject of the token from the claims that it receives as an argument and we can use that subject, which is the id of the user in our case, to aggregate that resource from the database.

Now with the implementation module created, we need to configure our application to use it.

```
## config/config.exs

config :auth_example, AuthExampleWeb.Auth.Guardian,
  issuer: "auth_example",
  secret_key: ""
```

Notice how the secret_key field is empty. Since we are using JWT for our token type, we need to provide a secret that will be used when we encode a new token.

This secret can be any string, but it's recommended that we use guardian secret generator mix task to generate a secret for us.

```
$ mix guardian.gen.secret
```

That mix task should print out a secret that we can use in our console. Go ahead and copy and paste that into the configuration.

```
## config/config.exs

config :auth_example, AuthExampleWeb.Auth.Guardian,
  issuer: "auth_example",
  secret_key: "ap+tSlAWkSA8zTLLvZW+vY4mePQFmrFgl//OCAWMSVDrQ5mYk/arko3rru8L9Zqn"
```

It's not recommended to hard code your secret here, so using something like an environment variable to store that value is recommended so we prevent sharing that secret with the public.
