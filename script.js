// Ensure the script runs only after the DOM has fully loaded
document.addEventListener('DOMContentLoaded', function() {

    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task to the list
    function addTask() {

        // Get and trim the value from the input field
        const taskText = taskInput.value.trim();

        // If input is empty, alert the user
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create a new <li> and set its textContent
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create the remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";

        // REQUIRED: use classList.add (not className)
        removeBtn.classList.add('remove-btn');

        // Remove task when button is clicked
        removeBtn.onclick = function() {
            taskList.removeChild(li);
        };

        // Append remove button to li, then li to the list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear input field
        taskInput.value = "";
    }

    // Click event to add task
    addButton.addEventListener('click', addTask);

    // Allow pressing Enter to add task
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Invoke addTask on DOMContentLoaded (required by assignment)
    // This will do nothing because input is empty
    addTask();
});
