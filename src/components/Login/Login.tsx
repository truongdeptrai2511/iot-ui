import React, {useState, useEffect, createContext} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import decodeJwtToken from '../../utils/JwtTokenClaim.tsx';

import 'animate.css'
import './Login.scss'

export const TokenTransfer = createContext(null);

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userole, setUserole] = useState('');
    const TokenTransfer = createContext('')
    const usenavigate = useNavigate();
    const [token, setToken] = useState('');


    useEffect(() => {
        sessionStorage.clear();
    }, []);

    useEffect(() => {
        console.log(userole);
        return () => {
            {console.log('cleanup')}
        }
    },[userole]);

    const ProceedLoginusingAPI = (e) => {
        e.preventDefault();
        if (validate()) {
            let inputobj = { "username": username, "password": password };
            fetch("https://localhost:7199/api/auth/login", {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(inputobj)
            }).then((res) => {
                return res.json();
            }).then((resp) => {
                console.log(resp);
                if (Object.keys(resp).length === 0) {
                    console.error('Login failed, invalid credentials hehe');
                } else {
                    toast.success('Success');
                    sessionStorage.setItem('username', username);
                    sessionStorage.setItem('jwttoken', 'Bearer ' + resp.Token);
                    setToken('Bearer ' + resp.Token);
                    const payload = decodeJwtToken();
                    const userRole = payload?.role;
                    setUserole(userRole);
                    usenavigate('/');
                }
            }).catch((err) => {
                
                var result = alert("Tài khoản hoặc mật khẩu không đúng!");
                console.warn('Login Failed due to :' + err.message);
            
            });
        }
    };
    const validate = () => {
        let result = true;
        if (username === '' || username === null) {
            result = false;
            toast.warning('Please Enter Username');
        }
        if (password === '' || password === null) {
            result = false;
            toast.warning('Please Enter Password');
        }
        return result;
    };
    return (
        <TokenTransfer.Provider value={token}>
            
            <div className="row">
                <div className="offset-lg-3 col-lg-6" style={{ marginTop: '100px' }}>
                    <form onSubmit={ProceedLoginusingAPI} className="container">
                        <div className="card">
                            <div className="card-header">
                                <h2>User Login</h2>
                            </div>
                            <div className="card-body">
                                <div className="form-group">
                                    <label>User Name <span className="errmsg" style={{color:'red'}}>*</span></label>
                                    <input value={username} onChange={e => setUsername(e.target.value)} className="form-control"></input>
                                </div>
                                <div className="form-group">
                                    <label>Password <span className="errmsg" style={{color:'red', width: '50%'}}>*</span></label>
                                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control"></input>
                                </div>
                            </div>
                            <div className="card-footer">
                                <button type="submit" className="btn btn-primary">Login</button> |
                                <button type="submit" className="btn btn-primary">
                                    <Link to={'/register'} style={{textDecoration:"none", color:"white", }}>New User</Link>
                                </button>
                                
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </TokenTransfer.Provider>
    );
}

export default Login