// index.js
import "./style.css";
import { makeProject, addTodo, removeTodo, editTodo, getProjListCopy } from "./projects.js"
import { renderList, todoListDOM, renderProjects, expandTodo } from "./dom.js"
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
renderList(todoListDOM);
renderProjects()


// WHATS LEFT

// something to mark a todo complete (OPTIONAL)
// clear input boxes after every todo creation (LAST THING TO DO)

// separate DOM fetching from validation or todo creation. The Todo creation logic should be able to work WITHOUT A BROWSER, that's the test. check:
// index.js
// dom.js
// project.js
// listjs has nothing



// addTodo and editTodo are doing too much, you have to split everything

// stop using title as identity. use uuid.

// when rendering DOM, use something other than insertAdjacentHTML since it's taking user input

// for the click listeners below, consolidate all 3 event listeners into one. Make things into functions that 3 different conditions call

// heard IDs are getting duplicated on every todo. So fix that

// add, remove, and replace a todo, goes on prototype

// add a name check to PROJECT creation aswell

// make removeTodo do rendering by itself

// make duplicate validations into function calls to stop it being repetetive

// Find the current project” is written three times (getProjectNoCopy, findProject, targetProjectFinder) -- says claude. check it. 



// SOME more problems (optional):
// whitespace inputs taken in creating and editing todos


// finishing work:

// Single Responsibility check
// dependency inversion check



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