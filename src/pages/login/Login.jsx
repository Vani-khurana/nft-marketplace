import React, { useState } from 'react';
import './login.css'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const creds = {
      yuvraj: { pass: 'yuvraj123', name: 'Yuvraj Singh' },
      vani: { pass: 'vani123', name: 'Vani' },
      garima: { pass: 'garima123', name: 'Garima' }
    };

    const userEntry = creds[username.toLowerCase()];
    if (userEntry && userEntry.pass === password) {
      localStorage.setItem("currentUser", userEntry.name);
      window.dispatchEvent(new Event('authChange'));
      navigate("/");
    } else {
      alert("Invalid username or password");
    }
  }

  return (
    <div className='login section__padding'>
      <div className="login-container">
        <h1>Login</h1>
        <form className='login-writeForm' autoComplete='off' onSubmit={handleLogin}>
          <div className="login-formGroup">
            <label>Username</label>
            <input type="text" placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} />
          </div>
          <div className="login-formGroup">
            <label>Password</label>
            <input type="password" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          
         <div className="login-button">
          <button className='login-writeButton' type='submit'>Login</button>
          <Link to="/register">
            <button className='login-reg-writeButton' type='button'>Register</button>
          </Link>
         </div>
        </form>
      </div>
    </div>
   )
};

export default Login;
