const { ipcRenderer } = require("electron");

// const taskForm = document.querySelector("#taskForm");
// const taskName = document.querySelector("#taskName");
// const taskDescription = document.querySelector("#taskDescription");
// const taskList = document.querySelector("#taskList");

const name = document.querySelector("#name");
const employeeID = document.querySelector("#employeeID");
const faculty = document.querySelector("#faculty");
const department = document.querySelector("#department");
const center = document.querySelector("#center");

const lectureList = document.querySelector("#lectureList");

let updateStatus = false;
let idLectureToUpdate = "";

//Tag

function deleteLecture(id) {
  const response = confirm("are you sure you want to delete student?");
  if (response) {
    ipcRenderer.send("delete-lecture", id);
  }
  return;
}

function editLecture(id) {
  updateStatus = true;
  idLectureToUpdate = id;

  const lecture = lectures.find((lecture) => lecture._id === id);
    name.value = lecture.name,
    employeeID.value = lecture.employeeID,
    faculty.value = lecture.faculty,
    department.value = lecture.department,
    center.value = lecture.center,
    building.value = lecture.building,
    category.value = lecture.category
}

function renderLectures(lectures) {
    lectureList.innerHTML = `<table class="table table-striped">
  <thead>
          <tr>
          <th style="width:100px; display:inline-block; overflow:hidden">name</th>
          <th style="width:100px; display:inline-block; overflow:hidden">employeeID</th>
          <th style="width:200px; display:inline-block; overflow:hidden">faculty</th>
          <th style="width:200px; display:inline-block; overflow:hidden">department</th>
          <th style="width:200px; display:inline-block; overflow:hidden">center</th>
          <th style="width:200px; display:inline-block; overflow:hidden">building</th>
          <th style="width:200px; display:inline-block; overflow:hidden">category</th>
          </tr>
        </thead>
        </table>
  `;
  console.log(lectures);
  lectures.map((t) => {
    lectureList.innerHTML += `
          <table class="table table-striped">
                <tbody>
                  <tr>
                    <td style="width:100px; display:inline-block; overflow:hidden">${t.name}</td>
                    <td style="width:100px; display:inline-block; overflow:hidden">${t.employeeID}</td>
                    <td style="width:200px; display:inline-block; overflow:hidden">${t.faculty}</td>
                    <td style="width:200px; display:inline-block; overflow:hidden">${t.department}</td>
                    <td style="width:200px; display:inline-block; overflow:hidden">${t.center}</td>
                    <td style="width:200px; display:inline-block; overflow:hidden">${t.building}</td>
                    <td style="width:200px; display:inline-block; overflow:hidden">${t.category}</td>
                    <td style="width:198px; display:inline-block; overflow:hidden">
                    <button class="btn btn-success" onclick="editLecture('${t._id}')">
                   Edit
                </button>
                    <button class="btn btn-danger" onclick="deleteLecture('${t._id}')">
                    Delete
                  </button>
                </td>
                  </tr>   
          </table>
        `;
  });
}

let lectures = [];
ipcRenderer.send("get-lectures");

lectureForm.addEventListener("submit", async (e) => {
  console.log("fghghf");
  e.preventDefault();

  const lecture = {
    name: name.value,
    employeeID: employeeID.value,
    faculty: faculty.value,
    department: department.value,
    center: center.value,
    building: building.value,
    category: category.value
  };

  if (!updateStatus) {
    ipcRenderer.send("new-lecture", lecture);
  } else {
    ipcRenderer.send("update-lecture", { ...lecture, idLectureToUpdate });
  }

  lectureForm.reset();
});

ipcRenderer.on("new-lecture-created", (e, arg) => {
  console.log(arg);
  const lectureSaved = JSON.parse(arg);
  lectures.push(lectureSaved);
  renderLectures(lectures);
  alert("Student Created Successfully");
  acedemicYear.focus();
});

ipcRenderer.on("get-lectures", (e, args) => {
  const receivedLectures = JSON.parse(args);
  lectures = receivedLectures;
  renderLectures(lectures);
});

ipcRenderer.on("delete-lecture-success", (e, args) => {
  const deletedLecture = JSON.parse(args);
  const newLectures = lectures.filter((t) => {
    return t._id !== deletedLecture._id;
  });
  lectures = newLectures;
  renderLectures(lectures);
});

ipcRenderer.on("update-lecture-success", (e, args) => {
  updateStatus = false;
  const updatedLecture = JSON.parse(args);
  lectures = lectures.map((t, i) => {
    if (t._id === updatedLecture._id) {
        (t.name = updatedLecture.name),
        (t.employeeID = updatedLecture.employeeID),
        (t.faculty = updatedLecture.faculty),
        (t.department = updatedLecture.department);
        (t.center = updatedLecture.center),
        (t.building = updatedLecture.building),
        (t.category = updatedLecture.category)
    }
    return t;
  });
  renderLectures(lectures);
});
