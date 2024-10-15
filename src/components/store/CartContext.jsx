import React, { useReducer } from 'react';

const CartContext = React.createContext({
  items: [],
  itemsFavourite: [],
  addItem: (item) => {},
  addItem1: (item) => {},
  addItemToFavourite:(item)=>{},
  removeItem: (id) => {},
  removeItemFavourite:(id)=>{},
  clear: () => {},
});



export default CartContext;
