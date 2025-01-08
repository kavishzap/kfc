export type IconProps = {
  classes?: string;
};

export type CurrentSelectionProps = {
  current: string;
  setCurrent: React.Dispatch<React.SetStateAction<string>>;
};

export type foodDataType = {
  id: number;
  product_name: string;
  product_selling_price: string;
  product_image: string;
  product_category: string;
  product_description: string;
  product_manufucturing_price: string
};
