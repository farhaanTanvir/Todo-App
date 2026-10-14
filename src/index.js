import "./style.css";
import { parseISO, isAfter } from "date-fns";
import { project, makeProject, addTodo, removeTodo, editTodo } from "./projects.js"
import { listItem } from "./list.js"
import { renderList, todoListDOM, renderProjects, Header, expandTodo } from "./dom.js"
export const todoDialog = document.querySelector('#todo-dialog')
document.body.append(todoDialog)

export let target = "Inbox"; // this indicates the project you're inside. You upload the title property here. 
makeProject("Inbox")
renderList(todoListDOM); // add event listener to inbox

const addButton = document.querySelector('.add')
const todoConstructDialog = document.querySelector('#todo-constructor')
const projectSubmit = document.querySelector('#projectConstructorSubmit')
const navInbox = document.querySelector('#inbox-nav')
export const navContainer = document.querySelector('#project-cont')
const addProjectButton = document.querySelector('#addProject')
const projectDialog = document.querySelector('#projectNameCont')
const submitToMakeProject = document.querySelector('#makeProjectSubmit')
export const todoContainer = document.querySelector('.todos')
const editDialog = document.querySelector('#editTodo')

const saveEditBtn = document.getElementById("saveEdit");
const cancelEditBtn = document.getElementById("cancelEdit");

//console.log(saveEditBtn)




// WHATS LEFT

// editing todo
// deleting todo
// date formatting
// the "Today" tab
// flip the display array so we get newer stuff first
// prevent todos from being created before every field is present
// add a feature to block if they try to make a project with an existing name


// finishing work:

// turn repetetive code into functions that u call, the current object finder, for example.
// go through your OOP principles, one principle at a time, through every file
// make everything as private as possible, work on the attempts that didn't work
// clean up import exports by moving things in the right place

let targetTitle = null // maybe privatize this later?

saveEditBtn.addEventListener('click', () => {
    if (targetTitle === null) { console.log("oopsie daisy"); return }
    editTodo(targetTitle)
})

todoContainer.addEventListener('click', (event) => {
    event.stopPropagation()

    if (!event.target.classList.contains("editInitiateBtn")) { return }
    //  console.log("click happening")
    editDialog.showModal()
    // console.log(event.target.dataset.title)
    targetTitle = event.target.dataset.title
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

projectSubmit.addEventListener('click', () => {
    addTodo();
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