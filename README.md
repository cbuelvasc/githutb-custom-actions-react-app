# React App with GitHub Actions

This repository contains a React application with custom GitHub Actions for continuous integration and deployment.

## Project Overview

A React application built with Vite and configured with GitHub Actions workflows for automated linting, testing, building, and deployment.

## Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd githutb-custom-actions-react-app

# Install dependencies
npm install
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run test` - Run tests
- `npm run lint` - Run ESLint to lint the code

## GitHub Actions Workflow

The project uses GitHub Actions for CI/CD with the following jobs:

1. **Lint**: Runs ESLint to check code quality
2. **Test**: Runs automated tests and uploads test reports on failure
3. **Build**: Creates a production build and uploads artifacts
4. **Deploy**: Deploys the site (placeholder for actual deployment)

Workflow triggers on pushes to the `main` branch.

## Custom GitHub Actions

This project includes the following custom GitHub Actions:

1. **cached-deps**: Action to get and cache dependencies via npm for faster workflow execution.
2. **deploy-s3-docker**: Docker-based action to deploy a static site to an AWS S3 bucket.
3. **deploy-s3-javascript**: JavaScript-based action to deploy a static site to an AWS S3 bucket.

## Project Structure

```
githutb-custom-actions-react-app
├── .github/                # GitHub configuration
│   ├── actions/            # Custom GitHub Actions
│   │   ├── cached-deps/    # Action to cache dependencies
│   │   ├── deploy-s3-docker/    # Docker-based S3 deployment action
│   │   └── deploy-s3-javascript/    # JavaScript-based S3 deployment action
│   └── workflows/          # GitHub Actions workflow configurations
├── public/                 # Public assets
├── src/                    # Source code
│   ├── assets/             # Static assets like images
│   ├── components/         # React components
│   └── test/               # Test files
├── .eslintrc.json          # ESLint configuration
├── .gitignore              # Git ignore file
├── index.html              # Entry HTML file
├── package.json            # NPM package definition
├── vite.config.js          # Vite configuration
└── README.md               # This file
```

## Workflow Details

The GitHub Actions workflow `deployment.yml` includes:

- Caching for node_modules
- Artifact handling for build outputs
- Automatic test report generation on failures
- Multi-stage pipeline ensuring proper sequential execution
- Custom deployment actions for AWS S3