// Admin.js
import React, { useState, useEffect } from 'react';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import axios from 'axios';
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom';
import serverAddress from '../../config';
const Admin = () => {
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false)
    const [role, setRole] = useState('');
    const [inviteEmail, setInviteEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwt_decode(token);
            setIsAdmin(decodedToken.role === 'admin');
        }
        if (!isAdmin) {
            navigate('/login');
        }
    }, [isAdmin, navigate]);

    const handleChangeRole = (event) => {
        setRole(event.target.value);
    };

    const handleSubmitRoleChange = async () => {
        try {
            await axios.put(`${serverAddress}/api/users/role`, { email, role });
            alert('User role updated successfully');
        } catch (error) {
            console.error(error);
            alert('Failed to update user role');
        }
    };

    const handleSubmitInvite = async () => {
        try {
            await axios.post(`${serverAddress}/api/users/invite`, { email: inviteEmail });
            alert('Invitation sent successfully');
        } catch (error) {
            console.error(error);
            alert('Failed to send invitation');
        }
    };

    return (
        <div>
            <h2>Admin Panel</h2>

            <div>
                <h3>Change User Role</h3>
                <TextField 
                    label="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <FormControl>
                    <InputLabel id="role-label">Role</InputLabel>
                    <Select 
                        labelId="role-label" 
                        value={role} 
                        onChange={handleChangeRole}
                    >
                        <MenuItem value={'admin'}>Admin</MenuItem>
                        <MenuItem value={'user'}>User</MenuItem>
                    </Select>
                </FormControl>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleSubmitRoleChange}
                >
                    Change Role
                </Button>
            </div>

            <div>
                <h3>Invite User</h3>
                <TextField 
                    label="Email" 
                    value={inviteEmail} 
                    onChange={(e) => setInviteEmail(e.target.value)} 
                />
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleSubmitInvite}
                >
                    Invite User
                </Button>
            </div>
        </div>
    );
}

export default Admin;
