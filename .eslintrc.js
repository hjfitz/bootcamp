module.exports = {
  "extends": "airbnb",
  "rules": {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "jsx-a11y/anchor-has-content": 0,
    "react/no-unescaped-entities": 0,
    "react/no-array-index-key": 0,
    "react/forbid-prop-types": 0,
    "react/no-find-dom-node": 0,
    "react/prop-types": 0,
    "react/no-danger": 0,
    "import/extensions": 0,
    "no-unused-expressions": ["error", { "allowShortCircuit": true, "allowTernary": true }],
    "arrow-body-style": ["error", "as-needed"],
    "arrow-parens": ["error", "as-needed"],
    "object-curly-newline": 0,
    "no-return-assign": 0,
    "no-console": 0
  },
  "env": {
   "browser": true,
   "node": true
  }
}