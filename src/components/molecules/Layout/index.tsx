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
  const [loading, setLoading] = useState(false);
  const { loggedInUser, selectedFriend } = useApp();
  const [newMessage, setNewMessage] = useState<Record<string, string>>({});
  const ref = useRef<HTMLDivElement>(null);

  const getMessages = useCallback(async () => {
    setMessages(
      await getAllMessagesBetweenFriends(loggedInUser.id, selectedFriend.id)
    );
  }, [loggedInUser, selectedFriend]);

  useEffect(() => {
    setLoading(true);
    getMessages().then(() => setLoading(false));
  }, [getMessages]);

  const saveMessage = async () => {
    if (newMessage[selectedFriend.id]) {
      await saveMessageBetweenFriends(
        loggedInUser.id,
        selectedFriend.id,
        newMessage[selectedFriend.id]
      );
      setNewMessage((prevMessages) => ({
        ...prevMessages,
        [selectedFriend.id]: "",
      }));
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

  const getFormattedDate = (date: string) => {
    const formattedDate = new Date(date);
    return (
      <>
        {formattedDate.toLocaleDateString()}{" "}
        {formattedDate.toLocaleTimeString()}
      </>
    );
  };

  return loading ? (
    <span>Loading....</span>
  ) : (
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
            <span className="date-time">
              {getFormattedDate(message.created)}
            </span>
          </div>
        );
      })}
      <div className="send-message">
        <Input
          type="text"
          inputType="newMessage"
          placeholder="type your message here..."
          onChange={(value) =>
            setNewMessage((prevMessages) => ({
              ...prevMessages,
              [selectedFriend.id]: value,
            }))
          }
          value={newMessage[selectedFriend.id] ?? ""}
        />
        <Button label="Send" onClick={saveMessage} buttonType="send" />
      </div>
    </div>
  );
};
