import { useCallback, useEffect, useState } from "react";
import { useApp } from "../../../context/AppContext";
import {
  getAllMessagesBetweenFriends,
  saveMessageBetweenFriends,
} from "../../../service";
import { RecordModel } from "pocketbase";
import "./index.scss";
import { Message } from "../../atoms/Message";
import { Input } from "../../atoms/Input";
import { Button } from "../../atoms/Button";
import PocketBase from "pocketbase";

const pocketBaseUrl = import.meta.env.VITE_REACT_POCKETBASE_URL;
const pb = new PocketBase(pocketBaseUrl);

export const Layout = () => {
  const [messages, setMessages] = useState<RecordModel[]>([]);
  const { loggedInUser, selectedFriend } = useApp();
  const [newMessage, setNewMessage] = useState<string>("");

  const getMessages = useCallback(async () => {
    setMessages(
      await getAllMessagesBetweenFriends(loggedInUser.id, selectedFriend.id)
    );
  }, [loggedInUser, selectedFriend]);

  useEffect(() => {
    getMessages();
  }, [getMessages]);

  const saveMessage = async () => {
    await saveMessageBetweenFriends(
      loggedInUser.id,
      selectedFriend.id,
      newMessage
    );
    setNewMessage("");
  };

  useEffect(() => {
    pb.realtime.subscribe(
      "messages",
      function (e) {
        if (
          e.record.expand.from_user.id === loggedInUser.id ||
          e.record.to_user.id === loggedInUser.id
        )
          setMessages((prevMessage) => [...prevMessage, e.record]);
      },
      { expand: "from_user, to_user" }
    );
    return () => {
      pb.realtime.unsubscribe();
    };
  }, [loggedInUser.id]);

  return (
    <div className="layout">
      {messages.map((message) => {
        return (
          <div
            key={message.id}
            className={
              message.expand?.from_user.id === loggedInUser.id
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
          placeholder="type your message here..."
          onChange={(value) => setNewMessage(value)}
          value={newMessage}
        />
        <Button label="Send" onClick={saveMessage} buttonType="send" />
      </div>
    </div>
  );
};
