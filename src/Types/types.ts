export type IconProps = {
  classes?: string;
};

export type CurrentSelectionProps = {
  current: string;
  setCurrent: React.Dispatch<React.SetStateAction<string>>;
};

export type foodDataType = {
  id: number;
  name: string;
  imageUrl: string;
  category: string;
  description: string;
  price: number;
};
