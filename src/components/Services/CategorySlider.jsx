// import React, { useRef } from 'react';

// const CategorySlider = ({ categories, scrolToCategory, activeCaegory }) => {
//   const ulRef = useRef(null);
//   const handleClick = (category) => {
    
//     scrolToCategory(category); 
//   };

//   const scrollToButton = (category) => {
//     const button = document.getElementById(category); 
//     if (button && ulRef.current) {
//       const ulRect = ulRef.current.getBoundingClientRect(); 
//       const buttonRect = button.getBoundingClientRect(); 

//       const scrollPosition = buttonRect.left - ulRect.left + ulRef.current.scrollLeft;


//       ulRef.current.scrollTo({
//         left: scrollPosition,
//         behavior: 'smooth',
//       });
//     }
//   };

//   return (
//     <ul

//       className="flex overflow-x-auto justify-between space-x-4 px-4 rounded-lg scrollbar-hide"
//     >
//       {categories.map((category) => (
//         <li key={category} className="flex-shrink-0">
//           <button
//             id={category} 
//             onClick={() => handleClick(category)}
//             className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 
//               ${activeCaegory === category ? 'font-bold bg-blue-500 text-white' : 'text-gray-700'}`}
//           >
//             {category}
//           </button>
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default CategorySlider;
import React , { useRef }from 'react';

const CategorySlider = ({ categories, activeCategory, scrollToCategory }) => {
    const ulRef = useRef(null);
  const handleClick = (category) => {
    scrollToButton(category)
    scrollToCategory(category); 
  };
    const scrollToButton = (category) => {
    const button = document.getElementById(category); 
    if (button && ulRef.current) {
      const ulRect = ulRef.current.getBoundingClientRect(); 
      const buttonRect = button.getBoundingClientRect(); 

      const scrollPosition = 0;


      ulRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <ul ref={ulRef} className="flex overflow-x-auto justify-between space-x-4 px-4 rounded-lg scrollbar-hide">
      {categories.map((category) => (
        <li key={category} className="flex-shrink-0">
          <button
            onClick={() => {
              handleClick(category); // Call the function to scroll to the category
            }}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 
              ${activeCategory === category ? 'font-bold bg-blue-500 text-white' : 'text-gray-700'}`}
          >
            {category}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default CategorySlider;
