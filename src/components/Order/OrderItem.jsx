
const OrderItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;

  return (
    <li className="flex justify-between items-center p-4 mb-2 bg-gray-800 rounded-lg shadow-md ">
      <div className="flex flex-col">
        <h2 className="text-lg font-semibold text-white">{props.name}</h2>
        <div className="flex justify-between mt-1 text-gray-400">
          <span className="text-md">{price}</span>
          <span className="text-md">x {props.amount * props.price}</span>
        </div>
      </div>
      <div className="flex gap-2">
   
      </div>
    </li>
  );
};

export default OrderItem;

