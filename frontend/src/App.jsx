import React from "react";
import axios from "axios"
import { useState,useEffect } from "react";
import { Route, useNavigate,Link } from "react-router-dom";
import Cookies from 'js-cookie'
import './styles/tailwind.output.css'

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
      login.role === 'Admin' ? navigate('/home_admin') : navigate('/home')
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
    <div className="max-w-md mx-auto p-6 bg-gray-100 mt-10 rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold text-sky-700 text-center" >Welcome to Root!</h1>
      <h3 className="text-lg font-medium text-center">Login to Access Home!</h3>
      <br />
      <form>
        <p>Username: </p>
        <input className="placeholder:italic placeholder:text-slate-400 bg-white w-full border 
            border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none 
            focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm my-2" 
          type="text" value={uname} onChange={(evt)=>setUname(evt.target.value)} />
        <br />
        <p>Password: </p>
        <input className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border 
            border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none 
            focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm my-2"  
        type="password" value={pass} onChange={(evt)=>setPass(evt.target.value)} />
        <br /> 
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={submit}>Submit</button>
      </form>
      <br />
      <Link to="/registration" className="text-sky-500 hover:underline">Don't Have Account? Register Here!</Link> 
    </div>
  )
}

// "prestart": "npm run build:tailwind",
// "prebuild": "npm run build:tailwind"