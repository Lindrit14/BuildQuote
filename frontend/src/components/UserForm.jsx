// File: frontend/src/components/UserForm.jsx
import React, { useState } from 'react';

function UserForm() {
    const [userData, setUserData] = useState({
        name: '',
        email: ''
    });

    const handleChange = (e) => {
        setUserData({...userData, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting", userData);
        
        // Make a POST request to send data to the backend
        const response = await fetch('http://localhost:5000/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        const data = await response.json();
        console.log(data);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
                placeholder="Enter your name"
            />
            <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                placeholder="Enter your email"
            />
            <button type="submit">Submit</button>
        </form>
    );
}

export default UserForm;
