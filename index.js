import express from 'express'
import jwt from 'jsonwebtoken'
import fs from 'fs'

const RSA_PRIVATE_KEY = fs.readFileSync("./keys/private.key")
const RSA_PUBLIC_KEY = fs.readFileSync("./keys/public.key")

const app = express()

app.post("/token", (req, res) => {
    //Get user from BD, check email, password, etc
    const token = jwt.sign({foo: 'bar'}, RSA_PRIVATE_KEY, {algorithm: 'RS256', expiresIn: '1h'})
    res.send({token})
})


app.get("/verify", (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const payload = jwt.verify(token, RSA_PUBLIC_KEY)
        res.send("token verified")
    } catch (error) {
        res.status(401).send({error: error.message})
    }
})

app.listen(3000)
