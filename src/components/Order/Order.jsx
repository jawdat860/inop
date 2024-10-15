import CartContext from "../store/CartContext";
import { useContext } from "react";
import OrderItem from "./OrderItem";
import { Link } from "react-router-dom";
import FormServices from "../FormServices/FormServices";

function Order() {
    const cartCtx = useContext(CartContext);

    return (
        <div className="h-screen bg-gray-100 dark:bg-gray-900 rounded-lg shadow-lg flex flex-col justify-between ">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md p-8">
                <h1 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Your Order</h1>
                <ul className="flex flex-col gap-6">
                    {cartCtx.items.map((item) => (
                        <OrderItem
                            key={item.id}
                            name={item.name}
                            amount={item.amount}
                            price={item.price}
                        />
                    ))}
                </ul>
                <p className="text-xl font-semibold text-gray-800 dark:text-gray-300 mt-4">
                    Total: <span className="text-blue-600">${cartCtx.totalAmount.toFixed(2)}</span>
                </p>
            </div>
            <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 grid gap-6 flex-1 px-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Next Steps:</h2>
                <div className="flex flex-col gap-4">
                    {["Payment"].map((step, index) => (
                        <Link
                            key={index}
                            to="/order/form"
                            className="text-black-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition duration-200 transform hover:scale-105"
                        >
                            {step}
                        </Link>
                    ))}
                </div>
                <div>
                    <FormServices />
                </div>
                
            </div>
        </div>
    );
}

export default Order;
