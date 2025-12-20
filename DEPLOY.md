# GitHub Deployment Instructions

## Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right, then "New repository"
3. Name it (e.g., `scylc-fellowship-website` or `scylc-nextjs`)
4. **Do NOT** initialize with README, .gitignore, or license (we already have these)
5. Click "Create repository"

## Step 2: Add Remote and Push

After creating the repository, GitHub will show you commands. Use these:

```bash
# Add the remote (replace YOUR_USERNAME and REPO_NAME with your actual values)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Or if using SSH:
# git remote add origin git@github.com:YOUR_USERNAME/REPO_NAME.git

# Rename branch to main if needed (should already be main)
git branch -M main

# Push to GitHub
git push -u origin main
```

## Step 3: Verify

Check your repository on GitHub - all files should be there!

## Optional: Set up GitHub Actions for CI/CD

The project is ready for deployment to Vercel, Netlify, or other platforms.

