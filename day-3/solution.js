import { readInputFile } from "../utils.js"
const inputData = readInputFile("input.txt")

const fixCorruptedCode = (input) => {
	const regexMul = /mul\((-?\d+),(-?\d+)\)/g
	const regexNumber = /(\d+)/g
	const match = input.matchAll(regexMul)
	let total = 0

	const goodInstructions = Array.from(match).map(
		(instruction) => instruction[0]
	)

	goodInstructions.forEach((instruction) => {
		let match = instruction.matchAll(regexNumber)
		const matchDatas = Array.from(match).map((number) => parseInt(number[0]))

		total += matchDatas[0] * matchDatas[1]
	})

	console.log(total)
	return total
}

fixCorruptedCode(inputData)
