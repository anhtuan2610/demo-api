var TASK_KEY = "tasks";
var tasks = []
var searchValue = "";
var filter = "all";
const PER_PAGE = 5;
var totalPage = 0;
var page = 1;

function $(id) {
    return document.getElementById(id);
}

function $$(selector) {
    return document.querySelectorAll(selector);
}

function getTask() {
    var tasksLocal = localStorage.getItem(TASK_KEY);
    return JSON.parse(tasksLocal) || [];
}

function setTask(newTasks) {
    localStorage.setItem(TASK_KEY, JSON.stringify(newTasks));
}

function removeTask() {
    localStorage.removeItem(TASK_KEY);
}

function togglePopup() {
    $("popup-1").classList.toggle("active");
}

function togglePopup2() {
    $("popup-2").classList.toggle("active");
}

window.onload = function () {

    var tasks = getTask();
    tasksFilter = getTask();
    totalPage = Math.ceil(tasks.length / PER_PAGE);
    renderTask(getTaskPagination(page));
    setTask(tasks);
    renderPagination();

    function renderTask(tasksParam) {
        var taskList = $("task-list");
        var taskListHtml = [];

        var taskRender = tasksParam || tasks;
        if (taskRender.length === 0) {
            taskListHtml.push("<p>No task !!!!</p>");
            taskList.innerHTML = taskListHtml.join("");
        } else {
            taskListHtml = taskRender.map(function (task) {
                var taskNameStyle = !task.isChecked ? "" : "text-decoration: line-through;"
                return `<div class="task-item">
                <div class="task-name" style="${taskNameStyle}" data-id="${task.id}">${task.name}</div>
                <div class="task-btn">
                    <button class="btn-info" data-id="${task.id}">i</button>
                    <button class="btn-remove" data-id="${task.id}">x</button>
                </div>
                </div>`
            });
            taskList.innerHTML = taskListHtml.join("");

            // ----------------------------------------

            $$(".btn-info").forEach(function (btn) {
                btn.onclick = function () {
                    var taskId = btn.getAttribute("data-id");
                    showEditPopup(taskId);
                }
            });

            $$(".btn-remove").forEach(function (btn) {
                btn.onclick = function () {
                    var taskId = btn.getAttribute("data-id");
                    var taskIndex = tasks.findIndex(function (task) {
                        return taskId == task.id;
                    });
                    tasks.splice(taskIndex, 1);
                    calculateTotalPages();
                    if (page > totalPage) { // neu page hien tai lon hon tong so page thi set cho page hien tai = tong so page
                        page = totalPage;
                    }
                    renderTask(getTaskPagination(page));
                    setTask(tasks);
                    alert("xoa thanh cong");
                    renderPagination();
                }
            });

            $$(".task-name").forEach(function (click) {
                click.onclick = function () {
                    var taskId = click.getAttribute("data-id");
                    tasks.forEach(function (task) {
                        if (task.id == taskId) {
                            task.isChecked = !task.isChecked;
                        }
                    });
                    renderTask()
                }
            });
        }
    }

    function renderPagination(totalPageParam) {
        var totalPageRender = totalPageParam || totalPage;
        var paginationHtml = [];
        for (let index = 1; index <= totalPageRender; index++) {
            paginationHtml.push(`<button class="btn-page" data-page="${index}">${index}</button>`)
        }

        $("pagination").innerHTML = paginationHtml.join("--");

        var paginationBtns = $$("button[data-page]");

        paginationBtns.forEach(function (btn) {
            btn.onclick = function () {
                page = btn.getAttribute("data-page");
                handleChangePage(page);
            };
        });
    }

    $("btn-edit").onclick = function () {
        var taskId = $("btn-edit").getAttribute("data-id");
        var taskIndex = tasks.findIndex(function (task) {
            return task.id == taskId;
        });
        tasks[taskIndex].name = $("edit-task").value;
        renderTask(getTaskPagination(page));
        setTask(tasks);
        togglePopup2();
        alert("edit thanh cong");
    }

    $("btn-apply").onclick = function () {
        var newTask = $("new-task");
        if (newTask.value.length === 0) {
            alert("khong duoc de trong");
        } else {
            tasks.push({
                id: new Date().getTime().toString(),
                name: newTask.value,
                isChecked: false,
            });
            calculateTotalPages();
            page = totalPage;
            renderTask(getTaskPagination(page));
            setTask(tasks);
            newTask.value = "";
            togglePopup();
            alert("add thanh cong");
            renderPagination();
        }
    }

    function showEditPopup(taskId) {
        var task = tasks.find(function (task) {
            return task.id == taskId;
        });
        if (task) {
            $("edit-task").value = task.name;
            $("btn-edit").setAttribute("data-id", task.id);
            togglePopup2();
        } else {
            alert("Task not found");
        }
    }

    $("search").onchange = function (e) {
        searchValue = e.target.value;
        filterTasks();
    };


    $("filter").onchange = function (e) {
        filter = e.target.value;
        filterTasks();
    };

    // $("record").onchange = function (e) {
    //     page = parseInt(e.target.value);
    //     renderTask(getTaskPagination(page));
    // }

    function filterTasks() {
        var taskFilter = tasks.filter(function (task) {
            if (filter === "all") {
                return true && task.name.includes(searchValue);
            }
            if (filter === "done") {
                return task.isChecked === true && task.name.includes(searchValue);
            }
            if (filter === "notdone") {
                return task.isChecked === false && task.name.includes(searchValue);
            }
        });
        totalPage = Math.ceil(taskFilter.length / PER_PAGE);
        if (page > totalPage) {
            page = totalPage;
        }
        renderTask(taskFilter.slice((page - 1) * PER_PAGE, page * PER_PAGE));
        renderPagination(totalPage);
        renderTask(taskFilter);
    }

    function handleChangePage(page) {
        renderTask(getTaskPagination(page));
    }

    function calculateTotalPages() { // tinh tong so trang
        totalPage = Math.ceil(tasks.length / PER_PAGE);
    }

    function getTaskPagination(pageParam) { // tra ve tasks item theo trang
        return tasks.slice((pageParam - 1) * PER_PAGE, PER_PAGE * pageParam);
    }
}

// var a =
//     [
//         a: { a: "a", b: "b" },
//         b: { a: "a", b: "b" },
//     ]