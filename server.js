//logique serveur -le client ne peut pas utiliser les modules node.js pour des raisons de sécurité-
import express from "express"
import fs from "fs"
import path from "path"
import cors from "cors"
import { fileURLToPath } from "url"

const app = express()
const port = 3000

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(cors())
app.use(express.static(path.join(__dirname, "public"))) //sert les fichiers statiques comme HTML, CSS, JS

app.listen(port, () => {
	console.log(`| Server running at | http://localhost:${port} |`)
})

app.get("/api/days", (req, res) => {
	const dirPath = path.join(__dirname) // Chemin vers le dossier racine
	const entries = fs.readdirSync(dirPath, { withFileTypes: true })
	const regexNumberDay = /^day-(\d+)$/

	const dayFolders = entries
		.filter((entry) => entry.isDirectory() && regexNumberDay.test(entry.name))
		.map((entry) => {
			const match = entry.name.match(regexNumberDay)
			return `Day ${parseInt(match[1], 10)}`
		})

	res.json(dayFolders)
})
