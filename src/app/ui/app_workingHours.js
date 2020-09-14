const { ipcRenderer } = require("electron");

// const taskForm = document.querySelector("#taskForm");
// const taskName = document.querySelector("#taskName");
// const taskDescription = document.querySelector("#taskDescription");
// const taskList = document.querySelector("#taskList");

const workingHoursForm = document.querySelector("#workingHoursForm");
const hours = document.querySelector("#hours");
const minutes = document.querySelector("#minutes");

const workingHoursList = document.querySelector("#workingHoursList");

let updateStatus = false;
let idWorkingHoursToUpdate = "";

//Tag

function deleteWorkingHours(id) {
  const response = confirm("are you sure you want to delete time slot?");
  if (response) {
    ipcRenderer.send("delete-workingHours", id);
  }
  return;
}

function editWorkingHours(id) {
  updateStatus = true;
  idWorkingHoursToUpdate = id;

  const workingHours = workingHourss.find((workingHours) => workingHours._id === id);
    hours.value = workingHours.hours,
    minutes.value = workingHours.minutes
}

function renderWorkingHourss(workingHourss) {
    workingHoursList.innerHTML = `<table class="table table-striped">
  <thead>
          <tr>
          <th style="width:100px; display:inline-block; overflow:hidden">Hours</th>
          <th style="width:100px; display:inline-block; overflow:hidden">Minutes</th>
          </tr>
        </thead>
        </table>
  `;
  console.log(workingHourss);
  workingHourss.map((t) => {
    workingHoursList.innerHTML += `
          <table class="table table-striped">
                <tbody>
                  <tr>
                    <td style="width:100px; display:inline-block; overflow:hidden">${t.hours}</td>
                    <td style="width:100px; display:inline-block; overflow:hidden">${t.minutes}</td>
                    <td style="width:198px; display:inline-block; overflow:hidden">
                    <button class="btn btn-success" onclick="editWorkingHours('${t._id}')">
                   Edit
                </button>
                    <button class="btn btn-danger" onclick="deleteWorkingHours('${t._id}')">
                    Delete
                  </button>
                </td>
                  </tr>   
          </table>
        `;
  });
}

let workingHours = [];
ipcRenderer.send("get-workingHourss");

workingHoursForm.addEventListener("submit", async (e) => {
  console.log("fghghf1");
  e.preventDefault();

  const workingHours = {
    hours: hours.value,
    minutes: minutes.value
  };

  if (!updateStatus) {
    console.log("fghghf2");
    ipcRenderer.send("new-workingHours", workingHours);
  } else {
    ipcRenderer.send("update-workingHours", { ...workingHours, idWorkingHoursToUpdate });
  }

  workingHoursForm.reset();
});

ipcRenderer.on("new-workingHours-created", (e, arg) => {
  console.log(arg);
  const workingHoursSaved = JSON.parse(arg);
  workingHourss.push(workingHoursSaved);
  renderWorkingHourss(workingHourss);
  alert("Student Created Successfully");
  acedemicYear.focus();
});

ipcRenderer.on("get-workingHourss", (e, args) => {
  const receivedWorkingHourss = JSON.parse(args);
  workingHourss = receivedWorkingHourss;
  renderWorkingHourss(workingHourss);
});

ipcRenderer.on("delete-workingHourss-success", (e, args) => {
  const deletedWorkingHours = JSON.parse(args);
  const newWorkingHourss = workingHourss.filter((t) => {
    return t._id !== deletedWorkingHours._id;
  });
  workingHourss = newWorkingHourss;
  renderWorkingHourss(workingHourss);
});

ipcRenderer.on("update-workingHours-success", (e, args) => {
  updateStatus = false;
  const updatedWorkingHours = JSON.parse(args);
  workingHourss = workingHourss.map((t, i) => {
    if (t._id === updatedWorkingHours._id) {
      (t.hours = updatedWorkingHours.hours),
        (t.minutes = updatedWorkingHours.minutes)
    }
    return t;
  });
  renderWorkingHourss(workingHourss);
});
