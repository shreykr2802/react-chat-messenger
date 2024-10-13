import { useApp } from "../../../context/AppContext";
import { Avatar } from "../../atoms/Avatar";
import "./index.scss";

export const Header = () => {
  const { loggedInUser, selectedFriend } = useApp();
  return (
    <header className="header">
      <div className="title">React Chat App</div>
      <div className="chat-details">Chat with: {selectedFriend.username}</div>
      <div className="chat-details">Logged In: {loggedInUser.username}</div>
      <Avatar username={loggedInUser.username} />
    </header>
  );
};
