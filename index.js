'use strict'
const fs = require('fs')

module.exports = (options) => {
	// TODO test for options being specified
	// TODO test for filter function being specified

	const yargs = require('yargs')
		.usage('$0 [options]')
		.options({
			f: {
				type: 'array',
				alias: 'files',
				describe: 'File(s) to check',
			},
			l: {
				alias: 'list-files',
				describe: 'List files as they are checked',
				type: 'boolean'
			},
			d: {
				alias: 'debug',
				describe: 'Show debugging info',
				type: 'boolean'
			},
			v: {
				type: 'array',
				alias: 'valid-words',
				describe: 'Words to add to dictionary'
			},
			V: {
				alias: 'valid-words-file',
				describe: 'File containing words to add to dictionary'
			},
			w: {
				type: 'array',
				alias: 'warn-words',
				describe: 'Words to warn about (not treat as errors)'
			},
			W: {
				alias: 'warn-words-file',
				describe: 'File containing words to warn about'
			}
		})
		.help()
		.alias('h', 'help')
		.demandOption('files', 'Please specify file(s) to check')

	if (options.usageMessage) {
		yargs.usage('\n' + options.usageMessage)
	}

	const argv = yargs.argv

	function joinPossibleArrays() {
		const out = []
		for (const thing of arguments) {
			if (Array.isArray(thing)) {
				for (const word of thing) {
					out.push(word)
				}
			}
		}
		return out
	}

	function findErrorsInFile(spellChecker, fileName) {
		if (argv.listFiles) {
			console.log(`Checking file: "${fileName}"...`)
		}

		// TODO test preProcessor is specified correctly if at all
		const content = fs.readFileSync(fileName).toString()
		if (options.preProcessor) {
			spellChecker(options.preProcessor(content))
		} else {
			spellChecker(content)
		}
	}

	function fileToArray(fileName) {
		if (fileName) {
			return fs.readFileSync(fileName).toString().trim().split('\n')
		}
		return []
	}

	function main() {
		let foundErrors = 0
		let foundWarnings = 0
		let currentFile

		const spellchecker = options.spellChecker({
			log: argv.debug ? console.log : null,
			errors: (errors) => {
				console.log(`Error: ${currentFile}: ${errors.join(', ')}`)
				foundErrors++
			},
			warnings: (warnings) => {
				console.log(`Warning: ${currentFile}: ${warnings.join(', ')}`)
				foundWarnings++
			},
			warnWords: joinPossibleArrays(
				argv.warnWords,
				fileToArray(argv.warnWordsFile)),
			validWords: joinPossibleArrays(
				argv.validWords,
				fileToArray(argv.validWordsFile))
		})

		for (const fileToCheck of argv.files) {
			currentFile = fileToCheck
			findErrorsInFile(spellchecker, fileToCheck)
		}

		if (foundErrors > 0 || foundWarnings > 0) {
			console.log()
		}

		console.log(`Check complete; there were ${foundErrors} errors and ${foundWarnings} warnings.`)
		process.exit(foundErrors)
	}

	return main
}
