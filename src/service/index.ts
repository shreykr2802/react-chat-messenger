import PocketBase from "pocketbase";

const pocketBaseUrl = import.meta.env.VITE_REACT_POCKETBASE_URL;
const pb = new PocketBase(pocketBaseUrl);

export const getAllUsers = async (loggedInUser: string) => {
  return pb.collection("users").getList(1, 10, {
    filter: `username != "${loggedInUser}"`,
  });
};

export const getAllMessagesBetweenFriends = async (
  loggedInUser: string,
  friendUser: string
) => {
  return pb.collection("messages").getFullList({
    filter: `((from_user.username = "${loggedInUser}" && to_user.username =  "${friendUser}") || (from_user.username = "${friendUser}" && to_user.username =  "${loggedInUser}"))`,
    sort: "created",
    expand: "from_user, to_user",
  });
};
