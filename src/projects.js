import Chart from "chart.js/auto";
import "./style.css";
import checkIcon from "./check.svg";
import { displayProject } from "./project";
import { add, format, formatDistance, subDays } from "date-fns";

let content = document.getElementById(".content");

let projectsDiv = document.querySelector(".projects");

let addProjectInput = document.getElementById("addProjectInput");

let modal = document.querySelector(".modal");
let overlay = document.querySelector(".overlay");

let projects = JSON.parse(localStorage.getItem("projects")) || [];

function Todo(name, dueDate, priority, done) {
    this.name = name;
    this.dueDate = dueDate;
    this.priority = priority;
    this.done = done;
}

function Project(name, doneTodos, leftTodos) {
    this.name = name;
    this.doneTodos = doneTodos;
    this.leftTodos = leftTodos;
    this.todos = [];
}

let form = document.getElementById("addProjectForm");
if (form) {
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Get the input value
        let projectName = addProjectInput.value;

        // Validate the input
        if (!projectName) {
            alert("Project name is required.");
            return;
        }

        // Create a new project
        let newProject = new Project(projectName, 0, 0); // Assuming new projects have 0 tasks

        // Add the new project
        addProject(newProject); // Assuming addProject returns the updated projects array

        localStorage.setItem("projects", JSON.stringify(projects));

        // Display the projects
        displayProjects(projects);

        // Clear the input field
        addProjectInput.value = "";

        closeModal();
    });
}

function addProject(project) {
    projects.push(project);
}

function deleteProject(projectName) {
    // Get the projects from local storage
    projects = JSON.parse(localStorage.getItem("projects")) || [];

    // Find the index of the project to delete
    let index = projects.findIndex((project) => project.name === projectName);

    // If the project was found, remove it from the array
    if (index !== -1) {
        projects.splice(index, 1);
    }

    // Save the updated projects back to local storage
    localStorage.setItem("projects", JSON.stringify(projects));
    return projects;
}

function openModal() {
    let modal = document.querySelector(".modal");
    let overlay = document.querySelector(".overlay");
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
}

function closeModal() {
    let modal = document.querySelector(".modal");
    let overlay = document.querySelector(".overlay");
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
}

function displayProjects(projects) {
    projectsDiv.innerHTML = "";
    for (let i = 0; i < projects.length; i++) {
        let project = document.createElement("div");
        project.classList.add("project");
        project.addEventListener("click", () => {
            displayProject(projects[i]);
        });

        let top = document.createElement("div");
        top.classList.add("top");

        let icon = document.createElement("div");
        icon.classList.add("icon");
        top.appendChild(icon);

        let deleteProjectBtn = document.createElement("button");
        deleteProjectBtn.classList.add("deleteProjectBtn");
        deleteProjectBtn.textContent = "+";
        deleteProjectBtn.addEventListener("click", (event) => {
            event.stopPropagation();

            projects = deleteProject(projects[i].name);

            displayProjects(projects);
        });
        top.appendChild(deleteProjectBtn);

        project.appendChild(top);

        let title = document.createElement("h2");
        title.classList.add("projectTitle");
        title.textContent = `${projects[i].name}`;
        project.appendChild(title);

        let bottom = document.createElement("div");
        bottom.classList.add("bottom");

        let todoCount = document.createElement("p");
        todoCount.classList.add("todoCount");
        if (projects[i].leftTodos == 0 && projects[i].doneTodos != 0) {
            todoCount.textContent = `All ${projects[i].doneTodos} done!`;
        } else if (projects[i].leftTodos == 0 && projects[i].doneTodos == 0) {
            todoCount.textContent = `No todos yet`;
        } else {
            todoCount.textContent = `${projects[i].doneTodos}/${
                projects[i].leftTodos + projects[i].doneTodos
            } done`;
        }

        bottom.appendChild(todoCount);

        let chartDiv = document.createElement("div");
        chartDiv.classList.add("chartDiv");

        let myChart = document.createElement("canvas");
        myChart.id = "myChart";
        chartDiv.appendChild(myChart);

        bottom.appendChild(chartDiv);

        if (projects[i].leftTodos == 0 && projects[i].doneTodos != 0) {
            bottom.removeChild(chartDiv);
            let completeIcon = document.createElement("div");
            completeIcon.classList.add("completeIcon");
            let check = document.createElement("img");
            check.classList.add("completeIconImg");
            check.src = checkIcon;
            completeIcon.appendChild(check);
            bottom.appendChild(completeIcon);
        } else if (projects[i].leftTodos == 0 && projects[i].doneTodos == 0) {
            bottom.removeChild(chartDiv);
        } else if (projects[i].leftTodos != 0 && projects[i].doneTodos == 0) {
            bottom.removeChild(chartDiv);
        } else {
            new Chart(myChart, {
                type: "doughnut",
                data: {
                    datasets: [
                        {
                            rotation: 90,
                            data: [
                                projects[i].doneTodos,
                                projects[i].leftTodos,
                            ],
                            backgroundColor: [`#ff5c77`, "#3b404a"],
                            borderWidth: 0,
                        },
                    ],
                },
                options: {
                    cutout: 13,
                    events: [],
                },
            });
        }

        project.appendChild(bottom);

        projectsDiv.appendChild(project);
    }

    let addProjectBtn = document.createElement("button");
    addProjectBtn.classList.add("addProjectBtn");
    addProjectBtn.textContent = "+";
    addProjectBtn.addEventListener("click", () => {
        openModal();
        addProjectInput.value = "";
    });
    overlay.addEventListener("click", closeModal);
    projectsDiv.appendChild(addProjectBtn);
}

export { displayProjects, addProject, projects, openModal, closeModal, Todo };
