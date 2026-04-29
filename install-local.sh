#!/bin/bash

# Script to install Maculate Java locally for testing
# This script sets up the pre-release version of Maculate Java for use in the current project

set -e

MACULATE_PACKAGE_PATH="/Users/craig/projects/maculate-java/local-packages/maculate-java-2.8.1-beta.1.tgz"

# Check if the package exists
if [[ ! -f "$MACULATE_PACKAGE_PATH" ]]; then
    echo "Error: Package not found at $MACULATE_PACKAGE_PATH"
    echo "Please run 'just pack' from /Users/craig/projects/maculate-java to create the package first"
    exit 1
fi

# Function to install globally
install_globally() {
    echo "🌍 Installing Maculate Java globally..."
    npm install -g "$MACULATE_PACKAGE_PATH"
    echo "✅ Maculate Java installed globally!"
    echo "📋 You can now use:"
    echo "   - npx maculate-java --write '**/*.java'"
    echo "   - maculate-java --write '**/*.java' (if globally installed)"
    exit 0
}

# Function to set up Maculate Java for a project
setup_maculate() {
    local project_path="$1"
    local project_name=$(basename "$project_path")

    echo "Setting up Maculate Java for $project_name..."

    # Check if mise is available and this is a mise project
    if command -v mise &> /dev/null && (cd "$project_path" && mise ls 2>/dev/null | grep -q .); then
        echo "🔧 mise-based project detected"
        echo "📋 Installing Maculate Java locally for $project_name..."

        cd "$project_path"

        # Create package.json if it doesn't exist
        if [[ ! -f package.json ]]; then
            echo "Creating package.json..."
            npm init -y > /dev/null
        fi

        # Install the local package
        npm install --save-dev "$MACULATE_PACKAGE_PATH"

        echo "✅ Maculate Java installed successfully in $project_name"
        echo "📋 You can now:"
        echo "   1. Use: npx prettier --write '**/*.java' --plugin maculate-java"
        echo "   2. Add to .prettierrc: { \"plugins\": [\"maculate-java\"] }"
        echo "   3. Then just use: npx prettier --write '**/*.java'"

    # Check if it's a Node.js project
    elif [[ -f "$project_path/package.json" ]]; then
        echo "📦 Node.js project detected - installing via npm"
        cd "$project_path"
        npm install --save-dev "$MACULATE_PACKAGE_PATH"

        # Update prettier config if it exists
        if [[ -f .prettierrc.js ]]; then
            echo "Updating .prettierrc.js for $project_name..."
            sed -i '' 's/prettier-plugin-java/maculate-java/g' .prettierrc.js
        fi

        if [[ -f .prettierrc.json ]]; then
            echo "Updating .prettierrc.json for $project_name..."
            sed -i '' 's/prettier-plugin-java/maculate-java/g' .prettierrc.json
        fi

        if [[ -f .prettierrc ]]; then
            echo "Updating .prettierrc for $project_name..."
            sed -i '' 's/prettier-plugin-java/maculate-java/g' .prettierrc
        fi

        echo "✅ Maculate Java installed successfully in $project_name"
        echo "📋 You can now:"
        echo "   1. Use: npx maculate-java --write '**/*.java'"
        echo "   2. Or update your prettier config to use 'maculate-java' plugin instead of 'prettier-plugin-java'"

    # Check if it's a Maven project
    elif [[ -f "$project_path/pom.xml" ]]; then
        echo "☕ Maven project detected"
        echo "📋 To use Maculate Java in $project_name:"
        echo "   1. Extract the package to a local directory:"
        echo "      tar -xzf $MACULATE_PACKAGE_PATH -C /tmp/"
        echo "   2. Install the extracted package globally:"
        echo "      npm install -g /tmp/package"
        echo "   3. Update your Maven configuration to use 'maculate-java' instead of 'prettier-plugin-java'"
        echo "   4. Or use directly: npx maculate-java --write '**/*.java'"

    else
        echo "❓ Project type not recognized for $project_name"
        echo "📋 To use Maculate Java manually:"
        echo "   1. Extract and install the package:"
        echo "      tar -xzf $MACULATE_PACKAGE_PATH -C /tmp/"
        echo "      npm install -g /tmp/package"
        echo "   2. Use directly: npx maculate-java --write '**/*.java'"
    fi

    echo ""
    echo "📦 Package: $MACULATE_PACKAGE_PATH"
    echo "🧪 To test the formatting: npx maculate-java --write '**/*.java'"
}

# Check for global flag
if [[ "$1" == "--global" || "$1" == "-g" ]]; then
    install_globally
fi

# If no arguments provided, show usage
if [[ $# -eq 0 ]]; then
    echo "Usage: $0 [--global|-g] [project-path]"
    echo "  --global, -g    Install globally instead of locally"
    echo "  project-path    Path to project (default: current directory)"
    echo ""

    # Use current directory as default
    setup_maculate "$(pwd)"
else
    # Set up for provided project path
    setup_maculate "$1"
fi