import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {FaHeart } from 'react-icons/fa';
import './Product.scss';
import { getProduct } from '../../features/product';
import Comments from '../../components/comments/Comments';
import { useDispatch, useSelector } from 'react-redux';
import { addCart, favProduct } from '../../features/user/userSlice';
import Slider from '../../components/slider/Slider';

export default function Product() {
    const {user: authUser} = useSelector(
      (state) => state.auth
    );
    const {user, cart} = useSelector(
      (state) => state.user
    );
    const [quantity, setQuantity] = useState(1);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    const [product, setProduct] = useState();
    const [recommendedProducts, setRecommendedProducts] = useState();
    const [comments, setComments] = useState();
    const [isSuccess, setIsSuccess] = useState(false);
    const [isFavorited, setIsFavorited] = useState(false);
    const [sortOption, setSortOption] = useState("newest");
    const dispatch = useDispatch();
    const handleSortChange = (event) => {
      setSortOption(event.target.value);
    };
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await getProduct(id);
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message);
            }
            setProduct(result.data)
            setRecommendedProducts(result.recommendedProducts)
            setComments(result.comments)
            setRemainingTime(calculateRemainingTime(result.data?.campaign?.endDate))
            setIsSuccess(true);
          } catch (error) {
            setIsSuccess(false);
            toast.error(error.message);
          }
        };
        fetchData();
        
      }, [id,navigate]);
  const handleAddToCart = () => {
    const selectedProduct = {
      ...product,
      quantity
    }
    dispatch(addCart(selectedProduct));
  };
  const handleFavorite = () => {
    setIsFavorited((prevValue) => !prevValue);
    dispatch(favProduct(id));
  };

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value));
  };
  useEffect(() => {
    if (user?.favProducts && product) {
      const isProductFavorited = user.favProducts.some((id) => id === product._id);
      setIsFavorited(isProductFavorited);
    }
  }, [user, product]);

  const [remainingTime, setRemainingTime] = useState();

  useEffect(() => {
    if(isSuccess && new Date(product.campaign?.endDate) > new Date())
    {
      const timer = setInterval(() => {
        const newRemainingTime = calculateRemainingTime(product?.campaign?.endDate);
        setRemainingTime(newRemainingTime);
  
        if (newRemainingTime === '0') {
          clearInterval(timer);
        }
      }, 1000);
  
      return () => {
        clearInterval(timer);
      };
    }
    
  }, [product?.campaign?.endDate, isSuccess]);

  const calculateRemainingTime = (endDate) => {
    const currentDate = new Date();
    const remainingTime = new Date(endDate) - currentDate;
  
    if (remainingTime <= 0) {
      return '0';
    }
  
    const seconds = Math.floor((remainingTime / 1000) % 60);
    const minutes = Math.floor((remainingTime / 1000 / 60) % 60);
    const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
  
    const months = Math.floor(days / 30);
    const weeks = Math.floor((days % 30) / 7);
    const remainingDays = days % 7;
  
    let remainingTimeString = '';
  
    if (months > 0) {
      remainingTimeString += `${months} ay `;
    }
    if (weeks > 0) {
      remainingTimeString += `${weeks} hafta `;
    }
    if (remainingDays > 0) {
      remainingTimeString += `${remainingDays} gün `;
    }
    if (hours > 0) {
      remainingTimeString += `${hours} saat `;
    }
    if (minutes > 0) {
      remainingTimeString += `${minutes} dakika `;
    }
    if (seconds > 0) {
      remainingTimeString += `${seconds} saniye`;
    }
  
    return remainingTimeString.trim();
  };
  
  const formatPrice = (price) => {
    const parts = price.toString().split('.');
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const decimalPart = parts[1] ? `,${parts[1]}` : '';
    return `${integerPart}${decimalPart}`;
  };
  
  return (
    <div className="product-container">
    {isSuccess &&
        <>
        {new Date(product.campaign?.endDate) > new Date() &&
        <div className='campaign-info'>
          <span className='timer'>
            Kampanyanın bitmesine kalan süre: {remainingTime}
          </span>
        </div>
        }
      <div className="product-info">
        <img className="product-image" src={`${process.env.REACT_APP_API_BASE_URL}/images/${product?.img}`}  alt="Product" />
        <div className="product-details">
        <div className='left'>
        <h2 className="product-name">
            {product.name}{' '}
            {new Date(product.campaign?.endDate) > new Date() && (
              <span className="campaign">{`${product.campaign.discountPercentage}% İndirim`}</span>
            )}
          </h2>
          <div className="price-section">
            {new Date(product.campaign?.endDate) > new Date() ? (
              <>
                <p className="old-price">{formatPrice(product.price)} TL</p>
                <p className="discounted-price">
                  {formatPrice((
                    product.price -
                    product.price * (product.campaign.discountPercentage / 100)
                  ).toFixed(2))}{' '}
                  TL
                </p>
              </>
            ) : (
              <p className="price">{formatPrice(product.price)} TL</p>
            )}
          </div>
          {!authUser || (authUser.role === "user" && !authUser.isSeller) ?
            <div className="actions">
              { authUser &&
                <button className={`add-to-favorites ${isFavorited ? 'favorited' : ''}`} onClick={handleFavorite}>
                  <FaHeart />
                </button>
              }
              {product.stock === 0 ? <span className='invalid'>Ürün stokda yok...</span>:
              <>
                <select className="quantity-select" value={quantity} onChange={handleQuantityChange}>
                  {[...Array(product.stock < 5 ? product.stock : 5)].map((_, index) => (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>
                <button
                  className={cart.some(item => item._id === product._id) ? "added": "add-to-cart"}
                  onClick={handleAddToCart}
                  disabled={cart.some(item => item._id === product._id)}
                >
                  {cart.some(item => item._id === product._id) ? "Sepete Eklendi" : "Sepete Ekle"}
                </button>

              </>
              }
            </div>
            :
            <span className='invalid'>Sadece kullanıcılar satın alabilir..</span>
            
          }
          <Link to={`/seller?id=${product.seller.id}`} className="seller-link">
            <img className="seller-logo" src={`${process.env.REACT_APP_API_BASE_URL}/images/${product.seller.profilePicture}`}  alt="Seller Logo" />
            <span className="seller-company">{product.seller.company}</span>
          </Link>
        </div>
        <div className='right'>
          <h2>Özellikler</h2>
          <p className="description" dangerouslySetInnerHTML={{__html:product.desc}}></p>
        </div>
        </div>
      </div>
      {recommendedProducts?.length >= 10 &&
      <Slider products={recommendedProducts} text="Önerilen Ürünler"/> }
      <div className="reviews">
        <p className="stars">
            <span className="star">
            <span style={!product.star ? { width: "0%" } : 
            product.star >= 1 ? { width: "100%" } : {width: product.star*100+"%"}} 
            className="star-o"></span></span>
            <span className="star">
            <span style={!product.star || product.star < 1 ? { width: "0%" } : 
            product.star >= 2  ? { width: "100%" } : 
            {width: (product.star-1)*100+"%"}}
            className="star-o"></span></span>
            <span className="star">
            <span style={!product.star || product.star < 2 ? { width: "0%" } : 
            product.star >= 3 ? { width: "100%" } : {width: (product.star-2)*100+"%"}} 
             className="star-o"></span></span>
            <span className="star">
            <span style={!product.star || product.star < 3 ? { width: "0%" } :
            product.star >= 4 ? { width: "100%" } : {width: (product.star-3)*100+"%"}} 
            className="star-o"></span></span>
            <span className="star">
            <span style={!product.star || product.star < 4 ? { width: "0%" } : 
            product.star >= 5 ? { width: "100%" } : {width: (product.star-4)*100+"%"}} 
            className="star-o"></span></span>
            ({product.comments.length})
          </p>
          {comments.length !== 0 && 
          <div className="comment-sort">
            <select id="sort" value={sortOption} onChange={handleSortChange}>
              <option value="newest">En Yeni</option>
              <option value="oldest">En Eski</option>
              <option value="highest">En Yüksek Puan</option>
              <option value="lowest">En Düşük Puan</option>
            </select>
          </div>
          }
      </div>
      <Comments comments={comments} sortOption={sortOption} />
      </>
    }
    </div>
  );
}