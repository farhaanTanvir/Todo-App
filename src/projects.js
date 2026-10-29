import { listItem } from './list.js'

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

function getProjectNoCopy(target) {
    return listOfProjects.find(project => project.name === target);
}

function projDoubleNameCheck(name) {
    const test = getProjListCopy();
    let result = true
    test.forEach((project) => { if (project.name === name) { result = false } })
    return result
}

function warnDuplicateProjName() {
    duplicateName()
}

function valProjDupeName(name) {
    if (!projDoubleNameCheck(name)) { warnDuplicateProjName(); return false }
    return true
}

export function makeProject(name) {
    if (!valProjDupeName(name)) { return false }
    listOfProjects.push(new Project(name))
    return true
}

export let warnState = null

function EmptyInputFields() {
    warnState = "You have not filled out every input required"
}

function duplicateName() {
    warnState = "You can't make two projects of the same name"
}

function valEmptyInputs(inputObj) {
    if (inputObj.title === "") {
        EmptyInputFields()
        return false
    } else if (inputObj.desc === "") {
        EmptyInputFields()
        return false
    } else if (!inputObj.duedate) {
        EmptyInputFields()
        return false
    }
    return true
}

export function addTodo(state, DOMGrabber) {
    //console.log(state)
    //console.log(listOfProjects)
    let targetProject = getProjectNoCopy(state)
    //console.log(targetProject)
    const DOM = DOMGrabber
    if (!valEmptyInputs({ title: DOM.title, desc: DOM.desc, duedate: DOM.duedate, priority: DOM.priority, notes: DOM.notes })) { return false }
    //console.log(DOM)

    targetProject.add(DOM.title, DOM.desc, DOM.duedate, DOM.priority, DOM.notes)
    return true
}

export function editTodo(index, state, DOMGrabber) {
    let project = getProjectNoCopy(state);
    const DOM = DOMGrabber
    if (!valEmptyInputs({ title: DOM.title, desc: DOM.desc, duedate: DOM.duedate, priority: DOM.priority, notes: DOM.notes })) { return false }
    project.edit(index, DOM.title, DOM.desc, DOM.duedate, DOM.priority, DOM.notes)
    return true
}

export function removeTodo(id, state) {
    let targetProject = getProjectNoCopy(state)
    let targetTodoIndex = targetProject.list.findIndex((item) => { return item.id === id })
    targetProject.remove(targetTodoIndex)
}

export function findProject(target) {
    return getProjListCopy().find(todo => todo.name === target)
}