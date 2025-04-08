import React, { useState } from 'react';
import { useAuth } from '../../pages/AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../../styles/Login.css'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('')
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
                credentials: 'include',  
            });
    
            const data = await res.json();
    
            if (res.ok) {
                login(); 
                navigate('/'); 
            } else {
                    setErrorMsg('Felaktigt användarnamn eller lösenord')
            }
        } catch (error) {
            console.error('Fel vid inloggning:', error);
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
                        autoComplete="username" 
                    />
                </div>
                <div>
                    <label>Lösenord:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        autoComplete="current-password" 
                    />
                </div>
                <p className='errMsg'>{errorMsg}</p>
                <button className='loginBtn' type="submit">Logga in</button>
            </form>
        </div>
    );
};

export default Login;
