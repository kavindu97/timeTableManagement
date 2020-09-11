const { ipcRenderer } = require("electron");

// const taskForm = document.querySelector("#taskForm");
// const taskName = document.querySelector("#taskName");
// const taskDescription = document.querySelector("#taskDescription");
// const taskList = document.querySelector("#taskList");

const subjectForm = document.querySelector("#subjectForm");
const offeredYear = document.querySelector("#offeredYear");
const offeredSemester = document.querySelector("#offeredSemester");
const subjectCode = document.querySelector("#subjectCode");
const lectureHour = document.querySelector("#lectureHour");
const lectureMinute = document.querySelector("#lectureMinute");
const tutorialHour = document.querySelector("#tutorialHour");
const tutorialMinute = document.querySelector("#tutorialMinute");
const labHour = document.querySelector("#labHour");
const labMinute = document.querySelector("#labMinute");
const evaluationHour = document.querySelector("#evaluationHour");
const evaluationMinute = document.querySelector("#evaluationMinute");

const subjectList = document.querySelector("#subjectList");

let updateStatus = false;
let idSubjectToUpdate = "";

//Tag

function deleteSubject(id) {
  const response = confirm("are you sure you want to delete student?");
  if (response) {
    ipcRenderer.send("delete-subject", id);
  }
  return;
}

function editSubject(id) {
  updateStatus = true;
  idSubjectToUpdate = id;

  const subject = subjects.find((subject) => subject._id === id);
    offeredYear.value = subject.offeredYear,
    offeredSemester.value = subject.offeredSemester,
    subjectCode.value = subject.subjectCode,
    lectureHour.value = subject.subGroupCount,
    lectureMinute.value = subject.lectureMinute,
    tutorialHour.value = subject.tutorialHour,
    tutorialMinute.value = subject.tutorialMinute,
    labHour.value = subject.labHour,
    labMinute.value = subject.labMinute,
    evaluationHour.value = subject.evaluationHour,
    evaluationMinute.value = subject.evaluationMinute
}

function renderSubjects(subjects) {
  subjectList.innerHTML = `<table class="table table-striped">
  <thead>
          <tr>
          <th style="width:100px; display:inline-block; overflow:hidden">offeredYear</th>
          <th style="width:100px; display:inline-block; overflow:hidden">offeredSemester</th>
          <th style="width:200px; display:inline-block; overflow:hidden">subjectCode</th>
          <th style="width:200px; display:inline-block; overflow:hidden">lectureHour</th>
          <th style="width:200px; display:inline-block; overflow:hidden">lectureMinute</th>
          <th style="width:200px; display:inline-block; overflow:hidden">tutorialHour</th>
          <th style="width:100px; display:inline-block; overflow:hidden">tutorialMinute</th>
          <th style="width:200px; display:inline-block; overflow:hidden">labHour</th>
          <th style="width:200px; display:inline-block; overflow:hidden">labMinute</th>
          <th style="width:200px; display:inline-block; overflow:hidden">evaluationHour</th>
          <th style="width:200px; display:inline-block; overflow:hidden">evaluationMinute</th>
          </tr>
        </thead>
        </table>
  `;
  console.log(subjects);
  subjects.map((t) => {
    subjectList.innerHTML += `
          <table class="table table-striped">
                <tbody>
                  <tr>
                    <td style="width:100px; display:inline-block; overflow:hidden">${t.offeredYear}</td>
                    <td style="width:100px; display:inline-block; overflow:hidden">${t.offeredSemester}</td>
                    <td style="width:200px; display:inline-block; overflow:hidden">${t.subjectCode}</td>
                    <td style="width:200px; display:inline-block; overflow:hidden">${t.lectureHour}</td>
                    <td style="width:200px; display:inline-block; overflow:hidden">${t.lectureMinute}</td>
                    <td style="width:200px; display:inline-block; overflow:hidden">${t.tutorialHour}</td>
                    <td style="width:200px; display:inline-block; overflow:hidden">${t.tutorialMinute}</td>
                    <td style="width:200px; display:inline-block; overflow:hidden">${t.labHour}</td>
                    <td style="width:200px; display:inline-block; overflow:hidden">${t.labMinute}</td>
                    <td style="width:200px; display:inline-block; overflow:hidden">${t.evaluationHour}</td>
                    <td style="width:200px; display:inline-block; overflow:hidden">${t.evaluationMinute}</td>
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

let subjects = [];
ipcRenderer.send("get-subjects");

subjectForm.addEventListener("submit", async (e) => {
  console.log("fghghf");
  e.preventDefault();

  const subject = {
    offeredYear: offeredYear.value,
    offeredSemester: offeredSemester.value,
    subjectCode: subjectCode.value,
    lectureHour: lectureHour.value,
    lectureMinute: lectureMinute.value,
    tutorialHour: tutorialHour.value,
    tutorialMinute: tutorialMinute.value,
    labHour: labHour.value,
    labMinute: labMinute.value,
    evaluationHour: evaluationHour.value,
    evaluationMinute: evaluationMinute.value,
  };

  if (!updateStatus) {
    ipcRenderer.send("new-subject", subject);
  } else {
    ipcRenderer.send("update-subject", { ...subject, idSubjectToUpdate });
  }

  subjectForm.reset();
});

ipcRenderer.on("new-subject-created", (e, arg) => {
  console.log(arg);
  const subjectSaved = JSON.parse(arg);
  subjects.push(subjectSaved);
  renderSubjects(subjects);
  alert("Student Created Successfully");
  acedemicYear.focus();
});

ipcRenderer.on("get-subjects", (e, args) => {
  const receivedSubjects = JSON.parse(args);
  subjects = receivedSubjects;
  renderSubjects(subjects);
});

ipcRenderer.on("delete-subject-success", (e, args) => {
  const deletedSubject = JSON.parse(args);
  const newSubjects = subjects.filter((t) => {
    return t._id !== deletedSubject._id;
  });
  subjects = newSubjects;
  renderSubjects(subjects);
});

ipcRenderer.on("update-subject-success", (e, args) => {
  updateStatus = false;
  const updatedSubject = JSON.parse(args);
  subjects = subjects.map((t, i) => {
    if (t._id === updatedSubject._id) {
      (t.offeredYear = updatedStudent.offeredYear),
        (t.offeredSemester = updatedStudent.offeredSemester),
        (t.subjectCode = updatedStudent.subjectCode),
        (t.lectureHour = updatedStudent.lectureHour),
        (t.lectureMinute = updatedStudent.lectureMinute),
        (t.tutorialHour = updatedStudent.tutorialHour),
        (t.tutorialMinute = updatedStudent.tutorialMinute),
        (t.labHour = updatedStudent.labHour),
        (t.labMinute = updatedStudent.labMinute),
        (t.evaluationHour = updatedStudent.evaluationHour),
        (t.evaluationMinute = updatedStudent.evaluationMinute);
    }
    return t;
  });
  renderSubjects(subjects);
});
