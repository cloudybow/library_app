import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Home from "./routes/Home";
import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";
import Profile from "./routes/Profile";
import Registration from "./routes/Registration";

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/home" element={<Home/>} />
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/registration" element={<Registration/>}/>
        </Routes>
    </BrowserRouter>, document.getElementById("root"));
