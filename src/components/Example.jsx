import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import image1 from "../assets/biryani2.png";
import image2 from "../assets/biryani3.png";
import image3 from "../assets/biryani4.png";

const Example = () => {
  const slides = [
    { src: image1, caption: 'Delicious Biryani', price: '600 ₽' },
    { src: image2, caption: 'Delicious Biryani', price: '600 ₽' },
    { src: image3, caption: 'Delicious Biryani', price: '600 ₽' },
  ];

  return (
    <div className='pt-[30px] rounded-t-[40px] w-[100%]'>
      <Slide
        arrows={false}  // Disable arrows
        autoplay={false} // Stop autoplay
        slidesToScroll={1} 
        slidesToShow={1.2} 
        indicators={true}
      
        transitionDuration={500}
       
      >
        {slides.map((slide, index) => (
          <div key={index} className={`each-slide rounded-[20px] mr-[20px]  shadow-md  bg-[url('./assets/jawdat.jpg')] bg-cover h-[100px] `}>
            <div className='flex justify-center p-[10px]'>
              <img
                src={slide.src}
                alt={slide.caption}
                className='w-full h-auto object-cover uniform-images hidden'
              />
            </div>
            <div className="text-center mt-2 p-[15px] flex justify-between items-center">
              <p className='text-lg font-semibold'>{slide.caption}</p>
              <p className='text-lg text-white font-bold bg-gray-600 px-[10px] py-[5px] rounded-[10px]'>{slide.price}</p>
            </div>
          </div>
        ))}
      </Slide>
      </div>
  );
};

export default Example;
