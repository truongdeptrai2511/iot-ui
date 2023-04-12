import { Routes, Route } from "react-router-dom";
import Home from "../components/Home.tsx";
import Login from "../components/Login/Login.tsx";
import AppHeader from "../components/App/AppHeader.tsx";
import Register from "../components/Register/Register.tsx";
import Profile from "../components/Profile/Profile.tsx";
function Router(){
    return(
      <><AppHeader></AppHeader>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes></>
    )
}

export default Router