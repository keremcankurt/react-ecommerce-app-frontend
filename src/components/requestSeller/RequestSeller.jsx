import React, { useState } from 'react'
import "./RequestSeller.scss"
import { useDispatch, useSelector } from 'react-redux';
import { beSeller } from '../../features/user/userSlice';

export default function RequestSeller() {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    company: "",
    desc: ""
  });
  const {isLoading} = useSelector(
    (state) => state.user
  );
  const {name, surname, company, desc} = formData
  const dispatch = useDispatch();
  const handleRequestSeller = (e) => {
    e.preventDefault();
    dispatch(beSeller(formData));
    setFormData({
      name: "",
      surname: "",
      company: "",
      desc: ""
    });
  }
  const handleChange = (e) => {
    setFormData({
      ...formData,
        [e.target.name]: e.target.value
    })
  }
  return (
    <div className="seller-confirmation-container">
          <form onSubmit={handleRequestSeller} className="seller-confirmation-box">
          <h2>Bizimle çalışmak ister misiniz?</h2>
            <div className='inputs'>
              <div className='fullName'>
                <input type="text" placeholder="İsim" name='name' value={name} onChange={handleChange} required/>
                <input type="text" placeholder="Soyad" name='surname' value={surname} onChange={handleChange}  required/>
              </div>
              <input type="text" placeholder="Şirket Adı" name='company' value={company} onChange={handleChange}  required/>
              <textarea placeholder="Kendinizden bahsedin..." name='desc' value={desc} onChange={handleChange}  required />
            </div>
            <div className="confirmation-button">
            {isLoading ? <button disabled>...</button> : <button type='submit'>Gönder</button>}
            </div>
          </form>
        </div>
  )
}
