import React, { useState, useEffect, useContext } from "react";
import { Modal, VisuallyHidden } from "@telegram-apps/telegram-ui";
import { DialogTitle } from "@radix-ui/react-dialog";
import { ModalHeader } from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader";
import CartContext from "../store/CartContext";
import image from "../../assets/biryani_cover.jpg";
import { FaHeart, FaShoppingBag, FaShoppingCart } from "react-icons/fa";

const ServiceModal = ({ isOpen, onClose, service }) => {
  const [quantity, setQuantity] = useState(1);
  const [amountIsValid, setAmountIsValid] = useState(true);
  const [love, setLove] = useState(false);
  const cartCtx = useContext(CartContext);

  // Reset quantity and validation state when the modal is opened
  useEffect(() => {
    if ( service) {
      const existingItem = cartCtx.items.find(item => item.id === service.id);
      setQuantity(existingItem ? existingItem.amount : 1); // Set to existing amount or default to 1
      setAmountIsValid(true);
       if (cartCtx && Array.isArray(cartCtx.itemsFavourite)) {
      const existingItemLove = cartCtx.itemsFavourite.find(item => item.id === service.id);
      setLove(existingItemLove ? existingItemLove.love : false);
    }
    }
   
  }, [isOpen, cartCtx.items , cartCtx.itemsFavourite ,service]);
console.log(isOpen)
  if (!service) return null;
 console.log(service)
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < 5) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (quantity < 1 || quantity > 5) {
      setAmountIsValid(false);
      return;
    }

    cartCtx.addItem({
      id: service.id,
      name: service.title,
      amount: quantity,
      price: service.price,
    });
  
    setAmountIsValid(true); // Reset validation on successful add to cart
    onClose(); // Optionally close the modal after adding to the cart
  };
   const addToFavouriteHandler =()=>{
    cartCtx.addItemToFavourite({
      id: service.id,
      title: service.title,
      amount: quantity,
      price: service.price,
      description:service.description,
      love:true,
    });
   
   }
   console.log()
  return (
    <Modal
      header={<ModalHeader style={{ backgroundColor: "transparent" }}>Service Details</ModalHeader>}
      open={isOpen}
      onOpenChange={(open) => onClose(open)}
      dismissible={true}
      style={{
        backgroundColor: "transparent",
        bottom: "0",
        display: "flex",
        alignContent: "space-between",
        minHeight:"100%",
        
      }}
    >
      <DialogTitle>
        <VisuallyHidden>{service.title}</VisuallyHidden>
      </DialogTitle>

      <div className="rounded-t-lg shadow-lg w-full flex-[1] flex flex-col text-center   ">
        <div className="relative w-full" style={{ backgroundColor: "transparent" }}>
          <img className="w-full h-[260px] object-cover rounded-t-[40px]" alt={service.title} src={image} />
          <div className="bg-white  absolute w-[100%] h-[40px] z-[1000] rounded-t-[40px] bottom-[-9px]"></div>
        </div>
        <div className="rounded-t-[40px] w-[100%] bg-white dark:bg-gray-800 p-3 z-[100] flex-1 pt-[42px] flex flex-col justify-between">
          <h2 className="text-xl font-bold mb-2 dark:text-white">{service.title}</h2>
          <p className="dark:text-gray-300 mb-4 max-h-[100px] overflow-y-scroll">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem aspernatur voluptatum reiciendis rerum? Voluptatem corrupti nemo, doloribus deleniti, non quisquam vitae quod porro aliquid ad odit beatae facilis asperiores illo.</p>
          <p className="text-lg p-3  bg-[#eee] font-bold text-primary dark:text-secondary mb-6">{service.price * quantity} ₽</p>



          
          <form onSubmit={handleSubmit} className="max-w-xs mx-auto items-center gap-[10px]  flex flex-end ">
         
            <div className="relative flex items-center flex-[60%]  aling-center">
              <button
                type="button"
                onClick={handleDecrement}
                disabled={quantity <= 1}
                className={`${
                  quantity <= 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200 dark:hover:bg-gray-600"
                } bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-s-lg p-2  h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none font-bold text-[30px] flex justify-center items-center`}
              >
                -
              </button>
              <input
                type="text"
                id="quantity-input"
                value={quantity}
                readOnly
                className="bg-gray-50 border-x-0 border-gray-300 h-11 font-medium text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-[50%] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <button
                type="button"
                onClick={handleIncrement}
                disabled={quantity >= 5}
                className={`${
                  quantity >= 5 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200 dark:hover:bg-gray-600"
                } bg-gray-100 dark:bg-gray-700 p-2 border border-gray-300 dark:border-gray-600 rounded-e-lg  h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none font-bold text-[20px] flex justify-center items-center`}
              >
                +
              </button>
            </div>
            <div className="flex items-center gap-[10px] ">
            <button className="button-85 " role="button" type="submit">
             <FaShoppingCart/>
              {/* <span className="ml-2 block">{service.price * quantity} ₽</span> */}
            </button>
           {love ? <FaHeart className=" text-[25px] text-red-500"  onClick={addToFavouriteHandler}/>
          : <FaHeart className=" text-[25px] "  onClick={addToFavouriteHandler}/> 
          }
            </div>
          </form>
          </div>
        </div>
      
    </Modal>
  );
};

export default ServiceModal;