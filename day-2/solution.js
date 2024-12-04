import { readInputFile } from "../utils.js"
const inputData = readInputFile("input.txt")

const regexLineBreak = /\r?\n/
const regexNoSpace = /\s+/

const findGoodReports = (input, dampenerProblem) => {
	const lines = input.trim().split(regexLineBreak)
	const reports = lines.map((line) =>
		line.trim().split(regexNoSpace).map(Number)
	)

	const safeLevels = [1, 2, 3]
	let totalSafeReports = 0

	reports.forEach((report) => {
		if (isReportSafe(report)) {
			totalSafeReports++
			return
		}

		//si Problem Dampener, supprime un niveau
		if (dampenerProblem) {
			for (let i = 0; i < report.length; i++) {
				//crée une copie du rapport sans le current level
				const modifiedReport = [...report.slice(0, i), ...report.slice(i + 1)]

				if (isReportSafe(modifiedReport)) {
					totalSafeReports++
					break
				}
			}
		}
	})

	const answerToLog = dampenerProblem
		? "La réponse à la - 2ème - solution est :"
		: "La réponse à la - 1ère - solution est :"

	console.log(answerToLog, totalSafeReports)
	return totalSafeReports
}

//Fct pour vérifier si un rapport est sûr
const isReportSafe = (report) => {
	let isIncreasing = null

	for (let j = 0; j < report.length - 1; j++) {
		const current = report[j]
		const next = report[j + 1]
		const difference = Math.abs(next - current)
		const safeLevels = [1, 2, 3]

		if (!safeLevels.includes(difference)) {
			return false
		}

		const currentDirection = next > current
		if (isIncreasing === null) {
			isIncreasing = currentDirection
		} else if (currentDirection !== isIncreasing) {
			return false
		}
	}

	return true
}

findGoodReports(inputData, false)
findGoodReports(inputData, true)
