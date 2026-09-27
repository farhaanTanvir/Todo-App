export class listItem {
    constructor(title, description, dueDate, priority, notes) {
        this.title = title
        this.desc = description
        this.due = dueDate
        this.priority = priority
        this.notes = notes
        this.uuid = self.crypto.randomUUID()
        this.status = false
        // this.projectName = structuredClone(target)
    }

    getTodo() {
        return structuredClone(this)
    }
}

// think about how you could privatize properties these later