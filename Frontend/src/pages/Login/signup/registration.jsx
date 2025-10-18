import React, { useState } from 'react';
import axios from 'axios';
import './registration.css';
import { Link } from 'react-router-dom';

const Registration = () => {
    // State for form fields
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        terms: false,
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Handle input changes
    function handleChange(e) {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    }

    // Handle form submit
    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!formData.terms) {
            setError('Please agree to the terms and conditions.');
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            // Change the URL to match your backend endpoint
            const response = await axios.post('https://invoicegen64-5.onrender.com/auth/registers', {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                conPassword: formData.confirmPassword
            });
            console.log("------>" + response);


            setSuccess('Registration successful!');
            // Optionally, redirect after registration
            window.location.href = '/login';
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed');
        }
    }

    return (
        <div className="container">
            <div className='main-content-registration'>
                <h3>Registration Page</h3>
                <div className="form-group">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter username"
                            required
                        />
         
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter email"
                            required
                        />
          
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter password"
                            required
                        />
            
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm password"
                            required
                        />
               
                        <label htmlFor="terms">
                            <input
                                type="checkbox"
                                id="terms"
                                name="terms"
                                 className="check-box"
                                checked={formData.terms}
                                onChange={handleChange}
                            />
                            {''}
                            I agree to the terms and conditions
                       
                        </label>


                        <button type="submit" className="btn btn-primary mt-3">
                            Register
                        </button>
                        <br />

                        <div className="text-center text-muted mb-3">OR</div>

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
                            <span>Already have an account?</span>
                            <Link
                                to="/login"
                                className="register-link "
                                style={{
                                    color: "#4169E1",
                                    verticalAlign: "bottom", 
                                    display: "inline-block"
                                }}
                            >
                                Login
                            </Link>
                        </p>

                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        {success && <p style={{ color: 'green' }}>{success}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Registration;