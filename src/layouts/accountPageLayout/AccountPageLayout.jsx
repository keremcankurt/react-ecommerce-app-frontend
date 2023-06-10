import React, { useEffect, useState } from 'react'
import {Outlet, useNavigate } from 'react-router-dom';
import AccountDeleteConfirmation from '../../components/accountDeleteConfirmation/AccountDeleteConfirmation';
import { useDispatch, useSelector } from 'react-redux';
import "./AccountPageLayout.scss"
import RequestSeller from '../../components/requestSeller/RequestSeller';
import UserAccountLeftBar from '../../components/userAccountLeftBar/UserAccountLeftBar';
import { deleteAccount } from '../../features/user/userSlice';
import SellerAccountLeftBar from '../../components/sellerAccountLeftBar/SellerAccountLeftBar';

export default function AccountPageLayout() {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [requestSeller, setRequestSeller] = useState(false);
    const navigate = useNavigate();
    const {  user} = useSelector(
        (state) => state.auth
    );
    useEffect(() =>{
        if(!user){
            navigate("/");
        }
    }, [user,navigate])
    const dispatch = useDispatch();
    const handleDeleteConfirmation = (e) => {
        e.preventDefault();
        dispatch(deleteAccount());
    }
    
  return (
    <>
        {showConfirmation && (
            <AccountDeleteConfirmation handleDeleteConfirmation={handleDeleteConfirmation} setShowConfirmation={setShowConfirmation} />        
      )}
      {
        requestSeller && (
            <RequestSeller setShowRequestSeller={setRequestSeller}/>
        )
      }
      <div className='account-page'>
            <div className='left-bar'>
                {user.role === 'admin' ? "admin" : user.isSeller ?
                 <SellerAccountLeftBar setRequestSeller={setRequestSeller} setShowConfirmation={setShowConfirmation}/>
                 :
                 <UserAccountLeftBar setRequestSeller={setRequestSeller} setShowConfirmation={setShowConfirmation}/>
                 }
                
            </div>
            <div className="page-content">
                <Outlet />
            </div>
      </div>
    </>
  )
}
