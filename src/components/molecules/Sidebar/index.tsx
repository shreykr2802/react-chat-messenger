import { FC, useCallback, useEffect, useState } from "react";
import "./index.scss";
import { getAllUsers, logout } from "../../../service";
import { RecordModel } from "pocketbase";
import { Avatar } from "../../atoms/Avatar";
import { useApp, User } from "../../../context/AppContext";
import { Button } from "../../atoms/Button";

interface IProp {
  setLoggedInUser: (value: User) => void;
}

export const Sidebar: FC<IProp> = ({ setLoggedInUser }) => {
  const [friends, setFriends] = useState<RecordModel[]>([]);

  const { loggedInUser, setSelectedFriend } = useApp();

  const getData = useCallback(async () => {
    const { items } = await getAllUsers(loggedInUser.id);
    setFriends(items);
    setSelectedFriend({ id: items[0].id, username: items[0].username });
  }, [loggedInUser.id, setSelectedFriend]);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleLogout = () => {
    setLoggedInUser({ id: "", username: "" });
    logout();
  };

  return (
    <aside className="aside">
      <div className="friends">
        {friends?.map((friend) => (
          <button
            className="friend"
            onClick={() =>
              setSelectedFriend({ id: friend.id, username: friend.username })
            }
            key={friend.id}
          >
            <Avatar username={friend.username} />
          </button>
        ))}
      </div>
      <Button label="Logout" buttonType="logout" onClick={handleLogout} />
    </aside>
  );
};
