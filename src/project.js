import './style.css'
import checkIcon from './check.svg'
import {displayProjects, projects} from './projects.js'

let content = document.querySelector('.content')

function displayProject(project) {
    content.innerHTML = ''
    let projectTitle = document.createElement('h1')
    console.log(project);
    projectTitle.textContent = project.name
    content.appendChild(projectTitle)
}

export {displayProject}