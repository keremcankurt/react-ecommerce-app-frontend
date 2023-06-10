import React, {useEffect, useState } from 'react'
import { FaUser } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {edit, reset, upload } from '../../features/user/userSlice';
import './Account.scss'

export default function Account({selectedImage, setSelectedImage}) {
    const {user, isError, isSuccess} = useSelector(
        (state) => state.user
    );
    
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
      name: '',
      surname:'',
      place:'',
      email:'',
      company:'',
    });
    useEffect(()=> {
      if(isSuccess){
        setFormData({
          name: user.name || '',
          surname: user.surname || '',
          place: user.place || '',
          email: user.email ||'',
          company: user.seller.company || '',
        })
      }

    },[isSuccess, user])
    useEffect(() => {
      if (isError) {
        setSelectedImage('');
        dispatch(reset());
      }
    },[isError,setSelectedImage,dispatch])
    let {name, surname, email, place, company} = formData;
    
    const handleChange = (e) => {
        setFormData(prevState => ({
          ...prevState,
          [e.target.name]: e.target.value
        }));
        
    }
    const handleChangePP = (e) => {
        const data = new FormData();
        data.append("profile_image", e.target.files[0]);
        console.log(data, data.profile_image)
        dispatch(upload(data));
        setSelectedImage(URL.createObjectURL(e.target.files[0]));
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const newData = {
          name,
          surname,
          place,
          'seller.company': company,
        }
        dispatch(edit(newData));
    }
  return (
    <div className='account-container'>
    {!isSuccess ? 
    <p>YÜKLENİYOR..</p>
    :
    <form onSubmit={handleSubmit} className='account-infos'>
        {selectedImage ? (
          <img className='profile-picture' src={selectedImage} alt="Profile" />
        ) : (
          user && user.profilePicture ? (
            <img className='profile-picture' src={`${process.env.REACT_APP_API_BASE_URL}/images/${user?.profilePicture}`} alt="Profile" />
          ) : (
            <FaUser className='profile-picture'/>
          )
        )}
            <label htmlFor="inputFile" style={{ cursor: "pointer" }}>
                <button type="button" style={{ pointerEvents: "none" }}>
                  <span>Fotoğraf Seç</span>
                </button>
              </label>
              <input
                type="file"
                id="inputFile"
                style={{ display: "none" }}
                onChange={handleChangePP}
                accept="image/*"
              />
            <div className='fullName'>
                <input type='text' placeholder='İsim' name='name' value={name} onChange={handleChange}/>
                <input type='text' placeholder='Soyad' name='surname' value={surname} onChange={handleChange}/>
            </div>
            <input type='text' placeholder='Şehir' name='place' value={place} onChange={handleChange}/>
            {company &&
              <input type='text' placeholder='Şirket Adı' name='company' value={company} onChange={handleChange}/>
            }
            <input type='email' placeholder='Email' value={email} disabled/>
            <button type='submit'>Güncelle</button>
        </form>

    }
    </div>
  )
}
