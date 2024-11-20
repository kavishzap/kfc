import React, { FC, useEffect, useState } from "react";
import { Filter } from "./components/Filter/Filter";
import { FoodCard } from "./components/FoodCard";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { SearchBar } from "./components/SearchBar";
import { Ads } from "./components/Ads";
import { foodData } from "./data/foodData";
import { foodDataType } from "./Types/types";
import { Modal } from "./components/Modal";
import Cart from "./components/Cart"; // Import the Cart component
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Banner1 from "./assets/banner1.png";
import Banner2 from "./assets/banner2.png";
import Banner3 from "./assets/banner3.png";

type CartItemType = foodDataType & { quantity: number };

type CarouselProps = {
  images: string[];
};

const ImageCarousel: FC<CarouselProps> = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="overflow-hidden rounded-lg shadow-lg h-[200px] sm:h-[300px] md:h-[400px] mt-10">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`Carousel image ${index + 1}`}
              className="w-full h-[200px] sm:h-[300px] md:h-[400px] object-cover rounded-lg"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

function App() {
  const [currentSelection, setCurrentSelection] = useState("all");
  const [maxDisplay, setMaxDisplay] = useState(6);
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
    setIsLoading(true);
    setMaxDisplay(6);
    const updatedData = reorderData();
    setDataArray(updatedData);
    buttonChecker(updatedData);
    setTimeout(() => setIsLoading(false), 1500);
  }, [currentSelection, searchTerm]);

  const reorderData = (): foodDataType[] => {
    const ordered_data = foodData.sort((a, b) => (a.name > b.name ? 1 : -1));
    const filtered_data =
      currentSelection === "all"
        ? ordered_data
        : ordered_data.filter((data) => data.category === currentSelection);
    return filtered_data.filter((data) =>
      data.name.toLowerCase().includes(searchTerm.toLowerCase())
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

  const images = [Banner1, Banner2, Banner3];

  const onRemoveCartItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <>
      <header>
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
        <ImageCarousel images={images} />
        <h1 className="text-center capitalize font-bold text-3xl my-8">
          Start Ordering Now
        </h1>
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
            <h1 className="text-center capitalize font-bold text-3xl my-8">
              {currentSelection}
            </h1>
            {dataArray.length === 0 && (
              <div className="flex flex-col gap-4 items-center justify-center my-8 min-h-[30vh]">
                <div className="text-center text-md">
                  No food is matched with the search keyword. Please try again.
                </div>
              </div>
            )}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                className="bg-primary-color p-3 w-full md:max-w-[350px] mx-auto font-light mt-16 rounded-md text-white"
              >
                Show more
              </button>
            )}
          </>
        )}
      </main>
      <Ads />
      {isModalOpen && selectedFood && (
        <Modal
          id={selectedFood.id}
          name={selectedFood.name}
          description={selectedFood.description}
          imageUrl={selectedFood.imageUrl}
          price={selectedFood.price}
          category={selectedFood.category} // Pass category to match foodDataType
          setIsModal={setIsModalOpen}
          onAddToCart={handleAddToCart}
        />
      )}
      <Cart
        cartItems={cartItems}
        isCartOpen={isCartOpen}
        toggleCart={toggleCart}
      />{" "}
      {/* Add Cart component here */}
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
