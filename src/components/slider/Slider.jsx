import React, { useRef } from 'react'
import { Product } from '../product/Product';
import './Slider.scss'

export default function Slider({products, text}) {
    const containerRef = useRef(null);

  const handleScrollLeft = () => {
    const container = containerRef.current;
    container.scrollBy({
      left: -200, 
      behavior: 'smooth',
    });
  };

  const handleScrollRight = () => {
    const container = containerRef.current;
    container.scrollBy({
      left: 200, 
      behavior: 'smooth',
    });
  }
  return (
    <div className='slider-comp'>
        <h3 className="recommended-title">{text}</h3>
        <div className="recommended" ref={containerRef}>
          <div className="recommended-products" ref={containerRef}>
            {products?.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </div>
        <div className="scroll-buttons">
          <button className="scroll-button left" onClick={handleScrollLeft}>&lt;</button>
          <button className="scroll-button right" onClick={handleScrollRight}>&gt;</button>
        </div>
      </div>
  )
}
