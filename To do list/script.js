// DOM Elements
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Load tasks from localStorage on page load
document.addEventListener('DOMContentLoaded', loadTasks);

// Add Task
addTaskBtn.addEventListener('click', addTask);

// Function to add a new task
function addTask() {
  const task = taskInput.value.trim();
  if (task === '') {
    alert('Please enter a task!');
    return;
  }

  // Create task element
  const li = document.createElement('li');
  li.innerHTML = `
    <span>${task}</span>
    <button class="delete-btn">Delete</button>
  `;

  // Add event listeners
  li.querySelector('span').addEventListener('click', () => li.classList.toggle('completed'));
  li.querySelector('.delete-btn').addEventListener('click', () => {
    li.remove();
    saveTasks();
  });

  // Append to list
  taskList.appendChild(li);

  // Clear input
  taskInput.value = '';

  // Save tasks to localStorage
  saveTasks();
}

// Function to load tasks from localStorage
function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  savedTasks.forEach(taskData => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${taskData.text}</span>
      <button class="delete-btn">Delete</button>
    `;

    if (taskData.completed) {
      li.classList.add('completed');
    }

    li.querySelector('span').addEventListener('click', () => li.classList.toggle('completed'));
    li.querySelector('.delete-btn').addEventListener('click', () => {
      li.remove();
      saveTasks();
    });

    taskList.appendChild(li);
  });
}

// Function to save tasks to localStorage
function saveTasks() {
  const tasks = [];
  taskList.querySelectorAll('li').forEach(li => {
    tasks.push({
      text: li.querySelector('span').textContent,
      completed: li.classList.contains('completed'),
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
