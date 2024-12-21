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
      <div className="text-center bg-white shadow-md p-8 rounded-md group cursor-pointer hover:border-primary-color border border-white">
        <LazyLoadImage
           src={`data:image/png;base64,${product_image}`}
          alt={product_name}
          effect="blur"
          className="w-64 h-auto rounded-md object-cover"
        />
        <h2 className="font-bold group-hover:text-primary-color">
          {product_name}
        </h2>
        <p className="text-gray-700">
          Rs {parseFloat(product_selling_price).toFixed(2)}
        </p>

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

        <button
          className="rounded-md text-white p-2 mt-2 border border-red-500 bg-primary-color hover:bg-red-500 hover:text-white transition-all mt-5"
          onClick={handleConfirm}
        >
          Add
        </button>
      </div>
    </>
  );
};
