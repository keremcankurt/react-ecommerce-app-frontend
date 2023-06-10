import React, { useState } from 'react'
import './ChangePassword.scss'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../features/user/userSlice';
export default function ChangePassword() {
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    })
    const {isLoading} = useSelector(
        (state) => state.user
    );
    
    const dispatch = useDispatch();
    const {password, confirmPassword} = formData
    const handleSubmit = (e) => {
        e.preventDefault();
        if(password !== confirmPassword) {
            toast.error("Passwords do not match");
        }
        else {
            const data = {
                password
            }
            dispatch(resetPassword(data));

        }
        setFormData({
            password: "",
            confirmPassword: "",
        });

    }
    const handleChange = (e) => {
        setFormData({
          ...formData,
            [e.target.name]: e.target.value
        })
    }
  return (
    <div className='change-password-container'>
        <h2 className='profiletext'>Şifre Değiştir</h2>
        <form className='change-password-form' onSubmit={handleSubmit}>
            <input type='password' placeholder='Yeni Şifre' onChange={handleChange} value={password} name='password' required/>
            <input type='password' placeholder='Yeni Şifre, Tekrarla' onChange={handleChange} value={confirmPassword} name='confirmPassword' required/>
            {isLoading ? 
                <button type='submit'  className='change-password-button' disabled>...</button>
            :
                <button type='submit' className='change-password-button'>Değiştir</button>
            }
        </form>
        
    </div>
  )
}
