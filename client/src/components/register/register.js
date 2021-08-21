import React, { useState } from "react"
import "./register.css"
import axios from 'axios'
import {useHistory} from 'react-router-dom'



const Register = () => {
    const history = useHistory()
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        reEnterPassword: ""
    })

    
    const handelChange = (e) => {
        console.log(e.target);
        const {name,value} = e.target;
        setUser({
            ...user,
            [name]: value,
        })
    }


    const register = () => {
        const {name, email, password, reEnterPassword} = user
        if(name && email && password && (password === reEnterPassword)){
            axios.post("http://localhost:4000/register", user)
            .then( res => alert(res.data.message))
            history.push('/login')
        } else {
            alert("Invalid Input")
        }
    }

    return (
        <div className="register">
        {console.log(user)}
            <h1>Register</h1>
            <input type="text" name="name" placeholder="Your Name" value={user.name} onChange={handelChange}></input>
            <input type="text" name="email" placeholder="Your Email" value={user.email} onChange={handelChange}></input>
            <input type="password" name="password"  placeholder="Your Password" value={user.password} onChange={handelChange}></input>
            <input type="password" name="reEnterPassword" placeholder="Re-enter Password"  value={user.reEnterPassword} onChange={handelChange}></input>
            <div className="button" onClick={register}>Register</div>
            <div>or</div>
            <div className="button" onClick={() => history.push('/')}>Login</div>
        </div>
    )
}

export default Register