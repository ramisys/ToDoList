let taskList = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTask() {
    localStorage.setItem("tasks", JSON.stringify(taskList));
}

function renderTasks() {
    const currentTask = document.getElementById("currentTask");
    currentTask.innerHTML = "";

    taskList.forEach((task, index) => {
        const li = document.createElement("li");
        li.classList.add("task");

        li.innerHTML = `
            <div class="taskLeft">
                <input type="checkbox" ${task.completed ? "checked" : ""} onchange="toggleTask(${index})">
                <span class="taskText ${task.completed ? 'completed' : ''}">${task.text}</span>
            </div>
            <button onclick="deleteTask(${index})" class="deleteBtn">
                <i class="fa-solid fa-trash"></i> Delete
            </button>
        `;

        currentTask.appendChild(li);
    });
}

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task!");
        return;
    }

    // Push as object with completed = false
    taskList.push({ text: text, completed: false });
    saveTask();
    renderTasks();
    taskInput.value = "";
}

function deleteTask(index) {
    taskList.splice(index, 1);
    saveTask();
    renderTasks();
}

function toggleTask(index) {
    taskList[index].completed = !taskList[index].completed;
    saveTask();
    renderTasks();
}

function clearTasks() {
    localStorage.clear();
    taskList = [];
    document.getElementById("currentTask").innerHTML = "";
    alert("All tasks have been cleared!");
    renderTasks();
}

renderTasks();