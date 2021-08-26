const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')


const app = express()

app.use(express.json())
app.use(express.urlencoded())
app.use(cors())


mongoose.connect('mongodb://127.0.0.1:27017/userdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("DB connected");
})

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const User = new mongoose.model("User", userSchema)



app.post("/login", (req,res)=> {
    const {email, password} = req.body
    User.findOne({email: email}, (err, user)=> {
        if(user){
            if(user.password === password){
                res.send({message: "Login Sucess", user: user})
            } else{
                res.send({message: "Password didn't match"})
            }
        }else{
            res.send({message: "user not registered"})
        }
    })
})


app.post("/register", (req, res)=> {
    const {name, email, password} = req.body
    User.findOne({email: email}, (err, user)=> {
        if(user){
            res.send({message: "user already registered"})
        }
        else{
            
            const user = new User({
                name,
                email,
                password
            })
            user.save( err => {
                if(err){
                    res.send(err)
                } else {
                    res.send({ message: "Registration Sucess"})
                }
            })
        }
    })
})

app.delete("/removeuser", (req, res)=>{
    const {email} = req.body
    console.log(email);
    User.deleteOne({ email: email}).then(()=>{
        res.send('user removed')
    }).catch((err)=>{
        res.send(err)
    })

})

app.listen(4000, ()=> {
    console.log('Server listening at localhost:4000');
})