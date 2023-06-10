import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './UserAccountLeftBar.scss'

export default function UserAccountLeftBar({setRequestSeller, setShowConfirmation}) {
    
    const location = useLocation();
  return (
    <>
        <div className='left-bar-start'>
            <Link className={location.pathname === '/account' ? 'active' : ""} to='/account'>Hesap Bilgileri</Link>
            <Link className={location.pathname === '/account/orders' ? 'active' : ""} to='/account/orders'>Siparişler</Link>
            <Link className={location.pathname === '/account/followingstores' ? 'active' : ""} to='/account/followingstores'>Takip Edilen Mağazalar</Link>
            <Link className={location.pathname === '/account/accounttransactions' ? 'active' : ""} to='/account/accounttransactions'>Hesap İşlemleri</Link>
        </div>
        <div className='left-bar-end'>
            <button 
                className="delete-account-button"
                onClick={() => setShowConfirmation(true)}
            >Hesabı Sil
            </button>
        </div>
    </>
  )
}
