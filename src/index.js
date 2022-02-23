const express = require('express')

const { v4: uuid } = require('uuid')

const app = express()

app.use(express.json())

const repositories = []

//Retorna a lista com todos os repositorios cadastrados
app.get('/repositories', (request, response) => {
	return response.json(repositories)
})

//Cadastrando dados no array
app.post('/repositories', (request, response) => {
	const { title, url, techs } = request.body

	const repository = {
		id: uuid(),
		title,
		url,
		techs,
		likes: 0,
	}
	repositories.push(repository)

	return response.status(201).json(repository)
})

//atualizar
app.put('/repositories/:id', (request, response) => {
	const { id } = request.params
	const { title, url, techs } = request.body

	const updateRepository = repositories.find(
		(repository) => repository.id === id,
	)

	if (!updateRepository) {
		return response.status(404).json({ error: 'repository not found' })
	}

	updateRepository.title = title
	updateRepository.url = url
	updateRepository.techs = techs

	return response.status(200).json(updateRepository)
})

//deletar
app.delete('/repositories/:id', (request, response) => {
	const { id } = request.params

	repositoryIndex = repositories.findIndex(
		(repository) => repository.id === id,
	)

	if (repositoryIndex === -1) {
		return response.status(404).json({ error: 'Repository not found' })
	}

	repositories.splice(repositoryIndex, 1)

	return response.status(204).send()
})

app.post('/repositories/:id/like', (request, response) => {
	const { id } = request.params

	const repository = repositories.findIndex(
		(repository) => repository.id === id,
	)

	if (repository < 0) {
		return response.status(404).json({ error: 'Repository not found' })
	}

	repositories[repository].likes++

	return response.status(201).json(repositories[repository])
})

module.exports = app
