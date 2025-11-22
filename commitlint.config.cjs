module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Make it more beginner-friendly
    'subject-case': [0], // Allow any case (Title Case, lowercase, etc.)
    'subject-empty': [2, 'never'], // Must have a message
    'type-empty': [2, 'never'], // Must have a type
    'type-enum': [
      2,
      'always',
      [
        'feat', // New feature
        'fix', // Bug fix
        'update', // Update existing feature
        'docs', // Documentation only
        'style', // Formatting, missing semicolons, etc.
        'refactor', // Code change that neither fixes a bug nor adds a feature
        'test', // Adding tests
        'chore', // Maintenance tasks
        'wip', // Work in progress
      ],
    ],
  },
  // Custom beginner-friendly messages
  prompt: {
    messages: {
      skip: ':skip',
      max: 'upper %d chars',
      min: '%d chars at least',
      emptyWarning: 'can not be empty',
      upperLimitWarning: 'over limit',
      lowerLimitWarning: 'below limit',
    },
  },
  // Custom formatter for friendly error messages
  formatter: '@commitlint/format',
  helpUrl: `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❌ OOPS! Your commit message needs a small fix!

Your commit message should follow this format:
  type: your message here

Examples of GOOD commits:
  ✅ feat: added login page
  ✅ fix: navbar not showing on mobile
  ✅ update: changed button colors
  ✅ wip: working on dashboard
  ✅ chore: cleaned up old code

Available types you can use:
  • feat     - new feature or functionality
  • fix      - bug fixes
  • update   - updating existing stuff
  • wip      - work in progress
  • chore    - cleanup, maintenance
  • docs     - documentation changes
  • style    - formatting only
  • test     - adding tests
  • refactor - restructuring code

Try again with the correct format! 💪
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`,
};
