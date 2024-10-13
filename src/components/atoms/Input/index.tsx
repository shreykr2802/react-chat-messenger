import { FC } from "react";
import "./index.scss";

interface IProp {
  type: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  inputType: "newMessage" | "login" | "default";
}

export const Input: FC<IProp> = ({
  type,
  value,
  onChange,
  placeholder,
  inputType = "default",
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className={`input ${inputType}`}
    />
  );
};
