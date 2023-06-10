import React, { useEffect, useState } from 'react';
import './Seller.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { getSeller } from '../../features/seller/sellerService';
import { toast } from 'react-toastify';
import { Product } from '../../components/product/Product';
import Searchbar from '../../components/searchBar/Searchbar';
import Pagination from '../../components/pagination/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { follow, unfollow } from '../../features/user/userSlice';

export default function Seller() {
  const [products, setProducts] = useState([]);
  const [seller, setSeller] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [followerCount, setFollowerCount] = useState(0);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSeller(id);
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.message);
        }
        setProducts(result.products);
        setSeller(result.seller);
        setFollowerCount(result.seller.seller.followerCount);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchData();
  }, [id, navigate]);
  const {user} = useSelector(
    (state) => state.user
   );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredProducts = products.filter(
    (product) => product.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const productsPerPage = 4;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const dispatch = useDispatch();
  const handleUnfollow = (e) => {
    e.preventDefault();
    dispatch(unfollow(id));
    setFollowerCount(followerCount-1)
  }
  const handleFollow = (e) => {
    e.preventDefault();
    dispatch(follow(id));
    setFollowerCount(followerCount+1)
  }
  return (
    <div className="seller-page-container">
      <div className="seller-page-profile">
        <img
          src={`${process.env.REACT_APP_API_BASE_URL}/images/${seller?.profilePicture}`}
          alt={seller?.seller?.company}
          className="seller-profile-picture"
        />
        <div className="seller-infos">
          <h2 className="seller-name">{seller?.seller?.company}</h2>
          <p className="product-count">Ürün Sayısı: {products?.length}</p>
        </div>
        <div className="follow-section">
            {
                user && !user?.seller?.isSeller && user?.followings.some(_id => _id === id.toString()) ? 
                <button className="unfollow-button" onClick={handleUnfollow}>
                    Takipten Çık
                    <span className="follower-count">{followerCount}</span>
                </button>
                :
                user && !user?.seller?.isSeller  ? 
                <button className="follow-button" onClick={handleFollow}>
                    Takip Et
                    <span className="follower-count">{followerCount}</span>
                </button>
                :
                <button className="follow-button">
                    Takipçi Sayısı
                    <span className="follower-count">{followerCount}</span>
                </button>
            }
        </div>
      </div>
      <span className="title">Ürünler</span>
      {products?.length !== 0 ? (
        <>
          <Searchbar searchText={searchText} setSearchText={setSearchText} />
          <div className="products">
            {currentProducts?.length !== 0 ? (
              currentProducts.map((product) => <Product key={product._id} product={product} />)
            ) : (
              <span className="no-products">Aradığınız ürün bulunmamaktadır.</span>
            )}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <span className="no-products">Satıcıya ait ürün bulunmamaktadır.</span>
      )}
    </div>
  );
}
