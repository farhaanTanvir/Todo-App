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

export function editTodo(index) {
    let project = getProjectNoCopy();
    const editTitle = document.getElementById("editTitle").value;
    const editDescription = document.getElementById("editDescription").value;
    const editDueDate = document.getElementById("editDueDate").value;
    const editPriority = document.getElementById("editPriority").value;
    const editNotes = document.getElementById("editNotes").value;
    project.list.splice(index, 1, new listItem(editTitle, editDescription, editDueDate, editPriority, editNotes))
    renderList(todoListDOM)
}