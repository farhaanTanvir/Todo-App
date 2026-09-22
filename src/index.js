import "./style.css";
import { parseISO, isAfter } from "date-fns";
import { project } from "./projects.js"
import { listItem } from "./list.js"
import { renderList } from "./dom.js"

export let listOfProjects = [];
export let target; // this indicates the project you're inside. You upload the title property here. 
const todoListDOM = document.querySelector('.todos') // takes '.todo-item'
const addButton = document.querySelector('.add')

const coding = new project("Coding")
const studying = new project("Studying")

const learnLocalHost = new listItem("Learn LocalHost", "blah blah blah", "2026-5-21", "high", "nothing")
const learnLocalReact = new listItem("Learn React", "blah blah blah", "2026-5-21", "low", "nothing")
const learnConics = new listItem("master conics", "blah blah blah", "2026-5-25", "very high", "nothing")

coding.list.push(learnLocalHost);
coding.list.push(learnLocalReact);

studying.list.push(learnConics);
// console.log(coding)
// console.log(studying)
listOfProjects.push(coding);
listOfProjects.push(studying);

console.log(listOfProjects.find(todo => todo.name === "Coding").list)

target = "Coding";

addButton.addEventListener('click', () => {
    renderList(todoListDOM);
})


// how do you make a project? you write an eventlistener function. 
// it takes all the data from the form and makes an object of project and pushes it directly inside the listOfProjects array
// then when making todos, you grab an object off of listOfProjects using find()
// and then you push it inside its array. 

// You REALLY will need the DOM running to test this stuff properly. This ain't something the console lets you test properly, so get started with the DOM immediately


target = "Studying"

// now you gotta write the function for making these objects on input











/* const dateTest = new Date("2026-03-05")
console.log(dateTest)
const date2 = new Date()
console.log(date2)
console.log(isAfter(dateTest, date2))

const parsetest = parseISO("2026-03-05")
console.log(parsetest)
const parseCurrent = parseISO("");
console.log(parseCurrent) */