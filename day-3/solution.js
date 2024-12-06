import { readInputFile } from "../utils.js"
const inputData = readInputFile("input.txt")

const regexMul = /mul\((-?\d+),(-?\d+)\)/g
const regexNumber = /(\d+)/g
const regexExecuteMul = /mul\((\d+),(\d+)\)|do\(\)|don't\(\)/g
const doMul = "do()"
const dontMul = "don't()"

const calculMul = (input) => {
	const matchNum = input.matchAll(regexNumber)
	const matchDatas = Array.from(matchNum).map((number) => parseInt(number[0]))

	const firstNumber = matchDatas[0]
	const secondNumber = matchDatas[1]

	return { firstNumber, secondNumber }
}

const fixCorruptedCode = (input, executeMul) => {
	let total = 0
	let isExecuting = true

	const match = executeMul
		? input.matchAll(regexExecuteMul)
		: input.matchAll(regexMul)

	const instructions = Array.from(match).map((instruction) => instruction[0])

	instructions.forEach((instruction) => {
		if (executeMul) {
			if (instruction === dontMul && isExecuting) {
				isExecuting = false
			}

			if (instruction === doMul && !isExecuting) {
				isExecuting = true
			}

			if (isExecuting && instruction.startsWith("mul")) {
				const { firstNumber, secondNumber } = calculMul(instruction)
				total += firstNumber * secondNumber
			}
		} else {
			const { firstNumber, secondNumber } = calculMul(instruction)
			total += firstNumber * secondNumber
		}
	})

	const answerToLog = executeMul
		? "La réponse à la - 2ème - solution est :"
		: "La réponse à la - 1ère - solution est :"

	console.log(answerToLog, total)
	return total
}

fixCorruptedCode(inputData)
fixCorruptedCode(inputData, true)
