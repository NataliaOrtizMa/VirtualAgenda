const mongoose = require("mongoose");

const reminderSchema = new mongoose.Schema({
    idUsuario: String,
    taskName: String,
    startDate: {type: Date, default: Date.now},
    description: String
});

const Reminder = mongoose.model("reminder", reminderSchema);

module.exports = Reminder;