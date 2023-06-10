import React from 'react'
import './AddCampaignProduct.scss'

export default function AddCampaignProduct({product, setSelectedProductsNames,selectedProductsNames, setSelectedProducts, selectedProducts}) {
    

    const handleCheckChange = (e) => {
        const { checked } = e.target;
        if (checked) {
            setSelectedProductsNames(prevSelectedProductsNames => [...prevSelectedProductsNames, product.name]);
            setSelectedProducts(prevSelectedProducts => [...prevSelectedProducts, product._id]);

        } else {
            setSelectedProducts(selectedProducts.filter(_id => _id !== product._id));
            setSelectedProductsNames(selectedProductsNames.filter(name => name !== product.name));
            
        }
      };
      const formatPrice = (price) => {
        const parts = price.toString().split('.');
        const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        const decimalPart = parts[1] ? `,${parts[1]}` : '';
        return `${integerPart}${decimalPart}`;
      };
  return (
    <div className='campaign-product'>
        <input className='checkbox' type='checkbox' 
        checked={selectedProducts.some(id => product._id === id)}
        onChange={handleCheckChange}
        />
        <p className='createdAt'>{new Date(product.createdAt).toLocaleDateString()}</p>
        <img className='productImg' src={`${process.env.REACT_APP_API_BASE_URL}/images/${product?.img}`} alt='product' />
        <div className='product-infos'>
          <h2 className='product-name'>{product.name}</h2>
          
          <p className='price'>{formatPrice(product.price)} TL</p>
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
      </div>
  )
}
