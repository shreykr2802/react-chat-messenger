import { useCallback, useEffect, useState } from "react";
import { useApp } from "../../../context/AppContext";
import { getAllMessagesBetweenFriends } from "../../../service";
import { RecordModel } from "pocketbase";
import "./index.scss";
import { Message } from "../../atoms/Message";
import { Input } from "../../atoms/Input";
import { Button } from "../../atoms/Button";

export const Layout = () => {
  const [messages, setMessages] = useState<RecordModel[]>([]);
  const { loggedInUser, selectedFriend } = useApp();
  const [newMessage, setNewMessage] = useState<string>("");

  const getMessages = useCallback(async () => {
    setMessages(
      await getAllMessagesBetweenFriends(loggedInUser, selectedFriend)
    );
  }, [loggedInUser, selectedFriend]);

  useEffect(() => {
    getMessages();
  }, [getMessages]);

  return (
    <div className="layout">
      {messages.map((message) => {
        return (
          <div
            key={message.id}
            className={
              message.expand?.from_user.username === loggedInUser
                ? "right"
                : "left"
            }
          >
            <Message text={message.text} />
            <span className="date-time">{message.created}</span>
          </div>
        );
      })}
      <div className="send-message">
        <Input
          type="text"
          inputType="newMessage"
          placeholder="type your messgae here..."
          onChange={(value) => setNewMessage(value)}
          value={newMessage}
        />
        <Button label="Send" onClick={() => {}} buttonType="send" />
      </div>
    </div>
  );
};
