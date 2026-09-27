import { target } from "./index.js"
import { listItem } from "./list.js"
export const todoListDOM = document.querySelector('.todos') // takes '.todo-item'
export const Header = document.querySelector('h1')
import { project, listOfProjects, makeProject } from "./projects.js"

export function renderList(display, list) {
  let projectObject = list.find(todo => todo.getProject().name === target)
  Header.innerText = projectObject.name
  console.log("THIS IS THE PROJECT OBJECT")
  console.log(projectObject)
  display.innerHTML = ""
  projectObject.list.forEach((item) => {
    display.insertAdjacentHTML("beforeend", `<div class="todo-item" data="${item.uuid}">
        <p class="title">${item.title}</p>
        <p class="due">${item.due}</p>
        
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
  console.log(listOfProjects)
}


// attempt to have the files print the project has failed

// BUT projects are going into the correct corresponding array!

// so forget about that kinda distinctin

// next step, get started on displaying todos on their very own project page. that's how distinction will become actually clear