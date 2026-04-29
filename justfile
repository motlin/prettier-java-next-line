# Maculate Java - Prettier Java Plugin with Allman-style braces

# List all available commands
default:
    @just --list --unsorted

# Build the project
build:
    yarn build

# Run tests
test:
    yarn test

# Run lint
lint:
    yarn lint

# Run all checks (build, lint, test)
ci:
    yarn ci

# Create a local package for testing
pack:
    #!/usr/bin/env bash
    set -euo pipefail

    # Ensure local-packages directory exists
    mkdir -p local-packages

    # Create the package
    npm pack --pack-destination=./local-packages .

    echo "✅ Package created successfully!"
    echo "📦 Package location: ./local-packages/maculate-java-$(node -pe "require('./package.json').version").tgz"

# Install the local package in other projects
install-local:
    ./install-local.sh

# Clean build artifacts
clean:
    rm -rf dist
    rm -rf local-packages/*.tgz
    rm -rf node_modules

# Update test outputs
update-test-outputs:
    yarn update-test-outputs
