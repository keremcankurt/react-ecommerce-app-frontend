import React from 'react';
import './Order.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addOrder, decreaseQuantityOrder, deleteOrder, increaseQuantityOrder } from '../../features/user/userSlice';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const OrderPage = () => {
  const {cart, user} = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const decreaseQuantity = (productId) => {
    dispatch(decreaseQuantityOrder(productId))
  };

  const increaseQuantity = (productId) => {
    dispatch(increaseQuantityOrder(productId))
  };

  const deleteProduct = (productId) => {
    dispatch(deleteOrder(productId))
  };

  const calculateProductPrice = (item) => {
    if (item.campaign) {
      const discountedPrice =
        item.price - item.price * (item.campaign.discountPercentage / 100);
      return (discountedPrice * item.quantity).toFixed(2);
    } else {
      return (item.price * item.quantity).toFixed(2);
    }
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => {
      if (item.campaign) {
        const discountedPrice =
          item.price - item.price * (item.campaign.discountPercentage / 100);
        return total + discountedPrice * item.quantity;
      } else {
        return total + item.price * item.quantity;
      }
    }, 0);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if(user){
      if(user?.seller?.isSeller){
        toast.error("Satıcı rolündekiler bu işlemi gerçekleştiremez.")
      }
      else{
        const orders = {orders: JSON.parse(localStorage.getItem('cart'))};
        dispatch(addOrder(orders))
      }
    }else{
      toast.error("Sipariş vermek için giriş yapmalısınız.")
    }
  }
  return (
    <div className="order-page">
      {
        cart && cart.length > 0 ?
        <>
        <div className="products-section">
        {cart.map((item) => (
          <div className="order-product" key={item._id}>
            <Link className='go-to-product' to={`/product?id=${item._id}`}>Ürün sayfasına git</Link>
            <div className="product-image">
            <img className="product-image" src={`${process.env.REACT_APP_API_BASE_URL}/images/${item?.img}`}  alt="Product" />
            </div>
            <div className="product-details">
              <div className="product-name">{item.name}</div>
              <div className="product-price">
                {new Date(item?.campaign?.endDate) > new Date() ? (
                  <>
                    <span className="old-price">{item.price} TL</span>
                    <span className="new-price">
                      
                      {(
                        item.price -
                        item.price * (item.campaign.discountPercentage / 100)
                      ).toFixed(2)}{' '}
                       TL
                    </span>
                  </>
                ) : (
                  <span className="price">{item.price} TL</span>
                )}
              </div>
              <div className="product-actions">
                <button onClick={() => decreaseQuantity(item._id)}>-</button>
                <span className="quantity">{item.quantity}</span>
                <button onClick={() => increaseQuantity(item._id)}>+</button>
                <button onClick={() => deleteProduct(item._id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="order-summary-section">
        <div className="order-summary">
          {cart.map((item) => (
            <div className="order-item" key={item._id}>
              <span className="item-name">{item.name}</span>
              <span className="item-price">
                {item.quantity} * {" "}
                {new Date(item?.campaign?.endDate) > new Date() ? (
                  item.price -
                  item.price * (item.campaign.discountPercentage / 100)
                  ).toFixed(2) : item.price } TL = {' '}
                {calculateProductPrice(item)} TL
              </span>
            </div>
          ))}
        </div>
        <div className="total">
          <span className="total-text">Toplam:</span>
          <span className="total-price">{calculateTotalPrice().toFixed(2)}{' '}TL</span>
        </div>
        <button type='submit' className="confirm-order-button">Siparişi Onayla</button>
      </form>
      </>
      :
      <h3>Sepet Boş</h3>
      }
    </div>
  );
};

export default OrderPage;
