import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './SellerAccountLeftBar.scss'

export default function SellerAccountLeftBar({setRequestSeller, setShowConfirmation}) {
    const location = useLocation();
  return (
    <>
        <div className='left-bar-start'>
        <h3>Kullanıcı İşlemleri</h3>
            <Link className={location.pathname === '/account' ? 'active' : ""} to='/account'>Hesap Bilgileri</Link>
            <Link className={location.pathname === '/account/orders' ? 'active' : ""} to='/account/orders'>Siparişler</Link>
            <Link className={location.pathname === '/account/followingstores' ? 'active' : ""} to='/account/followingstores'>Takip Edilen Mağazalar</Link>
            <Link className={location.pathname === '/account/accounttransactions' ? 'active' : ""} to='/account/accounttransactions'>Hesap İşlemleri</Link>
        </div>
        <div className='left-bar-center'>
        <h3>Satıcı İşlemleri</h3>
            <Link className={location.pathname === '/account/products' ? 'active' : ""} to='/account/products'>Ürünlerim</Link>
            <Link className={location.pathname === '/account/addproduct' ? 'active' : ""} to='/account/addproduct'>Yeni Ürün Ekle</Link>
            <Link className={location.pathname === '/account/addcampaign' ? 'active' : ""} to='/account/addcampaign'>Kampanya Düzenle</Link>
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
