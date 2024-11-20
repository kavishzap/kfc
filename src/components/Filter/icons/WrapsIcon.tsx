import { FC } from "react";
import { IconProps } from "../../../Types/types";

export const WrapIcon: FC<IconProps> = ({ classes }) => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 40 40"
      fill="none"
      className={classes}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 10C11 6 15 4 20 4C25 4 29 6 30 10L33 30C32 33 28 36 20 36C12 36 8 33 7 30L10 10Z"
        stroke="current"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 18H25"
        stroke="current"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 24H28"
        stroke="current"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
