import { Modal } from "@telegram-apps/telegram-ui";
import { ModalHeader } from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader";
import { useContext, useState } from "react";

import { FaCartShopping } from "react-icons/fa6";
import CartContext from "../store/CartContext";
import BuyItem from "./BuyItem";
import image from "../../assets/product.png";
import classes from './HeaderCartButton.module.css';

import { useNavigate } from "react-router-dom";
function BuyPage() {
  const cartCtx = useContext(CartContext);
  const [isBuyPageOpen, setIsBuyPageOpen] = useState(false);
  const nav =useNavigate()
  // Initialize navigator and integration with React Router
  
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => curNumber + item.amount, 0);
  
  // Handle order button click to navigate to /form
  const handleOrderClick = () => {
    setIsBuyPageOpen(false);
  
    // Use the Telegram navigator to change the route
      nav("/order")
  };

  return (
    <>
      <button
        className={`bg-gradient-to-r relative rounded-full w-[100%] justify-center from-primary to-secondary hover:scale-105 duration-200 text-white py-2 px-2 flex items-center gap-3 ${classes.button}`}
        onClick={() => setIsBuyPageOpen(true)}
      >
        <FaCartShopping className={`text-xl      text-white drop-shadow-sm cursor-pointer  `}>
        
        </FaCartShopping>
        {numberOfCartItems > 0 && <span className={`${classes.badge} text-[15px]` } >{numberOfCartItems}</span>}
      </button>

      {/* Buy Page Modal */}
      {isBuyPageOpen && (
        <Modal
          header={
            <ModalHeader style={{ backgroundColor: "transparent", padding: "1rem 2rem" }}>
              Service Details
            </ModalHeader>
          }
          open={isBuyPageOpen}
          onOpenChange={(open) => setIsBuyPageOpen(open)}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: "transparent",
            height: "100%",
          }}
        >
          <div className="h-full bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl flex flex-col">
            <div className="overflow-y-auto flex-grow mb-6">
              {hasItems ? (
                <ul className="flex flex-col gap-4">
                  {cartCtx.items.map((item) => (
                    <BuyItem
                      key={item.id}
                      name={item.name}
                      amount={item.amount}
                      price={item.price}
                      onRemove={() => cartCtx.removeItem(item.id)}
                      onAdd={() => cartCtx.addItem({ ...item, amount: 1 })}
                    />
                  ))}
                </ul>
              ) : (
                <div className="flex justify-center items-center h-full">
                  <img src={image} alt="Empty Cart" />
                </div>
              )}
            </div>

            <div className="mt-6">
              <div className="flex justify-between items-center text-gray-900 dark:text-white text-lg font-semibold mb-4">
                <span>Total Amount:</span>
                <span>{totalAmount}</span>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md transition duration-200"
                  onClick={() => setIsBuyPageOpen(false)}
                >
                  Close
                </button>

                {hasItems && (
                  <button
                    className="bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white py-2 px-6 rounded-md shadow-md transition-all duration-200"
                    onClick={handleOrderClick} // Handle the order click to navigate to the form
                  >
                    Order
                  </button>
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default BuyPage;
