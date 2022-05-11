import React from "react";
import axios from "axios";
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";

export default () => {
    const url = 'http://127.0.0.1:5000/'
    const [uname, setUname] = useState('')
    const [name, setName] = useState('')
    const [pass, setPass] = useState('')

    const [data, setData] = useState({})
    let navigate = useNavigate()

    useEffect(()=>{
        if(data.msg){
          navigate('/home')
        }
    },[data])

    const submit = (evt) => {
        evt.preventDefault()
        axios.post(url+'register',{
            "username":uname,
            "password":pass,
            "name":name
        }).then(res => {
            setData(res.data)
        })
    }

    return(
        <div>
            <h1>Registration Page</h1>
            <h3>Register New User by Filling The Forms Below!</h3>
            <form>
                <p>Name:</p>
                <input type="text" value={name} onChange={e => setName(e.target.value)} />
                <br /><p>Username:</p> 
                <input type="text" value={uname} onChange={e => setUname(e.target.value)} />
                <br /><p>Password:</p>
                <input type="password" value={pass} onChange={e => setPass(e.target.value)} />
                <br /><button onClick={submit}>Submit</button>
            </form>
        </div>
    )
}