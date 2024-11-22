import { foodDataType } from "../Types/types";

//image import
import burger1 from "../assets/Food POS UI Design (Demo) (Community)/burger1.png";
import burger2 from "../assets/Food POS UI Design (Demo) (Community)/burger2.png";
import burger3 from "../assets/Food POS UI Design (Demo) (Community)/burger3.png";

import wrap1 from "../assets/Food POS UI Design (Demo) (Community)/wrap1.png";
import wrap2 from "../assets/Food POS UI Design (Demo) (Community)/wrap2.png";
import wrap3 from "../assets/Food POS UI Design (Demo) (Community)/wrap3.png";

import fries1 from "../assets/Food POS UI Design (Demo) (Community)/fries1.png";
import fries2 from "../assets/Food POS UI Design (Demo) (Community)/fries2.png";
import fries3 from "../assets/Food POS UI Design (Demo) (Community)/fries3.png";

import drink1 from "../assets/Food POS UI Design (Demo) (Community)/drink1.png";
import drink2 from "../assets/Food POS UI Design (Demo) (Community)/drink2.png";
import drink3 from "../assets/Food POS UI Design (Demo) (Community)/drink3.png";

export const foodData: foodDataType[] = [
  {
    id: 1,
    name: "Classic Cheeseburger",
    imageUrl: burger1,
    category: "burgers",
    description:
      "Juicy chicken patty topped with cheddar cheese, lettuce, and tomato.",
    price: 340,
  },
  {
    id: 2,
    name: "Veggie Delight Burger",
    imageUrl: burger2,
    category: "burgers",
    description:
      "Grilled plant-based patty with fresh veggies and a tangy sauce.",
    price: 280,
  },
  {
    id: 3,
    name: "Chicken Burger",
    imageUrl: burger3,
    category: "burgers",
    description: "Crispy fried chicken with mayo and pickles in a toasted bun.",
    price: 340,
  },

  {
    id: 5,
    name: "Grilled Chicken Wrap",
    imageUrl: wrap1,
    category: "wraps",
    description:
      "Tender grilled chicken, lettuce, and creamy dressing in a soft tortilla.",
    price: 250,
  },
  {
    id: 6,
    name: "Falafel Wrap",
    imageUrl: wrap2,
    category: "wraps",
    description:
      "Crispy falafels, hummus, and fresh veggies wrapped in pita bread",
    price: 250,
  },
  {
    id: 7,
    name: "Berry Smoothie",
    imageUrl: drink2,
    category: "drinks",
    description: "A creamy blend of mixed berries and yogurt.",
    price: 75,
  },
  {
    id: 8,
    name: "Lemon Iced Tea",
    imageUrl: drink1,
    category: "drinks",
    description: "Refreshing iced tea with a hint of lemon zest.",
    price: 75,
  },
  {
    id: 9,
    name: "Cheese Fries",
    imageUrl: fries1,
    category: "fries & sides",
    description:
      "Fries loaded with melted cheddar cheese and a sprinkle of herbs.",
    price: 125,
  },
  {
    id: 10,
    name: "Classic Fries",
    imageUrl: fries2,
    category: "fries & sides",
    description:
      "Crispy golden potato fries, lightly salted for the perfect crunch.",
    price: 125,
  },

  {
    id: 11,
    name: "Curly Fries",
    imageUrl: fries3,
    category: "fries & sides",
    description: "Seasoned curly potato fries with a zesty flavor twist.",
    price: 175,
  },
  {
    id: 12,
    name: "Strawberry Ice Tea",
    imageUrl: drink3,
    category: "drinks",
    description: "Refreshing iced tea with a hint of strawberry zest",
    price: 75,
  },
  {
    id: 12,
    name: "Shawarma Wrap",
    imageUrl: wrap3,
    category: "wraps",
    description:
      "Marinated chicken, garlic sauce, and pickles wrapped in flatbread.",
    price: 250,
  },
];
