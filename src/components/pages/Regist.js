import React, {useState} from 'react';
import '../../App.css';
import Axios from 'axios';

export default function Regist() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('A jelszó és az újra megadott jelszó nem egyezik!');
            return;
        }
        Axios.post('http://localhost:3001/register', {
            username: username,
            email: email,
            password: password
        }).then(() => {
            alert("Sikeres Regisztráció!");
            window.location.href = '/login';
        }).catch((error) => {
            if (error.response && error.response.status === 500) {
                // Hibás a regisztráció során
                alert("Hiba történt a regisztráció során.");
            }else if (error.response && error.response.status === 400) {
                // Felhasználónév vagy jelszó már foglalt
                alert("A felhasználónév vagy jelszó már foglalt!");
            } else {
                // Egyéb hiba
                alert("Error 404!");
            }
        });
    };
    return (
    <div className='regist-container'>
        <h1>Sign Up</h1>
        <div className='regist-form'>
            <form method="POST" action="/register">
                <input type="text" name='username' placeholder='Your Username' className='regist-input' value={username} onChange={handleUsernameChange} /><br />
                <input type="email" name='email' placeholder='Your Email' className='regist-input' value={email} onChange={handleEmailChange} /><br />
                <input type="password" name='password' placeholder='Your Password' className='regist-input' value={password} onChange={handlePasswordChange} /><br />
                <input type="password" name="confpass" placeholder='Your Password Again' className='regist-input' value={confirmPassword} onChange={handleConfirmPasswordChange} /><br />
                <button className='regist-btn' type='submit' onClick={handleSubmit}>SIGN UP</button>
            </form>
        </div>
    </div>
    )
}

