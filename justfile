# Prettier Java Next Line - Prettier Java Plugin with Allman-style braces

# just --list --unsorted
default:
    @just --list --unsorted

# yarn build
build:
    yarn build

# yarn test
test:
    yarn test

# yarn lint
lint:
    yarn lint

# yarn ci
build-ci:
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
    echo "📦 Package location: ./local-packages/prettier-java-next-line-$(node -pe "require('./package.json').version").tgz"

# ./install-local.sh
install-local:
    ./install-local.sh

# Clean build artifacts
clean:
    rm -rf dist
    rm -rf local-packages/*.tgz
    rm -rf node_modules

# yarn update-test-outputs
update-test-outputs:
    yarn update-test-outputs
