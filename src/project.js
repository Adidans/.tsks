import "./style.css";
import checkIcon from "./check.svg";
import { displayProjects, projects } from "./projects.js";

let content = document.querySelector(".content");

function displayProject(project) {
    content.innerHTML = "";

    let projectsButton = document.createElement("button");
    projectsButton.textContent = "Back to projects";
    projectsButton.addEventListener("click", () => {
        location.reload();
    });
    content.appendChild(projectsButton);

    let projectTitle = document.createElement("h1");
    projectTitle.textContent = project.name;
    content.appendChild(projectTitle);
}

export { displayProject };
