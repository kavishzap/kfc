import axios from "axios";
import { foodDataType } from "../Types/types";

export const fetchFoodData = async (): Promise<foodDataType[]> => {
  const API_URL = import.meta.env.VITE_REACT_APP_PRODUCTS_URL;
  const username = localStorage.getItem("username");

  if (!username) {
    console.error("Username not found in localStorage.");
    return [];
  }

  try {
    const response = await axios.get(`${API_URL}?product_comapany_name=eq.${username}`, {
      headers: {
        "apikey": import.meta.env.VITE_REACT_APP_ANON_KEY,
        "Authorization": `Bearer ${import.meta.env.VITE_REACT_APP_ANON_KEY}`,
      },
    });

    if (!response.data || !Array.isArray(response.data)) {
      console.error("Unexpected API response format:", response.data);
      return [];
    }

    const data = response.data;

    return data.map((product: {
      id: number;
      product_name: string;
      product_selling_price: string;
      product_image: string;
      product_category: string;
      product_description: string;
    }): foodDataType => ({
      id: product.id,
      product_name: product.product_name,
      product_selling_price: product.product_selling_price,
      product_image: product.product_image,
      product_category: product.product_category,
      product_description: product.product_description,
    }));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error fetching food data:", error.message, error.response);
    } else if (error instanceof Error) {
      console.error("Error fetching food data:", error.message);
    } else {
      console.error("Unknown error fetching food data:", error);
    }
    return [];
  }
};

export let foodData: foodDataType[] = [];

export const loadFoodData = async (): Promise<void> => {
  try {
    const data = await fetchFoodData();
    foodData = data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error loading food data:", error.message, error.response);
    } else if (error instanceof Error) {
      console.error("Error loading food data:", error.message);
    } else {
      console.error("Unknown error loading food data:", error);
    }
  }
};
