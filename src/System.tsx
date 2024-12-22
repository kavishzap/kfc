import React, { FC, useEffect, useState } from "react";
import { Filter } from "./components/Filter/Filter";
import { FoodCard } from "./components/FoodCard";
import { Header } from "./components/Header";
import { SearchBar } from "./components/SearchBar";
import { fetchFoodData, foodData } from "./data/foodData";
import { foodDataType } from "./Types/types";
import { Modal } from "./components/Modal";

type CartItemType = foodDataType & { quantity: number };

function System() {
  const [currentSelection, setCurrentSelection] = useState("all");
  const [maxDisplay, setMaxDisplay] = useState(6);
  const [originalData, setOriginalData] = useState<foodDataType[]>([]);
  const [dataArray, setDataArray] = useState<foodDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isButton, setIsButton] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState<foodDataType | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false); // State for cart visibility

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchFoodData();
      setOriginalData(data); // Store original data
      setDataArray(data); // Initialize filtered data
      buttonChecker(data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [currentSelection, searchTerm]);

  const applyFilters = () => {
    setIsLoading(true);
    let filteredData = originalData;

    // Apply category filter
    if (currentSelection !== "all") {
      filteredData = filteredData.filter(
        (item) => item.product_category === currentSelection
      );
    }

    // Apply search term filter
    if (searchTerm.trim() !== "") {
      filteredData = filteredData.filter((item) =>
        item.product_name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setDataArray(filteredData);
    buttonChecker(filteredData);
    setIsLoading(false);
  };

  const reorderData = (): foodDataType[] => {
    const ordered_data = dataArray.sort((a, b) =>
      (a.product_name || "").localeCompare(b.product_name || "")
    );

    const filtered_data =
      currentSelection === "all"
        ? ordered_data
        : ordered_data.filter(
            (data) => data.product_category === currentSelection
          );

    // Filter by search term
    return filtered_data.filter((data) =>
      data.product_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const buttonChecker = (data: foodDataType[]): void => {
    setIsButton(data.length > maxDisplay);
  };

  const maxDisplayHandler = (): void => {
    setMaxDisplay(maxDisplay + 6);
    buttonChecker(reorderData());
  };

  const handleAddToCart = (item: foodDataType, quantity: number) => {
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find(
        (cartItem) => cartItem.id === item.id
      );
      if (existingItem) {
        return prevCartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      }
      return [...prevCartItems, { ...item, quantity }];
    });
  };

  const handleFoodCardClick = (food: foodDataType) => {
    setSelectedFood(food);
    setIsModalOpen(true);
  };

  const onRemoveCartItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div>
      <header className="bg-white shadow-md">
        <Header
          cartItems={cartItems}
          onUpdateCartItem={(id, newQuantity) => {
            setCartItems((prevCartItems) =>
              prevCartItems.map((item) =>
                item.id === id
                  ? { ...item, quantity: Math.max(newQuantity, 1) }
                  : item
              )
            );
          }}
          onRemoveCartItem={onRemoveCartItem}
        />
      </header>
      <main className="flex flex-col m-auto max-w-[1200px] px-4">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Filter current={currentSelection} setCurrent={setCurrentSelection} />
        {isLoading && (
          <div className="flex flex-col gap-4 items-center justify-center my-8 min-h-[30vh]">
            <div className="custom-loader"></div>
            <div className="animate-pulse text-center capitalize text-md">
              Loading...
            </div>
          </div>
        )}
        {!isLoading && (
          <>
          {dataArray.length === 0 && (
            <div className="flex flex-col gap-4 items-center justify-center my-8 min-h-[30vh]">
              <div className="text-center text-md">
                No products found. Please try again.
              </div>
            </div>
          )}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 mb-5">
            {dataArray.slice(0, maxDisplay).map((data) => (
              <FoodCard
                key={data.id}
                {...data}
                onAddToCart={handleAddToCart} // Pass the add-to-cart function to FoodCard
              />
            ))}
          </div>
          {isButton && (
            <button
              onClick={maxDisplayHandler}
              className="bg-primary-color p-3 mb-10 w-full md:max-w-[350px] mx-auto font-light mt-16 rounded-md text-white"
            >
              Show more
            </button>
          )}
        </>
        
        )}
      </main>
      {isModalOpen && selectedFood && (
        <Modal
          {...selectedFood} // Spread props for cleaner code
          setIsModal={setIsModalOpen}
          onAddToCart={handleAddToCart}
        />
      )}
      <footer>{/* <Footer /> */}</footer>
    </div>
  );
}

export default System;
