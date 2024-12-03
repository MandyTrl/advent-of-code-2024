import { readInputFile } from "../utils.js"
const inputData = readInputFile("input.txt")

const calculateTotalDistance = (input) => {
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

	for (let i = 0; i < sortedLeftList.length; i++) {
		total += Math.abs(sortedLeftList[i] - sortedRightList[i]) //Math.abs s'assure que la valeur reste positive
	}

	console.log(total)
	return total
}

calculateTotalDistance(inputData)
