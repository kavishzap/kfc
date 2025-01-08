import React, { FC, useEffect, useState } from "react";
import { foodDataType } from "../Types/types";
import { Modal } from "../components/Modal";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { FaPlus, FaMinus } from "react-icons/fa";
import Swal from "sweetalert2";

type FoodCardProps = foodDataType & {
  onAddToCart?: (item: foodDataType, quantity: number) => void;
};

export const FoodCard: FC<FoodCardProps> = ({
  id,
  product_name,
  product_image,
  product_description,
  product_selling_price,
  product_category,
  product_manufucturing_price,
  onAddToCart,
}) => {
  const [isModal, setIsModal] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    document.body.style.overflow = isModal ? "hidden" : "unset";
  }, [isModal]);

  const handleAddToCart = onAddToCart || (() => {});
  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  const handleConfirm = () => {
    handleAddToCart(
      {
        id,
        product_name,
        product_image,
        product_description,
        product_category,
        product_selling_price,
        product_manufucturing_price
      },
      quantity
    );
    setQuantity(1); // Reset quantity to 1
    setIsModal(false);
    Swal.fire({
      title: "Selection Confirmed!",
      text: `${quantity} ${product_name} added to your cart.`,
      icon: "success",
      confirmButtonText: "OK",
      confirmButtonColor: "#ff0000",
    });
  };

  return (
    <>
      {isModal && (
        <Modal
          id={id}
          product_description={product_description}
          product_name={product_name}
          product_image={product_image}
          setIsModal={setIsModal}
          product_selling_price={product_selling_price}
          onAddToCart={handleAddToCart}
          product_category={product_category}
        />
      )}
      <div className="text-center bg-white shadow-md p-4 rounded-md group cursor-pointer hover:border-primary-color border border-white max-w-[200px]">
        <LazyLoadImage
          src={`data:image/png;base64,${product_image}`}
          alt={product_name}
          effect="blur"
          className="w-32 h-32 rounded-md object-cover"
        />
        <h2 className="font-bold group-hover:text-primary-color text-sm mt-2">
          {product_name}
        </h2>
        <p className="text-gray-700 text-sm">
          Rs {parseFloat(product_selling_price).toFixed(2)}
        </p>

        <div className="flex items-center gap-2 mt-2 w-full justify-center">
          <button
            onClick={handleDecrement}
            className="px-3 py-1 bg-gray-300 rounded-md hover:bg-gray-400 text-sm"
          >
            <FaMinus />
          </button>
          <span className="text-sm font-medium">{quantity}</span>
          <button
            onClick={handleIncrement}
            className="px-3 py-1 bg-gray-300 rounded-md hover:bg-gray-400 text-sm"
          >
            <FaPlus />
          </button>
        </div>

        <button
          className="rounded-md text-white px-3 py-1 mt-2 border border-red-500 bg-primary-color hover:bg-red-500 hover:text-white transition-all"
          onClick={handleConfirm}
        >
          Add
        </button>
      </div>
    </>
  );
};
