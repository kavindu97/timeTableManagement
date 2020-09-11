const { ipcRenderer } = require("electron");

// const taskForm = document.querySelector("#taskForm");
// const taskName = document.querySelector("#taskName");
// const taskDescription = document.querySelector("#taskDescription");
// const taskList = document.querySelector("#taskList");

const workingForm = document.querySelector("#workingForm");
const numberOfWorking = document.querySelector("#numberOfWorking");
const monday = document.querySelector("#monday");
const tuesday = document.querySelector("#tuesday");
const wednesday = document.querySelector("#wednesday");
const thursday = document.querySelector("#thursday");
const friday = document.querySelector("#friday");

const workingList = document.querySelector("#workingList");

let updateStatus = false;
let idWorkingToUpdate = "";

//Tag

function deleteWorking(id) {
  const response = confirm("are you sure you want to delete time slot?");
  if (response) {
    ipcRenderer.send("delete-working", id);
  }
  return;
}

function editWorking(id) {
  updateStatus = true;
  idWorkingToUpdate = id;

  const working = workings.find((working) => working._id === id);
    numberOfWorking.value = working.numberOfWorking,
    monday.value = working.monday,
    tuesday.value = working.tuesday,
    wednesday.value = working.wednesday,
    thursday.value = working.thursday,
    friday.value = working.friday
}

function renderWorkings(workings) {
    workingList.innerHTML = `<table class="table table-striped">
  <thead>
          <tr>
          <th style="width:100px; display:inline-block; overflow:hidden">Number Days</th>
          <th style="width:100px; display:inline-block; overflow:hidden">Monday</th>
          <th style="width:100px; display:inline-block; overflow:hidden">tuesday</th>
          <th style="width:100px; display:inline-block; overflow:hidden">wednesday</th>
          <th style="width:100px; display:inline-block; overflow:hidden">thursday</th>
          <th style="width:100px; display:inline-block; overflow:hidden">friday</th>
          </tr>
        </thead>
        </table>
  `;
  console.log(workings);
  workings.map((t) => {
    workingList.innerHTML += `
          <table class="table table-striped">
                <tbody>
                  <tr>
                    <td style="width:100px; display:inline-block; overflow:hidden">${t.numberOfWorking}</td>
                    <td style="width:100px; display:inline-block; overflow:hidden">${t.monday}</td>
                    <td style="width:100px; display:inline-block; overflow:hidden">${t.tuesday}</td>
                    <td style="width:100px; display:inline-block; overflow:hidden">${t.wednesday}</td>
                    <td style="width:100px; display:inline-block; overflow:hidden">${t.thursday}</td>
                    <td style="width:100px; display:inline-block; overflow:hidden">${t.friday}</td>
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

let workings = [];
ipcRenderer.send("get-workings");

workingForm.addEventListener("submit", async (e) => {
  console.log(monday.value);
  e.preventDefault();

  const working = {
    numberOfWorking: numberOfWorking.value,
    monday: monday.value,
    tuesday: tuesday.value,
    wednesday: wednesday.value,
    thursday: thursday.value,
    friday: friday.value,
  };

  if (!updateStatus) {
    console.log("fghghf");
    ipcRenderer.send("new-working", working);
  } else {
    ipcRenderer.send("update-working", { ...working, idWorkingToUpdate });
  }

  workingForm.reset();
});

ipcRenderer.on("new-working-created", (e, arg) => {
  console.log("2");
  console.log(arg);
  const workingSaved = JSON.parse(arg);
  workings.push(workingSaved);
  renderWorkings(workings);
  alert("Student Created Successfully");
  acedemicYear.focus();
});

ipcRenderer.on("get-workings", (e, args) => {
  const receivedWorkings = JSON.parse(args);
  workings = receivedWorkings;
  renderWorkings(workings);
});

ipcRenderer.on("delete-working-success", (e, args) => {
  const deletedWorking = JSON.parse(args);
  const newWorkings = workings.filter((t) => {
    return t._id !== deletedWorkings._id;
  });
  workings = newWorkings;
  renderWorkings(workings);
});

ipcRenderer.on("update-working-success", (e, args) => {
  updateStatus = false;
  const updatedWorking = JSON.parse(args);
  workings = workings.map((t, i) => {
    if (t._id === updatedWorking._id) {
      (t.numberOfWorking = updatedWorking.numberOfWorking),
        (t.monday = updatedWorking.monday),
        (t.tuesday = updatedWorking.tuesday),
        (t.wednesday = updatedWorking.wednesday),
        (t.thursday = updatedWorking.thursday),
        (t.friday = updatedWorking.friday);
    }
    return t;
  });
  renderWorkings(workings);
});
