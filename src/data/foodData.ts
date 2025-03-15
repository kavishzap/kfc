import { createClient } from "@supabase/supabase-js";
import { foodDataType } from "../Types/types";

// ✅ Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_REACT_APP_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_REACT_APP_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase environment variables are missing.");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const fetchFoodData = async (): Promise<foodDataType[]> => {
  try {
    // ✅ Fetch the authenticated user
    const { data: authData, error: authError } = await supabase.auth.getUser();

    if (authError || !authData?.user?.email) {
      console.error("User not authenticated or email not found:", authError);
      return [];
    }

    const userEmail = authData.user.email; // ✅ Fetch user email from Supabase Auth

    // ✅ Fetch products linked to the logged-in user's company email
    const { data, error } = await supabase
      .from("products") // ✅ Ensure correct table name
      .select("id, product_name, product_selling_price, product_image, product_category, product_description, product_manufacturing_price") // ✅ Use correct field name
      .eq("product_company_email", userEmail); // ✅ Fetch products for the logged-in user

    if (error) {
      throw new Error(`Error fetching food data: ${error.message}`);
    }

    if (!data || data.length === 0) {
      console.warn("No products found for this user.");
      return [];
    }

    console.log("Fetched Food Data:", data);

    // ✅ Convert necessary fields and fix the key name for `product_manufucturing_price`
    return data.map((product) => ({
      id: product.id,
      product_name: product.product_name,
      product_selling_price: product.product_selling_price,
      product_image: product.product_image,
      product_category: product.product_category,
      product_description: product.product_description,
      product_manufucturing_price: product.product_manufacturing_price, // ✅ Ensure correct key name
    }));
  } catch (error) {
    console.error("Unexpected error fetching food data:", error);
    return [];
  }
};

// ✅ Global variable to store food data
export let foodData: foodDataType[] = [];

export const loadFoodData = async (): Promise<void> => {
  try {
    const data = await fetchFoodData();
    foodData = data;
  } catch (error) {
    console.error("Error loading food data:", error);
  }
};
