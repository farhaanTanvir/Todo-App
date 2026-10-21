// index.js
import "./style.css";
import { makeProject, addTodo, removeTodo, editTodo, getProjListCopy } from "./projects.js"
import { renderList, todoListDOM, renderProjects, Header, expandTodo } from "./dom.js"

export const todoDialog = document.querySelector('#todo-dialog')
document.body.append(todoDialog)

export let target = "Inbox"; // this indicates the project you're inside. You upload the title property here. 

const addButton = document.querySelector('.add')
export const todoConstructDialog = document.querySelector('#todo-constructor')
const projectSubmit = document.querySelector('#projectConstructorSubmit')
const projectCancel = document.querySelector('#addPanelCancel')
const navInbox = document.querySelector('#inbox-nav')
export const navContainer = document.querySelector('#project-cont')
const addProjectButton = document.querySelector('#addProject')
const projectDialog = document.querySelector('#projectNameCont')
const submitToMakeProject = document.querySelector('#makeProjectSubmit')
const todoContainer = document.querySelector('.todos')
export const editDialog = document.querySelector('#editTodo')
const saveEditBtn = document.getElementById("saveEdit");
const cancelEditBtn = document.getElementById("cancelEdit");

makeProject("Inbox")
renderList(todoListDOM);
renderProjects()


// WHATS LEFT

// the "Today" tab (OPTIONAL)
// something to mark a todo complete (OPTIONAL)
// clear input boxes after every todo creation (LAST THING TO DO)


// finishing work:

// Single Responsibility check
// dependency inversion check
// interface segregation check



// ask chatbots if any of the methods here would have been better suited as a class's method (just for the sake of practising preserving classes. app works fine either way)

// AND ask if you even NEED to move things to objects here in the first place, ask if that would make anything better.

// above step is that, Liskov substitution and Interface segregation largely are irreleveant, and that feels a little wrong idk. 

let targetIndexForEdit = null

saveEditBtn.addEventListener('click', () => {
    if (targetIndexForEdit === null) { console.log("oopsie daisy"); return }
    editTodo(targetIndexForEdit)
})
cancelEditBtn.addEventListener('click', () => {
    editDialog.close()
})

function targetProjectFinder() {
    let projListCopy = getProjListCopy()
    let targetProject = projListCopy.find(todo => todo.name === target)
    return targetProject
}

function indexFinder(title) {
    let targetProject = targetProjectFinder()
    return targetProject.list.findIndex((target) => { return target.title === title })
}

function editDialogOpener(indexOfTarget) {
    let targetProject = targetProjectFinder()
    let targetTodo = targetProject.list[indexOfTarget]

    document.getElementById("editTitle").value = targetTodo.title;
    document.getElementById("editDescription").value = targetTodo.desc;
    document.getElementById("editDueDate").value = targetTodo.due;
    document.getElementById("editPriority").value = targetTodo.priority;
    document.getElementById("editNotes").value = targetTodo.notes;

    editDialog.showModal()
}

todoContainer.addEventListener('click', (event) => {
    event.stopPropagation()
    if (!event.target.classList.contains("editInitiateBtn")) { return }
    let index = indexFinder(event.target.dataset.title)
    editDialogOpener(index)
    targetIndexForEdit = index
})

navInbox.addEventListener('click', () => {
    target = "Inbox"
    console.log("switched to Inbox project")
    renderList(todoListDOM);
    return target
})

addButton.addEventListener('click', () => {
    todoConstructDialog.showModal()
})

navContainer.addEventListener('click', (event) => {
    event.stopPropagation();
    if (event.target.classList.contains("inbox")) { return }
    const projName = event.target.dataset.name + ""
    target = projName
    Header.innerText = projName
    renderList(todoListDOM)
    return target
})

projectSubmit.addEventListener('click', (e) => {
    e.preventDefault()
    addTodo();
})

projectCancel.addEventListener('click', () => {
    todoConstructDialog.close()
})

addProjectButton.addEventListener('click', () => {
    projectDialog.showModal()
})

submitToMakeProject.addEventListener('click', () => {
    const title = document.querySelector('#projectTitle')
    makeProject(title.value)
    renderProjects()
})


function closeDialog() {
    todoDialog.close();
}

todoContainer.addEventListener('click', (event) => {
    event.stopPropagation();
    if (!event.target.classList.contains("expand")) { return }
    expandTodo(event.target.dataset.title);
    todoDialog.showModal();
    let closeExpandedDialog = document.querySelector('.close-dialog-btn');
    closeExpandedDialog.addEventListener('click', closeDialog)
})

todoContainer.addEventListener('click', (event) => {
    event.stopPropagation();
    if (!event.target.classList.contains("delete")) { return }
    removeTodo(event.target.dataset.title)
    renderList(todoListDOM)
})