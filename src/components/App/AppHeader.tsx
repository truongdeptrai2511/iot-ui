import React, { useEffect, useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TokenTransfer } from '../Login/Login.tsx';

import './AppHeader.scss';


function AppHeader() {
    const [displayusername, setdisplayusername] = useState('');
    const [showmenu, setshowmenu] = useState(false);
    const usenavigate = useNavigate();
    const location = useLocation();
    const userrole = useContext(TokenTransfer);
    const [loginShow, setloginShow] = useState(false);

    const handleLogout = () => {
        sessionStorage.clear();
        usenavigate('/login');
    }

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
                <div className="row-md-12">
                    <div className="row">
                        <div className="col-md-3">
                            <Link to="/">Home</Link>
                        </div>
                        {loginShow &&                        
                            <><div className="col-md-3">
                                    <Link to="/login">Login</Link>
                                </div><div className="col-md-3">
                                        <Link to="/register">Register</Link>
                                </div></>
                        }
                        <div className='col-md-3' style={{float:"right"}}>
                            <div className="span">
                                <Link to="/profile"><b>{displayusername}</b></Link>
                            </div>
                            <div className="span">
                                <a onClick={handleLogout}>LogOut</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            }
        </div>
    );
}

export default AppHeader