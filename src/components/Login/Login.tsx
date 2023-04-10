import React, {useState, useEffect, createContext, useContext} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import decodeJwtToken from '../../utils/JwtTokenClaim.tsx';

import styled,{keyframes} from 'styled-components';
import 'animate.css'
import './Login.scss'

export const TokenTransfer = createContext('');

const fadeIn = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.9);
  }
`;

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 2s easy;
`;

const Input = styled.input`
  font-size: 2rem;
  padding: 10;
  border-radius: 0.9rem;
  border: none;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.3);
  text-align: center;
  margin-bottom: 1rem;
`;

const inputstyle = styled.input`
  padding: 10px;
`;

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userole, setUserole] = useState('');
    const TokenTransfer = createContext('')
    const usenavigate = useNavigate();

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
                    toast.error('Login failed, invalid credentials');
                } else {
                    toast.success('Success');
                    sessionStorage.setItem('username', username);
                    sessionStorage.setItem('jwttoken', 'Bearer ' + resp.Token);
                    const payload = decodeJwtToken();
                    const userRole = payload?.role;
                    setUserole(userRole);
                    usenavigate('/');
                }
            }).catch((err) => {
                toast.error('Login Failed due to :' + err.message);
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
        <TokenTransfer.Provider value={userole}>
            
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
                                <Link className="btn btn-success" to={'/register'}>New User</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </TokenTransfer.Provider>
    );
}

export default Login