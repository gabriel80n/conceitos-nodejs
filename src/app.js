const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {

  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body

  const project = { 
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  }

  repositories.push(project)
  return response.json(project)

});

app.put("/repositories/:id", (request, response) => {
  
  const { id } = request.params
  const { title, url, techs} = request.body

  const repositoriesIndex = repositories.findIndex(repositorie => repositorie.id === id)

  if ( repositoriesIndex < 0){
    return response.status(400).json({error: "Repositorie not found!"})
  }
  repositories[repositoriesIndex] = {
    id,
    title,
    url,
    techs,
    likes: repositories[repositoriesIndex].likes,
  }
  return response.json(repositories[repositoriesIndex])

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id)

  if (repositorieIndex < 0){
    return response.status(400).json({error: "Repositorie not found"})
  }

  repositories.splice(repositorieIndex, 1)

  return response.status(204).send()

});

app.post("/repositories/:id/like", (request, response) => {
  
  const { id } = request.params

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id)

  if (repositorieIndex < 0){
    return response.status(400).json({error: "Repositorie not found"})
  }

  repositories[repositorieIndex].likes++
  return response.json(repositories[repositorieIndex])
});

module.exports = app;
