import React from "react";
import Cookies from "js-cookie";
import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default () => {
    const url = 'http://127.0.0.1:5000/'
    const user_name = Cookies.get('user_name')
    const id = Cookies.get('user_id')
    let navigate = useNavigate()

    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [msg, setMsg] = useState('')
    const [data,setData] = useState({})

    useEffect(()=>{
        axios.get(`${url}profile/${id}`).then(res => {
            setData(res.data)
            console.log(res)
        }).catch(err => {
            console.log(err.msg)
            navigate('/')
        })
    },[])

    const submit = (e) => {
        e.preventDefault()

        let edit = {
            "username":username === ''? data.username : username,
            "name":name === ''? data.name : name
        }

        axios.post(`${url}editProfile/${id}`,{
            "username":edit.username,
            "name":edit.name
        }).then(res => {
            setMsg(res.msg)
            navigate('/profile')
            // window.location.reload()
        })
    }

    return(
        <div>
            <h3>Hi, {user_name}, Edit Your Data Below!</h3>
            <form>
                <p>Name:</p>
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder={data.name}/>
                <br /><p>Username:</p>
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder={data.username} />
                <br /><button onClick={submit}>Submit</button>
            </form>
        </div>
    )
}