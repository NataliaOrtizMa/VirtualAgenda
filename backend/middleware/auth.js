const jwt = require("jsonwebtoken");

const auth = (req, res, next) =>{
    let jwtToken = req.header("Authorization");
    if(!jwtToken) return res.status(400).send("Autorizacion rechazada");
    jwtToken = jwtToken.split(" ")[1];
    if(!jwtToken) return res.status(401).send("Autorizacion rechazada");
    try {
        const payload = jwt.verify(jwtToken, "secretKey");
        req.user = payload;
        next();
    } catch (error) {
        return res.status(401).send("Autorizacíon rechazada: Token inválido")
    }
}

module.exports = auth;