export class listItem {
    constructor(title, description, dueDate, priority, notes) {
        this.title = title
        this.desc = description
        this.due = dueDate
        this.priority = priority
        this.notes = notes
        this.status = false // for Tracking completion status, if you wanna do that in the future
        // if you wanna make mark completion, make sure to take status in as argument or it'll break
        this.id = crypto.randomUUID()
    }
}
