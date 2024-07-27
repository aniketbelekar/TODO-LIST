import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'; // Correct import for Firebase v9
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import './Login.css'; // Make sure you have this CSS file

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const auth = getAuth(); // Initialize the auth instance

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Account created successfully!");
      navigate('/'); // Redirect to home or tasks page
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className='login-container'>
      <form className='login-form' onSubmit={handleSignUp}>
        <h2>Sign Up</h2>
        <label htmlFor='email'>Email:
          <input 
            type='email' 
            id='email' 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </label>
        <label htmlFor='password'>Password:
          <input 
            type='password' 
            id='password' 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </label>
        <button type='submit'>Sign Up</button>
        <p>Already registered? <a onClick={handleLoginRedirect}>Login</a></p>
      </form>
    </div>
  );
}

export default Login;
