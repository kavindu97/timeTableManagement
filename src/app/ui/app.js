const { ipcRenderer } = require("electron");

// const taskForm = document.querySelector("#taskForm");
// const taskName = document.querySelector("#taskName");
// const taskDescription = document.querySelector("#taskDescription");
// const taskList = document.querySelector("#taskList");


const tagForm = document.querySelector("#tagForm");
const category = document.querySelector("#category");
const batch = document.querySelector("#batch");
const group = document.querySelector("#group");
const subject = document.querySelector("#subject");
const startingTime = document.querySelector("#startingTime");
const endingTime = document.querySelector("#endingTime");
const note = document.querySelector("#note");

const tagList = document.querySelector("#tagList");

let updateStatus = false;
let idTagToUpdate = "";


//Tag


function deleteTag(id) {
  const response = confirm("are you sure you want to delete tag?");
  if (response) {
    ipcRenderer.send("delete-tag", id);
  }
  return;
}

function editTag(id)  {
  updateStatus = true;
  idTagToUpdate = id;
  
  const tag = tags.find((tag) => tag._id === id);
    category.value = tag.category,
    batch.value = tag.batch,
    group.value = tag.group,
    subject.value = tag.subject,
    startingTime.value = tag.startingTime,
    endingTime.value = tag.endingTime,
    note.value = tag.note

}

function renderTags(tags) {
  tagList.innerHTML = `<table class="table table-striped">
  <thead>
          <tr>
          <th style="width:50px; display:inline-block; overflow:hidden">Tag</th>
          <th style="width:80px; display:inline-block; overflow:hidden">Batch</th>
          <th style="width:80px; display:inline-block; overflow:hidden">Group</th>
          <th style="width:100px; display:inline-block; overflow:hidden">Subject</th>
          <th style="width:75px; display:inline-block; overflow:hidden">Starting</th>
          <th style="width:75px; display:inline-block; overflow:hidden">Ending</th>
          <th style="width:99px; display:inline-block; overflow:hidden">Action</th>
          </tr>
        </thead>
        </table>
  `;
  console.log(tags);
  tags.map((t) => {
    tagList.innerHTML += `
          <table class="table table-striped">
                <tbody>
                  <tr>
                    <td style="width:50px; display:inline-block; overflow:hidden">${t.category}</td>
                    <td style="width:90px; display:inline-block; overflow:hidden">${t.batch}</td>
                    <td style="width:80px; display:inline-block; overflow:hidden">${t.group}</td>
                    <td style="width:100px; display:inline-block; overflow:hidden">${t.subject}</td>
                    <td style="width:75px; display:inline-block; overflow:hidden">${t.startingTime}</td>
                    <td style="width:75px; display:inline-block; overflow:hidden">${t.endingTime}</td>
                    <td style="width:px; display:inline-block; overflow:hidden">
                    <button class="btn btn-success" onclick="editTag('${t._id}')">
                   Edit
                </button>
                    <button class="btn btn-danger" onclick="deleteTag('${t._id}')">
                    Delete
                  </button>
                </td>
                  </tr>   
          </table>
        `;
  });
}

let tags = [];
ipcRenderer.send("get-tags");


tagForm.addEventListener("submit", async (e) => {
  console.log("fghghf");
  e.preventDefault();

  const tag = {
    category: category.value,
    batch: batch.value,
    group: group.value,
    subject: subject.value,
    startingTime: startingTime.value,
    endingTime: endingTime.value,
    note: note.value,
  };

  if (!updateStatus) {
    ipcRenderer.send("new-tag", tag);
  } else {
    ipcRenderer.send("update-tag", { ...tag, idTagToUpdate });
  }

  tagForm.reset();
  
});

ipcRenderer.on("new-tag-created", (e, arg) => {
  console.log(arg);
  const tagSaved = JSON.parse(arg);
  tags.push(tagSaved);
  renderTags(tags);
  alert("Tag Created Successfully");
  taskName.focus();
});

ipcRenderer.on("get-tags", (e, args) => {
  const receivedTags = JSON.parse(args);
  tags = receivedTags;
  renderTags(tags);
});

ipcRenderer.on("delete-tag-success", (e, args) => {
  const deletedTag = JSON.parse(args);
  const newTags = tags.filter((t) => {
    return t._id !== deletedTag._id;
  });
  tags = newTags;
  renderTags(tags);
});

ipcRenderer.on("update-tag-success", (e, args) => {
  updateStatus = false;
  const updatedTag = JSON.parse(args);
  tags = tags.map((t, i) => {
    if (t._id === updatedTag._id) {
      t.category = updatedTag.category,
      t.batch = updatedTag.batch,
      t.group = updatedTag.group,
      t.subject = updatedTag.subject,
      t.startingTime = updatedTag.startingTime,
      t.endingTime = updatedTag.endingTime,
      t.note = updatedTag.note
    }
    return t;
  });
  renderTags(tags);
});






