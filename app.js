const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
 
  return response.json(repositories);
 
 
 
  
});

app.post("/repositories", (request, response) => {
  const {title, url, techs, likes} = request.body;

  const project = {id: uuid(), title, url, techs, likes};

  repositories.push(project);

  return response.json(project);
});

app.put("/repositories/:id", (request, response) => {
 const{id} = request.params;
 const {title, url, techs, likes} = request.body;
 
 const projectIndex = repositories.findIndex(project => project.id === id);

 if(projectIndex <0){
  return response.status(400).json({error: 'Project not found.'})
}

const project = {
  id,
  title,
  url,
  techs,
  likes
};

repositories[projectIndex] = project;

return response.json(project);

});

app.delete("/repositories/:id", (request, response) => {
  const{id} = request.params;

  const projectIndex = repositories.findIndex(project => project.id === id);

  if(projectIndex <0){
    return response.status(400).json({error: 'Project not found.'});

  }
    repositories.splice(projectIndex,1);
    
    return response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  const{id} = request.params;


  const projectIndex = repositories.findIndex(project => project.id === id);

  const project = repositories.find(project => project.id === id);

  if(projectIndex <0){
    return response.status(400).json({error: 'Project not found.'});
  }

  
  var aux = project.likes;
  var x = Number(aux);
 
  project.likes = x+1;
  
  repositories[projectIndex] = project;

  return response.json(repositories);

});

module.exports = app;
