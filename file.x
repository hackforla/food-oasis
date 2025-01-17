# Workflow and Tests Documentation

## Workflow Steps

### AWS Bastion Workflow
- **File**: `.github/workflows/awsBastion.yml`
- **Description**: This workflow is used to turn on/off the Bastion server.
- **Steps**:
  1. Debug Action
  2. Interpolate Bastion capacity flag
  3. Configure AWS credentials
  4. Scale up/down Bastion ASG

### Deploy Fullstack to DockerHub Workflow
- **File**: `.github/workflows/deployFullstackToDockerHub.yaml`
- **Description**: This workflow builds and pushes a Docker image from the latest push to the "develop" branch.
- **Steps**:
  1. Checkout repo
  2. Build and push image

### Deploy Web API Only to DockerHub Workflow
- **File**: `.github/workflows/deployWebAPIOnlyToDockerHub.yaml`
- **Description**: This workflow builds and pushes a Docker image from the latest push to the "develop" branch.
- **Steps**:
  1. Checkout repo
  2. Build and push image

### Deploy Develop Branch to Heroku Workflow
- **File**: `.github/workflows/developToHeroku.yml`
- **Description**: This workflow deploys the develop branch to foodoasisdev.herokuapp.com.
- **Steps**:
  1. Checkout repo
  2. Deploy to Heroku

### Deploy Main Branch to Heroku Workflow
- **File**: `.github/workflows/mainToHeroku.yml`
- **Description**: This workflow deploys the main branch to foodoasis.herokuapp.com.
- **Steps**:
  1. Checkout repo
  2. Deploy to Heroku

### Deploy Vite Branch to Heroku Workflow
- **File**: `.github/workflows/viteToHeroku.yml`
- **Description**: This workflow deploys the vite branch to foodoasisvite.herokuapp.com.
- **Steps**:
  1. Checkout repo
  2. Deploy to Heroku

## Test Cases

### App Component Test
- **File**: `client/src/__test__/App.test.js`
- **Description**: This test checks if the App component renders without crashing.
- **Test Case**:
  1. Renders without crashing

### Helpers Test
- **File**: `client/src/__test__/Helpers.test.js`
- **Description**: This test checks various date utility functions.
- **Test Cases**:
  1. formatDate
  2. formatDateMMMddYYYY
  3. formatDatewTimeZoneDD
  4. formatDatewTimeZonehhmmss
  5. formatDatewTimeZoneWeekdayShort
  6. formatDatewTimeZoneMMM

### Account Test
- **File**: `server/__test__/account.test.ts`
- **Description**: This test checks various account-related functionalities.
- **Test Cases**:
  1. Get all accounts
  2. Get account by ID
  3. Get account by email
  4. Register a new user
  5. Resend confirmation email
  6. Forgot password
  7. Reset password
  8. Set tenant permission
  9. Set global permission
  10. Confirm registration
  11. Login user
  12. Update user
  13. Remove user

## Known Issues and Areas of Improvement

### Workflow Issues
- **Issue**: The `deployFullstackToDockerHub.yaml` and `deployWebAPIOnlyToDockerHub.yaml` workflows are not currently used as the web app is running on Heroku.
- **Improvement**: Consider removing or updating these workflows if they are no longer needed.

### Test Issues
- **Issue**: Some test cases might be missing or incomplete.
- **Improvement**: Review and add more test cases to ensure comprehensive test coverage.

### General Improvements
- **Improvement**: Regularly review and update the workflows and tests to ensure they are up-to-date and relevant to the project.
