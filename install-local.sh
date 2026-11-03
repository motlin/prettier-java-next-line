#!/usr/bin/env bash

set -euo pipefail

script_directory="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
package_version="$(node -p "require('${script_directory}/package.json').version")"
package_path="${script_directory}/local-packages/prettier-java-next-line-${package_version}.tgz"

if [[ $# -ne 1 ]]; then
    echo "Usage: $0 <project-path>"
    echo "Installs the packed plugin into the Java project at <project-path>."
    exit 1
fi

if [[ ! -d "$1" ]]; then
    echo "Project directory not found: $1"
    exit 1
fi

project_path="$(cd "$1" && pwd)"

if [[ "${project_path}" == "${script_directory}" ]]; then
    echo "Refusing to install into the plugin repository itself: ${project_path}"
    echo "Pass the path of the Java project you want to format."
    exit 1
fi

if [[ ! -f "${package_path}" ]]; then
    echo "Package not found: ${package_path}"
    echo "Run 'just pack' in ${script_directory} first."
    exit 1
fi

if [[ ! -f "${project_path}/package.json" ]]; then
    npm init --yes --prefix "${project_path}" >/dev/null
fi

npm install \
    --prefix "${project_path}" \
    --save-dev \
    prettier \
    "${package_path}"

echo "Installed prettier-java-next-line in ${project_path}."
echo "Run: npx prettier --plugin=prettier-java-next-line --write '**/*.java'"
