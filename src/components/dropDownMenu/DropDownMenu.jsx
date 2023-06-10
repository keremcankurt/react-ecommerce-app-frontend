import React, { useEffect, useRef, useState } from 'react';
import './DropDownMenu.scss';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';

export default function DropDownMenu({setSelectedImage, selectedImage, fullName,profilePicture }) {
  
  const dispatch = useDispatch();
  const ref = useRef(null);
  useEffect(() => {
    document.addEventListener("click", handleClose);
    return () => {
      document.removeEventListener("click", handleClose);
    };
  }, []);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const handleDropDownToggle = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };
  const handleClose = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
        setIsDropDownOpen(false);
    }
  }

  const handleClick = () => {
    setSelectedImage('')
    dispatch(logout());
  }
  
  return (
    <div ref={ref}>
      <button className='settings' onClick={handleDropDownToggle}>
      {selectedImage ? (
          <img className='profile-picture' src={selectedImage} alt="Profile" />
        ) : (
          profilePicture ? (
            <img className='profile-picture' src={`${process.env.REACT_APP_API_BASE_URL}/images/${profilePicture}`} alt="Profile" />
          ) : (
            <FaUser />
          )
        )}
      </button>
      <div className={`dropdown-menu ${isDropDownOpen ? 'open' : ''}`}>
    
      <div className="dropdown-menu-header">
        <p>Merhaba, {fullName}</p>
      </div>
      <ul className="dropdown-menu-list">
        <li>
          <Link to="/account" onClick={handleDropDownToggle}>Hesabım</Link>
        </li>
        <li>
          <Link to="/favorites"onClick={handleDropDownToggle}>Favorilerim</Link>
        </li>
        <li>
          <Link to="/" onClick={handleClick}>Çıkış Yap</Link>
        </li>
      </ul>
    </div>
    </div>
  );
}
