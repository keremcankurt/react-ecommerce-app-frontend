import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Register.scss'
import { useDispatch, useSelector } from 'react-redux';
import { register, reset } from '../../features/auth/authSlice';

export default function Register() {
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        place:"",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isLoading, isSuccess} = useSelector(
        (state) => state.auth
    );
    useEffect(() => {
        if (user) {
          navigate("/")
        }
        if(isSuccess){
            dispatch(reset())
            navigate("/login")
        }
    }, [user,navigate,isSuccess,dispatch]);

    const { name, surname, place, email, password, confirmPassword } = formData;
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
      dispatch(register(formData));
    }
  return (
    <div className='register-container'>
        <div className='register'>
            <form onSubmit={handleSubmit} className='registerForm'>
                <h1 className='register-logo'>KCKTİCARET</h1>
                <div className='fullName'>
                    <input name='name' value={name} placeholder='Ad' required onChange={handleChange}/>
                    <input name='surname' value={surname} placeholder='Soyad' required onChange={handleChange}/>
                </div>
                <input name='place' value={place} placeholder='Şehir' onChange={handleChange}/>
                <input name='email' value={email} placeholder='Email' type='email' required onChange={handleChange}/>
                <input name='password' value={password} placeholder='Şifre' type='password' required onChange={handleChange}/>
                <input name='confirmPassword' value={confirmPassword} placeholder='Şifreyi Onayla' type='password' required onChange={handleChange}/>
                {isLoading ? (
                  <button disabled className='loading'>Kayıt işlemi Tamamlanıyor...</button>
                ):(
                  <button type='submit'>Kayıt Ol</button>
                )}
                <Link to='/login' className='backToLogin'>Giriş Yap</Link>
            </form>
            
            
        </div>
    </div>
  )
}
