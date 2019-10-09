# Node-Starter

This is a starter application for a Web API server that uses node/express and a Postgres
database.

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
      git clone https://github.com/hackforla/node-starter
      ```

    </p></details>

1. Change to the node-starter directory:
   ```
   cd node-starter
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

1.  Run `npm start` from the node-starter directory to start the node server.
