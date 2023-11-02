class Project {
    constructor(name = 'Inbox'){
        this.name = name;
        this.task = [];
    }

    saveProject() {
        localStorage.setItem(this.name, ['']);
    }

    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }
}

export default Project;