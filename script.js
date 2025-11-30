// Ensure the script runs only after the DOM has fully loaded
document.addEventListener('DOMContentLoaded', function() {

    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    /**
     * Adds a new task to the list.
     * @param {boolean} calledByUser - when true, treat empty input as an error and alert the user.
     *                                  when false/undefined (e.g. called on DOMContentLoaded), do nothing on empty input.
     */
    function addTask(calledByUser) {
        // Get and trim the value from the input field
        const taskText = taskInput.value.trim();

        // If input is empty:
        // - If called by user, show alert (required by spec)
        // - If not called by user (e.g. DOMContentLoaded), quietly return (prevents unwanted alert on load)
        if (taskText === "") {
            if (calledByUser) {
                alert("Please enter a task.");
            }
            return;
        }

        // Create a new <li> element and set its textContent
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create the remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.className = 'remove-btn';

        // Assign onclick event to remove this <li> from the taskList
        removeBtn.onclick = function() {
            // Use removeChild as requested by the spec
            taskList.removeChild(li);
        };

        // Append the remove button to the li, then append the li to the task list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear the input field
        taskInput.value = "";
    }

    // Add an event listener to addButton that calls addTask when the button is clicked.
    // Pass true to indicate this call was initiated by the user (so empty input triggers alert).
    addButton.addEventListener('click', function() {
        addTask(true);
    });

    // Add an event listener to taskInput for the 'keypress' event to allow pressing Enter to add task.
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask(true); // called by user via Enter key
        }
    });

    // Invoke addTask on DOMContentLoaded (per the assignment instruction).
    // We call it without the user flag so it won't alert on empty input.
    addTask();
});
