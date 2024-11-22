import { FC, useEffect, useState } from "react";
import { foodDataType } from "../Types/types";
import { Modal } from "../components/Modal";

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
        className="text-center shadow-md p-8 rounded-md group cursor-pointer hover:border-primary-color border border-white"
        onClick={() => setIsModal(true)}
      >
        <img
          src={imageUrl}
          alt={name}
          className="object-contain w-[200px] max-h-[200px] ml-12"
        />
        <h2 className="font-bold group-hover:text-primary-color">{name}</h2>
        <button className="bg-primary-color rounded-md text-white p-1 mt-2">
          Select
        </button>
      </div>
    </>
  );
};
