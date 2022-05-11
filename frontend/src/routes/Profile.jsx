import axios from "axios"
import React, { useEffect } from "react"
import { useState } from "react"
import { useNavigate,Link, Navigate } from "react-router-dom"
import Cookies from 'js-cookie'

export default () => {
    const url = 'http://127.0.0.1:5000/'
    const id = Cookies.get('user_id')
    let navigate = useNavigate()

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

    return(
        <div>
            <Link to={'/home'}>Back to Home</Link>
            <h1>Profile</h1>
            <p>Name: {data.name}</p>
            <p>Username: {data.username}</p>
            <p>Role: {data.role}</p>
            <Link to={'/edit_profile'}>Edit Profile</Link>
        </div>
    )
}