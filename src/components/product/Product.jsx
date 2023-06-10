import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Product.scss';
import { FaHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addCart, decreaseQuantityOrder, favProduct, increaseQuantityOrder } from '../../features/user/userSlice';

export function Product({ product }) {
  const { user, cart } = useSelector(
    (state) => state.user
  );
  const productQuantity = cart.filter((item) => item._id === product._id)[0]?.quantity;
  const dispatch = useDispatch();
  const [isFavorited, setIsFavorited] = useState(false);
  useEffect(() => {
    if (user?.favProducts && product) {
      const isProductFavorited = user.favProducts.some((id) => id === product._id);
      setIsFavorited(isProductFavorited);
    }
  }, [user, product]);
  const handleFavorite = (e) => {
    e.preventDefault();
    setIsFavorited((prevValue) => !prevValue);
    dispatch(favProduct(product._id));
  };
  const handleAddToCart = (e) => {
    e.preventDefault();
    const selectedProduct = {
      ...product,
      quantity: 1,
    };
    dispatch(addCart(selectedProduct));
  };
  const decreaseQuantity = (e, productId) => {
    e.preventDefault();
    dispatch(decreaseQuantityOrder(productId));
  };

  const increaseQuantity = (e, productId) => {
    e.preventDefault();
    dispatch(increaseQuantityOrder(productId));
  };

  const formatPrice = (price) => {
    const parts = price.toString().split('.');
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const decimalPart = parts[1] ? `,${parts[1]}` : '';
    return `${integerPart}${decimalPart}`;
  };

  return (
    <>
      <Link to={`/product?id=${product._id}`} className="productComp">
        {new Date(product.campaign?.endDate) > new Date() && <p className="campaign">%{product.campaign.discountPercentage}</p>}
        <div className={`product-img-container ${product.stock === 0 ? 'sold-out' : ''}`}>
          <img className="productImg" src={`${process.env.REACT_APP_API_BASE_URL}/images/${product?.img}`} alt="product" />
        </div>
        <>
          <div className="product-reviews">
            <p className="stars">
              <span className="star">
                <span
                  style={
                    !product.star ? { width: '0%' } : product.star >= 1 ? { width: '100%' } : { width: product.star * 100 + '%' }
                  }
                  className="star-o"
                ></span>
              </span>
              <span className="star">
                <span
                  style={
                    !product.star || product.star < 1 ? { width: '0%' } : product.star >= 2 ? { width: '100%' } : { width: (product.star - 1) * 100 + '%' }
                  }
                  className="star-o"
                ></span>
              </span>
              <span className="star">
                <span
                  style={
                    !product.star || product.star < 2 ? { width: '0%' } : product.star >= 3 ? { width: '100%' } : { width: (product.star - 2) * 100 + '%' }
                  }
                  className="star-o"
                ></span>
              </span>
              <span className="star">
                <span
                  style={
                    !product.star || product.star < 3 ? { width: '0%' } : product.star >= 4 ? { width: '100%' } : { width: (product.star - 3) * 100 + '%' }
                  }
                  className="star-o"
                ></span>
              </span>
              <span className="star">
                <span
                  style={
                    !product.star || product.star < 4 ? { width: '0%' } : product.star >= 5 ? { width: '100%' } : { width: (product.star - 4) * 100 + '%' }
                  }
                  className="star-o"
                ></span>
              </span>
              ({product.comments.length})
            </p>
          </div>
          <div className="seller">
            <img className="seller-logo" src={`${process.env.REACT_APP_API_BASE_URL}/images/${product.seller.profilePicture}`} alt="Seller Logo" />
            <span className="seller-company">{product.seller.company}</span>
          </div>
        </>

        <div className="product-infos">
          <h2 className="product-name">{product.name}</h2>
          {new Date(product.campaign?.endDate) > new Date() ? (
            <p className="campaign-price">
              <p className="old-price">{formatPrice(product.price)} TL</p>
              {formatPrice((product.price - (product.price * product.campaign.discountPercentage) / 100).toFixed(2))} TL
            </p>
          ) : (
            <p className="price">{formatPrice(product.price)} TL</p>
          )}
        </div>
        <div className="buttons">
          {!user || (user.role === 'user' && !user.seller.isSeller) ? (
            <div className="actions">
              {user && (
                <button className={`add-to-favorites ${isFavorited ? 'favorited' : ''}`} onClick={handleFavorite}>
                  <FaHeart />
                </button>
              )}
              {product.stock === 0 ? (
                <span className="invalid">Ürün stokda yok...</span>
              ) : (
                <>
                  {cart.some((item) => item._id === product._id) ? (
                    <div className="product-buttons">
                      <button onClick={(e) => decreaseQuantity(e, product._id)}>-</button>
                      <span className="quantity">{productQuantity}</span>
                      <button onClick={(e) => increaseQuantity(e, product._id)}>+</button>
                    </div>
                  ) : (
                    <button className="add-to-cart" onClick={handleAddToCart}>
                      Sepete Ekle
                    </button>
                  )}
                </>
              )}
            </div>
          ) : (
            <span className="invalid">Sadece kullanıcılar satın alabilir..</span>
          )}
        </div>
      </Link>
    </>
  );
}
