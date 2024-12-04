import { readInputFile } from "../utils.js"
const inputData = readInputFile("input.txt")

const test = (input) => {
	const regexXMAS = /(XMAS|SAMX)/g
	const lines = input.trim().split(/\r?\n/)
	let totalOccurrences = 0

	lines.forEach((line) => {
		const matches = line.match(regexXMAS)
		if (matches) {
			console.log(matches)
			totalOccurrences += matches.length
		}
	})

	console.log(totalOccurrences)
}

test(inputData)
