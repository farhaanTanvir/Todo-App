import { renderList, Header, todoListDOM } from "./dom.js"

export let target = "Inbox"; // this indicates the project you're inside. You upload the title property here. 

const navInbox = document.querySelector('#inbox-nav')
export const navContainer = document.querySelector('#project-cont')

navInbox.addEventListener('click', () => {
    target = "Inbox"
    renderList(todoListDOM);
    return target
})

navContainer.addEventListener('click', (event) => {
    event.stopPropagation();
    if (event.target.classList.contains("inbox")) { return }
    if (!event.target.classList.contains("proj")) { return }
    const projName = event.target.dataset.name + ""
    // if (projName) { return }
    target = projName
    Header.innerText = projName
    renderList(todoListDOM)
    return target
})