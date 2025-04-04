import React, { useState } from 'react';
import { useAuth } from '../../pages/AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../../styles/Login.css'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === 'admin' && password === 'admin') {
            login(); 
            navigate('/'); 
        } else {
            alert('Felaktigt användarnamn eller lösenord');
        }
    };

    return (
        <div className="login-container">
            <h1>NeverAlone</h1>
            <h2>Logga in</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Användarnamn:</label>
                    <input 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Lösenord:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button className='loginBtn' type="submit">Logga in</button>
            </form>
        </div>
    );
};

export default Login;