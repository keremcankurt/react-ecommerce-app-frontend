import React from 'react'
import "./AccountDeleteConfirmation.scss"

export default function AccountDeleteConfirmation({handleDeleteConfirmation, setShowConfirmation}) {
  return (
    <div className="confirmation-container">
          <div className="confirmation-box">
            <p>
              Hesabınızı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
            </p>
            <div className="confirmation-buttons">
              <button onClick={handleDeleteConfirmation}>Onayla</button>
              <button onClick={() => setShowConfirmation(false)}>İptal</button>
            </div>
          </div>
        </div>
  )
}
