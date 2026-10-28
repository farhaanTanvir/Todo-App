export function saveToStorage(godArray) {
    localStorage.setItem("projects", JSON.stringify(godArray))
    //console.log("sent!")
    //console.log(localStorage)
}

export function load(addTodoFunction, addProjectFunction, stateUpdater) {
    let inboxPresent = false
    const saved = JSON.parse(localStorage.getItem("projects"))
    if (!saved) { return }
    // if (!saved.length) { return false }
    saved.forEach((project => {
        addProjectFunction(project.name)
        if (project.name === "Inbox") { inboxPresent = true }
        stateUpdater(project.name)
        project.list.forEach(todo => {
            addTodoFunction(project.name, { title: todo.title, desc: todo.desc, duedate: todo.due, priority: todo.priority, notes: todo.notes })
        })
    }))
    return inboxPresent
}