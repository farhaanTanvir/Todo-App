// index.js
import "./style.css";
import { makeProject, addTodo, removeTodo, editTodo, getProjListCopy } from "./projects.js"
import { renderList, todoListDOM, renderProjects, expandTodo, findProject } from "./dom.js"
import { target } from "./target.js"

export const todoDialog = document.querySelector('#todo-dialog')
document.body.append(todoDialog)



const addButton = document.querySelector('.add')
export const todoConstructDialog = document.querySelector('#todo-constructor')
const projectSubmit = document.querySelector('#projectConstructorSubmit')
const projectCancel = document.querySelector('#addPanelCancel')


const addProjectButton = document.querySelector('#addProject')
const projectDialog = document.querySelector('#projectNameCont')
const submitToMakeProject = document.querySelector('#makeProjectSubmit')
const todoContainer = document.querySelector('.todos')
export const editDialog = document.querySelector('#editTodo')
const saveEditBtn = document.getElementById("saveEdit");
const cancelEditBtn = document.getElementById("cancelEdit");

makeProject("Inbox")
renderList();
renderProjects()


// WHATS LEFT (optional)

// something to mark a todo complete 
// clear input boxes after every todo creation (LAST THING TO DO)
// whitespace inputs taken in creating and editing todos, so need a regex to filter that out in validation


// SINGLE RESPONSIBILITY CHECK:
// index.js
// dom.js
// project.js
// listjs has nothing



// when rendering DOM, use something other than insertAdjacentHTML since it's taking user input



// ULITMATE MOVE: Make it so that only index imports, and everyone else just exports

// finishing work:

// Single Responsibility check
// dependency inversion check





// ask chatbots if any of the methods here would have been better suited as a class's method (just for the sake of practising preserving classes. app works fine either way)

// ask one last time for SOLID principle violations

let targetIndexForEdit = null

saveEditBtn.addEventListener('click', () => {
    if (targetIndexForEdit === null) { console.log("oopsie daisy"); return }
    editTodo(targetIndexForEdit)
})
cancelEditBtn.addEventListener('click', () => {
    editDialog.close()
})

function indexFinder(id) {
    let targetProject = findProject()
    return targetProject.list.findIndex((target) => { return target.id === id })
}

function editDialogOpener(indexOfTarget) {
    let targetProject = findProject()
    let targetTodo = targetProject.list[indexOfTarget]

    document.getElementById("editTitle").value = targetTodo.title;
    document.getElementById("editDescription").value = targetTodo.desc;
    document.getElementById("editDueDate").value = targetTodo.due;
    document.getElementById("editPriority").value = targetTodo.priority;
    document.getElementById("editNotes").value = targetTodo.notes;

    editDialog.showModal()
}




addButton.addEventListener('click', () => {
    todoConstructDialog.showModal()
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

submitToMakeProject.addEventListener('click', (e) => {
    e.preventDefault()
    const title = document.querySelector('#projectTitle')
    if (makeProject(title.value)) { projectDialog.close() }
    renderProjects()
})

function closeDialog() {
    todoDialog.close();
}

function expandListener() {
    expandTodo(event.target.dataset.id);
    todoDialog.showModal();
    let closeExpandedDialog = document.querySelector('.close-dialog-btn');
    closeExpandedDialog.addEventListener('click', closeDialog)
}

function editListener() {
    let index = indexFinder(event.target.dataset.id)
    editDialogOpener(index)
    targetIndexForEdit = index
}

function removeListener() {
    removeTodo(event.target.dataset.id)
}

todoContainer.addEventListener('click', (event) => {
    event.stopPropagation()
    if (event.target.classList.contains("editInitiateBtn")) { editListener() }
    if (event.target.classList.contains("expand")) { expandListener() }
    if (event.target.classList.contains("delete")) { removeListener() }
})

