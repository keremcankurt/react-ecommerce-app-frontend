import React from 'react'
import './RejectSeller.scss'
import { useDispatch, useSelector } from 'react-redux';
import { removeSeller } from '../../features/seller/sellerSlice';

export default function RejectSeller() {
  const {isLoading} = useSelector(
    (state) => state.seller
  );
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(removeSeller());
  }
  return (
    <div className="seller-confirmation-container">
    <form onSubmit={handleSubmit}  className="seller-confirmation-box">
      <h2>Satış Yapmaya Son Ver</h2>
      <span className='info'>Unutma bu işlem geri alınamaz ve tüm ürünleriniz silinir!</span>
      
      <div className="confirmation-button">
      {isLoading ? <button className='reject-seller-button' disabled>...</button> : <button className='reject-seller-button' type='submit'>Onayla</button>}
      </div>
    </form>
  </div>
  )
}
