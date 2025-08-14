import React, { useState } from 'react';
import axios from 'axios';
import './login.css'

import { Link } from "react-router-dom";


const Login = () => {


    // State for form fields
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
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

        try {
            const response = await axios.post('http://localhost:3002/auth/login', {
                username: formData.username,
                email: formData.email,
                password: formData.password,
            });

            // Log the response to inspect data
            console.log("Login Response:", response.data);

            const userData = response?.data?.data;

            // Store token and username in localStorage
            if (userData?.token) {
                localStorage.setItem("token", userData.token);
            }

            if (userData?.username) {
                localStorage.setItem("username", userData.username);
            } else {
                console.warn("Username not found in response");
            }

            console.log("Token from localStorage:", localStorage.getItem("token"));
            console.log("Username from localStorage:", localStorage.getItem("username"));

            setSuccess('Login successful!');

            // Redirect logic
            if (userData?.username === 'admin') {
      window.location.href = '/admin';
    } else {
        window.location.href = '/mainpage';
    }


        } catch (err) {
            console.error(err);
            setError(err.response?.data?.error || 'Login failed');
        }
    }


    return (
        <div className="container">
            <div className='main-content-login'>
                <h3> Login Page </h3>
                <div className="form-group-login">
                    <form onSubmit={handleSubmit}>

                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            name="username"
                            placeholder="Enter username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                     

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
                        

                        <button type="submit" className="btn btn-primary mt-3">Login</button>

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