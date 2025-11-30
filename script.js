// Make sure the code runs only after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    function addTask() {

        // Retrieve and trim the input value
        const taskText = taskInput.value.trim();

        // Alert if the task is empty
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create a new <li> element and set its textContent
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = "remove-btn";

        // Remove button event: removes the <li> from the list
        removeButton.onclick = function () {
            taskList.removeChild(li);
        };

        // Append the remove button to <li>, then append <li> to <ul>
        li.appendChild(removeButton);
        taskList.appendChild(li);

        // Clear the input field
        taskInput.value = "";
    }

    // Add task when clicking the button
    addButton.addEventListener('click', addTask);

    // Add task when pressing Enter
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // This line should exist per the assignment instructions
    // but should NOT auto-add a task, so we only call the function (no effect)
    addTask;  
});
