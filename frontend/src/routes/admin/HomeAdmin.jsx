import React, { useEffect,useState } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import service from '../../services/service'
import {Logout} from '../../components/Components'

//still havent been able to catch error

export default () => {
    const [role, setRole] = useState('')
    const [error, setError] = useState(false)
    const [msg, setMsg] = useState('')

    useEffect(()=>{
        service.postData('/getRole',{
            "name":Cookies.get('user_name')
        }).then(res => {
            setRole(res.role)
        }).catch(err =>
            setError(err.msg)
        )
    },[])

    if (role !== 'Admin'){
        return (
            <div>
                <h1>Access Denied!</h1>
                <Link to={'/'}>Click Here to Re-Login!</Link>
            </div>
        )
    }

    return (
        <div>
            <h1>Welcome to Admin Page!</h1>
            <Logout/>
        </div>
    )
}