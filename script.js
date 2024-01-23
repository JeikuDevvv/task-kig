document.addEventListener("DOMContentLoaded", function () {
  loadTasks();
});

function addTask() {
  var taskInput = document.getElementById("taskInput");

  if (taskInput.value.trim() === "") {
    alert("Please enter a task.");
    return;
  }

  var taskData = {
    text: taskInput.value,
    completed: false,
    createdDate: new Date().toISOString(),
  };

  var tasks = getTasks();
  tasks.push(taskData);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  taskInput.value = "";
  renderTasks();
}

function renderTasks() {
  var taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  var tasks = getTasks();

  tasks.forEach(function (task, index) {
    var taskItem = document.createElement("div");
    taskItem.classList.add("task-item");

    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.classList.add("checkbox");
    checkbox.addEventListener("change", function () {
      toggleTask(index);
    });

    var taskDetails = document.createElement("div");
    taskDetails.classList.add("task-details");

    var taskTitle = document.createElement("div");
    taskTitle.classList.add("task-title");
    taskTitle.innerText = task.text;

    var detailsButton = document.createElement("button");
    detailsButton.innerText = "Details";
    detailsButton.classList.add("details-button");
    detailsButton.addEventListener("click", function () {
      openModal(task);
    });

    var deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener("click", function () {
      deleteTask(index);
    });

    taskDetails.appendChild(taskTitle);
    taskDetails.appendChild(detailsButton);

    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskDetails);
    taskItem.appendChild(deleteButton);

    taskList.appendChild(taskItem);
  });
}

function toggleTask(index) {
  var tasks = getTasks();
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function deleteTask(index) {
  var tasks = getTasks();
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function getTasks() {
  var storedTasks = localStorage.getItem("tasks");
  return storedTasks ? JSON.parse(storedTasks) : [];
}

function loadTasks() {
  renderTasks();
}

// Function to open the modal
function openModal(task) {
  var modal = document.getElementById("taskDetailsModal");
  modal.style.display = "block";

  // Update modal content with task details
  var createdDate = document.getElementById("createdDate");
  var finishedDate = document.getElementById("finishedDate");
  createdDate.innerText =
    "Created: " + new Date(task.createdDate).toLocaleString();

  if (task.completed) {
    finishedDate.innerText = "Finished: " + new Date().toLocaleString();
  } else {
    finishedDate.innerText = "Finished: Not completed";
  }
}

// Function to close the modal
function closeModal() {
  var modal = document.getElementById("taskDetailsModal");
  modal.style.display = "none";
}

// Function to toggle dark and light modes
function toggleMode() {
  document.body.classList.toggle("dark-mode");
}
