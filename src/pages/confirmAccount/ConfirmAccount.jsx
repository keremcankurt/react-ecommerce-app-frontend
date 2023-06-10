import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import "./ConfirmAccount.scss"
import { useDispatch, useSelector } from 'react-redux';
import { confirmAccount, reset } from '../../features/auth/authSlice';

export default function ConfirmAccount() {
    const dispatch = useDispatch();
    const {  isLoading, isSuccess, message} = useSelector(
        (state) => state.auth
    );
    const search = useLocation().search;
    const id = new URLSearchParams(search).get('id');
    const registerUserToken = new URLSearchParams(search).get('registerUserToken');
    useEffect(() => {
        dispatch(confirmAccount({id, registerUserToken}))
    }, [id,dispatch, registerUserToken]);

    const handleClick = () => {
        dispatch(reset());
    }
  return (
    <div className='confirmAccount-container'
    style={
        isLoading ? {borderRadius: "100px 5px 100px 5px"} :
        isSuccess
          ? { background: "green", borderRadius: "100px 5px 100px 5px" }
          : { background: "red", borderRadius: "5px 100px 5px 100px" }
      }>
        <h1 className='confirmAccount-message'>
            {isLoading ? 'Yükleniyor...' : isSuccess ? (
                <>
                    Giriş yapmak için lütfen&nbsp;
                    <Link to='/login' onClick={handleClick} className='confirmAccountToLogin'>tıklayınız.
                    </Link>
                </>
            )
            : 
                <>
                    {message}<br /> yeniden kayıt olmak için&nbsp;
                    <Link to='/login' onClick={handleClick} className='confirmAccountToLogin'>tıklayınız.</Link>
                </>
            }
            
        </h1>
    </div>
  )
}
