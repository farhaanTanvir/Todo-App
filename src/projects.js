export let listOfProjects = [];
// think about how you'd privatize this guy
// you could just write the finder functions here where:
// one function returns the ADDRESS of what I'm trying to mutate
// the other function takes that address, finds it within its context and does its job



// THINGS I DO WITH LISTOFPROJECTS:

// read it for rendering purposes

// identifying a project object (its live location) by target inside this projectLists array, which can then automatically identify the intended project in a different context. Same mechanism used everywhere, this one. just handing something a sort of "KEY" for something else to identify a project object. probably index

// then we need to dig inside the identified project's todo objects aswell. find a way to work on it without handing anybody the real thing. possibly via putting them in the same object

// BASICALLY, don't export listOfProjects, don't have any function return an array or an object, and if u make it work you golden



// a todo object itself only needs reading for now, so shallow copies would do. you can think about writing to it when you're making the editing feature

// but a project object will need PUSHING and splicing capabilities. and reading.

// well that's it. I'm saving this, then you remove export, don't return anything core and live, and if you can make it work then congrats


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

