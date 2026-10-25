import { parseISO, format } from "date-fns"
export const todoListDOM = document.querySelector('.todos') // takes '.todo-item' 
const todoDialog = document.querySelector('#todo-dialog')
const navContainer = document.querySelector('#project-cont')


function formatDate(dateStr) {
  if (!dateStr) { return }
  const date = parseISO(dateStr);
  return format(date, 'MMMM d, yyyy');
}

export function renderList(findProjFunction) {
  let projectObject = findProjFunction
  todoListDOM.innerHTML = ""
  projectObject.list.reverse()
  projectObject.list.forEach((item) => {
    todoListDOM.insertAdjacentHTML("beforeend", `<div class="todo-item">
      <div>
        <p class="title ${item.priority}">${item.title}</p>
        <p class="due">${formatDate(item.due)}</p>
        </div>
        <div class="buttons-cont"><button class="expand" data-id="${item.id}">Expand</button><button class="delete" data-id="${item.id}">Delete</button><button class="editInitiateBtn" data-id="${item.id}">Edit</button></div>
      </div>`)
  })
}

export function renderProjects(projListCopy) {
  navContainer.innerHTML = ""
  projListCopy.reverse().forEach((item) => {
    if (item.name === "Inbox") {
      return
    } else {
      navContainer.insertAdjacentHTML("beforeend", `<div class="nav-item project-item proj" data-name="${item.name}">${item.name}</div>`)
    }
  })
}

export function expandTodo(targetUUID, findProjFunction) {
  let targetProject = findProjFunction
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