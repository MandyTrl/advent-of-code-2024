import path from "path"
import { readFileSync } from "fs"
import { fileURLToPath } from "url"

const day = process.argv[2]
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const inputPath = path.join(__dirname, `day-${day}`, "input.txt")

export const readInputFile = (filename) => {
	try {
		const data = readFileSync(inputPath, "utf-8") //lis le fichier en UTF-8
		return data
	} catch (error) {
		console.error(`Erreur lors de la lecture du fichier ${filename}:`, error)
		return null
	}
}
