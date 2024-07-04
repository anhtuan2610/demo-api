// async function getAllProduct() {
//     try {
//         let res = await fetch("http://localhost:4444/api/products");
//         let data = await res.json();
//         return data;
//     } catch (error) {
//         console.error('Error fetching data:' + error);
//     }
// }

async function getAllTask() {
    try {
        let res = await fetch("http://localhost:4444/api/tasks")
        let data = await res.json();
        return data;
    } catch (error) {
        console.log("error: " + error);
    }
}

function createTask(data) {
    return fetch("http://localhost:4444/api/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    })
};

function $(id) {
    return document.getElementById(id);
}

function togglePopup() {
    $("popup-1").classList.toggle("active");
}

window.onload = async function () {
    $("btn-apply").onclick = function () {
        var valueInput = $("new-task").value;
        const data = {
            name: valueInput,
            isChecked: true,
        };
        createTask(data);
        togglePopup();
    }
    var taskList = $("task-list");
    let dataTask = await getAllTask();
    dataTask.forEach(elm => {
        taskList.innerHTML += `<div class="task-item">
        <div class="task-name">${elm.name}</div>
        <div class="task-btn">
          <button class="btn-info">i</button>
          <button class="btn-remove">-</button>
        </div>
      </div>`
    });




    // let data = await getAllProduct();
    // console.log(data);
    // const data = {
    //     name: "tuan1",
    //     isChecked: true,
    // };
    // createTask(data);
}