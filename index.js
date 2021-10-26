const addtaskbtn = document.getElementById('btn-add');
const taskinput = document.getElementById('todo');
const todos = document.querySelector('.todos');

let tasks;

let todoItemElems = [];


!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

function Task(description) {
    this.description = description;
    this.completed = false;
}



const createTemplate = (task, index) => {
    return `
    <div class="todo-item ${task.completed ? 'checked' : ''}">
    <div class="description">${task.description}</div>
    <div class="buttons">
        <button onclick="completeTask(${index})" class="btn-complete" ${task.completed ? 'checked' : ''}><i class='bx bx-check'></i></button>
        <button onclick="deleteTask(${index})" href="#" class="btn-delete"><i class='bx bx-trash'></i></button>
    </div>
</div>
    `
}

const filterTasks = () => {
    const activeTasks = tasks.length && tasks.filter(item => item.completed == false);
    const completedTasks = tasks.length && tasks.filter(item => item.completed == true);
    tasks = [...activeTasks,...completedTasks];
}

const fillHtmlList = () => {
    todos.innerHTML = "";
    if (tasks.length > 0) {
        filterTasks();
        tasks.forEach((item, index) => {
            todos.innerHTML += createTemplate(item, index) 
        });
        todoItemElems = document.querySelectorAll('.todo-item ');
    }
}
console.log(todoItemElems);
fillHtmlList();

const updateLocal= function() {
    localStorage.setItem('tasks', JSON.stringify(tasks)); 
    
}



addtaskbtn.addEventListener('click', () => {
    tasks.push(new Task(taskinput.value));
    updateLocal();
    fillHtmlList();
    taskinput.value = '';
});


const completeTask = (index) => {
    tasks[index].completed = !tasks[index].completed;
    if (tasks[index].completed) {
        todoItemElems[index].classList.add('checked');
    } else {
        todoItemElems[index].className='checked'
    }
    fillHtmlList();
    updateLocal();
}

const deleteTask = (index) => {
    todoItemElems[index].classList.add("deletion");
    setTimeout(() => {
    tasks.splice(index, 1);
    updateLocal();
    fillHtmlList();
    }, 500)
}

