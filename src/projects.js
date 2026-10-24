// projects.js
import { renderList } from './dom.js'
import { listItem } from './list.js'
import { todoConstructDialog, editDialog } from './index.js' //might need to check if this can be skipped
import { parseISO, isPast } from "date-fns"
import { target } from "./target.js"

let listOfProjects = [];

class Project {
    constructor(name) {
        this.name = name
        this.list = []
    }

    add(title, desc, duedate, priority, notes) {
        this.list.push(new listItem(title, desc, duedate, priority, notes));
    }

    edit(index, title, desc, duedate, priority, notes) {
        this.list.splice(index, 1, new listItem(title, desc, duedate, priority, notes))
    }
    remove(index) {
        this.list.splice(index, 1)
    }
}



export function getProjListCopy() {
    return structuredClone(listOfProjects)
}

function getProjectNoCopy() {
    return listOfProjects.find(project => project.name === target);
}

function projDoubleNameCheck(name) {
    const test = getProjListCopy();
    let result = true
    test.forEach((project) => { if (project.name === name) { result = false } })
    return result
}

function warnDuplicateProjName() {
    alert("You can't make two projects of the same name")
}

export function makeProject(name) {
    if (!projDoubleNameCheck(name)) { warnDuplicateProjName(); return false }
    listOfProjects.push(new Project(name))
    return true
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
    }
}

function valEmptyInputs(inputObj) {
    if (inputObj.title === "") {
        warnEmptyInputFields()
        return false
    } else if (inputObj.desc === "") {
        warnEmptyInputFields()
        return false
    } else if (!inputObj.duedate) {
        warnEmptyInputFields()
        return false
    }

    if (isPast(parseISO(inputObj.duedate))) {
        warnPastDate()
        return false
    }

    return true
}

function closeDialog(dialog) {
    dialog.close()
}

export function addTodo() {
    let targetProject = getProjectNoCopy()
    const DOM = grabDOMElements("noedit")
    if (!valEmptyInputs({ title: DOM.title.value, desc: DOM.desc.value, duedate: DOM.duedate.value, priority: DOM.priority.value, notes: DOM.notes.value })) { return }
    targetProject.add(DOM.title.value, DOM.desc.value, DOM.duedate.value, DOM.priority.value, DOM.notes.value)
    closeDialog(todoConstructDialog)
    renderList();
}

export function editTodo(index) {
    let project = getProjectNoCopy();
    const DOM = grabDOMElements("edit")
    if (!valEmptyInputs({ title: DOM.title.value, desc: DOM.desc.value, duedate: DOM.duedate.value, priority: DOM.priority.value, notes: DOM.notes.value })) { return }
    closeDialog(editDialog)
    project.edit(index, DOM.title.value, DOM.desc.value, DOM.duedate.value, DOM.priority.value, DOM.notes.value)
    renderList()
}

export function removeTodo(id) {
    let targetProject = getProjectNoCopy()
    let targetTodoIndex = targetProject.list.findIndex((item) => { return item.id === id })
    targetProject.remove(targetTodoIndex)
    renderList()
}