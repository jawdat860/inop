
const BuyItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;

  return (
    <li className="flex justify-between items-center p-4 mb-2 bg-gray-800 rounded-lg shadow-md">
      <div className="flex flex-col">
        <h2 className="text-lg font-semibold text-white">{props.name}</h2>
        <div className="flex justify-between mt-1 text-gray-400">
          <span className="text-md">{price}</span>
          <span className="text-md">x {props.amount}</span>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          className="bg-red-600 text-white rounded-md px-3 py-1 transition duration-300 ease-in-out hover:bg-red-700"
          onClick={props.onRemove}
        >
          −
        </button>
        <button
          className="bg-green-600 text-white rounded-md px-3 py-1 transition duration-300 ease-in-out hover:bg-green-700"
          onClick={props.onAdd}
        >
          +
        </button>
      </div>
    </li>
  );
};

export default BuyItem;
