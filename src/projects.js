// projects.js
import { renderList, todoListDOM } from './dom.js'
import { listItem } from './list.js'
import { todoConstructDialog, editDialog } from './index.js' //might need to check if this can be skipped
import { parseISO, isPast } from "date-fns"
import { target } from "./target.js"

let listOfProjects = [];

class project {
    constructor(name) {
        this.name = name
        this.list = []
    }
}

export function makeProject(name) {
    listOfProjects.push(new project(name))
}

export function getProjListCopy() {
    return structuredClone(listOfProjects)
}

function getProjectNoCopy() {
    return listOfProjects.find(project => project.name === target);
}

function warnEmptyInputFields() {
    alert("You have not filled out every input required")
}

function warnPastDate() {
    alert("Due date cannot be in the past!")
}

function grabDOMElements(editOrNah) {
    if (editOrNah === "noedit") {
        const title = document.querySelector('#title')
        const desc = document.querySelector('#description')
        const duedate = document.querySelector('#dueDate')
        const priority = document.querySelector('#priority')
        const notes = document.querySelector('#notes')
        return { title, desc, duedate, priority, notes }
    } else if (editOrNah === "edit") {
        const title = document.getElementById("editTitle");
        const desc = document.getElementById("editDescription");
        const duedate = document.getElementById("editDueDate");
        const priority = document.getElementById("editPriority");
        const notes = document.getElementById("editNotes");
        return { title, desc, duedate, priority, notes }
    } else { console.log("You fucked up, stupid shit") }

}

function valEmptyInputs(inputObj) {
    if (inputObj.title.value === "") {
        warnEmptyInputFields()
        return false
    } else if (inputObj.desc.value === "") {
        warnEmptyInputFields()
        return false
    } else if (!inputObj.duedate.value) {
        warnEmptyInputFields()
        return false
    }

    if (isPast(parseISO(inputObj.duedate.value))) {
        warnPastDate()
        return false
    }

    return true
}

// only a little bit left of removing them

export function addTodo() {
    let targetProject = getProjectNoCopy()
    const DOM = grabDOMElements("noedit")

    if (!valEmptyInputs(DOM)) { return }
    console.log(DOM.duedate.value)
    targetProject.list.push(new listItem(DOM.title.value, DOM.desc.value, DOM.duedate.value, DOM.priority.value, DOM.notes.value))
    todoConstructDialog.close()
    renderList(todoListDOM);
}

export function editTodo(index) {
    let project = getProjectNoCopy();
    const DOM = grabDOMElements("edit")
    if (!valEmptyInputs(DOM)) { return }

    editDialog.close()
    project.list.splice(index, 1, new listItem(DOM.title.value, DOM.desc.value, DOM.duedate.value, DOM.priority.value, DOM.notes.value))
    renderList(todoListDOM)
}

export function removeTodo(id) {
    let targetProject = getProjectNoCopy()
    let targetTodoIndex = targetProject.list.findIndex((item) => { return item.id === id })
    targetProject.list.splice(targetTodoIndex, 1)
    renderList(todoListDOM)
}