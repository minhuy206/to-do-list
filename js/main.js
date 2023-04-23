import Task from "./Task.js";
import ToDoListService from "./ToDoListService.js";
const toDoListService = new ToDoListService();
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const today = new Date();

const year = today.getFullYear();
const date = today.getDate();
const month = today.getMonth();

document.getElementsByClassName(
  "card__today"
)[0].innerHTML = `${months[month]} ${date}, ${year}`;

const getEle = (id) => document.getElementById(id);
let uncompletedTaskArr = [];
let completedTaskArr = [];
let azOrderArr = [];

// Filter task
const filterTasks = (data) => {
  uncompletedTaskArr = data.filter((task) => task.state === "uncompleted");
  completedTaskArr = data.filter((task) => task.state === "completed");
};

// renderHTML
const renderHTML = (data, id) => {
  let content = "";
  data.forEach((task) => {
    content += `
    <li>
        ${task.task}
        <div class="buttons">
        <button class="remove" onclick="deleteTask(${task.id})">
            <i class="fa-solid fa-trash-can"></i>
        </button>
        <button class="complete" onclick="changeStateToDoList(${task.id}, '${task.task}')">
            <i class="fa-regular fa-circle-check fas far"></i>
        </button>
        </div>
    </li>
    `;
  });
  getEle(id).innerHTML = content;
};

const getToDoList = () => {
  toDoListService
    .getToDoListApi()
    .then((result) => {
      filterTasks(result.data);
      renderHTML(uncompletedTaskArr, "todo");
      renderHTML(completedTaskArr, "completed");
    })
    .catch((error) => {
      console.log(error);
    });
};

getToDoList();

// Thêm task
getEle("addItem").addEventListener("click", () => {
  let newTask = getEle("newTask").value;
  if (newTask) {
    const task = new Task("", newTask, "uncompleted");

    toDoListService
      .addToDoListApi(task)
      .then((result) => {
        getToDoList();
        getEle("newTask").value = "";
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    alert("Please enter activity!");
  }
});

// Xoá task
const deleteTask = (id) => {
  toDoListService
    .deleteToDoListApi(id)
    .then(() => {
      getToDoList();
    })
    .catch((error) => {
      console.log(error);
    });
};
window.deleteTask = deleteTask;

// Note hoan thanh task
const changeStateToDoList = (id, completedTask) => {
  const task = new Task(id, completedTask, "completed");
  toDoListService
    .changeStateToDoListApi(task)
    .then(() => {
      getToDoList();
    })
    .catch((error) => {
      console.log(error);
    });
};
window.changeStateToDoList = changeStateToDoList;

// Sắp xếp từ a-z
document.getElementById("two").addEventListener("click", () => {
  azOrderArr = uncompletedTaskArr.sort((a, b) => a.task.localeCompare(b.task));
  renderHTML(azOrderArr, "todo");
});

// Sắp xếp từ z-a
document.getElementById("three").addEventListener("click", () => {
  azOrderArr = uncompletedTaskArr.sort((a, b) => a.task.localeCompare(b.task));
  renderHTML(azOrderArr.reverse(), "todo");
});
