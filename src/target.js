import { renderList } from "./dom.js"
import { findProject } from "./projects.js"

export let target = "Inbox"; // this indicates the project you're inside. You upload the title property here. 

const navInbox = document.querySelector('#inbox-nav')
const navContainer = document.querySelector('#project-cont')
const Header = document.querySelector('h1')

Header.innerText = target

navInbox.addEventListener('click', () => {
    target = "Inbox"
    Header.innerText = target
    renderList(findProject(target));
    return target
})

navContainer.addEventListener('click', (event) => {
    event.stopPropagation();
    if (event.target.classList.contains("inbox")) { return }
    if (!event.target.classList.contains("proj")) { return }
    const projName = event.target.dataset.name + ""
    target = projName
    Header.innerText = target
    renderList(findProject(target))
    return target
})