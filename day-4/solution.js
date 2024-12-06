import { readInputFile } from "../utils.js"
const inputData = readInputFile("input.txt")

//soluce ChatGPT

const directions = [
	[0, 1], //droite
	[0, -1], //gauche
	[1, 0], //bas
	[-1, 0], //haut
	[1, 1], //diagonale bas-droite
	[1, -1], //diagonale bas-gauche
	[-1, 1], //diagonale haut-droite
	[-1, -1], //diagonale haut-gauche
]

const findXMAS = (input) => {
	const word = "XMAS"
	const lines = input.trim().split(/\r?\n/)
	const grid = lines.map((line) => line.split("")) //tableau de tableaux (les lignes)

	let totalOccurrences = 0

	const rows = grid.length //lignes
	const cols = grid[0].length //colonnes

	//vérifie si le mot existe à partir d'une position donnée dans une direction
	const checkDirection = (x, y, directionX, directionY) => {
		for (let i = 0; i < word.length; i++) {
			const newX = x + i * directionX
			const newY = y + i * directionY

			//si les lettres ne correspondent pas
			if (
				newX < 0 ||
				newX >= rows ||
				newY < 0 ||
				newY >= cols ||
				grid[newX][newY] !== word[i]
			) {
				return false
			}
		}
		return true
	}

	//parcours chaque cellule de la grille (boucle imbriquée -> colonne à travers les lignes)
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			//grid[i][j] -> "i" correspond à la ligne et "j" à la colonne
			if (grid[i][j] === word[0]) {
				//alors on vérifie dans chaque direction
				for (const [directionX, directionY] of directions) {
					if (checkDirection(i, j, directionX, directionY)) {
						totalOccurrences++
					}
				}
			}
		}
	}

	console.log(totalOccurrences)
	return totalOccurrences
}

findXMAS(inputData)
