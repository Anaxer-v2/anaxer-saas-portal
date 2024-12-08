# GitHub Workflow Documentation

## Repository Structure

Our repository is organized with a two-branch strategy:

- `main` - Production branch, deployed to live environment
- `staging` - Staging branch for pre-production testing and active development

## Branch Naming Convention

When creating a new branch, use the following format:
```
<type>/<ticket-number>-<brief-description>
```

Types:
- `feature/` - New features
- `fix/` - Bug fixes
- `hotfix/` - Urgent production fixes
- `refactor/` - Code refactoring
- `docs/` - Documentation updates
- `test/` - Test-related changes

Example: `feature/AX-123-add-document-verification`

## Commit Message Convention

Format:
```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

Types:
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Formatting changes
- `refactor:` - Code refactoring
- `test:` - Adding/modifying tests
- `chore:` - Maintenance tasks

Example:
```
feat(verification): add AI document processing

- Implemented TipTap editor for verification rules
- Added schema validation for documents
- Integrated with Supabase storage

Resolves: AX-123
```

## Pull Request Process

1. Create PR from your feature branch to `staging`
2. Fill out the PR template
3. Request reviews from relevant team members
4. Ensure CI checks pass
5. Address review comments
6. Merge after approval

## Environment Variables

When adding new environment variables:
1. Add to `.env` with example values
2. Update AWS Amplify environment variables for each environment
3. Update documentation in main README.md

## Deployment Flow

1. Feature Branch → Staging
   - Create feature branches from `staging`
   - Develop and test locally
   - Create PR to `staging`
   - Automatic deployment to staging environment
   - Uses `staging` schema in Supabase

2. Staging → Main
   - Manual promotion after QA
   - Uses `prod` schema in Supabase
   - Deployed to production environment in AWS Amplify

## Protected Branches

- `main` - Requires PR and 1 approval
- `staging` - Requires PR and 1 approval

## CI/CD Integration

Our repository is integrated with:
- AWS Amplify for hosting and deployment
- Supabase for database and authentication
- GitHub Actions for CI/CD

### Branch to Environment Mapping

| Branch      | Environment | Supabase Schema | URL Pattern              |
|------------|-------------|-----------------|-------------------------|
| main       | Production  | prod            | app.anaxer.com         |
| staging    | Staging     | staging         | staging.anaxer.com     |

## Security

- Never commit sensitive data or credentials
- Use `.env.local` for local development
- Store production secrets in AWS Amplify environment variables
- Regular security audits via GitHub Security tab

## Common Tasks

### Adding a New Feature
1. Create branch from `staging`
2. Develop and test locally
3. Push and create PR to `staging`
4. Get review and approval
5. Merge to `staging`
6. Test in staging environment
7. Create PR from `staging` to `main` when ready for production

### Handling Hotfixes
1. Create `hotfix` branch from `main`
2. Fix and test
3. Create PR to both `main` and `staging`
4. Get emergency review
5. Merge to both branches

### Updating Documentation
1. Create `docs` branch from `staging`
2. Update relevant files
3. Create PR to `staging`
4. Merge after review