# Release and HotFix Procedures

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
- Merge the release branch into _main_:

```
git checkout main
git pull origin main
git merge --no-ff release-1.0.0
git tag -a 0.1.0 -m "Release version 0.1.0"
git push origin HEAD
git push origin 0.1.0
```

At present, Heroku is configured to detect the commit to _main_ and automatically deploy the application to production. You should navigate to <a href="https://food-oasis.herokuapp.com"> https://food-oasis.herokuapp.com</a> after giving Heroku time to deploy and verify that the application runs, and any visible release # has been incremented.

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
include very minor patches to the application, and is always based on the _main_ branch.
The new release number will be the same as the main branch number with the patch
number incremented by one. For example a patch to release 34.67.22 should be 34.67.23.

- Make sure your local machine has an up-to-date version of the _main_ branch:

```
git checkout main
git pull origin main
```

- Create a new release branch from _main_ with the name hotfix-<release#>:

```
git checkout -b hotfix-34.67.23 main
```

- Update the release number in the application. This typically entails updating the package.json file version properties, and perhaps other locations where the release number might appear (For now, I just added it to the About.js component, though we should probably put it in a site footer or some inconspicuous place, so it can be viewed from the UI.)

- Commit the version number change:

```
git add -A
git commit -m "Bumped version number to 0.1.1"
```

- Run the application (locally and/or in a deployment environment) and modify the code to implement the fixe(s). These should be very minor changes - significant changes should be made by creating a feature release based on the _develop_ branch as described above. When the hotfix is ready for release...
- Merge the hotfix branch into _main_:

```
git checkout main
git pull origin main
git merge --no-ff hotfix-0.1.1
git tag -a 0.1.1 -m "Release version 0.1.1"
git push origin HEAD
```

At present, Heroku is configured to detect the commit to _main_ and automatically deploy the application to production. You should navigate to <a href="https://food-oasis.herokuapp.com"> https://food-oasis.herokuapp.com</a> after giving Heroku time to deploy and verify that the application runs, and any visible release # has been incremented.

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
