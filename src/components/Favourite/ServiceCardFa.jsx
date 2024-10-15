import React, { useState, useEffect, useContext } from 'react';
import { FaHeart } from 'react-icons/fa';
import CartContext from '../store/CartContext';

const ServiceCardFa = ({ service, onClick }) => {
  const [quantity, setQuantity] = useState(1);
  const [love, setLove] = useState(false);
  const cartCtx = useContext(CartContext);

  useEffect(() => {
    console.log('Cart Context:', cartCtx);

    if (cartCtx && Array.isArray(cartCtx.items)) {
      const existingItem = cartCtx.items.find(item => item.id === service.id);
      setQuantity(existingItem ? existingItem.amount : 0);
    }

    if (cartCtx && Array.isArray(cartCtx.itemsFavourite)) {
      const existingItemLove = cartCtx.itemsFavourite.find(item => item.id === service.id);
      setLove(existingItemLove ? existingItemLove.love : false);
    }
  }, [cartCtx, service.id]);

  return (
    <div
      className="relative items-center flex flex-col bg-white dark:bg-gray-800 hover:bg-primary dark:hover:bg-primary hover:text-white rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300 cursor-pointer w-full max-w-xs mx-auto"
      onClick={onClick}
      aria-label={`Open details for ${service.title}`}
    >
      <div className="relative w-full h-40">
        <div className="absolute top-2 left-2 right-2 flex justify-between items-center px-1 z-[1]">
          <p className="text-xs sm:text-sm font-bold text-white bg-black bg-opacity-50 px-1 py-0.5 rounded-lg">
            {service.price} ₽
          </p>
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-800 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-700 transition-colors duration-300">
            {love ? (
              <FaHeart className="text-red-500 transition-colors duration-300" aria-label="Add to favorites" />
            ) : (
              <FaHeart className="text-gray-400 transition-colors duration-300" aria-label="Add to favorites" />
            )}
          </div>
        </div>
        <div
          style={{
            backgroundImage: `url(https://iili.io/dQHcloX.webp)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          className="w-full h-full object-cover rounded-lg relative"
          aria-label={`${service.title} image`}
        >
          {quantity > 0 && (
            <span className="absolute bottom-2 right-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">
              {quantity}
            </span>
          )}
        </div>
      </div>
      <div className="p-2 text-center">
        <h1 className="text-base sm:text-lg font-bold">{service.title}</h1>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-300 line-clamp-2">
          {service.description}
        </p>
      </div>
    </div>
  );
};

export default ServiceCardFa;
