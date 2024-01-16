import "./style.css";
import checkIcon from "./check.svg";
import plus from "./plus.svg";
import backArrow from "./arrow_back.svg";
import {
    displayProjects,
    projects,
    openModal,
    closeModal,
    Todo,
} from "./projects.js";

let content = document.querySelector(".content");

function displayProject(project) {
    content.innerHTML = "";

    let topBar = document.createElement("div");
    topBar.classList.add("topBar");

    let projectsButton = document.createElement("button");
    projectsButton.classList.add("backToProjectsBtn");
    let backIcon = document.createElement("img");
    backIcon.src = backArrow;
    projectsButton.appendChild(backIcon);
    projectsButton.addEventListener("click", () => {
        location.reload();
    });

    let projectTitle = document.createElement("h1");
    projectTitle.classList.add("singleProjectTitle");
    projectTitle.textContent = project.name;

    topBar.appendChild(projectsButton);
    topBar.appendChild(projectTitle);

    let addTodoBtn = document.createElement("button");
    addTodoBtn.classList.add("addTodoBtn");
    let plusIcon = document.createElement("img");
    plusIcon.src = plus;
    addTodoBtn.appendChild(plusIcon);
    let addTodoText = document.createElement("p");
    addTodoText.textContent = "Add todo";
    addTodoText.classList.add("addTodoText");
    addTodoBtn.appendChild(addTodoText);
    addTodoBtn.addEventListener("click", () => {
        let todo = new Todo(prompt("Enter todo title"));

        project.todos.push(todo);

        project.leftTodos++;

        let projectIndex = projects.findIndex((p) => p.name === project.name);

        // Update the project in the projects array
        if (projectIndex !== -1) {
            projects[projectIndex] = project;
        }

        // Save the updated projects array to local storage
        localStorage.setItem("projects", JSON.stringify(projects));

        displayTodos(project);
    });

    content.appendChild(topBar);

    content.appendChild(addTodoBtn);
}

function displayTodos(project) {
    console.log(project.todos);
}

export { displayProject };
