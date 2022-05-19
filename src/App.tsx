import React from "react";
import "./App.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import UsersPage from "./pages/users/UsersPage";
import UserPage from "./pages/users/UserPage";
import SignUpPage from "./pages/signup/SignUpPage";
import RedirectPage from "./pages/RedirectPage";
import SideBar from "./components/SideBar";
import RolesPage from "./pages/roles/RolesPage";
import RolePage from "./pages/roles/RolePage";


export default function App() {
    return <BrowserRouter>
        <div style={{"display": "flex"}}>
            <SideBar/>
            <Routes>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/signup" element={<SignUpPage/>}/>
                <Route path="/users" element={<UsersPage/>}/>
                <Route path="/users/:username" element={<UserPage/>}/>
                <Route path="/roles" element={<RolesPage/>}/>
                <Route path="/roles/:id" element={<RolePage/>}/>
                <Route path="*" element={<RedirectPage/>}/>
            </Routes>
        </div>
    </BrowserRouter>;
}