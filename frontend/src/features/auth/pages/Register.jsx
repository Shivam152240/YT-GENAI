import React, { useState } from "react";
import {Link} from "react-router"
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";
const Register = () => {
    const navigate = useNavigate()
    const {loading, handleRegister} = useAuth()
    const [username, setUsername] = useState("")
    const [email, setEmail] =  useState("")
    const [password, setPassword] = useState("")
    const handleSubmit = async (e) =>{
        e.preventDefault()
        await handleRegister({username,email,password})
        if(username && email && password){
            setUsername("")
            setEmail("")
            setPassword("")
            navigate("/login")
        }
    }
    if(loading){
        return <main><h1>loading.....</h1></main>
    }
    return (
          <main>
        <div className="form-container">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
            <div className="input-group">
                <label htmlFor="username">Username</label>
                <input onChange={(e) => {setUsername(e.target.value)}} type="username" name="username" id="username" placeholder="Enter the username "/>
            </div>
            <div className="input-group">
                <label htmlFor="email">Email</label>
                <input onChange={(e) => {setEmail(e.target.value)}} type="email" name="email" id="email" placeholder="Enter the email address"/>
            </div>
            <div className="input-group">    
                <label htmlFor="password" >Password</label>
                <input onChange={(e) => {setPassword(e.target.value)}} type="password" id="password" name="password" placeholder="Enter the password"/>
            </div>
            <button className="button primary-button">Register</button>
            </form>
             <p >Already have an account ? <Link to={"/login"}>sign in</Link> </p>
       </div>
      </main>
    )
}

export default Register