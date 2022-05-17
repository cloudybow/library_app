import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";
import {HomeAdmin} from './routes/admin/AdminRoutes'
import {Home, Registration, BookDetail} from './routes/user/UserRoutes'
import {Profile, ProfileEdit} from './routes/SharedRoute'

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/home" element={<Home/>} />
            <Route path="/home_admin" element={<HomeAdmin/>}/>
            <Route path="/profile" element={<Profile/>}/>
                <Route path="/edit_profile" element={<ProfileEdit/>}/>
            <Route path="/registration" element={<Registration/>}/>
            <Route path="/book_detail" element={<BookDetail/>}>
                <Route path=":bookId" element={<BookDetail/>}/>
            </Route>
        </Routes>
    </BrowserRouter>, document.getElementById("root"));
