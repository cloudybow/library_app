import React from "react";
import axios from "axios"
import { useState,useEffect } from "react";
import { Route, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'

export default () => {
  const [uname, setUname] = useState('')
  const [pass,setPass] = useState('')
  const [msg,setMsg] = useState('')
  const [login,setLogin] = useState({})
  const url = 'http://127.0.0.1:5000/'
  let navigate = useNavigate(); 

  useEffect(() => {
    console.log(login)
    if(login.status){
      Cookies.set('user_name', login.name)
      Cookies.set('user_id', login.id)
      navigate('/home')
    } else {
      // setMsg(login.msg)
      setUname('')
      setPass('')
    }
  }, [ login ]);

  const submit = (evt) => {
    evt.preventDefault();

    axios.post(url+'login',{
      "username":uname,
      "password":pass
    }).then(res => setLogin(res.data))
  }

  return(
    <div>
      <h1>Welcome to Root!</h1>
      <h3>Login to Access Home!</h3>
      <form>
        <p>Username: </p>
        <input type="text" value={uname} onChange={(evt)=>setUname(evt.target.value)} />
        <br />
        <p>Password: </p>
        <input type="password" value={pass} onChange={(evt)=>setPass(evt.target.value)} />
        <br /> <br />
        <button onClick={submit}>Submit</button>
      </form>
    </div>
  )
}
