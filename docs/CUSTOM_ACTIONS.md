# Creating Custom GitHub Actions

This guide explains how to create custom GitHub Actions for this project.

## Types of Custom Actions

GitHub Actions offers three types of custom actions:

1. **Docker container actions**
2. **JavaScript actions**
3. **Composite actions**

## Creating a JavaScript Action

JavaScript actions are the most portable type of GitHub Actions. Here's how to create one:

### 1. Setup the Action Directory Structure

```
my-action/
├── action.yml
├── index.js
├── node_modules/
└── package.json
```

### 2. Create the Action Metadata File (action.yml)

```yaml
name: 'My Custom Action'
description: 'A description of what this action does'
inputs:
  input-name:
    description: 'Description of this input'
    required: true
    default: 'default value'
outputs:
  output-name:
    description: 'Description of this output'
runs:
  using: 'node16'  # or 'node20' for newer actions
  main: 'index.js'
```

### 3. Write the Action Code (index.js)

```javascript
const core = require('@actions/core');
const github = require('@actions/github');

try {
  // Get input defined in action metadata file
  const inputValue = core.getInput('input-name');
  console.log(`The input value is ${inputValue}`);
  
  // Do something with the input
  const result = `Processed: ${inputValue}`;
  
  // Set the output
  core.setOutput('output-name', result);
} catch (error) {
  core.setFailed(error.message);
}
```

### 4. Create package.json

```json
{
  "name": "my-custom-action",
  "version": "1.0.0",
  "description": "My custom GitHub Action",
  "main": "index.js",
  "dependencies": {
    "@actions/core": "^1.10.0",
    "@actions/github": "^5.1.1"
  }
}
```

### 5. Install Dependencies

```bash
npm install
```

## Creating a Docker Container Action

For actions that require specific dependencies or runtime environments:

### 1. Setup the Action Directory Structure

```
my-docker-action/
├── action.yml
├── Dockerfile
└── entrypoint.sh
```

### 2. Create the Action Metadata File (action.yml)

```yaml
name: 'My Docker Action'
description: 'Action that uses Docker'
inputs:
  input-name:
    description: 'Input description'
    required: true
outputs:
  output-name:
    description: 'Output description'
runs:
  using: 'docker'
  image: 'Dockerfile'
  args:
    - ${{ inputs.input-name }}
```

### 3. Create the Dockerfile

```dockerfile
FROM node:16-alpine

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
```

### 4. Create the entrypoint.sh Script

```bash
#!/bin/sh -l

INPUT_VALUE=$1
echo "Processing input: $INPUT_VALUE"

# Your action logic here

# Set the output
echo "::set-output name=output-name::result value"
```

## Creating a Composite Action

Composite actions combine multiple step actions:

### 1. Setup the Action Directory Structure

```
my-composite-action/
└── action.yml
```

### 2. Create the Action Metadata File (action.yml)

```yaml
name: 'My Composite Action'
description: 'Action combining multiple steps'
inputs:
  input-name:
    description: 'Input description'
    required: true
runs:
  using: "composite"
  steps:
    - name: First step
      run: echo "This is the first step"
      shell: bash
    
    - name: Second step
      run: echo "Input was ${{ inputs.input-name }}"
      shell: bash
    
    - name: Use another action
      uses: actions/setup-node@v3
      with:
        node-version: '16'
```

## Using Your Custom Action in a Workflow

Once your action is created, use it in a workflow like this:

```yaml
jobs:
  example-job:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Use my custom action
        uses: ./path/to/my-action  # Path relative to repository root
        with:
          input-name: 'some value'
      
      - name: Show output
        run: echo "The output was ${{ steps.my-custom-action.outputs.output-name }}"
```

## Best Practices for Custom Actions

1. Keep actions focused on a single task
2. Use clear naming conventions
3. Version your actions using tags and branches
4. Document inputs, outputs, and examples
5. Write tests for your actions
6. Use the minimum permissions necessary
7. Handle errors gracefully
8. Follow security best practices

## Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Creating JavaScript Actions](https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action)
- [Creating Docker Container Actions](https://docs.github.com/en/actions/creating-actions/creating-a-docker-container-action)
- [Creating Composite Actions](https://docs.github.com/en/actions/creating-actions/creating-a-composite-action) 