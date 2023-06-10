import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import "./Login.scss"
import {  login } from "../../features/auth/authSlice";

export default function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isLoading} = useSelector(
      (state) => state.auth
    );
    useEffect(() => {
      if (user) {
        navigate("/")
      }
    }, [user,navigate]);
    const {email, password} = formData;
    const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
      e.preventDefault();
      const userData = {
        email,
        password,
      };
      dispatch(login(userData));
    };

  return (
    <div id='login-container'>
      <div className='login'>
        <form onSubmit={onSubmit} className='loginForm'>
          <h1 className='login-logo'>KCKTİCARET</h1>
            <input name='email' placeholder='Email' type='email' value={email} onChange={onChange} required/>
            <input name='password' placeholder='Password' type='password' value={password} onChange={onChange} required/>
            <Link to='/forgotpassword' className='forgotPassword'>Şifremi Unuttum</Link>
            {isLoading ? (
              <button disabled className='loading'>Giriş Yapılıyor...</button>
            ):(
              <button type='submit'>Giriş Yap</button>
            )}
            
            <Link to='/register' className='goToRegister'>Kayıt Ol</Link>
        </form>
      </div>
    </div>
  )
}
