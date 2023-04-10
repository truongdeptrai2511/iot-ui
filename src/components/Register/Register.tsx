import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');

    const navigate = useNavigate();

    const IsValidate = () => {
        let isProceed = true;
        let errormsg = 'Please enter value in';
        if(username === '' || username === null){
            isProceed = false;
            errormsg += ' Username';
        }
        if(password === '' || password === null){
            isProceed = false;
            errormsg += ' Password';
        }
        if(email === '' || email === null){
            isProceed = false;
            errormsg += + ' Email';
        }
        if(phone === '' || phone === null){
            isProceed = false;
            errormsg += ' Phone';
        }
        if(address === '' || address === null){
            isProceed = false;
            errormsg += ' Address';
        }else{
            if(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)){

            }else{
                isProceed = false;
                toast.warning('Please enter the valid Email');
            }
        }
        return isProceed;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
            let regobj = {
                "username": username,
                "password": password,
                "email": email,
                "phone": phone,
                "address": address,
                "name": name,
                "avatar": avatar
            }
            if (IsValidate()) {
            console.log(regobj);
            fetch("https://localhost:7199/api/auth/register/customer", {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(regobj)
            }).then((res) => {
                toast.success('Registered successfully.')
                navigate('/login');
            }).catch((err) => {
                toast.error('Failed :' + err.message);
            });
        }
    }
    return (
        <div>
            <div className="offset-lg-3 col-lg-6">
                <form onSubmit={handleSubmit} className="container">
                    <div className="card">
                        <div className="card-header">
                            <h2>User Register</h2>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label>Full Name <span className="errmsg">*</span></label>
                                <input value={name} onChange={e => setName(e.target.value)} className="form-control"></input>
                            </div>
                            <div className="form-group">
                                <label>User Name <span className="errmsg">*</span></label>
                                <input value={username} onChange={e => setUsername(e.target.value)} className="form-control"></input>
                            </div>
                            <div className="form-group">
                                <label>Password <span className="errmsg">*</span></label>
                                <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control"></input>
                            </div>
                            <div className="form-group">
                                <label>Email <span className="errmsg">*</span></label>
                                <input value={email} onChange={e => setEmail(e.target.value)} className="form-control"></input>
                            </div>
                            <div className="form-group">
                                <label>Phone <span className="errmsg">*</span></label>
                                <input value={phone} onChange={e => setPhone(e.target.value)} className="form-control"></input>
                            </div>
                            <div className="form-group">
                                <label>Address <span className="errmsg">*</span></label>
                                <input value={address} onChange={e => setAddress(e.target.value)} className="form-control"></input>
                            </div>
                            <div className="form-group">
                                <label>Avatar <span className="errmsg">*</span></label>
                                <input value={avatar} onChange={e => setAvatar(e.target.value)} className="form-control"></input>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary">Register</button>
                            </div>
                        </div>
                    <div className="card-footer">
                        <Link to="/login">Login</Link>
                    </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register