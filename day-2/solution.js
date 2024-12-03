import { readInputFile } from "../utils.js"
const inputData = readInputFile("input.txt")

const test = (input) => {
	const regexLineBreak = /\r?\n/
	const regexNoSpace = /\s+/

	const lines = input.trim().split(regexLineBreak)
	const reports = lines.map(
		(line) => line.trim().split(regexNoSpace).map(Number) //convert string to number
	)

	const safeLevels = [1, 2, 3]
	let totalSafeReports = 0

	reports.forEach((report) => {
		let isSafeReport = true
		let isIncreasing = null

		for (let j = 0; j < report.length - 1; j++) {
			const current = report[j]
			const next = report[j + 1]
			const difference = Math.abs(current - next) //Math.abs s'assure que la valeur reste positive
			const currentDirection = next > current

			if (!safeLevels.includes(difference)) {
				isSafeReport = false
				break
			}

			if (isIncreasing === null) {
				isIncreasing = currentDirection
			} else if (currentDirection !== isIncreasing) {
				isSafeReport = false
				break
			}
		}

		if (isSafeReport) {
			totalSafeReports++
		}
	})

	console.log(totalSafeReports)
	return totalSafeReports
}

test(inputData)
