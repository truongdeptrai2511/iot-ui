import React, { useState } from 'react';

function ChangePassword() {

    const [oldPasword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    return (
        <div className="container">
            <div className="col-lg-12">
                <span>Change Password</span>
                <div className="text-input">
                    <input type="password" value={oldPasword} placeholder="Old Password" />
                    <input type="text" placeholder="New Password" />
                </div>
            </div>
        </div>
    )
}

export default ChangePassword
