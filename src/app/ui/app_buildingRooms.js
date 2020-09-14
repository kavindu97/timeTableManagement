const { ipcRenderer } = require("electron");

const buildingForm = document.querySelector("#buildingForm");
const buildingName = document.querySelector("#buildingName");
const buildingBlock = document.querySelector("#buildingBlock");
const buildingDes = document.querySelector("#buildingDes");

const buildingList = document.querySelector("#buildingList");

let updateStatus = false;
let idSBuildingToUpdate = "";

//Building

function deleteBuilding(id) {
  const response = confirm("are you sure you want to delete Building?");
  if (response) {
    ipcRenderer.send("delete-building", id);
  }
  return;
}

function editBuilding(id) {
  updateStatus = true;
  idSBuildingToUpdate = id;

  const building = buildings.find((building) => building._id === id);
  buildingName.value = building.buildingName,
  buildingBlock.value = building.buildingBlock,
  buildingDes.value = building.buildingDes
}

function renderBuildings(buildings) {
  buildingList.innerHTML = `<table class="table table-striped">
  <thead>
          <tr>
          <th style="width:100px; display:inline-block; overflow:hidden">Name</th>
          <th style="width:100px; display:inline-block; overflow:hidden">Block</th>
          <th style="width:200px; display:inline-block; overflow:hidden">Building Description</th>
          <th style="width:200px; display:inline-block; overflow:hidden">Actions</th>
          </tr>
        </thead>
        </table>
  `;

  console.log(buildings);

  buildings.map((t) => {
    buildingList.innerHTML += `
          <table class="table table-striped">
                <tbody>
                  <tr>
                    <td style="width:100px; display:inline-block; overflow:hidden">${t.buildingName}</td>
                    <td style="width:100px; display:inline-block; overflow:hidden">${t.buildingBlock}</td>
                    <td style="width:200px; display:inline-block; overflow:hidden">${t.buildingDes}</td>
                    <td style="width:250px; display:inline-block; overflow:hidden">
                    <button class="btn btn-btn btn-outline-success" onclick="editBuilding('${t._id}')">
                   Edit
                </button>
                    <button class="btn btn-btn btn-outline-danger" onclick="deleteBuilding('${t._id}')">
                    Delete
                  </button>
                  <button class="btn btn-btn btn-outline-secondary" onclick="document.location='addRoom.html'">
                    Add Room
                  </button>
                </td>
                  </tr>   
          </table>
        `;
  });
}

let buildings = [];

ipcRenderer.send("get-buildings");

buildingForm.addEventListener("submit", async (e) => {
  console.log("Test Building");
  e.preventDefault();

  const building = {
    buildingName: buildingName.value,
    buildingBlock: buildingBlock.value,
    buildingDes: buildingDes.value
  };

  if (!updateStatus) {
    ipcRenderer.send("new-building", building);
  } else {
    ipcRenderer.send("update-building", { ...building, idSBuildingToUpdate });
  }

  buildingForm.reset();
});

ipcRenderer.on("new-building-created", (e, arg) => {
  console.log(arg);
  const buildingSaved = JSON.parse(arg);
  buildings.push(buildingSaved);
  renderBuildings(buildings);
  alert("Building Created Successfully");
  buildingName.focus();
});

ipcRenderer.on("get-buildings", (e, args) => {
  const receivedBuildings = JSON.parse(args);
  buildings = receivedBuildings;
  renderBuildings(buildings);
});

ipcRenderer.on("delete-building-success", (e, args) => {
  const deletedBuilding = JSON.parse(args);
  const newBuildings = buildings.filter((t) => {
    return t._id !== deletedBuilding._id;
  });
  buildings = newBuildings;
  renderBuildings(buildings);
});

ipcRenderer.on("update-building-success", (e, args) => {
  updateStatus = false;
  const updatedBuilding = JSON.parse(args);
  buildings = buildings.map((t, i) => {
    if (t._id === updatedBuilding._id) {
      (t.buildingName = updatedBuilding.buildingName),
        (t.buildingBlock = updatedBuilding.buildingBlock),
        (t.buildingDes = updatedBuilding.buildingDes)
    }
    return t;
  });
  renderBuildings(buildings);
});

