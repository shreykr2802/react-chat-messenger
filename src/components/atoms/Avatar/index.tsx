import { FC } from "react";
import "./index.scss";

interface IProp {
  username: string;
}

export const Avatar: FC<IProp> = ({ username }) => {
  return (
    <img
      className="avatar"
      src={`${import.meta.env.VITE_REACT_AVATAR_API}${username}`}
      alt="avatar"
    />
  );
};
