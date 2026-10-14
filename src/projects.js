import { renderList, todoListDOM } from './dom.js'
import { listItem } from './list.js'
import { target } from './index.js'

let listOfProjects = [];

export function getProjListCopy() {
    return structuredClone(listOfProjects)
}

function getProjectNoCopy() {
    return listOfProjects.find(todo => todo.name === target);
}

export function addTodo() {
    let targetProject = getProjectNoCopy()
    const title = document.querySelector('#title')
    const desc = document.querySelector('#description')
    const duedate = document.querySelector('#dueDate')
    const priority = document.querySelector('#priority')
    const notes = document.querySelector('#notes')

    targetProject.addToProject(new listItem(title.value, desc.value, duedate.value, priority.value, notes.value, target))

    renderList(todoListDOM);
}

export class project {
    constructor(name) {
        this.name = name
        this.list = []
    }
    getProject() {
        return structuredClone(this)
    } // this is useless, get rid of this

    addToProject(item) {
        this.list.push(item)
    }
}

export function makeProject(name) {
    listOfProjects.push(new project(name))
    console.log(listOfProjects)
}

export function removeTodo(title) {
    let targetProject = getProjectNoCopy()
    let targetTodoIndex = targetProject.list.findIndex((item) => { return item.title === title })
    // console.log(targetTodoIndex)
    targetProject.list.splice(targetTodoIndex, 1)
}

export function editTodo(title) {
    //console.log(title)
    let project = getProjectNoCopy();
    // console.log(project)
    // console.log(project.list)
    let index = project.list.findIndex((target) => { return target.title === title })

    console.log(index)
    // Find the index of the targeted todo
    // open modal for the new input (find how existing information can be placed there. looks like there's a value property for this directly)
    // save button click does this:

    // creates the object with the new information
    // splices the existing todo object out and inserts the new one right in its place
    // renders screen just as the modal closes
}