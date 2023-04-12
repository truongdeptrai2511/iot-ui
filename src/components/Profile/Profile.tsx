import React, {useState} from "react"
import './Profile.scss'
import {Link} from "react-router-dom"

import decodeJwtToken from "../../utils/JwtTokenClaim.tsx"
import ChangePassword from "../Login/ChangePassword.tsx"

function Profile() {
    const payload = decodeJwtToken()
    const [isShowChangePassword, setIsShowChangePassword] = useState(false);
    
    const handleishowChangePassword = () => {
        setIsShowChangePassword(!isShowChangePassword);
    }

    console.log(payload);   
    return (
        <div className="container">
            <div className="col-lg-12">
                <span>Profile User</span>
                <div className="row-lg-6">
                    <ul className="infomation-user">
                        <li>{payload?.email}</li>
                        <li>{payload?.role}</li>
                        <span> <a onClick={handleishowChangePassword}>Change password</a>
                            {isShowChangePassword && <ChangePassword/>}
                        </span>
                    </ul>
                </div>
            </div>
        </div>
    )    
}

export default Profile