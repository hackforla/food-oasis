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
1. Obtain the `.env` file from the Food-Oasis/Developers G-Drive folder and place it in this directory. It contains private info (i.e., the production database connection string) that we cannot put in this public GitHub repo.
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

## Static Analysis (eslint)

This project uses Husky and Lint-Staged to automatically perform static analysis tasks on all added / modified files. Each time you try to commit it will run the `lint-staged` command and report any issues. Be warned, all "errors" reported by eslint will not allow the commit until they are resolved. Developers can opt to pass `--no-verify` flag to git commit to bypass these rules but it is not advised. If for whatever reason you want to ignore certain rules in a specific situation you can use comments like this: `//eslint-disable-next-line` or `//eslint-disable-line`.

1.  Run `npm install` on root
2.  Configure your IDE to use the `.eslintrc.js` and `.prettierc` file on root. (For VSCode editor, the .vscode/.settings.json file from the repo will set up Prettier as your default formatter, enable format on save, and disable format on paste.)

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

## Creating a Release

Creating a release should only be done by the release manager!
Release branches are created from the _develop_ branch. Decide on a release number for the next release, using [semver](https://semver.org/) conventions. For example, if the current release is 1.0.0 and the changes in this release are minor, the new release number would be 1.0.1.

- Make sure your local machine has an up-to-date version of the _develop_ branch:

```
git checkout develop
git pull origin develop
```

- Create a new release branch from _develop_ with the name release-<release#>:

```
git checkout -b release-0.1.0 develop
```

- Update the release number in the application. This typically entails updating the package.json file version properties, and perhaps other locations where the release number might appear.

- Commit the version number change:

```
git add -A
git commit -m "Bumped version number to 0.1.0"
```

- Run the application (locally and/or in a deployment environment) and make any fixes necessary. These should be very minor changes - significant changes should be made by creating a feature release based on the _develop_ branch as described above. When the application is ready for release...
- Merge the release branch into _master_:

```
git checkout master
git pull origin master
git merge --no-ff release-1.0.0
git tag -a 0.1.0 -m "Release version 0.1.0"
git push origin HEAD
git push origin 0.1.0
```

At present, Heroku is configured to detect the commit to _master_ and automatically deploy the application to production. You should navigate to <a href="https://food-oasis.herokuapp.com"> https://food-oasis.herokuapp.com</a> after giving Heroku time to deploy and verify that the application runs, and any visible release # has been incremented.

The release is now done and tagged for future reference.

- Merge the release branch into _develop_:

```
git checkout develop
git merge --no-ff release-0.1.0
```

(Resolve any merge conflicts)

```
git push origin HEAD
```

It will automatically be published to <a href="https://food-oasis-dev.herokuapp.com"> https://food-oasis-dev.herokuapp.com</a>. Please be sure to run the application here and make sure your changes are reflected in this deployed version of the develop branch.

- We are now done with this release and can delete the release branch:

```
git branch -d release-0.1.0
```

### Generating release notes

We are using [`gren`](https://github.com/github-tools/github-release-notes) with .grenrc.json config file and generating the log from Github Issues. See [this page](https://github-tools.github.io/github-release-notes/concept.html) on the recommended convention for writing issue titles. We use the `enhancement` and `bug` labels to categorize issues for release notes.

1. Follow instructions on the [`gren` setup section](https://github.com/github-tools/github-release-notes#setup) to generate and install your `Github token`.

1. Be in the project root directory

1. Run the script to update the notes

```
npm run release-notes
```

## Creating a HotFix

Creating a HotFix should only be done by the release manager! A HotFix should only
include very minor patches to the application, and is always based on the _master_ branch.
The new release number will be the same as the master branch number with the patch
number incremented by one. For example a patch to release 34.67.22 should be 34.67.23.

- Make sure your local machine has an up-to-date version of the _master_ branch:

```
git checkout master
git pull origin master
```

- Create a new release branch from _master_ with the name hotfix-<release#>:

```
git checkout -b hotfix-34.67.23 master
```

- Update the release number in the application. This typically entails updating the package.json file version properties, and perhaps other locations where the release number might appear (For now, I just added it to the About.js component, though we should probably put it in a site footer or some inconspicuous place, so it can be viewed from the UI.)

- Commit the version number change:

```
git add -A
git commit -m "Bumped version number to 0.1.1"
```

- Run the application (locally and/or in a deployment environment) and modify the code to implement the fixe(s). These should be very minor changes - significant changes should be made by creating a feature release based on the _develop_ branch as described above. When the hotfix is ready for release...
- Merge the hotfix branch into _master_:

```
git checkout master
git pull origin master
git merge --no-ff hotfix-0.1.1
git tag -a 0.1.1 -m "Release version 0.1.1"
git push origin HEAD
```

At present, Heroku is configured to detect the commit to _master_ and automatically deploy the application to production. You should navigate to <a href="https://food-oasis.herokuapp.com"> https://food-oasis.herokuapp.com</a> after giving Heroku time to deploy and verify that the application runs, and any visible release # has been incremented.

The hotfix is now done and tagged for future reference.

- Merge the hotfix branch into _develop_:

```
git checkout develop
git merge --no-ff hotfix-0.1.1
```

(Resolve any merge conflicts)

```
git push origin HEAD
```

It will automatically be published to <a href="https://food-oasis-dev.herokuapp.com"> https://food-oasis-dev.herokuapp.com</a>. Please be sure to run the application here and make sure your changes are reflected in this deployed version of the develop branch.

- We are now done with this release and can delete the release branch:

```
git branch -d hotfix-0.1.1
```

## Resources from our very own Hack For LA member!

- [Intro to Git CLI exercises](https://github.com/ndanielsen/intro-cli-git-github) Nathan Danielsen
- [Intermediate Git CLI exercises](https://github.com/ndanielsen/intermediate-cli-git-github) Nathan Danielsen

### Testing

TBD
