// projects.js
import { renderList, todoListDOM } from './dom.js'
import { listItem } from './list.js'
import { target, todoConstructDialog, editDialog } from './index.js'
import { parseISO, isPast } from "date-fns"
let listOfProjects = [];

export function getProjListCopy() {
    return structuredClone(listOfProjects)
}

function getProjectNoCopy() {
    return listOfProjects.find(todo => todo.name === target);
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

    const test = getProjListCopy()
    for (const project of test) {
        for (const todo of project.list) {
            if (todo.title === title.value) {
                warnDuplicateName()
                return
            }
        }
    }
    targetProject.list.push(new listItem(title.value, desc.value, duedate.value, priority.value, notes.value, target))
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

export function removeTodo(title) {
    let targetProject = getProjectNoCopy()
    let targetTodoIndex = targetProject.list.findIndex((item) => { return item.title === title })
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

    for (const project of test) {
        for (const todo of project.list) {
            if (todo.title === editTitle) {
                warnDuplicateName()
                return
            }
        }
    }
    editDialog.close()
    project.list.splice(index, 1, new listItem(editTitle, editDescription, editDueDate, editPriority, editNotes))
    renderList(todoListDOM)
}