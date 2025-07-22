import React, { useState } from 'react';
import axios from 'axios';
import './Registration.css';

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
            const response = await axios.post('http://localhost:3002/auth/registers', {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                conPassword: formData.confirmPassword
            });
            console.log("------>" + response);

            setSuccess('Registration successful!');
            // Optionally, redirect after registration
            window.location.href = '/mainpage';
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed');
        }
    }

    return (
        <div className="container">
            <div className='main-content-registration'>
                <div className="form-group">
                    <h5>Registration Page</h5>
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
                                className="form-check-input"
                                checked={formData.terms}
                                onChange={handleChange}
                            />
                            {' '}
                            I agree to the terms and conditions
                        </label>
                        <br />

                        <button type="submit" className="btn btn-primary mt-3">
                            Register
                        </button>
                        <br />
                        <a href='/login' style={{color:"black"}}>Already have an account? Login</a>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        {success && <p style={{ color: 'green' }}>{success}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Registration;
