const { ipcRenderer } = require("electron");

// const taskForm = document.querySelector("#taskForm");
// const taskName = document.querySelector("#taskName");
// const taskDescription = document.querySelector("#taskDescription");
// const taskList = document.querySelector("#taskList");

const time60Form = document.querySelector("#time60Form");
const startingTime60 = document.querySelector("#startingTime60");
const endingTime60 = document.querySelector("#endingTime60");

const time60List = document.querySelector("#time60List");

let updateStatus = false;
let idTime60ToUpdate = "";

//Tag

function deleteTime60(id) {
  const response = confirm("are you sure you want to delete time slot?");
  if (response) {
    ipcRenderer.send("delete-time60", id);
  }
  return;
}

function editTime60(id) {
  updateStatus = true;
  idTime60ToUpdate = id;

  const time60 = time60s.find((time60) => time60._id === id);
    startingTime60.value = time60.startingTime60,
    endingTime60.value = time60.endingTime60
}

function renderTime60s(time60s) {
    time60List.innerHTML = `<table class="table table-striped">
  <thead>
          <tr>
          <th style="width:100px; display:inline-block; overflow:hidden">Starting Time</th>
          <th style="width:100px; display:inline-block; overflow:hidden">Ending Time</th>
          </tr>
        </thead>
        </table>
  `;
  console.log(time60s);
  time60s.map((t) => {
    time60List.innerHTML += `
          <table class="table table-striped">
                <tbody>
                  <tr>
                    <td style="width:100px; display:inline-block; overflow:hidden">${t.startingTime60}</td>
                    <td style="width:100px; display:inline-block; overflow:hidden">${t.endingTime60}</td>
                    <td style="width:198px; display:inline-block; overflow:hidden">
                    <button class="btn btn-success" onclick="editTime60('${t._id}')">
                   Edit
                </button>
                    <button class="btn btn-danger" onclick="deleteTime60('${t._id}')">
                    Delete
                  </button>
                </td>
                  </tr>   
          </table>
        `;
  });
}

let time60s = [];
ipcRenderer.send("get-time60s");

time60Form.addEventListener("submit", async (e) => {
  console.log("fghghf");
  e.preventDefault();

  const time60 = {
    startingTime60: startingTime60.value,
    endingTime60: endingTime60.value,
  };

  if (!updateStatus) {
    ipcRenderer.send("new-time60", time60);
  } else {
    ipcRenderer.send("update-time60", { ...time60, idTime60ToUpdate });
  }

  time60Form.reset();
});

ipcRenderer.on("new-time60-created", (e, arg) => {
  console.log(arg);
  const time60Saved = JSON.parse(arg);
  time60s.push(time60Saved);
  renderTime60s(time60s);
  alert("Student Created Successfully");
});



ipcRenderer.on("get-time60s", (e, args) => {
  const receivedTime60s = JSON.parse(args);
  time60s = receivedTime60s;
  renderTime60s(time60s);
});

ipcRenderer.on("delete-time60-success", (e, args) => {
  const deletedTime60 = JSON.parse(args);
  const newTime60s = time60s.filter((t) => {
    return t._id !== deletedTime60._id;
  });
  time60s = newTime60s;
  renderTime60s(time60s);
});

ipcRenderer.on("update-time60-success", (e, args) => {
  updateStatus = false;
  const updatedTime60 = JSON.parse(args);
  time60s = time60s.map((t, i) => {
    if (t._id === updatedTime60._id) {
      (t.startingTime60 = updatedTime60.startingTime60),
        (t.endingTime60 = updatedTime60.endingTime60);
    }
    return t;
  });
  renderTime60s(time60s);
});
