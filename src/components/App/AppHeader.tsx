import React, { useEffect, useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TokenTransfer } from '../Login/Login.tsx';

function AppHeader() {
    const [displayusername, setdisplayusername] = useState('');
    const [showmenu, setshowmenu] = useState(false);
    const usenavigate = useNavigate();
    const location = useLocation();
    const userrole = useContext(TokenTransfer);

    useEffect(() => {
        if (location.pathname === '/login' || location.pathname === '/register') {
            setshowmenu(false);
        } else {
            setshowmenu(true);
            let username = sessionStorage.getItem('username');
            if (username === '' || username === null) {
                usenavigate('/login');
            } else {
                setdisplayusername(username);

            }
        }
    }, [location]);
    return (
        <div className="row">
            {showmenu &&
                <div className='header'>
                    <Link to={'/'}>Home</Link>
                    <span style={{ marginLeft: '70%' }}>Hello <b>{displayusername}</b></span>
                    <Link to={'/login'}>Logout</Link>
                </div>}
        </div>
    );
}

export default AppHeader