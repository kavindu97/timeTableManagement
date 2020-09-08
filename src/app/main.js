const { BrowserWindow, ipcMain } = require("electron");
const Task = require("./models/Task");
const Tag = require("./models/students&tags/Tag");

function createWindow() {
  const win = new BrowserWindow({
    width: 700,
    height: 700,
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
  console.log(args);
  const updatedTag = await Task.findByIdAndUpdate(
    args.idTagToUpdate,
    { category: args.category, batch: args.batch, group: args.group, subject: args.subject,
      startingTime: args.startingTime, endingTime: args.endingTime, note: args.note },
    { new: true }
  );
  e.reply("update-tag-success", JSON.stringify(updatedTag));
});


module.exports = { createWindow };
