module.exports = {
  branches: ['+([0-9])?(.{+([0-9]),x}).x', 'master'],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    '@semantic-release/npm',
    ['@semantic-release/github', {
      successComment: false,
      failComment: false
    }],
    ["@semantic-release/git", {
      "assets": ["CHANGELOG.md"]
    }]
  ]
};
