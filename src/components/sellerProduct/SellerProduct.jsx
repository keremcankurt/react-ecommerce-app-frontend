import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SellerProduct.scss';
import UpdateProductModal from '../updateProductModal/UpdateProductModal';
import DeleteProductModal from '../deleteProductModal/DeleteProductModal';

export default function SellerProduct({ product }) {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const openUpdateModal = (e) => {
    e.preventDefault();
    setIsUpdateModalOpen(true);
  };
  const openDeleteModal = (e) => {
    e.preventDefault();
    setIsDeleteModalOpen(true);
  };
  const formatPrice = (price) => {
    const parts = price.toString().split('.');
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const decimalPart = parts[1] ? `,${parts[1]}` : '';
    return `${integerPart}${decimalPart}`;
  };
  return (
    <>
      <Link to={`/product?id=${product._id}`} className="seller-product">
      {isDeleteModalOpen && (
        <DeleteProductModal id={product._id} setIsDeleteModalOpen={setIsDeleteModalOpen}/>
      )}
        {new Date(product.campaign?.endDate) > new Date() && <p className="campaign">%{product.campaign.discountPercentage}</p>}
        <p className="createdAt">{new Date(product.createdAt).toLocaleDateString()}</p>
        <div className={`product-img-container ${product.stock === 0 ? 'sold-out' : ''}`}>
          <img className="productImg" src={`${process.env.REACT_APP_API_BASE_URL}/images/${product?.img}`} alt="product" />
        </div>
        <div className="product-infos">
          <h2 className="product-name">{product.name}</h2>
          {new Date(product.campaign?.endDate) > new Date() ? (
            <p className="campaign-price">
              <p className="old-price">{formatPrice(product.price)} TL</p>
              {formatPrice((product.price - (product.price * product.campaign.discountPercentage / 100)).toFixed(2))} TL
            </p>
          ) : (
            <p className="price">{formatPrice(product.price)} TL</p>
          )}
        </div>
        <div className="product-reviews">
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
        </div>
        <div className="buttons">
          <button className="update-product" onClick={openUpdateModal}>
            Güncelle
          </button>
          <button className="delete-product" onClick={openDeleteModal}>
            Sil
          </button>
        </div>
        {product.stock !== 0 && <p className="stock">Stok: {product.stock}</p>}
      </Link>
      {isUpdateModalOpen && (
        <UpdateProductModal product={product} setIsUpdateModalOpen={setIsUpdateModalOpen}/>
      )}
      
    </>
  );
}
