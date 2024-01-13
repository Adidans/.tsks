import Chart from "chart.js/auto";
import "./style.css";
import checkIcon from "./check.svg";
import { displayProject } from "./project";
import { add, format, formatDistance, subDays } from "date-fns";

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

        // Display the projects
        displayProjects(projects);

        // Clear the input field
        addProjectInput.value = "";
    });
}

let content = document.getElementById(".content");

let projectsDiv = document.querySelector(".projects");

let addProjectInput = document.getElementById("addProjectInput");

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

let projects = [];

let school = new Project("School", 4, 4);
addProject(school);
let personal = new Project("Personal", 3, 2);
addProject(personal);
let design = new Project("Design", 15, 0);
addProject(design);
let groceries = new Project("Groceries", 0, 0);
addProject(groceries);

function Project(name, doneTodos, leftTodos) {
    this.name = name;
    this.doneTodos = doneTodos;
    this.leftTodos = leftTodos;
}

function addProject(project) {
    projects.push(project);
}

function openModal() {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
}

function closeModal() {
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

        let icon = document.createElement("div");
        icon.classList.add("icon");
        project.appendChild(icon);

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

export { displayProjects, addProject, projects };
