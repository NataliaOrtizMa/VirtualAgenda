const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/user");

router.post("/registerUser", async(req,res) => {
    let email = await User.findOne({email: req.body.email});
    if (email) return res.status(400).send("Este correo ya fue registrado");
    let user = await User.findOne({userName: req.body.userName});
    if (user) return res.status(400).send("Este nombre de usuario ya existe");
    const hash = await bcrypt.hash(req.body.password, 10);
    user = new User({
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone, 
        userName: req.body.userName,
        password: hash
    });
    const result = user.save();
    if (result) {
        const jwtToken = user.generateJWT();
        res.status(200).send({jwtToken})
    } else {
        return res.status(400).send("No se pudo registrar el usuario");
    }
})

module.exports = router;
