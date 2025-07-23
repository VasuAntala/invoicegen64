import React, { useState } from 'react';
import axios from 'axios';
import './login.css'

import { Link } from "react-router-dom";


const Login = () => {

    // State for form fields
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        terms: false,
    }); 

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Handle input changes
    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    // Handle form submit
    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setSuccess('');
        if (!formData.terms) {
            setError('Please agree to the terms and conditions.');
            return;
        }
        try {
            // Change the URL to match your backend endpoint
            const response = await axios.post('http://localhost:3002/auth/login', {
                email: formData.email,  
                password: formData.password,
            });
            console.log("------>" + response);
            setSuccess('Login successful!');
            // Optionally, redirect after login
            window.location.href = '/mainpage';
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed');
        }   

    }
    
    return (
        <div className="container">
            <div className='main-content-login'> 
             <h3> Login Page </h3>
            <div className="form-group-login">
                <form onSubmit={handleSubmit}>

                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <br />
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={handleChange}
                        required 
                     />
                    <br />
                   
                    <button type="submit" className="btn btn-primary mt-3"  >Login</button>

                        <br />
                        <br></br>
                         <div className="d-flex gap-3 mb-3">
                    <button
                        className="btn w-50"
                        style={{
                            border: "1px solid #4169E1",
                            color: "#4169E1",
                            backgroundColor: "transparent",
                        }}
                    >
                        <i className="bi bi-facebook me-1" /> Facebook
                    </button>
                    <button
                        className="btn w-50"
                        style={{
                            border: "1px solid #4169E1",
                            color: "#4169E1",
                            backgroundColor: "transparent",
                        }}
                    >
                        <i className="bi bi-google me-1" /> Google
                    </button>
                </div>
                    <p className="text-center text-muted">
                     Dont have an account yet?{" "}
                    <Link
                        to="/register"
                        className="register-link text-decoration-none"
                        style={{ color: "#4169E1" }}
                    >
                        Register
                    </Link>
                </p>

                    {/* <a href='/register'>Create a new account Register</a> */}

                </form>

            </div>
            {/* Additional content can be added here */}
            </div>
        </div>
    );
}       

export default Login;