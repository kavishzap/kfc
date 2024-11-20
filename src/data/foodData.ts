import { foodDataType } from "../Types/types";
import hawaiianBurgerImage from "../assets/burger/burger1.png";
import zingerMeal from "../assets/burger/burger2.png";
import burger from "../assets/burger/burger3.png";
import zinger from "../assets/burger/burger4.png";
import Wrap1 from "../assets/burger/wrap1.png";
import Wrap2 from "../assets/burger/wrap2.png";

export const foodData: foodDataType[] = [
  {
    id: 1,
    name: "HAWAIIAN DOUBLE DOWN MEAL",
    imageUrl: hawaiianBurgerImage,
    category: "burgers",
    description:
      "Double chicken and double cheese with an added pineapple slice to provide you with our unique Hawaiian Double Down.",
    price: 340,
  },
  {
    id: 2,
    name: "ZINGER MEAL",
    imageUrl: zingerMeal,
    category: "burgers",
    description:
      "A whole chicken breast cooked with our unique recipe served in a soft sesame bun with lettuce and dressing.",
    price: 280,
  },
  {
    id: 3,
    name: "ZINGER",
    imageUrl: zinger,
    category: "burgers",
    description:
      "A juicy, spicy and crispy chicken fillet, topped with iceberg lettuce & delicious mayo, served in a soft sesame bun. Simply Irresistible!",
    price: 195,
  },
  
  
  {
    id: 5,
    name: "BOXMASTER MEAL",
    imageUrl: Wrap1,
    category: "wraps",
    description:
      "A succulent crispy chicken fillet, a hash brown, lettuce, tomato cubes, mayo & cheese in a warm toasted tortilla. Full of Life, full of Taste!",
    price: 325,
  },
  {
    id: 6,
    name: "TWISTER MEAL",
    imageUrl: Wrap2,
    category: "wraps",
    description:
      "A toasty delicate tortilla filled with crispy chicken, lettuce, tomatoes and mayo.",
    price: 340,
  },
  {
    id: 7,
    name: "LARGE CUP (500ml)",
    imageUrl:
      "food/drink2.png",
    category: "drinks",
    description:
      "Cold cups of carbonated drinks to accompany your KFC meals.",
    price: 75,
  },
  {
    id: 8,
    name: "Water",
    imageUrl:
      "food/drink1.png",
    category: "drinks",
    description: "Bottle of water (50cl)",
    price: 50,
  },
  {
    id: 9,
    name: "Large Chips",
    imageUrl: "food/fies1.png",
    category: "fries & sides",
    description:
      "Crispy, golden fries. Comes in 3 sizes: small, medium & large.",
    price: 140,
  },
  {
    id: 10,
    name: "Popcorn Chicken",
    imageUrl:
      "food/fies2.png",
    category: "fries & sides",
    description:
      "Pop non-stop with juicy Hot & Crispy chicken with extreme sprinkle.",
    price: 175,
  },

  {
    id: 11,
    name: "Crispy Strips",
    imageUrl:
      "food/fies3.png",
    category: "fries & sides",
    description:
      "Crispy & juicy boneless strips of Chicken, served with Honey & Mustard sauce",
    price: 175,
  },
  {
    id: 12,
    name: "ICE TEA",
    imageUrl:
      "food/drink3.png",
    category: "drinks",
    description: "Lipton Ice Tea (50cl)",
    price: 80,
  },
  {
    id: 12,
    name: "CHICKEN SALAD",
    imageUrl:
      "food/salad.png",
    category: "wraps",
    description: "Fresh Lettuce leaves, red cabbage, cheese, cherry tomatoes, onion rings & topped with freshly prepared Hot & Crispy Strips.",
    price: 80,
  },
];
