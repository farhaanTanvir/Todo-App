export let listOfProjects = [];

export class project {
    constructor(name) {
        this.name = name
        this.list = []
    }
    getProject() {
        return structuredClone(this)
    }

    addToProject(item) {
        this.list.push(item)
    }
}

export function makeProject(name) {
    listOfProjects.push(new project(name))
    console.log(listOfProjects)
}

// splice also works on one arary. we just need to give it a way for finding the index

export function indexFinder(target, uuid) {

}

// YK WHAT JUST LEAVE DELETION FOR NOW. 