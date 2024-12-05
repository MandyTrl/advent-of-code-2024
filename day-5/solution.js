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
		for (let i = 0; i < rule.length; i++) {
			const current = rule[i]

			if (!pagesOrder.includes(current)) {
				pagesOrder.push(current)
			}
		}
	})

	//ré-organise les pages dans le bon ordre
	input.forEach((rule) => {
		for (let i = 0; i < 1; i++) {
			const current = rule[i]
			const next = rule[i + 1]

			const currentPage = pagesOrder.findIndex((el) => el === current)
			const nextPage = pagesOrder.findIndex((el) => el === next)

			if (currentPage > nextPage) {
				const fromIndex = currentPage
				const toIndex = nextPage - 1

				const [element] = pagesOrder.splice(fromIndex, 1) //delete la page, [element] = valeur supprimée
				pagesOrder.splice(toIndex, 0, element) //replace la page
			}
		}
	})

	return pagesOrder
}

const test = (input) => {
	const { rules, manuals } = formatInput(input)
	const pagesOrder = findOrderPages(rules)

	console.log(pagesOrder)
}

test(inputData)
