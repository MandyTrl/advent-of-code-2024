import { readInputFile } from "../utils.js"
const inputData = readInputFile("input.txt")

const formatInput = (input) => {
	const regexDoubleBreakLines = /\r?\n\r?\n/
	const regexBreakLines = /\r?\n/
	const regexRules = /(\d+)\|(\d+)/g

	const [rulesForPrint, relevantPagesNumber] = input.split(
		regexDoubleBreakLines
	)

	const rules = [...rulesForPrint.matchAll(regexRules)].map((match) => [
		parseInt(match[1]),
		parseInt(match[2]),
	])

	const manuals = relevantPagesNumber
		.trim()
		.split(regexBreakLines)
		.map((line) => line.split(",").map(Number))

	return { manuals, rules }
}

const findOrderPages = (input) => {
	let pagesOrder = []

	//crée un tableau de pages uniques
	input.forEach((rule) => {
		rule.forEach((page) => {
			if (!pagesOrder.includes(page)) {
				pagesOrder.push(page)
			}
		})
	})

	//ré-organise les pages dans le bon ordre
	let updated = true

	while (updated) {
		updated = false
		input.forEach((rule) => {
			const current = rule[0]
			const next = rule[1]
			const currentPageIndex = pagesOrder.indexOf(current)
			const nextPageIndex = pagesOrder.indexOf(next)

			if (currentPageIndex > nextPageIndex) {
				pagesOrder.splice(currentPageIndex, 1)
				pagesOrder.splice(nextPageIndex, 0, current)
				updated = true
			}
		})
	}

	return pagesOrder
}

const test = (input) => {
	const { rules, manuals } = formatInput(input)
	console.log(rules.length, manuals.length)

	const pagesOrder = findOrderPages(rules)
	let manualsToUpdate = []
	let middlePageSum = 0

	manuals.forEach((manual) => {
		let orderIsOk = true

		for (let i = 0; i < manual.length - 1; i++) {
			const current = manual[i]
			const next = manual[i + 1]

			let currentPage = pagesOrder.indexOf(current)
			let nextPage = pagesOrder.indexOf(next)

			if (currentPage > nextPage) {
				orderIsOk = false
				break
			}
		}

		if (orderIsOk) {
			manualsToUpdate.push(manual)
			const middlePageIndex = Math.floor(manual.length / 2)
			middlePageSum += manual[middlePageIndex]
		}
	})

	console.log("Somme des pages du milieu :", middlePageSum)
	return middlePageSum
}

test(inputData)
