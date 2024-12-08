import { readInputFile } from "../utils.js"
const inputData = readInputFile("input.txt")

const test = (input) => {
	const equations = input
		.trim()
		.split(/\r?\n/)
		.map((line) => {
			const [total, ...numbers] = line.split(/:\s*|\s+/)
			return {
				total: parseInt(total, 10),
				numbers: numbers.map(Number),
			}
		})

	let count = 0

	equations.array.forEach((equation) => {
		const numbers = equation.numbers
	})
	console.log(equations)
}

test(inputData)
