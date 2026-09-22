import { listOfProjects, target } from "./index.js"

export function renderList(display) {
    let projectObject = listOfProjects.find(todo => todo.name === target)
    display.innerHTML = ""
    projectObject.list.forEach((item) => {
        display.insertAdjacentHTML("beforeend", `<div class="todo-item" data="${item.uuid}">
        <p class="title">${item.title}</p>
        <p class="due">${item.due}</p>
      </div>`)
    })
}