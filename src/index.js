import "./style.css";
import { makeProject, addTodo, removeTodo, editTodo, getProjListCopy, findProject, warnState } from "./projects.js"
import { renderList, renderProjects, expandTodo, grabDOMElements } from "./dom.js"
import { target, changeTarget } from "./target.js"
import { saveToStorage, load } from "./storage.js"

const todoDialog = document.querySelector('#todo-dialog')
document.body.append(todoDialog)

const addButton = document.querySelector('.add')
const todoConstructDialog = document.querySelector('#todo-constructor')
const projectSubmit = document.querySelector('#projectConstructorSubmit')
const projectCancel = document.querySelector('#addPanelCancel')
const addProjectButton = document.querySelector('#addProject')
const projectDialog = document.querySelector('#projectNameCont')
const submitToMakeProject = document.querySelector('#makeProjectSubmit')
const todoContainer = document.querySelector('.todos')
const editDialog = document.querySelector('#editTodo')
const saveEditBtn = document.getElementById("saveEdit");
const cancelEditBtn = document.getElementById("cancelEdit");
const navInbox = document.querySelector('#inbox-nav')
const navContainer = document.querySelector('#project-cont')
const Header = document.querySelector('h1')

if (!load(addTodo, makeProject, changeTarget)) { makeProject("Inbox") }

changeTarget("Inbox")
renderProjects(getProjListCopy())
Header.innerText = target
renderList(findProject(target));


navInbox.addEventListener('click', () => {
    changeTarget("Inbox")
    Header.innerText = target
    renderList(findProject(target));
})

navContainer.addEventListener('click', (event) => {
    event.stopPropagation();
    if (event.target.classList.contains("inbox")) { return }
    if (!event.target.classList.contains("proj")) { return }
    changeTarget(event.target.dataset.name)
    Header.innerText = target
    renderList(findProject(target))
})

function issueWarning() {
    alert(warnState)
}

function closeDialog(dialog) {
    dialog.close()
}

let targetIndexForEdit = null

saveEditBtn.addEventListener('click', () => {
    if (targetIndexForEdit === null) { return }
    if (editTodo(targetIndexForEdit, target, grabDOMElements("edit"))) { closeDialog(editDialog) } else { issueWarning() }
    saveToStorage(getProjListCopy())
    renderList(findProject(target))
})

cancelEditBtn.addEventListener('click', () => {
    editDialog.close()
})

function indexFinder(id) {
    let targetProject = findProject(target)
    return targetProject.list.findIndex((target) => { return target.id === id })
}

function assignValueToElements(DOMElements, values) {
    DOMElements.title.value = values.title
    DOMElements.desc.value = values.desc
    DOMElements.due.value = values.due
    DOMElements.priority.value = values.priority
    DOMElements.notes.value = values.notes
}

function editDialogOpener(indexOfTarget, project) {
    let targetTodo = project.list[indexOfTarget]
    assignValueToElements({ title: document.getElementById("editTitle"), desc: document.getElementById("editDescription"), due: document.getElementById("editDueDate"), priority: document.getElementById("editPriority"), notes: document.getElementById("editNotes") }, targetTodo)
}

addButton.addEventListener('click', () => {
    todoConstructDialog.showModal()
})

projectSubmit.addEventListener('click', (e) => {
    e.preventDefault()
    if (addTodo(target, grabDOMElements("noedit"))) { closeDialog(todoConstructDialog) } else { issueWarning() }
    saveToStorage(getProjListCopy())
    renderList(findProject(target));
})

projectCancel.addEventListener('click', () => {
    todoConstructDialog.close()
})

addProjectButton.addEventListener('click', () => {
    projectDialog.showModal()
})

submitToMakeProject.addEventListener('click', (e) => {
    e.preventDefault()
    const title = document.querySelector('#projectTitle')
    if (makeProject(title.value)) { projectDialog.close() } else { issueWarning() }
    saveToStorage(getProjListCopy())
    renderProjects(getProjListCopy())
})

function expandListener() {
    expandTodo(event.target.dataset.id, findProject(target));
    todoDialog.showModal();
    let closeExpandedDialog = document.querySelector('.close-dialog-btn');
    closeExpandedDialog.addEventListener('click', () => {
        closeDialog(todoDialog)
    })
}

function editListener() {
    let index = indexFinder(event.target.dataset.id)
    editDialogOpener(index, findProject(target))
    editDialog.showModal()
    targetIndexForEdit = index
}

function removeListener() {
    removeTodo(event.target.dataset.id, target)
    saveToStorage(getProjListCopy())
    renderList(findProject(target))
}

todoContainer.addEventListener('click', (event) => {
    event.stopPropagation()
    if (event.target.classList.contains("editInitiateBtn")) { editListener() }
    if (event.target.classList.contains("expand")) { expandListener() }
    if (event.target.classList.contains("delete")) { removeListener() }
})

