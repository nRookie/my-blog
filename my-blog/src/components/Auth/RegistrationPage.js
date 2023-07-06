import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import serverAddress from '../../config';


const RegistrationPage = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const navigate = useNavigate()

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const register = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${serverAddress}/api/register`, {
                email: user.email,
                password: user.password
            });
            console.log(res.data);
            navigate('/login')
        } catch(err) {
            console.error(err.response.data);
        }
    }
    return (
        <div>
          <h2>Register</h2>
          <form onSubmit={register}>
            <input type="email" name="email" placeholder="Email" value={user.email} onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" value={user.password} onChange={handleChange} required />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" value={user.confirmPassword} onChange={handleChange} required />
            <button type="submit">Register</button>
          </form>
        </div>
      );
}



export default RegistrationPage;
