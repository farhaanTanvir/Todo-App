import "./style.css";
// import { parseISO, isAfter } from "date-fns";
import { project, makeProject, addTodo, removeTodo, editTodo, getProjListCopy } from "./projects.js"
import { listItem } from "./list.js"
import { renderList, todoListDOM, renderProjects, Header, expandTodo } from "./dom.js"
export const todoDialog = document.querySelector('#todo-dialog')
document.body.append(todoDialog)

export let target = "Inbox"; // this indicates the project you're inside. You upload the title property here. 
makeProject("Inbox")
renderList(todoListDOM); // add event listener to inbox

const addButton = document.querySelector('.add')
export const todoConstructDialog = document.querySelector('#todo-constructor')
const projectSubmit = document.querySelector('#projectConstructorSubmit')
const projectCancel = document.querySelector('#addPanelCancel')
const navInbox = document.querySelector('#inbox-nav')
export const navContainer = document.querySelector('#project-cont')
const addProjectButton = document.querySelector('#addProject')
const projectDialog = document.querySelector('#projectNameCont')
const submitToMakeProject = document.querySelector('#makeProjectSubmit')
export const todoContainer = document.querySelector('.todos')
export const editDialog = document.querySelector('#editTodo')
// export const openEdit = document.querySelector('#editInitiateBtn')

const saveEditBtn = document.getElementById("saveEdit");
const cancelEditBtn = document.getElementById("cancelEdit");






// WHATS LEFT

// the "Today" tab (OPTIONAL)
// something to mark a todo complete (OPTIONAL)
// clear input boxes after every todo creation (LAST THING TO DO)


// prevent input from setting a due date in the past



// finishing work:


// go through your OOP principles, one principle at a time, through every file
// make everything as private as possible, work on the attempts that didn't work (look up if you even need to bother for a fkn string variable)
// clean up import exports by moving things in the right place

let targetIndexForEdit = null // maybe privatize this later?

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
    // event.preventDefault()
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
    // console.log(projName)
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

renderProjects()

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
    // console.log(event.target.dataset.uuid)
    expandTodo(event.target.dataset.title);

    todoDialog.showModal();
    let closeExpandedDialog = document.querySelector('.close-dialog-btn');
    //const clone = closeExpandedDialog.cloneNode(true);
    closeExpandedDialog.addEventListener('click', closeDialog)
    closeExpandedDialog.addEventListener('click', closeDialog) // work on this guy, he ain't needed
})

todoContainer.addEventListener('click', (event) => {
    event.stopPropagation();
    if (!event.target.classList.contains("delete")) { return }
    removeTodo(event.target.dataset.title)
    renderList(todoListDOM)
})


/* const dateTest = new Date("2026-03-05")
console.log(dateTest)
const date2 = new Date()
console.log(date2)
console.log(isAfter(dateTest, date2))

const parsetest = parseISO("2026-03-05")
console.log(parsetest)
const parseCurrent = parseISO("");
console.log(parseCurrent) */