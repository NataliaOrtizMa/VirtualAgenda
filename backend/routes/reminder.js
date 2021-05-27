const express = require("express");
const router = express.Router();

const Reminder = require("../models/reminder");
const User = require("../models/user");
const Auth = require("../middleware/auth");

router.post("/createReminder", Auth, async(req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(400).send("Usuario no autenticado");
    const reminder = new Reminder({
        idUsuario: req.user._id,
        taskName: req.body.taskName,
        description: req.body.description
    });
    const result = await reminder.save();
    return res.status(200).send({result});
})

module.exports = router;