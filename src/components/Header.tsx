import { useState } from "react";
import kfc_logo from "../assets/_5C0DE2EC-2C9F-44EC-9667-61334C1CADE3_-removebg-preview.png";
import { foodDataType } from "../Types/types";
import { FaTimes } from "react-icons/fa";
import QRCode from "react-qr-code";
import Swal from "sweetalert2";

type HeaderProps = {
  cartItems: (foodDataType & { quantity: number })[];
  onUpdateCartItem: (id: number, newQuantity: number) => void; // Function to update cart item quantity
  onRemoveCartItem: (id: number) => void;
};

export const Header: React.FC<HeaderProps> = ({
  cartItems,
  onUpdateCartItem,
  onRemoveCartItem,
}) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };
  const toggleCheckout = () => setIsCheckoutOpen(!isCheckoutOpen);

  const handleOutsideClick = (e: React.MouseEvent) => {
    if ((e.target as Element).id === "cart-modal") {
      setIsCartOpen(false);
    }
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const total = subtotal;

  const handleProceedToCheckout = () => {
    setIsCartOpen(false); // Close the cart modal
    setIsCheckoutOpen(true); // Open the checkout modal
  };

  const qrCodeData = JSON.stringify({
    items: cartItems.map((item) => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    })),
    total,
    refNumber: "#KFC001",
  });

  const generateRefNumber = () => {
    const randomNum = Math.floor(10 + Math.random() * 90); // Random number between 10 and 99
    return `#KFC${randomNum}`;
  };

  const refNumber = generateRefNumber();

  return (
    <div className="py-4 px-4 border-b-8 border-primary-color relative">
      <div className="flex justify-between items-center max-w-[1200px] m-auto">
        <div className="flex gap-4">
          <img
            src={kfc_logo}
            alt="KFC Logo"
            width={80}
            className="object-contain"
          />
          <div>
            <div className="font-bold text-lg sm:text-2xl">
              Le Coin Mauricien
            </div>
            <div className="font-light text-xs sm:text-sm uppercase tracking-wider">
              Menu Website
            </div>
          </div>
        </div>

        <div className="flex items-center relative" onClick={toggleCart}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m-4 8h18a2 2 0 100-4H5a2 2 0 000 4z"
            />
          </svg>
          {cartItems.length > 0 && (
            <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </div>
      </div>

      {isCartOpen && (
        <div
          id="cart-modal"
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={handleOutsideClick}
        >
          <div className="relative bg-white shadow-lg p-6 w-[90%] max-w-lg rounded-lg">
            <button
              onClick={toggleCart}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              <FaTimes size={20} />
            </button>

            <h2 className="font-bold text-lg mb-4">Order</h2>

            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <div>
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center mb-4"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-12 h-12 object-cover mr-2"
                    />

                    <div className="flex-1">
                      <p className="font-semibold">{item.name}</p>

                      <p className="text-sm">Delivery 24th July</p>

                      <div className="flex items-center mt-1">
                        <button
                          onClick={() =>
                            onUpdateCartItem(item.id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                        >
                          -
                        </button>

                        <span className="px-2">{item.quantity}</span>

                        <button
                          onClick={() =>
                            onUpdateCartItem(item.id, item.quantity + 1)
                          }
                          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <p className="font-semibold mr-2">
                        Rs {item.price * item.quantity}
                      </p>

                      <button
                        onClick={() => onRemoveCartItem(item.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTimes size={16} />
                      </button>
                    </div>
                  </div>
                ))}

                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-bold mt-2">
                    <span>Total</span>

                    <span>Rs {total.toFixed(2)}</span>
                  </div>

                  <button
                    onClick={handleProceedToCheckout}
                    className="bg-primary-color w-full mt-4 p-2 text-white rounded"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Checkout Modal */}

      {isCheckoutOpen && (
        <div
          id="checkout-modal"
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
          <div className="relative bg-white shadow-lg p-6 w-[90%] max-w-sm rounded-lg text-center border border-dashed border-gray-300">
            <h2 className="font-bold text-lg uppercase mb-4 border-b-4 border-dotted pb-2">
              Receipt {refNumber}
            </h2>
            <div className="flex flex-col items-center text-center mb-4">
              <p className="text-sm">
                Shop Name: <span>LE COIN MAURICIEN</span>
              </p>
              <p className="text-sm">
                Address: <span>Mahebourg</span>
              </p>
              <p className="text-sm">Manager: James Smith</p>
              <p className="text-sm">
                Date: {new Date().toLocaleDateString("en-GB")}
              </p>
            </div>

            <div className="border-b-4 border-dotted pb-2 mb-4">
              <div className="flex justify-between">
                <span>ITEM</span>
                <span>PRICE</span>
              </div>
              {cartItems.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>
                    {item.name} (x{item.quantity})
                  </span>
                  <span>Rs {item.price.toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="mb-4">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>Rs {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-b-4 border-dotted pt-2">
                <span>Total:</span>
                <span>Rs {total.toFixed(2)}</span>
              </div>
            </div>

            <div className="text-left mb-4 text-sm items-center text-center">
              <p>Tel: +230 5918 2520</p>
            </div>

            <QRCode value={qrCodeData} size={100} className="mx-auto mb-4" />

            <p className="text-xs text-gray-600 ">THANK YOU FOR CHOOSING US!</p>
            <p className="text-xs text-gray-500 border-b-4 border-dotted">
              Your feedback keeps us improving!
            </p>
            <div className="flex items-center justify-center mt-3">
              <div className="flex gap-4">
                <button
                  className="bg-primary-color rounded-md text-white p-3"
                  onClick={() => setIsCheckoutOpen(false)} // Close modal on Cancel
                >
                  Cancel
                </button>
                <button
                  className="bg-[#00ff00] rounded-md text-white p-3"
                  onClick={() => {
                    Swal.fire({
                      title: "Receipt Printing",
                      text: "Your receipt is being printed...",
                      icon: "info",
                      showConfirmButton: false,
                      timer: 5000, // Auto-close after 2 seconds
                    });
                    setIsCheckoutOpen(false)
                    //clear cart function
                  }}
                >
                  Print
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
