import { FC } from "react";
import "./index.scss";

interface IProp {
  label: string;
  onClick: () => void;
  buttonType: "send";
}

export const Button: FC<IProp> = ({ label, onClick, buttonType }) => {
  return (
    <button className={`button ${buttonType}`} onClick={onClick}>
      {label}
    </button>
  );
};
