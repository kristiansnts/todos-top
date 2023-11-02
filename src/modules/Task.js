import Storage from "./Storage"

class Task {
    constructor(title, description, priority, dueDate = 'No Date') {
        this.id = +new Date();
        this.title = title;
        this.description = description;
        this.priority = priority
        this.dueDate = dueDate; 
    }

    setTask(title, description, priority, dueDate = 'No Date') {
        this.title = title
        this.description = description;
        this.priority = priority
        this.dueDate = dueDate;
    }

    getTask() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            priority: this.priority,
            dueDate: this.dueDate, 
        }
    }

    saveTask(project = 'Inbox', task){
        Storage.store(project, task)
    }

    static deleteTask(project, id){
        Storage.removeItem(project, id)
    }

    // getAllTask(){
    //     return this.task = Storage.getAll(this.name);
    // }

    // getDateFormatted() {
    //     const day = this.dueDate.split('/')[0];
    //     const month = this.dueDate.split('/')[1];
    //     const year = this.dueDate.split('/')[2];
    //     return `${month}/${day}/${year}`
    // }
}

export default Task;