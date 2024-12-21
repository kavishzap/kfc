import { FC, useState } from "react";
import { FaTimes, FaPlus, FaMinus } from "react-icons/fa";
import { motion } from "framer-motion";
import { foodDataType } from "../Types/types"; // Import foodDataType
import Swal from "sweetalert2"; // Import SweetAlert2

type PropsType = {
  id: number;
  product_name: string;
  product_description: string;
  product_image: string;
  product_selling_price: string;
  product_category: string;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  onAddToCart: (item: foodDataType, quantity: number) => void;
};

export const Modal: FC<PropsType> = ({
  id,
  product_name,
  product_description,
  product_image,
  product_selling_price,
  product_category,
  setIsModal,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCartClick = () => {
    setIsConfirmModalOpen(true);
  };

  const handleConfirm = () => {
    onAddToCart(
      {
        id,
        product_name,
        product_description,
        product_image,
        product_selling_price,
        product_category,
      },
      quantity
    );
    setIsConfirmModalOpen(false);
    setIsModal(false); // Close main modal
    Swal.fire({
      title: "Selection Confirmed!",
      text: `${quantity} ${product_name} added to your cart.`,
      icon: "success",
      confirmButtonText: "OK",
      confirmButtonColor: "#ff0000",
    });
  };

  const handleCancel = () => {
    setIsConfirmModalOpen(false); // Only close confirmation modal
  };

  return (
    <>
      {/* Main Modal */}
      <div className="fixed flex top-0 left-0 bg-black w-full h-[100vh] bg-opacity-50 justify-center items-center z-[9998]">
        <div className="relative grid md:grid-cols-2 p-4 sm:p-6 gap-4 bg-white max-w-[500px] m-auto mx-2 shadow-sm rounded-md h-auto max-h-[90vh] overflow-y-auto">
          <div className="absolute top-0 left-0 w-full h-3 bg-red-600 rounded-t-md"></div>

          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-black focus:outline-none p-2 md:p-5"
            onClick={() => setIsModal(false)}
          >
            <FaTimes size={20} />
          </button>

          <motion.img
            src={product_image}
            alt="food-image"
            className="w-64 mt-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />

          <div className="flex flex-col gap-4 justify-center items-center">
            <div className="flex flex-col justify-center items-center gap-2">
              <h1 className="font-bold text-2xl">{product_name}</h1>
              <p className="text-xl font-large text-black font-bold">
                Rs {product_selling_price}
              </p>
            </div>
            <p className="text-center">{product_description}</p>

            {/* Row with decrement, quantity, increment buttons */}
            <div className="flex items-center gap-4 mt-2 w-full justify-center">
              <button
                onClick={handleDecrement}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                <FaMinus />
              </button>
              <span className="text-lg font-medium">{quantity}</span>
              <button
                onClick={handleIncrement}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                <FaPlus />
              </button>
            </div>

            {/* Row with wide "Add to Cart" button */}
            <div className="w-full mt-4">
              <button
                onClick={handleAddToCartClick}
                className="bg-primary-color p-3 w-full font-light rounded-md text-white text-center"
              >
                Add to Cart ({quantity})
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {isConfirmModalOpen && (
        <div className="fixed flex top-0 left-0 bg-black w-full h-[100vh] bg-opacity-50 justify-center items-center z-[9999]">
          <div className="bg-white p-6 rounded-md shadow-md max-w-sm w-full">
            <h2 className="font-bold text-lg mb-4">Confirm Add to Cart</h2>
            <p>
              Are you sure you want to add {quantity} {product_name} to your cart?
            </p>
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-primary-color text-white rounded hover:bg-primary-dark"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
