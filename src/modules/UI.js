const feather = require('feather-icons');
import Project from './Project';
import Task from './Task';
import Storage from './Storage';

class UI {
    static loadHomePage() {
        UI.sideBar();
    }

    static main() {
        UI.loadMain();
    }

    static sideBar() {
        UI.chooseMenu();
        UI.loadProject();
        UI.createProject();
        UI.chooseProject();
    }

    static loadTask(project){
        const taskList = document.getElementById('task-list');
        let task = '';
        const tasks = localStorage.getItem(project).length > 0 ? Storage.getAll(project) : [];
        const deleteIcon = feather.icons['trash-2'].toSvg({class: 'align-text-bottom'});
        tasks.forEach(item => {
            task += `
            <div class="form-check ">
                <input class="form-check-input" type="checkbox" id="flexCheckDefault">
                <div class="task">
                    <input type="text" data-bs-toggle="modal" data-bs-target="#formModal" value="${item.title}">
                    <a href="#" class="ms-2 btn btn-outline-danger btn-sm remove-task" id="${item.id}">${deleteIcon}</a>
                </div>
            </div>
            `;
        })
        taskList.innerHTML = task;
        UI.removeTask();
    }

    static loadMain(){
        const tasks = document.querySelectorAll('.task input');
        tasks.forEach(task => {
            task.addEventListener('click', function(event){
                console.log(event.target.id)
            })
        })
    }

    static loadProject() {
        if(Object.entries(localStorage).length === 0){
            return;
        }
        const projects =  document.getElementById('project');
        const projectIcon = feather.icons['file-text'].toSvg({ class: 'align-text-bottom'});
        const deleteIcon = feather.icons['x-circle'].toSvg({class: 'mt-2 me-3 text-danger'});   
        let list = Object.entries(localStorage).map(item => {
            return item[0]
        });

        let projectList = '';
        if(list.length > 0){
            list.map(item => {
                projectList += `
                <li class="nav-item d-flex justify-content-between">
                    <a href="#" id="" class="nav-link">${projectIcon}${item}
                    </a>
                    <a href="#" id=${item} class="remove-project">${deleteIcon}</a>
                </li>
                `;
            });
        }
        
        projects.innerHTML = projectList;
        UI.removeProject(project);
    }

    static chooseMenu() {
        const buttons = document.querySelectorAll('.nav-link');
        const form = document.getElementById('form-task');
        form.reset();
        buttons.forEach(button => {
            button.addEventListener('click', function(event) {
                const menuTitle = event.target.innerText;
                UI.changeContent(menuTitle);
                buttons.forEach(item => {
                    item.classList.remove('active');
                })
                event.target.classList.add('active');
            })
        });
    }

    static createProject() {
        const createProjectButton = document.getElementById('createProject');
        createProjectButton.addEventListener('click', function(){
            const projectName = document.getElementById('projectName').value;
            const newProject = new Project(projectName);
            newProject.saveProject();
            UI.loadHomePage();
        })
    }
    
    static chooseProject() {
        const projectList = document.querySelectorAll('#project .nav-link');
        projectList.forEach(project => {
            project.addEventListener('click', function(event){
                const projectTitle = event.target.innerText;
                UI.changeContent(projectTitle);
                projectList.forEach(item => item.classList.remove('active'));
                event.target.classList.add('active');
                UI.createTask(event.target.innerText);
                UI.loadTask(event.target.innerText);
                UI.removeTask(event.target.innerText);
                UI.main();
            })
        })
    }

    static removeProject(){
        const projectList = document.querySelectorAll('.remove-project');
        projectList.forEach(project => {
            project.addEventListener('click', function(event){
                const projectKey = event.target.parentElement.id;
                if(confirm('Are you really want to delete it?')){
                    localStorage.removeItem(projectKey);
                }
                window.location.reload()
            })
        })
    }

    static changeContent(menuTitle){
        const contentHead = document.querySelector('.content-head');
        contentHead.innerText = menuTitle;
    }

    static createTask(project = 'Inbox'){
        const form = document.getElementById('form-task');
        
        form.addEventListener('submit', function(event){
            event.preventDefault();
            let title = document.getElementById('title').value;
            let description = document.getElementById('description').value;
            let date = document.getElementById('date').value;
            let priority = document.getElementById('priority');
            const newTask = new Task(title, description, priority.value, date);
            const task = newTask.getTask(); 
            newTask.saveTask(project, task);
            UI.loadTask(project);
        })
    }

    static removeTask(project){
        const removeTaskButton = document.querySelectorAll('.remove-task');
        removeTaskButton.forEach(button => {
            button.addEventListener('click', function(event){
                event.preventDefault();
                const taskId = parseInt(event.target.id);
                if(confirm("Are You sure want to delete this task?")){
                    Storage.removeItem(project, taskId)
                    window.location.reload();
                    UI.loadTask(project);
                }
            })
        })
    }

    static editTask(taskId){
        
    }
}

export default UI;