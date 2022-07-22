---
title: 'Token Authentication Using Guardian In Phoenix'
publishedAt: '2022-07-22'
author: 'Tayte Stokes'
excerpt: 'How to implement a token based authentication system in a Phoenix API using Guardian'
featured: true
---

Most modern web applications usually require some sort of authentication mechanism to create a truly rich user experience. This post will go over implementing that technique in a Phoenix REST API using Guardian and JSON Web Tokens (JWT).

Guardian is a token based authentication library for use with Elixir applications. Guardian uses JSON Web Tokens (JWT) by default for the token.

If you are unfamiliar with JSON Web Tokens, you should check out [jwt.io](https://jwt.io/introduction/) for a great introduction

Before we start diving into the details of implementing Guardian into a Phoenix API, we should first take a look at a few common authentication flows and understand how the flows work. If you're pretty familiar with the topics, then go ahead and move on. If you're not, then go ahead and give [this](/session-and-token-based-authentication-flows) post a read.

## Setting Up The Application

First things first, we will scaffold a new Phoenix API that is backed by a database and has the functionality to manage users.

We'll do this by generating a new Phoenix project without the assets folder and html views.

```
$ mix phx.new auth_example --no-assets --no-html
```

After the new Phoenix application has been generated, we need to create our database.

```
$ mix ecto.create
```

Now we will generate a migration to create a simple table for our users in the database.

```
$ mix ecto.gen.migration add_users_table
```

We need to setup that migration to add the columns and their values that we want in our users table.

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

The migration that we setup is pretty simple. It will create the users table and the username, password_hash, created_at, and updated_at columns. The updated_at and created_at columns will be added because of that special timestamps function. We also create a unique index on the username column to prevent doing a full table scan while searching for a user by their username.

It's important to note that we will be storing an encrypted hash of the user password rather than the actual password for security reasons.

Now with the migration setup, let's execute that migration file to make the changes to our database and create the user table.

```
$ mix ecto.migrate
```

Now we need to create context and schema modules that will be used to manage users in our application.

Let's get started by creating our user schema module. The schema module will consist of a few things, the user schema and a function that creates a changeset of the user.

The schema is basically a blueprint of a resource that is used to create a struct that represents that resource, which in our case is the user.

The changeset function is used to create an ecto changeset of the user struct that will be used when our transaction to the database is made. It allows us cast, filter, validate and define constraints when manipulating a struct.

```
## lib/auth_example/users/user

defmodule AuthExample.Users.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :username, :string
    field :password, :string, virtual: true
    field :password_hash, :string

    timestamps()
  end

  def changeset(user, attrs) do
    user
    |> cast(attrs, [:username, :password])
    |> validate_required([:username, :password])
    |> unique_constraint(:username)
  end
end
```

If we take a look at our schema module, you can see the user schema definition looks pretty similar to how a user resource looks like in our database. However, we have added the password as a virtual field. This is because we want to construct a user struct with the password field and run validations against it, but we don't want it to to be stored in the database.

We have also defined a changeset function that will execute the validations and constraints that we want and return a changeset that was crafted from running those validations against the user struct. Our changeset function currently validates that the username and password fields exist as well as constraining the username to be a unique value. We don't want to have multiple users with the same username, that would be confusing.

There's one more thing to call out here, we aren't following any security practices with how we are storing the password. Let's implement a step in the changeset function to hash the virtual password field on the user struct and set it to the value of the password_hash field before saving the changeset to the database.

There's many ways to go about encrypting a password, but we will use a library called Argon2 to handle hashing the password.

Let's get that package added as a dependency to our project.

```
## mix.exs

defp deps do
  [
    {:argon2_elixir, "~> 3.0"},
  ]
end
```

Now we need to install the newly added Argon2 package.

```
$ mix deps.get
```

We should now be ready to use the hashing functionality from Argon2 in our user schema module.

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

As you can see, we created a private function in our module to handle hashing the user password and then we use it as the last step in the changeset to update the password_hash field before saving the changeset to the database and now our password is securely being stored.

Our next step is to create the context module. This module will be used as the public API layer to interact with our user resources.

```
## lib/auth_example/users.ex

defmodule AuthExample.Users do
  import Ecto.Query
  alias AuthExample.Repo

  alias AuthExample.Users.User

  def get_user!(id), do: Repo.get!(User, id)

  def get_by_username(username) do
    query =
      from(
        u in User,
        where: u.username == ^username
      )

    case Repo.one(query) do
      nil -> {:error, :not_found}
      user -> {:ok, user}
    end
  end

  def create_user(attrs \\ %{}) do
    %User{}
    |> User.changeset(attrs)
    |> Repo.insert()
  end
end
```

This module includes functions that use ecto to query the database. We can use this module for all of the basic functionality to interact with our user resources that are stored in the database.

Our Phoenix API is now backed by a database that consists of a users table and is built out to handle managing user resources. We're now ready to start implementing our authentication strategy using Guardian.

## Guardian Installation And Configuration

We first need to add Guardian as a dependency to our application.

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

### Implementation Module

The next step is create an implementation module of Guardian that we will configure our application to use.

If you're interested, you can read more about the implementation module [here](https://hexdocs.pm/guardian/introduction-implementation.html).

This module will encapsulate the configuration and behavior that we specifify for Guardian and will expose all of the functions that we will need to encode and sign a new token as well as decode and get the resource from the token.

There are a few modules that we will create to implement Guardian in our app, so I created an auth directory inside of the web directory to house these modules.

```
## lib/auth_example_web/auth/guardian.ex

defmodule AuthExampleWeb.Auth.Guardian do
  use Guardian, otp_app: :auth_example

  alias AuthExample.Users

  def subject_for_token(resource, _claims) do
    subject = to_string(resource.id)
    {:ok, subject}
  end

  def resource_from_claims(claims) do
    resource = claims["sub"]
    {:ok, resource}
  end
end
```

Let's breakdown what's going on inside of the implementation module. There are two callback functions that are required to correctly implement Guardian, these are the subject_for_token/2 and resource_from_claims/2 functions.

The subject_for_token/2 is used to encode the resource into a token as the subject, in our case it will be the user id. This function will receive the resource that we want to encode into a token and a set of claims, we won't be using the claims so we can signify that it won't be used by prefixing that parameter with an underscore. We should store a value that will be useful in getting the related resource later on, so something like a unique id for the resource will be perfect.

The resource_from_claims/2 is the inverse of subject_for_token/2. We will get the subject of the token from the claims that it receives as an argument and we can use that subject, which is the id of the user in our case, to aggregate that resource from the database.

Now with the implementation module created, we need to configure our application to use it.

```
## config/config.exs

config :auth_example, AuthExampleWeb.Auth.Guardian,
issuer: "auth_example",
secret_key: ""
```

Notice how the secret_key field is empty. We need to provide the secret that will be used when we encode a new token. This secret can be any string, but it's recommended that we use Guardian to generate a secret for us.

```
$ mix guardian.gen.secret
```

That mix task should print out a secret the console that we can use. Go ahead and copy and paste that into the configuration.

```
## config/config.exs

config :auth_example, AuthExampleWeb.Auth.Guardian,
issuer: "auth_example",
secret_key: "ap+tSlAWkSA8zTLLvZW+vY4mePQFmrFgl//OCAWMSVDrQ5mYk/arko3rru8L9Zqn"
```

It's not recommended to hard code your secret here, so using something like an environment variable to store that value is recommended so we prevent sharing that secret with the public.

### Guardian Pipeline And Error Handler

The next thing that we need to do is create a pipeline of Guardian plugs to help handle requests that are made to our API.

This pipeline will watch over the authorization header that is attached to the requests that our API receives and ensure that the authorization token exists and is valid.

We will create this pipeline inside that auth directory that we created earlier.

```
## lib/auth_example_web/auth/pipeline.ex

defmodule AuthExampleWeb.Auth.Pipeline do
  use Guardian.Plug.Pipeline,
  otp_app: :auth_example,
  module: AuthExampleWeb.Auth.Guardian,
  error_handler: AuthExampleWeb.Auth.ErrorHandler

  plug Guardian.Plug.VerifyHeader
  plug Guardian.Plug.EnsureAuthenticated
end
```

The first part of this pipeline module is some configuration telling the pipeline which modules should be used and then we set up the stream of plugs that the request will go through.

The first plug is the VerifyHeader plug from Guardian. This looks for the token inside of the authorization header of the request.

The second plug is the EnsureAuthenticated plug from Guardian. This plug ensures that the token it has received is valid.

Notice how we are using a module that we have not yet defined, which is the ErrorHandler module. This module will handle the instances where an error occurs during the authentication process.

Let's go ahead an create that inside of the auth directory we created earlier.

```
## lib/auth_example_web/auth/error_handler.ex

defmodule AuthExampleWeb.Auth.ErrorHandler do
  import Plug.Conn

  @behaviour Guardian.Plug.ErrorHandler

  @impl Guardian.Plug.ErrorHandler

  def auth_error(conn, {type, _reason}, _opts) do
    body = Jason.encode!(%{error: to_string(type)})

    conn
    |> put_resp_content_type("application/json")
    |> send_resp(401, body)
  end
end
```

Guardian is now configured and we are ready to start building out the controllers and routes that are needed to allow our API to start receiving requests.

## Authentication Controller And Routes

We will build out a controller that will handle requests that are related towards authentication. This will primarily consist of registering a new user to our application and allowing them to sign in.

We'll start by building out the register action for the authentication controller to handle new user registration.

```
## lib/auth_example_web/controllers/auth_controller.ex

defmodule AuthExampleWeb.AuthController do
  use AuthExampleWeb, :controller

  alias AuthExample.Users
  alias AuthExampleWeb.Auth.Guardian

  def register(conn, %{"user" => user_params}) do
    case Users.create_user(user_params) do
      {:ok, user} ->
        {:ok, token, _claims} = Guardian.encode_and_sign(user)

        render(conn, "token.json", token: token)
    end
  end
end
```

For the purpose of this example, the register action is pretty simple. It will receive the user credentials from the request and create a new user. If the user creation was successful, we use that user to create a new token and then render a json view to send the new token back to the client.

We currently don't have the json view setup, so let's create that.

```
## lib/auth_example_web/views/auth_view.ex

defmodule AuthExampleWeb.AuthView do
  use AuthExampleWeb, :view

  def render("token.json", %{token: token}) do
    %{token: token}
  end
end
```

We should now successfully return a token to the client when a request is made to register a new user.

If we want this register route to be reachable, we need to configure a route for it. Let's go ahead and setup our router.

```
## lib/auth_example/router.ex

defmodule AuthExampleWeb.Router do
  use AuthExampleWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", AuthExampleWeb do
    pipe_through :api

    post "/register", AuthController, :register
  end
end
```

Our API can now start receiving requests to register a new user and receive a token.

With user registration implemented, we now want a way to sign users in. Let's create another action in our auth controller to handle that.

```
## lib/auth_example_web/controllers/auth_controller.ex

defmodule AuthExampleWeb.AuthController do
  use AuthExampleWeb, :controller

  alias AuthExample.Users
  alias AuthExampleWeb.Auth.Guardian

  def register(conn, %{"user" => user_params}) do
    case Users.create_user(user_params) do
      {:ok, user} ->
        {:ok, token, _claims} = Guardian.encode_and_sign(user)

        render(conn, "token.json", token: token)
    end
  end

  def sign_in(conn, %{"user" => user_params}) do
    case Users.get_by_username(user_params["username"]) do
      {:ok, user} ->
        case Users.authenticate_user(user, user_params["password"]) do
          {:ok, token, _claims} ->
            render(conn, "token.json", token: token)
        end
    end
  end
end
```

With the new sign_in action that we just created, we will query the database for the user with the username that was provided in the request params. If the user is found, we will authenticate that the user is valid by hashing the password sent through the request and matching it against the stored hashed password for the user. If the authentication is valid, then we create a new token using the user and send it back to the client.

However, we currently don't have the authenticate_user function, so let's go ahead and create that. Since this is related to a managing a user resource, the context module for our users would be a great place to put this functionality.

```
defmodule AuthExample.Users do
  import Ecto.Query
  alias AuthExample.Repo

  alias AuthExample.Users.User
  alias AuthExampleWeb.Auth.Guardian

  ...

  def authenticate_user(user, password) do
    case Argon2.verify_pass(password, user.password_hash) do
      true ->
        Guardian.encode_and_sign(user)
      _ ->
        {:error, :unauthorized}
    end
  end
end
```

Inside of our context module, we alias our Guardian implementation module to easily reference. We then create the authenticate_user function that uses Argon2 to verify that the password matches after being hashed and then we use Guardian to encode and sign a new token using the user. It's pretty simple, but powerful.

Now that the sign_in action and the logic to authenticate a user has been created, we now need to add a route to allow our client to make a request to sign in.

```
## lib/auth_example/router.ex

defmodule AuthExampleWeb.Router do
  use AuthExampleWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", AuthExampleWeb do
    pipe_through :api

    post "/register", AuthController, :register
    post "/signin", AuthController, :sign_in
  end
end
```

With that in place, our API is now ready to handle receiving requests to create new users as well as sign them in. Now, let's go ahead and put Guardian to use again by creating private routes that only authenticated users are allowed to hit.

## Authenticated Routes Using Guardian

Remember the pipeline that we created with the VerifyHeaders and EnsureAuthenticated plugs from Guardian? Let's go ahead and now put that to use in our router.

```
## lib/auth_example_web/router.ex

defmodule AuthExampleWeb.Router do
  use AuthExampleWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :auth do
    plug AuthExampleWeb.Auth.Pipeline
  end

  # Public API Routes
  scope "/api", AuthExampleWeb do
    pipe_through :api

    post "/register", AuthController, :register
    post "/signin", AuthController, :sign_in
  end

  # Private API Routes
  scope "/api", AuthExampleWeb do
    pipe_through [:api, :auth]
  end
end
```

We just created a new auth pipeline that uses the pipeline of Guardian plugs that we created. We then setup another scope under the /api namespace that uses the auth pipeline that we created. It's important to recognize that there are now two scopes with the same /api namespace, however one scope pipes requests through the auth pipeline that we created which creates a private scope of endpoints that only authenticated users can access.

Whenever a request is made to an endpount declared in the private /api scope, it will pass the request through the stream of Guardian plugs to ensure that the token is available in the request authorization header and validates the token before moving on.

We currently don't have any endpoints declared in the private /api scope, so let's go ahead and add one and also write the controller and view logic.

This new endpoint will allow authenticated requests to get a user resource by the id.

```
## lib/auth_example_web/router.ex

defmodule AuthExampleWeb.Router do

  ....

  # Private API Routes
  scope "/api", AuthExampleWeb do
    pipe_through [:api, :auth]

    get "/users/:id", UsersController, :user
  end
end
```

We just added the /users/:id route in our private /api scope that uses the auth pipeline to ensure a request to authenticated. This new route uses a new users controller to handle the request. This currently doesn't exist, so let's create it.

```
## lib/auth_example_web/controllers/users_controller.ex

defmodule AuthExampleWeb.UsersController do
  use AuthExampleWeb, :controller

  alias AuthExample.Users

  def user(conn, %{"id" => id}) do
    user = Users.get_user!(id)
    render(conn, "user.json", user: user)
  end
end
```

Our users controller is now set up with a single action. The user action will take the id that was sent with the params of the request and use it with the get_user!/1 function from the user context module to query for a user with that id in the database. Once we have that user, we will render a json view passing the user.

The view has not been setup, so let's create that.

```
## lib/auth_example_web/views/users_view.ex

defmodule AuthExampleWeb.UsersView do
  use AuthExampleWeb, :view

  def render("user.json", %{user: user}) do
    %{data: user}
  end
end
```

Now with the view setup, we simply send the client back a response that consists of a map with a data field that will be our user struct.

However, there is just one problem with this. If we make that request right now for a user, our application will actually error out and we will receive an error message that looks like the following.

```
** (Protocol.UndefinedError) protocol Jason.Encoder not implemented for %AuthExample.Users.User{}
```

This error message is informing us that the Jason.Encoder protocol is not implemented for our user struct, so we can't parse it as json before sending a response. Even though a struct is a map underneath, by default structs don't implement any of the protocols that are implemented for maps so this is why we are not able to parse the struct into json.

Since we own how these structs are defined and created, we can actually derive the Jason.Encoder protocol for our user structs.

In our user schema file, we can use the @derive module attribute to list the protocols we want to derive from.

```
## lib/auth_example/users/user.ex

defmodule AuthExample.Users.User do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder, only: [:id, :username]}

  schema "users" do
    field :username, :string
    field :password, :string, virtual: true
    field :password_hash, :string

    timestamps()
  end
end
```

We are now deriving the Jason.Encoder protocol for our user struct to use and we are only deriving the id and username fields since those are the only fields we want to expose in the response.

If you are interested, you can find out more about deriving protocols [here](https://hexdocs.pm/elixir/Kernel.html#defstruct/1-deriving).

Now when we make an authenticated request that contains a valid token for a user, we will receive a response that contains the user's id and username.

```
{
  "data": {
    "id": 1,
    "username": "Slick Rick"
  }
}
```

Congrats! We now have a working authentication system in our Phoenix API using Guardian to manage encoding authentication tokens for our application and use custom pipelines that pass the request through a stream of Guardian plugs to ensure that the requester is authenticated before accessing a resource.
