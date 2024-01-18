import "./style.css";
import checkIconPath from "./check.svg";
import deleteIcon from "./delete.svg";
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
    let plusIconDiv = document.createElement("div");
    plusIconDiv.classList.add("plusIconDiv");
    let plusIcon = document.createElement("img");
    plusIcon.src = plus;
    plusIconDiv.appendChild(plusIcon);
    addTodoBtn.appendChild(plusIconDiv);
    let addTodoText = document.createElement("p");
    addTodoText.textContent = "Add todo";
    addTodoText.classList.add("addTodoText");
    addTodoBtn.appendChild(addTodoText);
    addTodoBtn.addEventListener("click", () => {
        openModal();
        textInput.value = "";
    });

    content.appendChild(topBar);

    content.appendChild(addTodoBtn);

    displayTodos(project);

    let modal = document.createElement("section");
    modal.classList.add("modal");
    modal.classList.add("hidden");

    let modalForm = document.createElement("form");
    modalForm.id = "todoForm";

    let textInput = document.createElement("input");
    textInput.type = "text";
    textInput.id = "todoName";
    textInput.required = true;

    let submitBtn = document.createElement("input");
    submitBtn.type = "submit";
    submitBtn.value = "Add Todo";
    submitBtn.classList.add("btn-grad");

    modalForm.appendChild(textInput);
    modalForm.appendChild(submitBtn);
    modal.appendChild(modalForm);

    content.appendChild(modal);

    let overlay = document.createElement("div");
    overlay.classList.add("overlay");
    overlay.classList.add("hidden");
    overlay.addEventListener("click", () => closeModal());

    content.appendChild(overlay);

    let form = document.getElementById("todoForm");
    if (form) {
        form.addEventListener("submit", function (event) {
            closeModal();
            event.preventDefault();

            let todo = new Todo(textInput.value);

            // Get the projects array from local storage
            let projects = JSON.parse(localStorage.getItem("projects")) || [];

            // Find the index of the project in the projects array
            let projectIndex = projects.findIndex(
                (p) => p.name === project.name
            );

            // If the project is found in the projects array
            if (projectIndex !== -1) {
                // Update the todos array of the project
                projects[projectIndex].todos.push(todo);

                // Save the updated projects array back to localStorage
                localStorage.setItem("projects", JSON.stringify(projects));

                displayTodos(projects[projectIndex]);
            }
        });
    }
}

function displayTodos(project) {
    let todosDiv = document.querySelector(".todosDiv");

    if (!todosDiv) {
        todosDiv = document.createElement("div");
        todosDiv.classList.add("todosDiv");
        content.appendChild(todosDiv);
    } else {
        todosDiv.innerHTML = "";
    }

    project.todos.forEach((todo) => {
        let todoDiv = document.createElement("div");
        todoDiv.classList.add("todoDiv");

        let doneDiv = document.createElement("div");

        if (todo.done) {
            doneDiv.classList.add("done");
            let checkIcon = document.createElement("img");
            checkIcon.src = checkIconPath;
            checkIcon.classList.add("todoCheckIcon");
            doneDiv.appendChild(checkIcon);
        } else {
            doneDiv.classList.add("notDone");
        }

        let left = document.createElement("div");
        left.classList.add("left");

        let todoTitle = document.createElement("p");
        todoTitle.classList.add("todoTitle");
        todoTitle.textContent = todo.name;

        left.appendChild(doneDiv);

        left.appendChild(todoTitle);

        todoDiv.appendChild(left);

        let deleteTodoBtn = document.createElement("img");
        deleteTodoBtn.classList.add("deleteTodoBtn");
        deleteTodoBtn.src = deleteIcon;
        deleteTodoBtn.addEventListener("click", () => {
            let projects = JSON.parse(localStorage.getItem("projects")) || [];

            let projectIndex = projects.findIndex(
                (p) => p.name === project.name
            );

            if (projectIndex !== -1) {
                let todoIndex = projects[projectIndex].todos.findIndex(
                    (t) => t.name === todo.name
                );

                if (todoIndex !== -1) {
                    projects[projectIndex].todos.splice(todoIndex, 1);

                    localStorage.setItem("projects", JSON.stringify(projects));

                    displayTodos(projects[projectIndex]);
                }
            }
        });
        todoDiv.appendChild(deleteTodoBtn);

        todosDiv.appendChild(todoDiv);
    });
    console.log(project.todos);
}

export { displayProject };
