import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import './ConfirmSeller.scss'
import { useDispatch, useSelector } from 'react-redux';
import { confirmSeller, rejectSeller } from '../../features/admin/adminSlice';

export default function ConfirmSeller() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector(
        (state) => state.auth
    );
    const {isSuccess, isLoading} = useSelector(
        (state) => state.admin
    );
    useEffect(() => {
        if(!user || user.role !== "admin"){
            navigate("/");
        }
    }, [user,navigate]);
    const search = useLocation().search;
    const id = new URLSearchParams(search).get('id');
    const name = new URLSearchParams(search).get('name');
    const company = new URLSearchParams(search).get('company');
    const handleConfirm = () => {
        dispatch(confirmSeller({id,company}));
    }
    const handleReject = () => {
        dispatch(rejectSeller(id));

    }

    useEffect(() => {
        if(isSuccess) {
            navigate("/");
        }
    },[isSuccess, navigate]);
  return (
    <div className='confirm-seller-container'>
        <h2 className='text'>{name} isimli kişinin satıcı olma talebini kabul ediyor musunuz?</h2>
        <div className='buttons'>
            {isLoading ? 
                ( 
                    <>
                        <button className='confirm-button' disabled>...</button>
                        <button className='reject-button' disabled>...</button>
                    </>
                ) : ( 
                    <>
                        <button className='confirm-button' onClick={handleConfirm}>Onayla</button>
                        <button className='reject-button' onClick={handleReject}>Reddet</button>
                    </>
                )
            }
        </div>
    </div>
  )
}
