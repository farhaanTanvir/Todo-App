//dom.js
import { todoDialog } from "./index.js"
import { getProjListCopy } from "./projects.js"
import { parseISO, format } from "date-fns"
import { navContainer, target } from "./target.js"

export const todoListDOM = document.querySelector('.todos') // takes '.todo-item'
export const Header = document.querySelector('h1')

function findProject() {
  return getProjListCopy().find(todo => todo.name === target)
}

function formatDate(dateStr) {
  if (!dateStr) { return }
  const date = parseISO(dateStr);
  return format(date, 'MMMM d, yyyy');
}

export function renderList(display) {
  let projectObject = findProject()
  Header.innerText = projectObject.name
  display.innerHTML = ""
  projectObject.list.reverse()
  projectObject.list.forEach((item) => {
    display.insertAdjacentHTML("beforeend", `<div class="todo-item">
      <div>
        <p class="title ${item.priority}">${item.title}</p>
        <p class="due">${formatDate(item.due)}</p>
        </div>
        <div class="buttons-cont"><button id="expand" class="expand" data-id="${item.id}">Expand</button><button id="delete" class="delete" data-id="${item.id}">Delete</button><button id="editInitiateBtn" class="editInitiateBtn" data-id="${item.id}">Edit</button></div>
      </div>`)
  })
}

export function renderProjects() {
  navContainer.innerHTML = ""
  getProjListCopy().reverse().forEach((item) => {
    if (item.name === "Inbox") {
      return
    } else {
      navContainer.insertAdjacentHTML("beforeend", `<div class="nav-item project-item proj" data-name="${item.name}">${item.name}</div>`)
    }
  })
}

export function expandTodo(targetUUID) {
  let targetProject = findProject()
  let targetTodo = targetProject.list.find(todo => todo.id === targetUUID)
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
                <div class="detail-value">${formatDate(targetTodo.due)}</div>
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