import fs from "fs" //bibliothèque de node.js pour écrire, lire, supprimer des fichiers
import path from "path" //module qui sert à manipuler correctement les chemins des fichiers indépendamment du système d'exploitation utilisé
import { fileURLToPath } from "url" //en ES Modules, converti une URL de fichier en un chemin de fichier utilisable pas node.js

//récupère l'argument passé dans la ligne de commande, ici le jour de l'"Advent of code"
const day = process.argv[2]
//méthode pour utiliser __dirname sous ES Modules et avoir le chemin absolu du fichier actuel
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
//chemin de la solution du jour spécifié

const solutionPath = path.join(__dirname, `day-${day}`, "solution.js")

if (!day) {
	console.error(
		"Veuillez spécifier le jour à exécuter, par exemple : npm run start 1"
	)
	process.exit(1)
}

//vérifie si le fichier existe
fs.access(solutionPath, fs.constants.F_OK, (err) => {
	if (err) {
		console.error(`Le fichier solution.js pour le jour ${day} n'existe pas.`)
		process.exit(1)
	}

	//si le fichier existe, l'exécuter
	import(solutionPath)
		.then(() => {
			console.log(`La solution du jour ${day} a été exécutée avec succès.`)
		})
		.catch((error) => {
			console.error(
				`👾 Erreur lors de l'exécution de la solution du | jour ${day} | `,
				error
			)
		})
})
