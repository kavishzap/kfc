import React from "react";

export const Ads = () => {
  const images = [
    {
      src: "/food/banner1.png", // Replace with actual path
      alt: "Burger Description",
      gridArea: "burger", // Define custom grid area for this image
    },
    {
      src: "/food/banner4.png", // Replace with actual path
      alt: "KFC Club Card",
      gridArea: "card", // Define custom grid area for this image
    },
    {
      src: "/food/banner5.png", // Replace with actual path
      alt: "Fried Chicken Meal",
      gridArea: "meal", // Define custom grid area for this image
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Grid Container */}
      <div
        className="grid gap-6 grid-cols-1 md:grid-cols-3"
        style={{
          gridAutoRows: "300px", // Ensures uniform height
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg shadow-lg"
            style={{ height: "100%", width: "100%" }}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="object-cover w-full h-full" // Fill container while maintaining aspect ratio
            />
          </div>
        ))}
      </div>
    </div>
  );
};