const { ipcRenderer } = require("electron");

// const taskForm = document.querySelector("#taskForm");
// const taskName = document.querySelector("#taskName");
// const taskDescription = document.querySelector("#taskDescription");
// const taskList = document.querySelector("#taskList");

const studentForm = document.querySelector("#studentForm");
const acedemicYear = document.querySelector("#acedemicYear");
const programme = document.querySelector("#programme");
const groupCount = document.querySelector("#groupCount");
const subGroupCount = document.querySelector("#subGroupCount");

const studentList = document.querySelector("#studentList");

let updateStatus = false;
let idStudentToUpdate = "";

//Tag

function deleteStudent(id) {
  const response = confirm("are you sure you want to delete student?");
  if (response) {
    ipcRenderer.send("delete-student", id);
  }
  return;
}

function editStudent(id) {
  updateStatus = true;
  idStudentToUpdate = id;

  const student = students.find((student) => student._id === id);
    acedemicYear.value = student.acedemicYear,
    programme.value = student.programme,
    groupCount.value = student.groupCount,
    subGroupCount.value = student.subGroupCount
}

function renderStudents(students) {
  studentList.innerHTML = `<table class="table table-striped">
  <thead>
          <tr>
          <th style="width:100px; display:inline-block; overflow:hidden">Acedemic Year</th>
          <th style="width:100px; display:inline-block; overflow:hidden">Programme</th>
          <th style="width:200px; display:inline-block; overflow:hidden">Group Count</th>
          <th style="width:200px; display:inline-block; overflow:hidden">Sub Group Count</th>
          <th style="width:200px; display:inline-block; overflow:hidden">Group IDs</th>
          <th style="width:200px; display:inline-block; overflow:hidden">Sub Group IDs</th>
          </tr>
        </thead>
        </table>
  `;
  console.log(students);
  students.map((t) => {
    studentList.innerHTML += `
          <table class="table table-striped">
                <tbody>
                  <tr>
                    <td style="width:100px; display:inline-block; overflow:hidden">${t.acedemicYear}</td>
                    <td style="width:100px; display:inline-block; overflow:hidden">${t.programme}</td>
                    <td style="width:200px; display:inline-block; overflow:hidden">${t.groupCount}</td>
                    <td style="width:200px; display:inline-block; overflow:hidden">${t.subGroupCount}</td>
                    <td style="width:200px; display:inline-block; overflow:hidden">${t.groupCount}</td>
                    <td style="width:200px; display:inline-block; overflow:hidden">${t.subGroupCount}</td>
                    <td style="width:198px; display:inline-block; overflow:hidden">
                    <button class="btn btn-success" onclick="editStudent('${t._id}')">
                   Edit
                </button>
                    <button class="btn btn-danger" onclick="deleteStudent('${t._id}')">
                    Delete
                  </button>
                </td>
                  </tr>   
          </table>
        `;
  });
}

let students = [];
ipcRenderer.send("get-students");

studentForm.addEventListener("submit", async (e) => {
  console.log("fghghf");
  e.preventDefault();

  const student = {
    acedemicYear: acedemicYear.value,
    programme: programme.value,
    groupCount: groupCount.value,
    subGroupCount: subGroupCount.value,
  };

  if (!updateStatus) {
    ipcRenderer.send("new-student", student);
  } else {
    ipcRenderer.send("update-student", { ...student, idStudentToUpdate });
  }

  studentForm.reset();
});

ipcRenderer.on("new-student-created", (e, arg) => {
  console.log(arg);
  const studentSaved = JSON.parse(arg);
  students.push(studentSaved);
  renderStudents(students);
  alert("Student Created Successfully");
  acedemicYear.focus();
});

ipcRenderer.on("get-students", (e, args) => {
  const receivedStudents = JSON.parse(args);
  students = receivedStudents;
  renderStudents(students);
});

ipcRenderer.on("delete-student-success", (e, args) => {
  const deletedStudent = JSON.parse(args);
  const newStudents = students.filter((t) => {
    return t._id !== deletedStudent._id;
  });
  students = newStudents;
  renderStudents(students);
});

ipcRenderer.on("update-student-success", (e, args) => {
  updateStatus = false;
  const updatedStudent = JSON.parse(args);
  students = students.map((t, i) => {
    if (t._id === updatedStudent._id) {
      (t.acedemicYear = updatedStudent.acedemicYear),
        (t.programme = updatedStudent.programme),
        (t.groupCount = updatedStudent.groupCount),
        (t.subGroupCount = updatedStudent.subGroupCount);
    }
    return t;
  });
  renderStudents(students);
});
