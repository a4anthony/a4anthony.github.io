#!/bin/bash

# Exit on error
set -e

# Build the Vue.js app
npm run build

#copy CNAME to dist folder
cp CNAME dist/

# Move to the build directory
cd dist

# Initialize a new Git repository in the 'dist' directory
git init

# Configure Git to push the 'dist' directory to the 'gh-pages' branch
git config user.name "a4anthony"
git config user.email "anthonygakro@gmail.com"
git add -A
git commit -m "Deploy to GitHub Pages"

# Push the 'dist' directory to the 'gh-pages' branch
# Replace 'your-username' and 'your-repo' with your GitHub username and repository name
git push -f https://github.com/a4anthony/a4anthony.github.io.git main:gh-pages

# Clean up - remove the temporary Git repository in the 'dist' directory
cd ..
rm -rf dist/.git

echo "Deployment to GitHub Pages complete."
