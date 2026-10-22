// projects.js
import { renderList, todoListDOM } from './dom.js'
import { listItem } from './list.js'
import { todoConstructDialog, editDialog } from './index.js' //might need to check if this can be skipped
import { parseISO, isPast } from "date-fns"
import { target } from "./target.js"

let listOfProjects = [];

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

function warnDuplicateName() {
    alert("You cannot make Two todos of the same name!");
}

export function addTodo() {
    let targetProject = getProjectNoCopy()
    const title = document.querySelector('#title')
    const desc = document.querySelector('#description')
    const duedate = document.querySelector('#dueDate')
    const priority = document.querySelector('#priority')
    const notes = document.querySelector('#notes')

    if (title.value === "") {
        warnEmptyInputFields()
        return
    } else if (desc.value === "") {
        warnEmptyInputFields()
        return
    } else if (duedate.value === "") {
        warnEmptyInputFields()
        return
    }

    if (isPast(parseISO(duedate.value))) {
        warnPastDate()
        return
    }

    targetProject.list.push(new listItem(title.value, desc.value, duedate.value, priority.value, notes.value))
    todoConstructDialog.close()
    renderList(todoListDOM);
}

class project {
    constructor(name) {
        this.name = name
        this.list = []
    }
}

export function makeProject(name) {
    listOfProjects.push(new project(name))
}

export function removeTodo(id) {
    let targetProject = getProjectNoCopy()
    let targetTodoIndex = targetProject.list.findIndex((item) => { return item.id === id })
    targetProject.list.splice(targetTodoIndex, 1)
}

export function editTodo(index) {
    let project = getProjectNoCopy();
    const editTitle = document.getElementById("editTitle").value;
    const editDescription = document.getElementById("editDescription").value;
    const editDueDate = document.getElementById("editDueDate").value;
    const editPriority = document.getElementById("editPriority").value;
    const editNotes = document.getElementById("editNotes").value;

    const test = getProjListCopy()

    if (editTitle === "") {
        warnEmptyInputFields()
        return
    } else if (editDescription === "") {
        warnEmptyInputFields()
        return
    } else if (editDueDate === "") {
        warnEmptyInputFields()
        return
    }

    if (isPast(parseISO(editDueDate))) {
        warnPastDate()
        return
    }

    editDialog.close()
    project.list.splice(index, 1, new listItem(editTitle, editDescription, editDueDate, editPriority, editNotes))
    renderList(todoListDOM)
}