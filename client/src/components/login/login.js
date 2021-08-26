import React, {useState} from "react"
import "./login.css"
import axios from 'axios'
import {useHistory} from 'react-router-dom'

const Login = ({ setLoginUser }) => {

    const history = useHistory()
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    
    const handelChange = (e) => {
        console.log(e.target);
        const {name,value} = e.target;
        setUser({
            ...user,
            [name]: value,
        })
    }

    const login = () => {
        axios.post("http://localhost:4000/login", user)
        .then(res => {
            alert(res.data.message)
            setLoginUser(res.data.user)
            console.log(res.data.user);
        })
    }

    return (
        <div className="login">
            <h1>Login</h1>
            <input type="text" name="email" placeholder="Enter your Email" value={user.email} onChange={handelChange}></input>
            <input type="password" name="password" placeholder="Enter your Password" value={user.password}  onChange={handelChange}></input>
            <div className="button" onClick={login}>Login</div>
            <div>or</div>
            <div className="button" onClick={() => history.push('/register')}>Register</div>
        </div>
    )
}

export default Login