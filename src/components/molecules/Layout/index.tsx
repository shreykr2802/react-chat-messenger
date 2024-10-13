import { useCallback, useEffect, useRef, useState } from "react";
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
  const ref = useRef<HTMLDivElement>(null);

  const getMessages = useCallback(async () => {
    setMessages(
      await getAllMessagesBetweenFriends(loggedInUser.id, selectedFriend.id)
    );
  }, [loggedInUser, selectedFriend]);

  useEffect(() => {
    getMessages();
  }, [getMessages]);

  const saveMessage = async () => {
    if (newMessage) {
      await saveMessageBetweenFriends(
        loggedInUser.id,
        selectedFriend.id,
        newMessage
      );
      setNewMessage("");
    }
  };

  useEffect(
    () =>
      ref.current?.scrollTo({
        top: ref.current?.scrollHeight + 80,
        behavior: "smooth",
      }),
    [messages]
  );

  useEffect(() => {
    pb.realtime.subscribe(
      "messages",
      function (e) {
        if (
          e.record.expand.from_user.id === loggedInUser.id ||
          e.record.expand.to_user.id === loggedInUser.id
        ) {
          setMessages((prevMessage) => [...prevMessage, e.record]);
        }
      },
      { expand: "from_user, to_user" }
    );
    return () => {
      pb.realtime.unsubscribe();
    };
  });

  return (
    <div className="layout" ref={ref}>
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
            <span className="date-time">{`${
              message.created.split(" ")[0]
            } ${message.created.split(" ")[1].slice(0, 5)}`}</span>
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
