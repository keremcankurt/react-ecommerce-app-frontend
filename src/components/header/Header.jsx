import React, { useEffect } from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';
import DropDownMenu from '../dropDownMenu/DropDownMenu';
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from '../../features/user/userSlice';
import CartDropdown from '../cartDropDown/CartDropDown';

export default function Header({setSelectedImage, selectedImage}) {
    
  const { user} = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    (cart && cart.length > 0) && dispatch(getCart(cart))
  },[dispatch])
  return (
    <nav className="container">
      <Link to="/" className="logo">
        KCKTİCARET
      </Link>
      <div className='header-right'>
      <CartDropdown/>
        {user ? (<>
            <DropDownMenu setSelectedImage={setSelectedImage} selectedImage={selectedImage} fullName={user.name + " " + user.surname} profilePicture={user.profilePicture} />
        </>
        ) : (
          <p>
            <Link to="/login">Giriş Yap</Link>&nbsp;|&nbsp;
            <Link to="/register">Kayıt Ol</Link>
          </p>
        )}
      </div>
    </nav>
  );
}
