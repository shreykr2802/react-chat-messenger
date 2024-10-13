import { FC } from "react";
import "./index.scss";
import { useApp } from "../../../context/AppContext";

interface IProp {
  username: string;
}

export const Avatar: FC<IProp> = ({ username }) => {
  const { selectedFriend } = useApp();
  return (
    <>
      {username && (
        <img
          className={`avatar ${
            selectedFriend.username === username ? "active" : ""
          } `}
          src={`${import.meta.env.VITE_REACT_AVATAR_API}${username}`}
          alt="avatar"
        />
      )}
    </>
  );
};
