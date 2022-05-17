import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import AllBook from "../../components/AllBook";
import service from "../../services/service";
import {Logout} from '../../components/Components'
import Cookies from "js-cookie";

// this page needs persistent id/username, probably have to use redux
export default () => {
    const name = Cookies.get("user_name")
    const [search,setSearch] = useState('')

    if (name === undefined){
        return (
            <div>
                <h1>Access Denied!</h1>
                <Link to={'/'}>Click Here to Re-Login!</Link>
            </div>
        )
    }

    return(
        <div>
            <h1>Welcome to HomePage, {name}!</h1>
            <h3>Search Available Book Here</h3>
                <form>
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}/>
                </form>
            <h3>Available Book</h3>
                <AllBook search={search}/>
                <br />
                <Link to="/profile">Go To Profile</Link> <br />
                <Logout/>
        </div>
    )
}