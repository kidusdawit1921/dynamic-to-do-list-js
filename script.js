// Ensure the script runs only after the DOM has fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const STORAGE_KEY = 'tasks';

    function saveTasksToLocalStorage(tasksArray) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasksArray));
    }

    function getStoredTasks() {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    }

    function addTask(taskText = null, save = true) {
        let text;
        const calledByUser = (taskText === null || taskText === undefined);

        if (calledByUser) {
            text = taskInput.value.trim();
            if (text === "") {
                alert("Please enter a task.");
                return;
            }
        } else {
            text = String(taskText);
            if (text.trim() === "") return;
        }

        const li = document.createElement('li');
        li.textContent = text;
        li.dataset.task = text;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.classList.add('remove-btn');

        removeBtn.onclick = function () {
            taskList.removeChild(li);
            const storedTasks = getStoredTasks();
            const index = storedTasks.indexOf(li.dataset.task);
            if (index !== -1) {
                storedTasks.splice(index, 1);
                saveTasksToLocalStorage(storedTasks);
            }
        };

        li.appendChild(removeBtn);
        taskList.appendChild(li);

        if (calledByUser) taskInput.value = "";

        if (save) {
            const storedTasks = getStoredTasks();
            storedTasks.push(text);
            saveTasksToLocalStorage(storedTasks);
        }
    }

    function loadTasks() {
        const storedTasks = getStoredTasks();
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    addButton.addEventListener('click', function () {
        addTask();
    });

    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    loadTasks();
});
