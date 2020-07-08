# Contributing to the Food Oasis Project

If you are not going to do hands-on development, you can simply experiment
with the test version of the application at <a href="https://food-oasis-dev.herokuapp.com"> https://food-oasis-dev.herokuapp.com</a>.

The production version is deployed to <a href="https://food-oasis.herokuapp.com"> https://food-oasis.herokuapp.com</a>.

If you wish to study or contribute to the code base, follow these Installation
Instructions to install a development environment on your machine:

## Installation Instructions

### Prerequisites

1. Git for working with Github source code
2. Node and npm for running the web app

### Full-Stack React/Node Application Installation

The simplest way to get started is to run the application on your machine natively, and use our shared development database in the cloud. This is appropriate if you are just studying code or only working on node/express or front-end code. If you need to make changes to the database schema or reference data in the database, you will need to set up an environment that includes a local copy of the development database to develop the database changes. See [Development Environments](/doc/development-environments.md) for further information.

1. Start a terminal app, such as a Git bash shell on Windows or Terminal on Mac OS
1. Create a source directory (e.g. hackforla) in the user's home directory and go in it (or use the folder where you normally put local git repositories)
   ```
   mkdir hackforla
   cd hackforla
   ```
1. Clone the Food Oasis repository

   ```
   git clone https://github.com/hackforla/food-oasis
   ```

1. Change to the food-oasis directory:
   ```
   cd food-oasis
   ```
1. Install the node server npm depedencies:
   ```
   npm install
   ```
1. Obtain the `dotenv` file from the Food-Oasis/Developers G-Drive folder and place it in this directory. _Re-name this file to .env on your machine._ It contains private info (i.e., the production database connection string) that we cannot put in this public GitHub repo.
1. Change to the client directory:
   ```
   cd client
   ```
1. Install the client (React) dependencies:
   ```
   npm install
   ```

### To Run the React/Node Application

1. In one terminal window, navigate back to the /food-oasis directory and start the node server:

```
cd ..
npm start
```

1. In a separate terminal window, navigate to the /food-oasis/client directory, start the react app, and open the browser :

```
cd client
npm start
```

Note: Node server (backend) should start before the React server (frontend/client)

## To Contribute Code

### Claiming an Issue

Before modifying any code, an issue should exist for the task in the GitHub repo. You should make sure that no one else is assigned to the issue and then assign it to yourself, so we avoid stepping on each others' toes. If there is not an issue for the work you want to do, you should talk to the lead developer and/or project manager to get an issue created and prioritized on the kanban board and then have them create the issue from there for you to work on.

We use the "Git Flow" workflow to manage source code. See [Vincent Driessen's seminal article](https://nvie.com/posts/a-successful-git-branching-model/) for an overview, though a few of the detailed procedures below have additional steps. We have modified a few steps here, so your changes are merged into _develop_ on GitHub (rather than locally). This allows others to easily view your changes, and is a smaller departure from the previous workflow to learn.

1. After cloning the repository, create a feature branch with a name containing your name and a feature name, separated by dashes, for example.

```
git checkout -b 379-hours-validation
```

Note that your feature branch is based on the _develop_ branch, which is where feature changes will be integrated for eventual release to production.

2. Claim an issue (see instructions down below) and start coding.

3. Regularly add, commit, and push your code to your branch.

```
git add -A
git commit -m "Implement client-side validation of business hours"
```

We have implemented git commit hooks that automatically run static code analysis scripts on your code before completing the commit. Pay close attention when you commit, and see if you get any errors indicating that eslint found errors and the commit did not complete. If this happens, refer to [Static Code Analysis](/doc/linting.md) for instructions.

```
git push origin HEAD
```

4. When an issue is completed and is ready for a pull request, first add and commit your latest changes as in Step 3 above, then make sure your code has the latest code from the _develop_ branch by pulling from the develop branch. This is to ensure merge conflicts are in your local envinronment, which is easier to clean up, than in GitHub:

```
git pull origin develop
```

5. Resolve any merge conflicts and _run the application_ (client and server) to be sure that the application builds correctly before proceeding. Then push your changes to your feature branch on the github repo:

```
git push origin HEAD
```

6. Go to the [GitHub repository for Food Oasis](https://github.com/hackforla/food-oasis). There are three options:

- Click on "Compare & pull request" button underneath the "commits branches releases environment contributors" box.
- Click on the "New Pull Request" button underneath the "commits branches releases environment contributors" box and underneath "Your recently pushed branches" section.
- Click on the "Pull Request" tab and press "New Pull Request"

7. In "Comparing Changes", switch the "compare" (right button) to your branch name. Make sure the "base" (left button) is on the _develop_ branch. Double check the changes you've made down below, and click "Create pull request". Make sure the description of your changes is reflected in the Pull Request, e.g.
   "Start to incorporate Storybook and LADOT theme (colors, logos and headers)".

8. Click on "Create Pull Request" and wait for someone to review to merge your changes!

9. Once your PR has been reviewed, accepted and merged to the develop branch, it will automatically be published to <a href="https://food-oasis-dev.herokuapp.com"> https://food-oasis-dev.herokuapp.com</a>. Please be sure to run the application here and make sure your changes are reflected in this deployed version of the develop branch.
