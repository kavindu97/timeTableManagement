
const { ipcRenderer } = require("electron");

const roomForm = document.querySelector("#roomForm");
const roomName = document.querySelector("#roomName");
const roomCapacity = document.querySelector("#roomCapacity");
const roomType = document.querySelector("#roomType");

const roomList = document.querySelector("#roomList");

let updateStatus = false;

let idSBuildingRoomToUpdate = "";


function deleteBuildingRoom(id) {
    const response = confirm("are you sure you want to delete Room?");
    if (response) {
      ipcRenderer.send("delete-building-room", id);
    }
    return;
  }
  
  function editBuildingRoom(id) {
    updateStatus = true;
    idSBuildingRoomToUpdate = id;
  
    const buildingRoom = buildingsRooms.find((buildingRoom) => buildingRoom._id === id);
    roomName.value = buildingRoom.roomName,
    roomCapacity.value = buildingRoom.roomCapacity,
    roomType.value = buildingRoom.roomType
  }
  
  function renderBuildingsRooms(buildingsRooms) {
    roomList.innerHTML = `<table class="table table-striped">
    <thead>
            <tr>
            <th style="width:100px; display:inline-block; overflow:hidden">Room</th>
            <th style="width:100px; display:inline-block; overflow:hidden">Capacity</th>
            <th style="width:200px; display:inline-block; overflow:hidden">Type</th>
            <th style="width:200px; display:inline-block; overflow:hidden">Actions</th>
            </tr>
          </thead>
          </table>
    `;
  
    console.log(buildingsRooms);
  
    buildingsRooms.map((t) => {
        roomList.innerHTML += `
            <table class="table table-striped">
                  <tbody>
                    <tr>
                      <td style="width:100px; display:inline-block; overflow:hidden">${t.roomName}</td>
                      <td style="width:100px; display:inline-block; overflow:hidden">${t.roomCapacity}</td>
                      <td style="width:200px; display:inline-block; overflow:hidden">${t.roomType}</td>
                      <td style="width:250px; display:inline-block; overflow:hidden">
                      <button class="btn btn-btn btn-outline-success" onclick="editBuildingRoom('${t._id}')">
                     Edit
                  </button>
                      <button class="btn btn-btn btn-outline-danger" onclick="deleteBuildingRoom('${t._id}')">
                      Delete
                    </button>
                  </td>
                    </tr>   
            </table>
          `;
    });
  }
  
  let buildingsRooms = [];

  ipcRenderer.send("get-buildings-rooms");
  
  roomForm.addEventListener("submit", async (e) => {
    console.log("Test Building - Rooms");
    e.preventDefault();
  
    const buildingRoom = {
      roomName: roomName.value,
      roomCapacity: roomCapacity.value,
      roomType: roomType.value
    };
  
    if (!updateStatus) {
      ipcRenderer.send("new-building-room", buildingRoom);
    } else {
      ipcRenderer.send("update-building-room", { ...buildingRoom, idSBuildingRoomToUpdate });
    }
  
    roomForm.reset();

  });
  
  ipcRenderer.on("new-building-room-created", (e, arg) => {
    console.log(arg);
    const buildingRoomSaved = JSON.parse(arg);
    buildingsRooms.push(buildingRoomSaved);
    renderBuildingsRooms(buildingsRooms);
    alert("Building Room Created Successfully");
    roomName.focus();
  });
  
  ipcRenderer.on("get-buildings-rooms", (e, args) => {
    const receivedBuildingsRooms = JSON.parse(args);
    buildingsRooms = receivedBuildingsRooms;
    renderBuildingsRooms(buildingsRooms);
  });
  
  ipcRenderer.on("delete-building-room-success", (e, args) => {
    const deletedBuildingRoom = JSON.parse(args);
    const newBuildingsRooms = buildingsRooms.filter((t) => {
      return t._id !== deletedBuildingRoom._id;
    });
    buildingsRooms = newBuildingsRooms;
    renderBuildingsRooms(buildingsRooms);
  });
  
  ipcRenderer.on("update-building-room-success", (e, args) => {
    updateStatus = false;
    const updatedBuildingRoom = JSON.parse(args);
    buildingsRooms = buildingsRooms.map((t, i) => {
      if (t._id === updatedBuildingRoom._id) {
        (t.roomName = updatedBuildingRoom.roomName),
          (t.roomCapacity = updatedBuildingRoom.roomCapacity),
          (t.roomType = updatedBuildingRoom.roomType)
      }
      return t;
    });
    renderBuildingsRooms(buildingsRooms);
  });
  