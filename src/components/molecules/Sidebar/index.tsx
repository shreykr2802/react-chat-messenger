import { useCallback, useEffect, useState } from "react";
import "./index.scss";
import { getAllUsers } from "../../../service";
import { ListResult, RecordModel } from "pocketbase";
import { Avatar } from "../../atoms/Avatar";
import { useApp } from "../../../context/AppContext";

export const Sidebar = () => {
  const [friends, setFriends] = useState<ListResult<RecordModel>>();

  const { loggedInUser, setSelectedFriend } = useApp();

  const getData = useCallback(async () => {
    setFriends(await getAllUsers(loggedInUser));
  }, [loggedInUser]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <aside className="aside">
      {friends?.items.map((friend) => (
        <button
          className="friend"
          onClick={() => setSelectedFriend(friend.username)}
          key={friend.id}
        >
          <Avatar username={friend.username} />
        </button>
      ))}
    </aside>
  );
};
