import React from "react";
import {Link} from 'react-router-dom';
import { ReactSession } from 'react-client-session';

// this page needs persistent id/username, probably have to use redux
export default () => {
    const name = ReactSession.get("name")
    return(
        <div>
            <h1>Welcome to HomePage, {name}!</h1>
            <Link to="/profile">Go To Profile</Link> <br />
            <Link to="/registration">Go To Registration</Link> <br />
            <Link to="/">Back To App</Link><br />
        </div>
    )
}