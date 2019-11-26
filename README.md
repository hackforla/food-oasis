# Food Oasis

This is a re-vamped version of the Food Oasis application, with a
Postgres database, node/express Web API server, and React client.

## Prerequisites

1.  Git for working with Github source code
2.  Node and npm for running the web app

## Full-Stack React/Node Application Installation

1. Clone this repo to your local drive.

   <details><summary>details</summary><p>

   1. Start a terminal app, such as Terminal on OSX or the Git Bash shell on Windows.
   1. Create a src directory in the user's home directory and go in it
      ```
      cd && mkdir src && cd src
      ```
   1. Clone the repository
      ```
      git clone https://github.com/hackforla/food-oasis
      ```

    </p></details>

1. Change to the food-oasis directory:
   ```
   cd food-oasis
   ```
1. Install the node server npm depedencies:
   ```
   npm install
   ```
1. Obtain the `.env` file from the slack channel and place it in this directory. It contains private info (i.e., the production database connection string) that we cannot put in this public GitHub repo.
1. Change to the client directory:
   ```
   cd client
   ```
1. Install the client (React) dependencies:
   ```
   npm install
   ```

## To Run the React/Node Application

1.  Run `npm start` from the food-oasis directory to start the node server.
1.  Open a separate command shell and set the directory to the /client subdirectory, then `npm start` again to start the client application and open a browser pointing to it.

## Features

[Registration and Login](/register.md)

[Forgot Password](/forgot-password.md)
