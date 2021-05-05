// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterToDo);
// Fucntions

function addTodo(event) {
    // To prevent form from submitting and refreshing page
    event.preventDefault();
    // console.log("Madafaka.");
    // create todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    // create li
    const newToDo = document.createElement('li');
    newToDo.innerText = todoInput.value;
    newToDo.classList.add('todo-item');
    todoDiv.appendChild(newToDo);
    // Add todo to local storage
    saveLocalTodos(todoInput.value);
    // Checked/ Done button
    const completed = document.createElement('button');
    completed.innerHTML = "<i class='fas fa-check'></i>";
    completed.classList.add('complete-btn');
    todoDiv.appendChild(completed)
    // Trash / Delete button
    const del = document.createElement('button');
    del.innerHTML = "<i class='fas fa-trash'></i>";
    del.classList.add('del-btn');
    todoDiv.appendChild(del);
    // Append to List
    todoList.appendChild(todoDiv);
    // Clear form input
    todoInput.value = "";
}

function deleteCheck(event) {
    const item = event.target;
    // Del todo
    if (item.classList[0] === 'del-btn') {
        const todo = item.parentElement;
        // Animation here
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function () {
            todo.remove();
        });
        // todo.remove();
    }
    // Checked or Done
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterToDo(event) {

    const todos = todoList.childNodes;
    // n = todo_temp.length;
    // const todos = todoList.childNodes[1, n];
    // console.log(todos);
    todos.forEach(function (todo) {
        if (todo.nodeName === '#text') {
            // do nothing
        } else {
            switch (event.target.value) {
                case "all":
                    todo.style.display = 'flex';
                    break;
                case "completed":
                    if (todo.classList.contains('completed')) {
                        todo.style.display = 'flex';
                    } else {
                        todo.style.display = 'none';
                    }
                    break;
                case "uncompleted":
                    if (!todo.classList.contains('completed')) {
                        todo.style.display = 'flex';
                    } else {
                        todo.style.display = 'none';
                    }
                    break;
            }
        }
    });
}

function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function (todo) {
        // create todo div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        // create li
        const newToDo = document.createElement('li');
        newToDo.innerText = todo;  
        newToDo.classList.add('todo-item');
        todoDiv.appendChild(newToDo);
        // Add todo to local storage
        // saveLocalTodos(todoInput.value);
        // Checked/ Done button
        const completed = document.createElement('button');
        completed.innerHTML = "<i class='fas fa-check'></i>";
        completed.classList.add('complete-btn');
        todoDiv.appendChild(completed)
        // Trash / Delete button
        const del = document.createElement('button');
        del.innerHTML = "<i class='fas fa-trash'></i>";
        del.classList.add('del-btn');
        todoDiv.appendChild(del);
        // Append to List
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo){
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoindex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoindex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
} 