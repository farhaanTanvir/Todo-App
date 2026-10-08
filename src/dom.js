import { target, navContainer, todoDialog } from "./index.js"
// import { listItem } from "./list.js"
export const todoListDOM = document.querySelector('.todos') // takes '.todo-item'
export const Header = document.querySelector('h1')
import { getProjListCopy } from "./projects.js"

const expanded = document.querySelector('.expand')

export function renderList(display) {
  let projectObject = getProjListCopy().find(todo => todo.name === target)
  Header.innerText = projectObject.name
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


// Target: creating todos dynamically. 

export function renderProjects() {
  navContainer.innerHTML = ""
  getProjListCopy().forEach((item) => {

    if (item.name === "Inbox") {
      return
    } else {
      navContainer.insertAdjacentHTML("beforeend", `<div class="nav-item project-item" data-name="${item.name}">${item.name}</div>`)
    }
  })
}

export function expandTodo(targetUUID) {
  let targetProject = getProjListCopy().find(todo => todo.name === target); // turn this into a function
  let targetTodo = targetProject.list.find(todo => todo.title === targetUUID)
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