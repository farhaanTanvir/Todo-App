import "./style.css";
import { parseISO, isAfter } from "date-fns";
import { project, listOfProjects, makeProject } from "./projects.js"
import { listItem } from "./list.js"
import { renderList, addTodo, todoListDOM } from "./dom.js"


export let target = "Inbox"; // this indicates the project you're inside. You upload the title property here. 
makeProject("Inbox")
renderList(todoListDOM, listOfProjects); // add event listener to inbox

const addButton = document.querySelector('.add')
const todoConstructDialog = document.querySelector('#todo-constructor')
const projectSubmit = document.querySelector('#projectConstructorSubmit')

const codingButton = document.querySelector('#coding')
const studyingButton = document.querySelector('#studying')


makeProject("Coding")
makeProject("Studying")

//const coding = new project("Coding")
//const studying = new project("Studying")
//istOfProjects.push(coding);
// listOfProjects.push(studying);

//console.log(listOfProjects.find(todo => todo.name === "Coding").list)

// target = "Coding";



addButton.addEventListener('click', () => {
    todoConstructDialog.showModal()

})

codingButton.addEventListener('click', () => {
    target = "Coding"
    console.log("switched to coding project")
    renderList(todoListDOM, listOfProjects);
    return target
})

studyingButton.addEventListener('click', () => {
    target = "Studying"
    console.log("switched to studying project")
    renderList(todoListDOM, listOfProjects);
    return target
})

// how do you make a project? you write an eventlistener function. 
// it takes all the data from the form and makes an object of project and pushes it directly inside the listOfProjects array
// then when making todos, you grab an object off of listOfProjects using find()
// and then you push it inside its array. 

// You REALLY will need the DOM running to test this stuff properly. This ain't something the console lets you test properly, so get started with the DOM immediately


// now you gotta write the function for making these objects on input


projectSubmit.addEventListener('click', () => {
    addTodo(listOfProjects);
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