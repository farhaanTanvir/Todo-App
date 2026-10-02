import { target, navContainer, todoDialog } from "./index.js"
import { listItem } from "./list.js"
export const todoListDOM = document.querySelector('.todos') // takes '.todo-item'
export const Header = document.querySelector('h1')
import { project, listOfProjects, makeProject } from "./projects.js"

const expanded = document.querySelector('.expand')

export function renderList(display, list) {
  let projectObject = list.find(todo => todo.getProject().name === target)
  Header.innerText = projectObject.name
  //console.log("THIS IS THE PROJECT OBJECT")
  //console.log(projectObject)
  display.innerHTML = ""
  projectObject.list.forEach((item) => {
    display.insertAdjacentHTML("beforeend", `<div class="todo-item">
      <div>
        <p class="title">${item.title}</p>
        <p class="due">${item.due}</p>
        </div>
        <div class="buttons-cont"><button id="expand" class="expand" data-title="${item.title}">Expand</button><button id="delete">Delete</button></div>
      </div>`)
  })
}

export function addTodo(list) {
  let targetProject = list.find(todo => todo.getProject().name === target);
  const title = document.querySelector('#title')
  const desc = document.querySelector('#description')
  const duedate = document.querySelector('#dueDate')
  const priority = document.querySelector('#priority')
  const notes = document.querySelector('#notes')

  targetProject.addToProject(new listItem(title.value, desc.value, duedate.value, priority.value, notes.value, target))

  renderList(todoListDOM, listOfProjects);

}


// Target: creating todos dynamically. 

export function renderProjects() {
  navContainer.innerHTML = ""
  listOfProjects.forEach((item) => {

    if (item.name === "Inbox") {
      return
    } else {
      navContainer.insertAdjacentHTML("beforeend", `<div class="nav-item project-item" data-name="${item.name}">${item.name}</div>`)
    }
  })
}

export function expandTodo(targetUUID) {
  let targetProject = listOfProjects.find(todo => todo.getProject().name === target); // turn this into a function
  // console.log(targetProject)
  let targetTodo = targetProject.list.find(todo => todo.title === targetUUID)

  //console.log(targetTodo)
  todoDialog.innerHTML = ""
  todoDialog.insertAdjacentHTML('beforeend', `
<div class="expanded-todo">
    <header class="expanded-header">
        <h2 class="expanded-title">${targetTodo.title}</h2>
        <button class="close-dialog-btn" aria-label="Close dialog">&times;</button>
    </header>

    <div class="expanded-body">
        <div class="detail-group">
            <span class="detail-label">Description</span>
            <div class="detail-value min-tall">${targetTodo.desc}</div>
        </div>

        <div class="detail-row">
            <div class="detail-group">
                <span class="detail-label">Due Date</span>
                <div class="detail-value">${targetTodo.dueDate}</div>
            </div>
            
            <div class="detail-group">
                <span class="detail-label">Priority</span>
                <div class="detail-value">${targetTodo.priority}</div>
            </div>
        </div>

        <div class="detail-group">
            <span class="detail-label">Notes</span>
            <div class="detail-value min-tall">${targetTodo.notes}</div>
        </div>
    </div>
</div>
    `)
}