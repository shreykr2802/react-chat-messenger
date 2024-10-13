import { useCallback, useEffect, useState } from "react";
import { useApp } from "../../../context/AppContext";
import { getAllMessagesBetweenFriends } from "../../../service";
import { RecordModel } from "pocketbase";
import "./index.scss";
import { Message } from "../../atoms/Message";

export const Layout = () => {
  const [messages, setMessages] = useState<RecordModel[]>([]);
  const { loggedInUser, selectedFriend } = useApp();

  const getMessages = useCallback(async () => {
    setMessages(
      await getAllMessagesBetweenFriends(loggedInUser, selectedFriend)
    );
  }, [loggedInUser, selectedFriend]);

  useEffect(() => {
    getMessages();
  }, [getMessages]);

  console.log("messages", messages);

  return (
    <div className="layout">
      {messages.map((message) => {
        return <Message text={message.text} />;
      })}
    </div>
  );
};
