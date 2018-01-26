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
const coreTextSpellcheckerCommand = require('core-text-spellcheck-cli')({
	spellChecker: require('core-text-spellcheck')
})
coreTextSpellcheckerCommand.main()
```

### Required options

* `spellChecker` (generally a required module)&mdash;the underlying spell-checker library to use. It must...
   - support the [same options as core-text-spellcheck](https://github.com/matatk/core-text-spellcheck#options).
   - provide a `check()` function.

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
