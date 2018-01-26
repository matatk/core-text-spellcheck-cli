core-text-spellcheck-cli
========================

This is a simple command-line tool for spell-checking text files (based on [core-text-spellcheck](https://github.com/matatk/core-text-spellcheck)).

Install with: `npm install --global core-text-spellcheck-cli`

Run `core-text-spellcheck` for help.

Use as a library
----------------

This can also be used as a library for making command-line spell-checkers.

```javascript
#!/usr/bin/env node
'use strict'
require('core-text-spellcheck-cli')({
	spellCheckerInit: (options) => require('core-text-spellcheck')(options),
	spellCheckerCall: (spellChecker, content) => spellChecker(content)
})()
```

### Required options

* `spellCheckerInit(options)`&mdash;function taking a single parameter, an "options" object. This object should be passed to the spell-checking wrapper you are using, which must support the [same options as core-text-spellcheck](https://github.com/matatk/core-text-spellcheck#options). **Returns:** your chosen spell-checker, initialised.
* `spellCheckerCall(spellChecker, content)`&mdash;function that takes the initialised `spellChecker` and the content to be checked, and calls the spell-checker with the content to be checked. This is useful when your spell-checker might not just be a simple function, but an object with a method that is used to perform the spell-check.

### Optional

* `usageMessage` (string)&mdash;extra usage info to include in the help output.
* `preProcessor` (function taking one argument)&mdash;function to run on the file's content before it is spell-checked.

Development
-----------

### Set-up

* Check out the code.
* `npm install`

### Useful scripts

* `npm test`&mdash;lints the code (which also happens on pre-commit).
