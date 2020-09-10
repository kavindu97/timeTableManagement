const { BrowserWindow, ipcMain } = require("electron");
const Task = require("./models/Task");
const Tag = require("./models/students&tags/Tag");
const Student = require("./models/students&tags/Student");

function createWindow() {
  const win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadFile("src/app/index.html");
}

// ipcMain.on("new-task", async (e, arg) => {
//   const newTask = new Task(arg);
//   const taskSaved = await newTask.save();
//   console.log(taskSaved);
//   e.reply("new-task-created", JSON.stringify(taskSaved));
// });

// ipcMain.on("get-tasks", async (e, arg) => {
//   const tasks = await Task.find();
//   e.reply("get-tasks", JSON.stringify(tasks));
// });

// ipcMain.on("delete-task", async (e, args) => {
//   const taskDeleted = await Task.findByIdAndDelete(args);
//   e.reply("delete-task-success", JSON.stringify(taskDeleted));
// });

// ipcMain.on("update-task", async (e, args) => {
//   console.log(args);
//   const updatedTask = await Task.findByIdAndUpdate(
//     args.idTaskToUpdate,
//     { name: args.name, description: args.description },
//     { new: true }
//   );
//   e.reply("update-task-success", JSON.stringify(updatedTask));
// });


//Tag - Sprint-01

// ipcMain.on("new-tag", async (e, arg) => {
//   const newTag = new Tag(arg);
//   const tagSaved = await newTag.save();
//   console.log(tagSaved);
//   e.reply("new-tag-created", JSON.stringify(tagSaved));
// });

// ipcMain.on("get-tags", async (e, arg) => {
//   const tags = await Tag.find();
//   e.reply("get-tags", JSON.stringify(tags));
// });

// ipcMain.on("delete-tag", async (e, args) => {
//   const tagDeleted = await Tag.findByIdAndDelete(args);
//   e.reply("delete-tag-success", JSON.stringify(tagDeleted));
// });

// ipcMain.on("update-tag", async (e, args) => {
//   console.log(args);
//   const updatedTag = await Task.findByIdAndUpdate(
//     args.idTagToUpdate,
//     { tagCategory: args.tagCategory, batch: args.batch, group: args.group, subject: args.subject,
//       startingTime: args.startingTime, endingTime: args.endingTime, note: args.note  },
//     { new: true }
//   );
//   e.reply("update-tag-success", JSON.stringify(updatedTag));
// });

//new Update Tag

ipcMain.on("new-tag", async (e, arg) => {
  console.log("newtag")
  const newTag = new Tag(arg);
  const tagSaved = await newTag.save();
  console.log(tagSaved);
  e.reply("new-tag-created", JSON.stringify(tagSaved));
});

ipcMain.on("get-tags", async (e, arg) => {
  const tags = await Tag.find();
  e.reply("get-tags", JSON.stringify(tags));
});

ipcMain.on("delete-tag", async (e, args) => {
  const tagDeleted = await Tag.findByIdAndDelete(args);
  e.reply("delete-tag-success", JSON.stringify(tagDeleted));
});

ipcMain.on("update-tag", async (e, args) => {
  console.log(args+"dghdfh");
  const updatedTag = await Tag.findByIdAndUpdate(
    args.idTagToUpdate,
    { category: args.category, batch: args.batch, group: args.group, subject: args.subject,
      startingTime: args.startingTime, endingTime: args.endingTime, note: args.note },
    { new: true }
  );
  e.reply("update-tag-success", JSON.stringify(updatedTag));
});









ipcMain.on("new-student", async (e, arg) => {
  console.log("newstudent")
  const newStudent = new Student(arg);
  const studentSaved = await newStudent.save();
  console.log(studentSaved);
  e.reply("new-student-created", JSON.stringify(studentSaved));
});

ipcMain.on("get-students", async (e, arg) => {
  const students = await Student.find();
  e.reply("get-students", JSON.stringify(students));
});

ipcMain.on("delete-student", async (e, args) => {
  const studentDeleted = await Student.findByIdAndDelete(args);
  e.reply("delete-student-success", JSON.stringify(studentDeleted));
});

ipcMain.on("update-student", async (e, args) => {
  console.log(args);
  const updatedStudent = await Student.findByIdAndUpdate(
    args.idStudentToUpdate,
    { acedemicYear: args.acedemicYear, programme: args.programme, groupCount: args.groupCount, subGroupCount: args.subGroupCount},
    { new: true }
  );
  e.reply("update-student-success", JSON.stringify(updatedStudent));
});





















module.exports = { createWindow };
