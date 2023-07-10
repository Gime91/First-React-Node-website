import React, {useState} from 'react';
import '../../App.css';
import Axios from 'axios';

export default function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        Axios.post('http://localhost:3001/login', {
            username: username,
            password: password
        }).then(() =>{
            alert("Sikeres Bejelentkezés!");
            window.location.href = '/';
        }).catch((error) => {
            if (error.response && error.response.status === 500) {
                alert("Hiba történt a bejelentkezés során!")
            }else{
                alert("Hibás felhasználónév vagy jelszó!")
            }
        });
    };

    return(
    <div className='signin-container'>
        <h1>Sign In</h1>
        <div className='signin-form'>
            <form method="POST" action='/login'>
                <input type="text" name='username' placeholder='Your Username' className='signin-input' value={username} onChange={handleUsernameChange} /><br />
                <input type="password" name='password' placeholder='Your Password' className='signin-input' value={password} onChange={handlePasswordChange} /><br />
                <button className='signin-btn' type='submit' onClick={handleSubmit}>SIGN IN</button>
            </form>
        </div>
    </div>      
    )
}