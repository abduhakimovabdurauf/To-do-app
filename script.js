let todoList = JSON.parse(localStorage.getItem('todoList')) || [];
let currentTaskId = null;

function addTask() {
    const taskInput = document.getElementById("new-task").value;
    if (taskInput === '') {
        alert("Task cannot be empty!");
        return;
    }
    
    const task = {
        id: Date.now(),
        name: taskInput,
        completed: false
    };

    todoList.push(task);
    document.getElementById("new-task").value = '';
    saveToLocalStorage();
    renderTasks();
}

function renderTasks() {
    const todoListElement = document.getElementById("todo-list");
    todoListElement.innerHTML = '';

    todoList.forEach(task => {
        const listItem = document.createElement("li");
        listItem.classList.toggle("done", task.completed);

        listItem.innerHTML = `
            <span>${task.name}</span>
            <div>
                <button class="edit" onclick="openModal(${task.id})">Edit</button>
                <button class="done" onclick="toggleTask(${task.id})">${task.completed ? "Undone" : "Done"}</button>
                <button class="delete" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;

        todoListElement.appendChild(listItem);
    });
}

function toggleTask(taskId) {
    todoList = todoList.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    saveToLocalStorage();
    renderTasks();
}

function deleteTask(taskId) {
    todoList = todoList.filter(task => task.id !== taskId);
    saveToLocalStorage();
    renderTasks();
}

function openModal(taskId) {
    currentTaskId = taskId;
    const task = todoList.find(task => task.id === taskId);
    document.getElementById("edit-task-input").value = task.name;

    const modal = document.getElementById("edit-modal");
    modal.style.display = "block";
    modal.classList.add('fade-in');
    window.onclick = function(event) {
        if (event.target === modal) {
            closeModal();
        }
    };
}

function closeModal() {
    const modal = document.getElementById("edit-modal");
    modal.classList.remove('fade-in');
    modal.style.display = "none";
    document.getElementById("edit-task-input").value = '';
    window.onclick = null;
}


function saveEdit() {
    const newTaskName = document.getElementById("edit-task-input").value;
    if (newTaskName.trim() === '') {
        alert("Task cannot be empty!");
        return;
    }

    todoList = todoList.map(task =>
        task.id === currentTaskId ? { ...task, name: newTaskName } : task
    );

    saveToLocalStorage();
    closeModal();
    renderTasks();
}

// Local Storage-ga saqlash funksiyasi
function saveToLocalStorage() {
    localStorage.setItem('todoList', JSON.stringify(todoList));
}

// Dastur yuklanganda Local Storage'dan yuklash
window.onload = function() {
    renderTasks();
};
