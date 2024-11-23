import { FC, useEffect, useState } from "react";
import { foodDataType } from "../Types/types";
import { Modal } from "../components/Modal";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

type FoodCardProps = foodDataType & {
  onAddToCart?: (item: foodDataType, quantity: number) => void; // Optional prop for adding to cart
};

export const FoodCard: FC<FoodCardProps> = ({
  id,
  name,
  imageUrl,
  description,
  price,
  onAddToCart,
}) => {
  const [isModal, setIsModal] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isModal ? "hidden" : "unset";
  }, [isModal]);

  // Define a default noop function if onAddToCart is not provided
  const handleAddToCart = onAddToCart || (() => {});

  return (
    <>
      {isModal && (
        <Modal
          id={id}
          description={description}
          name={name}
          imageUrl={imageUrl}
          setIsModal={setIsModal}
          price={price}
          onAddToCart={handleAddToCart} // Pass the defined function
          category={""}
        />
      )}
      <div
        className="text-center bg-white shadow-md p-8 rounded-md group cursor-pointer hover:border-primary-color border border-white"
        onClick={() => setIsModal(true)}
      >
        <LazyLoadImage
          src={imageUrl} // Image URL
          alt={name} // Alt text for accessibility
          effect="blur" // Effect to apply while loading (e.g., blur or opacity)
          className="w-64 h-auto rounded-md object-cover"
        />
        ;<h2 className="font-bold group-hover:text-primary-color">{name}</h2>
        <button className="rounded-md text-black p-1 mt-2 border border-red-500 bg-transparent hover:bg-red-500 hover:text-white transition-all mt-5">
          Select
        </button>
      </div>
    </>
  );
};
