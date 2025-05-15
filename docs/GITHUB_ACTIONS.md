# GitHub Actions Documentation

This document provides detailed information about the GitHub Actions workflows used in this project.

## Overview

GitHub Actions automates our software development workflows directly from GitHub. In this project, we use GitHub Actions to:

- Run code linting
- Execute tests
- Build the application
- Deploy to production

## Main Workflow: `deployment.yml`

The primary workflow file is located at `.github/workflows/deployment.yml` and runs when code is pushed to the `main` branch.

### Jobs and Steps

#### 1. Lint Job

```yaml
lint:
  runs-on: ubuntu-latest
  steps:
    - name: Get code
      uses: actions/checkout@v3
    - name: Cache dependencies
      id: cache
      uses: actions/cache@v3
      with:
        path: node_modules
        key: deps-node-modules-${{ hashFiles('**/package-lock.json') }}
    - name: Install dependencies
      if: steps.cache.outputs.cache-hit != 'true'
      run: npm ci
    - name: Lint code
      run: npm run lint
```

This job:
- Checks out the code
- Uses caching to speed up dependency installation
- Installs dependencies (if not cached)
- Runs the lint script

#### 2. Test Job

```yaml
test:
  runs-on: ubuntu-latest
  steps:
    - name: Get code
      uses: actions/checkout@v3
    - name: Cache dependencies
      # Similar to lint job
    - name: Install dependencies
      # Similar to lint job
    - name: Test code
      id: run-tests
      run: npm run test
    - name: Upload test report
      if: failure() && steps.run-tests.outcome == 'failure'
      uses: actions/upload-artifact@v4
      with:
        name: test-report
        path: test.json
```

This job:
- Runs tests
- Uploads test reports as artifacts if tests fail

#### 3. Build Job

```yaml
build:
  needs: test
  runs-on: ubuntu-latest
  steps:
    - name: Get code
      uses: actions/checkout@v3
    - name: Cache dependencies
      # Similar to previous jobs
    - name: Install dependencies
      # Similar to previous jobs
    - name: Build website
      run: npm run build
    - name: Upload artifacts
      uses: actions/upload-artifact@v4
      with:
        name: dist-files
        path: dist
```

This job:
- Depends on successful test completion
- Builds the application
- Uploads the build artifacts

#### 4. Deploy Job

```yaml
deploy:
  needs: build
  runs-on: ubuntu-latest
  steps:
    - name: Get code
      uses: actions/checkout@v3
    - name: Get build artifacts
      uses: actions/download-artifact@v4
      with:
        name: dist-files
        path: ./dist
    - name: Output contents
      run: ls
    - name: Deploy site
      run: echo "Deploying..."
```

This job:
- Depends on successful build
- Downloads build artifacts
- Performs deployment (currently a placeholder)

## Key Features Used

### 1. Caching

We use the `actions/cache@v3` action to cache node_modules based on the package-lock.json hash. This significantly speeds up workflow execution by avoiding repeated dependency installation.

### 2. Artifacts

We use `actions/upload-artifact@v4` and `actions/download-artifact@v4` to:
- Store test reports on failure
- Share build outputs between jobs

### 3. Conditional Execution

We use conditionals like:
- `if: steps.cache.outputs.cache-hit != 'true'` to skip installation when dependencies are cached
- `if: failure() && steps.run-tests.outcome == 'failure'` to upload test reports only on failure

### 4. Job Dependencies

We ensure proper workflow order using the `needs` keyword:
- Build job depends on successful test job
- Deploy job depends on successful build job

## Future Improvements

Potential improvements to this workflow:
- Add environment deployments (staging, production)
- Implement manual approval gates
- Configure Slack/email notifications
- Add security scanning
- Implement branch protections and PR workflows 