import { renderList, todoListDOM } from './dom.js'
import { listItem } from './list.js'
import { target } from './index.js'

let listOfProjects = [];

export function getProjListCopy() {
    return structuredClone(listOfProjects)
}

export function addTodo() {
    let targetProject = listOfProjects.find(todo => todo.name === target);
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

