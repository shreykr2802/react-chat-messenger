import { FC } from "react";

interface IProp {
  text: string;
}

export const Message: FC<IProp> = ({ text }) => {
  return (
    <div className="message">
      <p>{text}</p>
    </div>
  );
};
