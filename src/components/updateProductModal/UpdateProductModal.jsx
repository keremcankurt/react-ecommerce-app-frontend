import React, { useState } from 'react'
import './UpdateProductModal.scss'
import { useDispatch } from 'react-redux';
import { editProduct } from '../../features/seller/sellerSlice';

export default function UpdateProductModal({product, setIsUpdateModalOpen}) {
    const dispatch = useDispatch();
    const [updatedProduct, setUpdatedProduct] = useState({
        name: product.name,
        desc: product.desc,
        price: product.price,
        stock: product.stock,
        img: product.img,
        product_image: ''
    });
    const closeUpdateModal = () => {
        setIsUpdateModalOpen(false);
        setUpdatedProduct({
          name: product.name,
          desc: product.desc,
          price: product.price,
          stock: product.stock,
          img: product.img
        });
   };
   const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setUpdatedProduct((prevProduct) => ({
        ...prevProduct,
        img: reader.result
      }));
    };
    setUpdatedProduct((prevProduct) => ({
      ...prevProduct,
      product_image: e.target.files[0]
    }));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value
    }));
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('product_image', updatedProduct.product_image);
    const data = {
      name: updatedProduct.name,
      desc: updatedProduct.desc,
      price: updatedProduct.price,
      stock: updatedProduct.stock
    };
    formData.append('productData', JSON.stringify(data));
    dispatch(editProduct({ formData, id: product._id }));
    closeUpdateModal();
  };
  return (
    <div className="update-modal">
          <form onSubmit={handleFormSubmit}>
            <h2>Güncelle</h2>
            <div className="form-group">
              {updatedProduct.img && (
                <img
                  className="productImg"
                  src={updatedProduct.img}
                  alt="selected product"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `${process.env.REACT_APP_API_BASE_URL}/images/${product?.img}`;
                  }}
                />
              )}
              <input type="file" id="img" name="img" onChange={handleImageChange} />
            </div>
            <div className="form-group">
              <label htmlFor="name">Ürün Adı</label>
              <input type="text" id="name" name="name" value={updatedProduct.name} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="desc">Açıklama</label>
              <textarea id="desc" name="desc" value={updatedProduct.desc} onChange={handleInputChange}></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="price">Fiyat</label>
              <input type="number" id="price" name="price" value={updatedProduct.price} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="stock">Stok</label>
              <input type="number" id="stock" name="stock" value={updatedProduct.stock} onChange={handleInputChange} />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-update">
                Güncelle
              </button>
              <button type="button" className="btn-cancel" onClick={closeUpdateModal}>
                İptal
              </button>
            </div>
          </form>
        </div>
  )
}
