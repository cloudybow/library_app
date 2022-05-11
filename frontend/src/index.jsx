import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Home from "./routes/user/Home";
import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";
import Profile from "./routes/Profile";
import Registration from "./routes/user/Registration";
import ProfileEdit from "./routes/ProfileEdit";

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/home" element={<Home/>} />
            <Route path="/home_admin" element={}
            <Route path="/profile" element={<Profile/>}/>
                <Route path="/edit_profile" element={<ProfileEdit/>}/>
            <Route path="/registration" element={<Registration/>}/>
        </Routes>
    </BrowserRouter>, document.getElementById("root"));
