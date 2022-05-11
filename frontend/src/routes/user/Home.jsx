import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import Cookies from 'js-cookie'
import AllBook from "../../components/AllBook";
import axios from "axios";

// this page needs persistent id/username, probably have to use redux
export default () => {
    const name = Cookies.get("user_name")
    const url = 'http://127.0.0.1:5000/'
    const [data,setData] = useState([])
    const [search,setSearch] = useState('')

    const unset = () => {
        Cookies.remove('user_name')
        Cookies.remove('user_id')
    }

    useEffect(()=>{
        axios.get(`${url}allBook`)
        .then(res => {
            console.log(res.data)
            setData(res.data)
        })
    },[])

    return(
        <div>
            <h1>Welcome to HomePage, {name}!</h1>
            <h3>Search Available Book Here</h3>
                <form>
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}/>
                </form>
            <h3>Available Book</h3>
                <AllBook data={data} search={search}/>
                <Link to="/profile">Go To Profile</Link> <br />
                <Link to="/registration">Go To Registration</Link> <br />
                <Link to="/" onClick={unset}>Logout</Link><br />
        </div>
    )
}