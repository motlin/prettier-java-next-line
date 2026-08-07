#!/usr/bin/env bash

set -euo pipefail

script_directory="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
package_version="$(node -p "require('${script_directory}/package.json').version")"
package_path="${script_directory}/local-packages/prettier-java-next-line-${package_version}.tgz"
project_path="${1:-$(pwd)}"

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
