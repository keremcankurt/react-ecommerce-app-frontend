import React from 'react'
import './DeleteProductModal.scss'
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../../features/seller/sellerSlice';
export default function DeleteProductModal({id, setIsDeleteModalOpen}) {
  const closeDeleteModal = (e) => {
    e.preventDefault();
    setIsDeleteModalOpen(false);
  };
  const dispatch = useDispatch();
  const handleDeleteProduct = (e) => {
    e.preventDefault();
    dispatch(deleteProduct(id));
  };
  return (
    <div className="delete-modal">
          <div className="delete-content">
            <p>Ürünü silmek istediğinizden emin misiniz?</p>
            <div className="delete-actions">
              <button className="btn-confirm" onClick={handleDeleteProduct}>
                Onayla
              </button>
              <button className="btn-cancel" onClick={closeDeleteModal}>
                İptal
              </button>
            </div>
         </div>
    </div>
  )
}
