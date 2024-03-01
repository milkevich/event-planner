import React, { useState } from 'react'
import s from './LogIn.module.scss'
import { useNavigate } from 'react-router-dom';
import Loader from '../Components/Loader';
import { Alert } from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import formImg from '../imgs/formImg.png'
import { useThemeContext } from '../Contexts/ThemeContext';
import formImgLight from '../imgs/formImgLight.png'


const LogIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [success, setSuccess] = useState(false)
    const { isLightMode } = useThemeContext() 

    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        
        if (alertMessage === '' && (email !== '' && password.length >= 6)) {
            setSuccess(true);
            signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    navigate('/tasks');
                    console.log('Login successful');
                })
                .catch((error) => {
                    console.log('Login error:', error.message);
                    setAlert(true);
                    setSuccess(false);
                    setAlertMessage('Invalid email or password');
                });
        } else {
            setAlert(true);
            if (email === '') {
                setAlertMessage('Email address is required');
            } else if (password.length < 6) {
                setAlertMessage('Password must be at least 6 characters long');
            } else {
                setAlertMessage('Invalid email and password');
            }
        }
    };
    

    const emailValidation = (e) => {
        const pattern = /^[^]+@[^]+\.[a-z]{2,3}$/;
        const emailValue = e.target.value;
        setEmail(emailValue);

        if (emailValue === '' || !emailValue.match(pattern)) {
            setAlertMessage('Email adress is not valid');
        } else {
            setAlert(false);
            setAlertMessage('');
        }
    };

    const passwordValidation = (e) => {
        const passwordValue = e.target.value;
        setPassword(passwordValue);

        if (passwordValue === '' || passwordValue.length < 6) {
            setAlertMessage('Password must be at least 6 characters long');
        } else {
            setAlert(false);
            setAlertMessage('');
        }
    };

    return (
        <div style={{ backgroundImage: `url(${ isLightMode ? formImgLight : formImg})`}} className={s.logInContainer}>
            {success ? <Loader /> : null}
            <div className={s.formContainer}>
                {alert && <Alert sx={{color: "white", backgroundColor: "rgb(255, 143, 143, 0.2)", paddingRight: "40px"}} severity="error">{alertMessage}</Alert>}
                <div className={s.formContainerTop}>
                    <h1>Log In</h1>
                    <p>to get access to your tasks</p>
                </div>
                <div className={s.formInput}>
                    <p>Email adress</p>
                    <input onChange={emailValidation} value={email} placeholder='Enter your email' type="text" />
                </div>
                <div className={s.formInput}>
                    <p>Password</p>
                    <input onChange={passwordValidation} value={password} placeholder='Enter your password' type="password" />
                </div>
                <button onClick={submit}>Log In</button>
                <p className={s.suggestion}>Don't have an account? <span onClick={() => {navigate('/sign-up')}}>Register</span></p>
            </div>
        </div>
    )
}

export default LogIn