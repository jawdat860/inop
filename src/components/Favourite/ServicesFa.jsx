import React, { useState, useEffect, useContext } from "react";
import ServiceCardFa from "./ServiceCardFa";

// import ServiceModalFa from "./ServiceModalFa";

import FooterFlex from "../FooterFlex/FooterFlex";

import CartContext from "../store/CartContext";
import ServiceModal from "../Services/ServiceModal";
import ServiceCard from "../Services/ServiceCard";

const ServicesFa = () => {
  const [services, setServices] = useState([]);
  // const [loading, setLoading] = useState(true);
 
  // const [error, setError] = useState(null);
  const [activeService, setActiveService] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [categories, setCategories] = useState([]);
  // const [selectedCategory, setSelectedCategory] = useState("All");
  const ctxCart = useContext(CartContext)
  useEffect(() => {
    setServices(ctxCart.itemsFavourite)
  }, [ctxCart.itemsFavourite]);

  const handleCardClick = (service) => {
    setActiveService(service);
    setIsModalOpen(true);
  };
  // const handleCategorySelect = (category) => {
  //   setSelectedCategory(category);
  // };
 
  // const filteredServices =
  //   selectedCategory === "All"
  //     ? services
  //     : services.filter((service) => service.category === selectedCategory);

  

  // if (error) {
  //   return <p className="text-center text-red-500">{error}</p>;
  // }

  return (
    <div className=" bg-[#eee] min-h-[100vh]  relative z-[11] ">
    <h1 className="text-black font-bold mb-[15px] text-[30px] text-center">Favourite List</h1>
    
           
    <div className="grid gap-4 p-4 pb-[100px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 relative mt-[10px]">
          
        
           {services.map((service)=> <ServiceCard
            
              key={service.id}
              service={service}
              onClick={() => handleCardClick(service)}
             
            />
          )
          }
        </div>
      
        
       <ServiceModal
        isOpen={isModalOpen}
        onClose={setIsModalOpen}
        service={activeService}

        
      /> 
      <FooterFlex /> 
    </div>
    
  );
};

export default ServicesFa;

