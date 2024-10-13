import { FC } from "react";
import "./index.scss";

interface IProp {
  label: string;
  onClick: (event: Event) => void | Promise<void>;
  buttonType: "send" | "login" | "logout";
}

export const Button: FC<IProp> = ({ label, onClick, buttonType }) => {
  return (
    <button
      className={`button ${buttonType}`}
      onClick={(event) => onClick(event as unknown as Event)}
    >
      {label}
    </button>
  );
};
