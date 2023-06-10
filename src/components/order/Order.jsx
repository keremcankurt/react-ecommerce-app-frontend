import React, { useState } from 'react';
import {FaStar} from 'react-icons/fa'
import './Order.scss';
import { useDispatch } from 'react-redux';
import { addComment } from '../../features/user/userSlice';

export default function Order({order}) {
  const [rating, setRating] = useState(order?.star || 0);
  const [hover, setHover] = useState(null);
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      info: {
        star: rating,
        text: text,
        orderId: order._id
      },
      id: order.productId
    }
    dispatch(addComment(data));
  }
  return (
    <div className='order-container'>
      <div className='order'>
        <span className='order-createdAt'>{new Date(order.createdAt).toLocaleDateString()}</span>
        <img className='order-product-img' src={`${process.env.REACT_APP_API_BASE_URL}/images/${order?.img}`} alt="product" />
        <div className='order-infos'>
          <span className='order-product-name'>{order?.name}</span>
          <span className='order-product-price'>{order?.price} TL</span>
          <span className='order-product-quantity'>Adet: {order.unit}</span>
        </div>
        <form onSubmit={handleSubmit} className='evaulation'>
          <div className='raiting'>
          
          {order.comment !== "Ürün kaldırılmış" && [...Array(5)].map((star, index) => {
            const currentRating = index + 1;
            return (
              <label>
                <input type='radio'
                name='rating'
                value={currentRating}
                onClick={() => {
                  order?.comment === undefined &&
                  setRating(currentRating)
                  }}
                />
                <FaStar className='order-star' size={30}
                  color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                  onMouseEnter={() => {order.comment === undefined && setHover(currentRating)}}
                  onMouseLeave={() => setHover(null)}
                />
              </label>
              );
            })}
          </div>
           {
            order?.comment === undefined ?
            <>
              <textarea placeholder="Değerlendirmeniz..." value={text} onChange={(e) => setText(e.target.value)} required />
              <button type='submit' className='addComment'>Gönder</button>
            </>
            : order.comment === "Ürün kaldırılmış" ?
              <span>Ürün kaldırıldığı için değerlendirme yapamıyorsunuz.</span>
            :
            <span>{order.comment}</span>
           }
        </form>
      </div>
    </div>
  );
}
