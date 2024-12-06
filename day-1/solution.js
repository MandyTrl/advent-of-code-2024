import { readInputFile } from "../utils.js"
const inputData = readInputFile("input.txt")

const calculateTotalDistance = (input, similarityScore) => {
	const lines = input.trim().split("\n")
	const leftColumn = []
	const rightColumn = []
	let total = 0

	lines.forEach((line) => {
		const [left, right] = line.trim().split(/\s+/)
		leftColumn.push(parseInt(left, 10))
		rightColumn.push(parseInt(right, 10))
	})

	const sortedLeftList = leftColumn.sort((a, b) => a - b)
	const sortedRightList = rightColumn.sort((a, b) => a - b)

	if (!similarityScore) {
		for (let i = 0; i < sortedLeftList.length; i++) {
			total += Math.abs(sortedLeftList[i] - sortedRightList[i]) //Math.abs s'assure que la valeur reste positive
		}
	} else {
		for (let i = 0; i < sortedLeftList.length; i++) {
			const leftCurrent = sortedLeftList[i]

			const occurences = sortedRightList.filter(
				(rightNumber) => rightNumber === leftCurrent
			).length

			total += Math.abs(sortedLeftList[i] * occurences)
		}
	}

	const answerToLog = similarityScore
		? "La réponse à la - 2ème - solution est :"
		: "La réponse à la - 1ère - solution est :"

	console.log(answerToLog, total)
	return total
}

calculateTotalDistance(inputData)
calculateTotalDistance(inputData, true)
