import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './CartDropDown.scss'
import { Link } from 'react-router-dom';
import { FaCartArrowDown } from 'react-icons/fa';
const CartDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const {cart} = useSelector(
    (state) => state.user
    );
  return (
    <div class="cart-container">
        <button class="cart-toggle" onClick={toggleDropdown}>
            <FaCartArrowDown style={{width: "25px", height: "auto", color: "gray"}}/>
            <span class="cart-badge">{cart.length}</span>
        </button>
        {isOpen && (
            
            <div class="cart-dropdown">
            {cart.length > 0 ? (
                <>
                <ul class="cart-items">
                {cart.slice(0, 3).map((item) => (
                    <li class="cart-item" key={item._id}>
                    <img className="product-image" src={`${process.env.REACT_APP_API_BASE_URL}/images/${item?.img}`}  alt="Product" />
                    <div class="item-details">
                        <p class="item-name">{item.name}</p>
                        {new Date(item?.campaign?.endDate) > new Date() ?
                          <p className="product-new-price">
                            {(
                              item.price -
                              item.price * (item.campaign.discountPercentage / 100)
                            ).toFixed(2)}{' '}
                            TL
                          </p>
                         :<p class="product-item-price">{item.price} TL</p>
                         }
                        <p class="item-quantity">Adet: {item.quantity}</p>
                    </div>
                    </li>
                ))}
                {cart.length > 3 && (
                    <li class="cart-item">
                    <p class="item-name">+{cart.length - 3} more</p>
                    </li>
                )}
                </ul>
                <Link className='go-to-cart' to='/order'>Sepete Git</Link>
                </>
            ) : (
                <p class="empty-cart">Sepet Boş</p>
            )}
            </div>
        )}
    </div>
  );
};

export default CartDropdown;
