module.exports = {
  extends: "stylelint-config-standard",
  ignoreFiles: ['node_modules/**/*.less', '**/*.md', '**/*.ts', '**/*.tsx', '**/*.js'],
  rules: {
    "string-quotes": "single",
    "color-hex-length": null,
    "no-descending-specificity": null,
    "rule-empty-line-before": [ "always", {
      "except": ["first-nested"],
      "ignore": ["after-comment"]
    } ],
    "selector-pseudo-class-no-unknown": [
      true,
      {
        "ignorePseudoClasses": [
          "global",
          "local"
        ]
      }
    ]
  }
}