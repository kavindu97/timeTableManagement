const { ipcRenderer } = require("electron");

// const taskForm = document.querySelector("#taskForm");
// const taskName = document.querySelector("#taskName");
// const taskDescription = document.querySelector("#taskDescription");
// const taskList = document.querySelector("#taskList");

const time30Form = document.querySelector("#time30Form");
const startingTime30 = document.querySelector("#startingTime30");
const endingTime30 = document.querySelector("#endingTime30");

const time30List = document.querySelector("#time30List");

let updateStatus = false;
let idTime30ToUpdate = "";

//Tag

function deleteTime30(id) {
  const response = confirm("are you sure you want to delete time slot?");
  if (response) {
    ipcRenderer.send("delete-time30", id);
  }
  return;
}

function editTime30(id) {
  updateStatus = true;
  idTime30ToUpdate = id;

  const time30 = time30s.find((time30) => time30._id === id);
    startingTime30.value = time30.startingTime30,
    endingTime30.value = time30.endingTime30
}

function renderTime30s(time30s) {
    time30List.innerHTML = `<table class="table table-striped">
  <thead>
          <tr>
          <th style="width:100px; display:inline-block; overflow:hidden">Starting Time</th>
          <th style="width:100px; display:inline-block; overflow:hidden">Ending Time</th>
          </tr>
        </thead>
        </table>
  `;
  console.log(time30s);
  time30s.map((t) => {
    time30List.innerHTML += `
          <table class="table table-striped">
                <tbody>
                  <tr>
                    <td style="width:100px; display:inline-block; overflow:hidden">${t.startingTime30}</td>
                    <td style="width:100px; display:inline-block; overflow:hidden">${t.endingTime30}</td>
                    <td style="width:198px; display:inline-block; overflow:hidden">
                    <button class="btn btn-success" onclick="editTime30('${t._id}')">
                   Edit
                </button>
                    <button class="btn btn-danger" onclick="deleteTime30('${t._id}')">
                    Delete
                  </button>
                </td>
                  </tr>   
          </table>
        `;
  });
}

let time30s = [];
ipcRenderer.send("get-time30s");

time30Form.addEventListener("submit", async (e) => {
  console.log("fghghf");
  e.preventDefault();

  const time30 = {
    startingTime30: startingTime30.value,
    endingTime30: endingTime30.value,
  };

  if (!updateStatus) {
    ipcRenderer.send("new-time30", time30);
  } else {
    ipcRenderer.send("update-time30", { ...time30, idTime30ToUpdate });
  }

  time30Form.reset();
});

ipcRenderer.on("new-time30-created", (e, arg) => {
  console.log(arg);
  const time30Saved = JSON.parse(arg);
  time30s.push(time30Saved);
  renderTime30s(time30s);
  alert("Student Created Successfully");
  acedemicYear.focus();
});

ipcRenderer.on("get-time30s", (e, args) => {
  const receivedTime30s = JSON.parse(args);
  time30s = receivedTime30s;
  renderTime30s(time30s);
});

ipcRenderer.on("delete-time30-success", (e, args) => {
  const deletedTime30 = JSON.parse(args);
  const newTime30s = time30s.filter((t) => {
    return t._id !== deletedTime30._id;
  });
  time30s = newTime30s;
  renderTime30s(time30s);
});

ipcRenderer.on("update-time30-success", (e, args) => {
  updateStatus = false;
  const updatedTime30 = JSON.parse(args);
  time30s = time30s.map((t, i) => {
    if (t._id === updatedTime30._id) {
      (t.startingTime30 = updatedTime30.startingTime30),
        (t.endingTime30 = updatedTime30.endingTime30);
    }
    return t;
  });
  renderTime30s(time30s);
});
