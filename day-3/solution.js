import { readInputFile } from "../utils.js"
const inputData = readInputFile("input.txt")

const regexMul = /mul\((-?\d+),(-?\d+)\)/g
const regexNumber = /(\d+)/g
// const regexFirstMul = /mul\((-?\d+),(-?\d+)\)/
// const regexDoMulAfterDo = /do\(\)[^]*?mul\((-?\d+),(-?\d+)\)/g
// const regexExecuteMul = /do\(\)/g
// const regexDontExecuteMul = /don't\(\)/g

const fixCorruptedCode = (input, regex) => {
	let total = 0

	const match = input.matchAll(regex)
	const instructions = Array.from(match).map((instruction) => instruction[0])

	instructions.forEach((instruction) => {
		const matchNum = instruction.matchAll(regexNumber)
		const matchDatas = Array.from(matchNum).map((number) => parseInt(number[0]))

		total += matchDatas[0] * matchDatas[1]
	})

	console.log(total)
	return total
}

// const executeMul = (input) => {
// 	const matchDoMul = input.matchAll(regexDoMulAfterDo)
// 	const goodInstructions = Array.from(matchDoMul).map(
// 		(instruction) => instruction[0]
// 	)

// 	const matchFirstMul = input.match(regexFirstMul)
// 	const firstMul = Array.from(matchFirstMul).map((mul) => mul[0])

// 	let total = parseInt(firstMul[1]) * parseInt(firstMul[2])

// 	goodInstructions.forEach((instruction) => {
// 		const doMul = instruction.matchAll(regexMul)
// 		const muls = Array.from(doMul).map((mul) => mul[0])

// 		muls.forEach((instruction) => {
// 			const matchNum = instruction.matchAll(regexNumber)
// 			const matchDatas = Array.from(matchNum).map((number) =>
// 				parseInt(number[0])
// 			)

// 			// console.log(matchDatas)

// 			const firstNumber = matchDatas[0]
// 			const secondNumber = matchDatas[1]
// 			total += firstNumber * secondNumber
// 		})
// 	})

// 	console.log(total)
// 	return total
// }

fixCorruptedCode(inputData, regexMul)
// executeMul(inputData)
