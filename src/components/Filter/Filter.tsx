import { FC, useEffect, useState } from "react";
import { CurrentSelectionProps } from "../../Types/types";
import { FilterButton } from "./FilterButton";
import { AllIcon } from "./icons/AllIcon";
import axios from "axios";

interface Product {
  product_category?: string;
}


export const Filter: FC<CurrentSelectionProps> = ({ current, setCurrent }) => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const API_URL = import.meta.env.VITE_REACT_APP_PRODUCTS_URL;
      const username = localStorage.getItem("username");

      if (!username) {
        console.error("Username not found in localStorage.");
        return;
      }

      try {
        const response = await axios.get<Product[]>(`${API_URL}?product_comapany_name=eq.${username}`, {
          headers: {
            "apikey": import.meta.env.VITE_REACT_APP_ANON_KEY,
            "Authorization": `Bearer ${import.meta.env.VITE_REACT_APP_ANON_KEY}`,
          },
        });

        const data = response.data;
        console.log('data',data);
        const uniqueCategories = Array.from(
          new Set(data.map((product) => (product.product_category || "")))
        );
        setCategories(["all", ...uniqueCategories]);
        console.log('uniqueCategories',uniqueCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    
    fetchCategories();
  }, []);

  return (
    <div className="flex gap-4 justify-between">
      {categories.map((category) => (
        <FilterButton
          key={category}
          name={category}
          current={current}
          setCurrent={setCurrent}
        />
      ))}
    </div>
  );
};
