import { useEffect, useState } from "react";
import kfc_logo from "../assets/_5C0DE2EC-2C9F-44EC-9667-61334C1CADE3_-removebg-preview.png";
import { foodDataType } from "../Types/types";
import { FaTimes } from "react-icons/fa";
import QRCode from "react-qr-code";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";

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

  const [moneyReceived, setMoneyReceived] = useState(0);

  const [isPrintVisible, setIsPrintVisible] = useState(false);

  const [isMoneyValidated, setIsMoneyValidated] = useState(false);

  const [storedUsername, setStoredUsername] = useState("");

  const [companyLogo, setCompanyLogo] = useState("");

  const [receiptData, setReceiptData] = useState({
    phone_number: "",
    address: "",
    manager: "",
    shop_name: "",
  });

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setStoredUsername(savedUsername);
    }
  }, []);

  useEffect(() => {
    const storedLogo = localStorage.getItem("logo");
    if (storedLogo) {
      setCompanyLogo(storedLogo);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const API_URL = import.meta.env.VITE_REACT_APP_LOGIN_URL;
      try {
        const response = await axios.get(
          `${API_URL}?company_username=eq.${storedUsername}`,{
            headers: {
              "apikey": import.meta.env.VITE_REACT_APP_ANON_KEY,
              "Authorization": `Bearer ${import.meta.env.VITE_REACT_APP_ANON_KEY}`,
            },
          }
        );

        console.log("API Response:", response.data); 
        
        const data = response.data[0]; // Assuming the API returns an array
        setReceiptData({
          phone_number: data?.phone_number || "N/A", 
          address: data?.address || "Default Address",
          manager: data?.manager || "Default Manager",
          shop_name: data?.company_username || "Default Shop Name",
        });
      } catch (error) {
        console.error("Error fetching receipt data:", error);
        setReceiptData({
          phone_number: "N/A",
          address: "Default Address",
          manager: "Default Manager",
          shop_name: "Default Shop Name",
        });
      }
    };

    if (storedUsername) fetchData();
  }, [storedUsername]);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleOutsideClick = (e: React.MouseEvent) => {
    if ((e.target as Element).id === "cart-modal") {
      setIsCartOpen(false);
    }
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + parseInt(item.product_selling_price) * item.quantity,
    0
  );
  const total = subtotal;

  const handleProceedToCheckout = () => {
    setIsCartOpen(false); // Close the cart modal
    setIsCheckoutOpen(true); // Open the checkout modal
  };

  const generateRefNumber = () => {
    const randomNum = Math.floor(10 + Math.random() * 90); // Random number between 10 and 99
    return `#${randomNum}`;
  };

  const refNumber = generateRefNumber();

  const navigate = useNavigate();
  // Navigation function
  const logout = () => {
    navigate("/"); // Replace "/dashboard" with your target route
  };

  // Function to clear the cart
  const clearCart = () => {
    Swal.fire({
      title: "Confirm Clear Cart",
      text: "Are you sure you want to remove all items from the cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Clear",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        cartItems.length = 0; // Clear all items in the cart
        Swal.fire({
          title: "Cart Cleared",
          text: "All items have been removed from your cart.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        setIsCartOpen(false); // Optionally close the cart modal
      }
    });
  };

  return (
    <div className="py-4 px-4 border-b-8 border-primary-color relative">
      <div className="flex justify-between items-center max-w-[1200px] m-auto">
        <div className="flex gap-4">
          <img
            src={companyLogo ? `data:image/png;base64,${companyLogo}` : ""}
            alt="Company Logo"
            width={36}
            className="object-contain"
          />
          <div>
            <div className="font-bold text-lg sm:text-2xl">
              {storedUsername || "?"}
            </div>
            <div className="font-light text-xs sm:text-sm uppercase tracking-wider">
              POS SYSTEM
            </div>
          </div>
        </div>

        <div className="flex items-center relative">
          {/* Cart Button */}
          <div onClick={toggleCart} className="relative cursor-pointer">
            <FaShoppingCart size={24} />
            {cartItems.length > 0 && (
              <span className="absolute top-[-5px] right-[-10px] bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </div>

          {/* Logout Button */}
          <div
            className="flex items-center relative ml-10 cursor-pointer"
            onClick={() => {
              Swal.fire({
                title: "Confirm Logout",
                text: "Are you sure you want to log out?",
                icon: "warning",
                iconColor: "#ff0000",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Confirm",
                cancelButtonText: "Cancel",
              }).then((result) => {
                if (result.isConfirmed) {
                  logout(); // Call logout function on confirmation
                  Swal.fire({
                    title: "Logged Out",
                    text: "You have been successfully logged out.",
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false,
                  });
                }
              });
            }}
          >
            <FaSignOutAlt size={24} />
          </div>
        </div>
      </div>

      {isCartOpen && (
        <div
          id="cart-modal"
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={handleOutsideClick}
        >
          <div className="relative bg-white shadow-lg p-12 w-[90%] max-w-lg rounded-lg">
            <button
              onClick={toggleCart}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              <FaTimes size={20} />
            </button>
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg">Order</h2>
              <button
                onClick={clearCart}
                className="bg-red-500 text-white text-sm px-4 py-2 rounded hover:bg-red-600"
              >
                Clear Cart
              </button>
            </div>

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
                      src={`data:image/png;base64,${item.product_image}`}
                      alt={item.product_name}
                      className="w-12 h-12 object-cover mr-2"
                    />

                    <div className="flex-1">
                      <p className="font-semibold">{item.product_name}</p>

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
                        Rs{" "}
                        {parseInt(item.product_selling_price) * item.quantity}
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
            <LazyLoadImage
              src={`data:image/png;base64,${companyLogo}`}
              alt={companyLogo}
              effect="blur"
              className="w-12 rounded-md object-cover"
            />
            <div className="flex flex-col items-center text-center mb-4">
              <p className="text-sm">
                Shop Name: <span>{receiptData.shop_name}</span>
              </p>
              <p className="text-sm">
                Address: <span>{receiptData.address}</span>
              </p>
              <p className="text-sm">Manager: {receiptData.manager}</p>
              <p className="text-sm">
                Date: {new Date().toLocaleDateString("en-GB")}
              </p>
              <p className="text-sm">Tel: {receiptData.phone_number}</p>
            </div>

            <div className="border-b-4 border-dotted pb-2 mb-4">
              <div className="flex justify-between">
                <span>ITEM</span>
                <span>PRICE</span>
              </div>
              {cartItems.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>
                    {item.product_name} (x{item.quantity})
                  </span>
                  <span>
                    Rs {parseInt(item.product_selling_price).toFixed(2)}
                  </span>
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

            <div className="mb-4">
              {!isMoneyValidated ? (
                <div className="flex items-center">
                  <div className="flex-1">
                    <label
                      className="block text-sm font-semibold mb-2"
                      htmlFor="moneyReceived"
                    >
                      Money Received:
                    </label>
                    <input
                      id="moneyReceived"
                      type="text"
                      className="border border-gray-300 rounded px-2 py-1 w-full text-center"
                      placeholder="Enter amount received"
                      value={moneyReceived}
                      onChange={(e) =>
                        setMoneyReceived(parseFloat(e.target.value) || 0)
                      }
                    />
                  </div>
                  <button
                    className="ml-2 mt-7 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={() => {
                      if (moneyReceived >= total) {
                        setIsMoneyValidated(true); // Mark as validated
                        setIsPrintVisible(true);
                        Swal.fire({
                          title: "Amount Received",
                          text: `Total: Rs ${total.toFixed(
                            2
                          )}, Received: Rs ${moneyReceived.toFixed(
                            2
                          )}, Change: Rs ${(moneyReceived - total).toFixed(2)}`,
                          icon: "success",
                        });
                      } else {
                        Swal.fire({
                          title: "Insufficient Amount",
                          text: `Received: Rs ${moneyReceived.toFixed(
                            2
                          )}. Please collect the remaining Rs ${(
                            total - moneyReceived
                          ).toFixed(2)}.`,
                          icon: "error",
                        });
                      }
                    }}
                  >
                    Done
                  </button>
                </div>
              ) : (
                <div className="text-sm font-semibold text-green-600">
                  Money Received: Rs {moneyReceived.toFixed(2)}
                </div>
              )}
            </div>
            {/* Display Change */}
            <div className="mb-4">
              <div className="flex justify-between">
                <span>Change:</span>
                <span>Rs {(moneyReceived - total).toFixed(2)}</span>
              </div>
            </div>
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
                {isPrintVisible && (
                  <button
                    className="bg-[#00ff00] rounded-md text-white p-3"
                    onClick={() => {
                      Swal.fire({
                        title: "Receipt Printing",
                        text: "Your receipt is being printed...",
                        icon: "info",
                        iconColor: "#ff0000",
                        showConfirmButton: false,
                        timer: 5000, // Auto-close after 2 seconds
                      });
                      cartItems.length = 0; // Clear all items in the cart
                      setIsCheckoutOpen(false);
                      // Clear cart function
                    }}
                  >
                    Print
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
