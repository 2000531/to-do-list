
document.addEventListener("DOMContentLoaded", () => {
    // DOM elements
    const newTaskInput = document.getElementById("new-task-input")
    const addTaskBtn = document.getElementById("add-task-btn")
    const tasksContainer = document.getElementById("tasks-container")
    const emptyState = document.getElementById("empty-state")
  
    // Load tasks from localStorage
    let tasks = JSON.parse(localStorage.getItem("tasks")) || []
  
    // Render initial tasks
    renderTasks()
  
    // Event listeners
    addTaskBtn.addEventListener("click", addTask)
    newTaskInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        addTask()
      }
    })
  
    // Functions
    function addTask() {
      const taskText = newTaskInput.value.trim()
      if (taskText === "") return
  
      const task = {
        id: Date.now().toString(),
        text: taskText,
        completed: false,
      }
  
      tasks.push(task)
      saveTasks()
      renderTasks()
      newTaskInput.value = ""
    }
  
    function toggleTaskCompletion(id) {
      tasks = tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
      saveTasks()
      renderTasks()
    }
  
    function deleteTask(id) {
      tasks = tasks.filter((task) => task.id !== id)
      saveTasks()
      renderTasks()
    }
  
    function saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(tasks))
    }
  
    function renderTasks() {
      // Show/hide empty state
      if (tasks.length === 0) {
        emptyState.style.display = "block"
      } else {
        emptyState.style.display = "none"
      }
  
      // Clear existing tasks (except empty state)
      const taskElements = tasksContainer.querySelectorAll(".task-item")
      taskElements.forEach((el) => el.remove())
  
      // Render each task
      tasks.forEach((task) => {
        const taskElement = document.createElement("div")
        taskElement.className = `task-item flex items-center justify-between rounded-lg border p-3 shadow-sm ${
          task.completed ? "completed-task" : ""
        }`
  
        taskElement.innerHTML = `
          <div class="flex items-center space-x-3">
            <input 
              type="checkbox" 
              id="task-${task.id}" 
              class="h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
              ${task.completed ? "checked" : ""}
            >
            <label 
              for="task-${task.id}" 
              class="text-sm font-medium leading-none ${task.completed ? "completed" : ""}"
            >
              ${task.text}
            </label>
          </div>
          <button 
            class="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
            aria-label="Delete task"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 6h18"></path>
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          </button>
        `
  
        // Add event listeners
        const checkbox = taskElement.querySelector(`#task-${task.id}`)
        checkbox.addEventListener("change", () => toggleTaskCompletion(task.id))
  
        const deleteBtn = taskElement.querySelector("button")
        deleteBtn.addEventListener("click", () => deleteTask(task.id))
  
        tasksContainer.appendChild(taskElement)
      })
    }
  })
  
  