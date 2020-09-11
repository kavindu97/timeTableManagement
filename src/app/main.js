const { BrowserWindow, ipcMain } = require("electron");
const Task = require("./models/Task");
const Tag = require("./models/students&tags/Tag");
const Time30 = require("./models/timeManagement/Time30");
const Time60 = require("./models/timeManagement/Time60");
const Working = require("./models/timeManagement/Working");

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










ipcMain.on("new-time30", async (e, arg) => {
  console.log("newtime30")
  const newTime30 = new Time30(arg);
  const time30Saved = await newTime30.save();
  console.log(time30Saved);
  e.reply("new-time30-created", JSON.stringify(time30Saved));
});

ipcMain.on("get-time30s", async (e, arg) => {
  const time30s = await Time30.find();
  e.reply("get-time30s", JSON.stringify(time30s));
});

ipcMain.on("delete-time30", async (e, args) => {
  const time30Deleted = await Time30.findByIdAndDelete(args);
  e.reply("delete-time30-success", JSON.stringify(time30Deleted));
});

ipcMain.on("update-time30", async (e, args) => {
  console.log(args);
  const updatedTime30 = await Time30.findByIdAndUpdate(
    args.idTime30ToUpdate,
    { startingTime30: args.startingTime30, endingTime30: args.endingTime30},
    { new: true }
  );
  e.reply("update-time30-success", JSON.stringify(updatedTime30));
});









ipcMain.on("new-time60", async (e, arg) => {
  console.log("newtime60")
  const newTime60 = new Time60(arg);
  const time60Saved = await newTime60.save();
  console.log(time60Saved);
  e.reply("new-time60-created", JSON.stringify(time60Saved));
});

ipcMain.on("get-time60s", async (e, arg) => {
  const time60s = await Time60.find();
  e.reply("get-time60s", JSON.stringify(time60s));
});

ipcMain.on("delete-time60", async (e, args) => {
  const time60Deleted = await Time60.findByIdAndDelete(args);
  e.reply("delete-time60-success", JSON.stringify(time60Deleted));
});

ipcMain.on("update-time60", async (e, args) => {
  console.log(args);
  const updatedTime60 = await Time60.findByIdAndUpdate(
    args.idTime60ToUpdate,
    { startingTime60: args.startingTime60, endingTime60: args.endingTime60},
    { new: true }
  );
  e.reply("update-time60-success", JSON.stringify(updatedTime60));
});











ipcMain.on("new-working", async (e, arg) => {
  console.log("1")
  const newWorking = new Working(arg);
  const workingSaved = await newWorking.save();
  console.log(workingSaved);
  e.reply("new-working-created", JSON.stringify(workingSaved));
});


ipcMain.on("new-time60", async (e, arg) => {
  console.log("newtime60")
  const newTime60 = new Time60(arg);
  const time60Saved = await newTime60.save();
  console.log(time60Saved);
  e.reply("new-time60-created", JSON.stringify(time60Saved));
});

ipcMain.on("get-workings", async (e, arg) => {
  const workings = await Working.find();
  e.reply("get-workings", JSON.stringify(workings));
});

ipcMain.on("delete-working", async (e, args) => {
  const workingDeleted = await Working.findByIdAndDelete(args);
  e.reply("delete-working-success", JSON.stringify(workingDeleted));
});

ipcMain.on("update-working", async (e, args) => {
  console.log(args);
  const updatedWorking = await Working.findByIdAndUpdate(
    args.idWorkingToUpdate,
    { numberOfWorking: args.numberOfWorking, monday: args.monday, tuesday: args.tuesday, wednesday: args.wednesday, thursday: args.thursday, friday: args.friday, saturday: args.saturday, sunday: args.sunday, hours: args.hours, minutes: args.minutes},
    { new: true }
  );
  e.reply("update-working-success", JSON.stringify(updatedWorking));
});



























module.exports = { createWindow };
