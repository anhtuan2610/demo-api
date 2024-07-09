import { $, $$ } from "../services/lib.js";
import { createTask, getTasks, updateTask, deleteTask } from "../services/index.js";
const API_URL = "http://localhost:4444/api/tasks"

function togglePopup() {
  $("popup-1").classList.toggle("active");
}


function togglePopup2() {
  $("popup-2").classList.toggle("active");
}

function loadingShow() {
  $("list-loading").classList.toggle("active");
}

$("btn-plus").addEventListener("click", togglePopup);
$("btn-cancel").addEventListener("click", togglePopup);
$("btn-cancel2").addEventListener("click", togglePopup2);

console.log("re-render");

const renderTask = async () => {
  loadingShow();
  let listElm = $("task-list");
  const tasks = await getTasks(API_URL, "GET");

  if (tasks !== null) {
    loadingShow();
  }
  tasks.forEach(elm => {
    listElm.innerHTML += `<div class="task-item">
        <div class="task-name">${elm.name}</div>
        <div class="task-btn">
          <button class="btn-info" data-id="${elm.id}">i</button>
          <button class="btn-remove" data-id="${elm.id}">-</button>
        </div>
      </div>`
  });
  handleCreateTask();
  handleUpdateTask(tasks);
  handleDeleteTask(tasks);
}

const handleCreateTask = () => {
  $("btn-apply").addEventListener("click", async (e) => {
    let nameTask = $("new-task").value;
    const task = {
      name: nameTask,
      isChecked: true,
    };
    const response = await createTask(API_URL, "POST", task);
  });
}

const handleUpdateTask = (tasks) => {
  $$(".btn-info").forEach(elm => {
    elm.addEventListener("click", () => {
      togglePopup2();
      const taskId = elm.getAttribute("data-id");
      let taskFound = tasks.find((tasks) => {
        return tasks.id == taskId;
      });
      let nameTask = taskFound.name;
      $("edit-task").value = nameTask;
      $("btn-edit").addEventListener("click", async () => {
        let newTaskName = $("edit-task").value;
        taskFound.name = newTaskName;
        const response = await updateTask(API_URL + `/${taskId}`, "PUT", taskFound);
      });
    });
  });
}

const handleDeleteTask = (tasks) => {
  $$(".btn-remove").forEach(elm => {
    elm.addEventListener("click", async () => {
      const taskId = elm.getAttribute("data-id");
      let taskFound = tasks.find((tasks) => {
        return tasks.id == taskId;
      });
      const response = await deleteTask(API_URL + `/${taskFound.id}`, "DELETE");
    });
  });
}

window.onload = () => {
  renderTask();
}