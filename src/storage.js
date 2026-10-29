export function saveToStorage(godArray) {
    try {
        localStorage.setItem("todoApp-projects", JSON.stringify(godArray))
    } catch {
        return
    }
}

export function load(addTodoFunction, addProjectFunction, stateUpdater) {
    let inboxPresent = false
    let saved
    try {
        saved = JSON.parse(localStorage.getItem("todoApp-projects"))
    } catch {
        return
    }
    if (!saved) { return }
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
