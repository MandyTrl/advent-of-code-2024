const daysContainer = document.getElementById("days-container")

fetch("/api/days")
	.then((response) => {
		if (!response.ok) {
			throw new Error(`HTTP error status: ${response.status}`)
		}
		return response.json()
	})
	.then((days) => {
		//insère les jours dans le container
		days.forEach((day) => {
			const dayElement = document.createElement("p")
			dayElement.textContent = `{ ${day} }`
			daysContainer.appendChild(dayElement)
		})
	})
	.catch((error) => {
		console.error("Erreur lors du chargement des jours:", error)
	})
