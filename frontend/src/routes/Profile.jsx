import axios from "axios"
import React, { useEffect } from "react"
import { useState } from "react"
import { useNavigate,Link, Navigate } from "react-router-dom"
import {ReactSession} from 'react-client-session'

export default () => {
    const url = 'http://127.0.0.1:5000/'
    const id = ReactSession.get('id')
    let navigate = useNavigate()

    const [data,setData] = useState({})
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [msg, setMsg] = useState('')

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
            window.location.reload()
        })
    }

    return(
        <div>
            <Link to={'/home'}>Back to Home</Link>
            <h1>Profile</h1>
            <p>Name: {data.name}</p>
            <p>Username: {data.username}</p>
            <h3>Edit Your Data Below!</h3>
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