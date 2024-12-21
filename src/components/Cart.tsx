import React from 'react';
import { foodDataType } from '../Types/types';

type CartProps = {
  cartItems: (foodDataType & { quantity: number })[];
  isCartOpen: boolean;
  toggleCart: () => void;
};

const Cart: React.FC<CartProps> = ({ cartItems, isCartOpen, toggleCart }) => {
  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 bg-white p-4 sm:w-1/3 w-full h-full shadow-lg z-50 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">My Cart</h2>
        <button onClick={toggleCart} className="text-primary-color">
          Close
        </button>
      </div>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id} className="flex justify-between my-2">
              <span>{item.product_name}</span>

              <span>Qty: {item.quantity}</span>
              
              <span>Rs {parseInt(item.product_selling_price) * item.quantity}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
