import React from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

export default () => {
    const unset = () => {
        Cookies.remove('user_name')
        Cookies.remove('user_id')
        Cookies.remove('user_role')
    }

    return <Link onClick={unset} to={'/'}>Logout</Link>
}