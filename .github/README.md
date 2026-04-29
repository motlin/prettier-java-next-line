# 🔧 GitHub Configuration

This directory contains GitHub-specific configuration for the Maculate Java project.

## 📁 Structure

```
.github/
├── workflows/              # GitHub Actions workflows
│   ├── comprehensive-ci.yml # Comprehensive CI (multi-OS, coverage)
│   ├── release.yml        # Production release workflow
│   ├── prerelease.yml     # Automatic pre-releases
│   └── pr-validation.yml  # Pull request validation
├── dependabot.yml         # Automated dependency updates
└── labeler.yml            # Auto-labeling configuration
```

## 🚀 Workflows

### Comprehensive CI (comprehensive-ci.yml)
- Runs on every push to main and on pull requests
- Tests on multiple OS (Ubuntu, macOS, Windows) and Node versions (18, 20, 22)
- Runs linting, formatting checks, and tests
- Generates coverage reports

### Release (release.yml)
- Manual trigger via GitHub Actions UI
- Supports patch, minor, major, and pre-release versions
- Automatically publishes to npm
- Creates GitHub releases with release notes

### Pre-release (prerelease.yml)
- Automatically triggered on pushes to develop/next/beta/alpha branches
- Creates and publishes pre-release versions to npm
- Uses branch-specific dist-tags (dev, next, beta, alpha)

### PR Validation (pr-validation.yml)
- Validates PR title follows conventional commits format
- Auto-labels PRs based on changed files

## 🔑 Required Secrets

Configure these in Settings → Secrets → Actions:

- `NPM_TOKEN`: npm authentication token for publishing packages
- `CODECOV_TOKEN`: (Optional) For uploading coverage reports

## 🏷️ Labels

The labeler automatically adds labels based on:
- **File paths**: maculate-java, website, documentation, tests, ci, dependencies
- **Branch names**: feature, bugfix, breaking-change

## 📦 Dependabot

Configured to:
- Check for updates weekly (Mondays)
- Group related dependencies (prettier, testing, linting, types)
- Use semantic commit prefixes (⬆️ deps, ⬆️ deps-dev)
- Auto-label PRs with "dependencies"