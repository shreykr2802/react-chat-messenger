import PocketBase from "pocketbase";

const pocketBaseUrl = import.meta.env.VITE_REACT_POCKETBASE_URL;
const pb = new PocketBase(pocketBaseUrl);

export const authUserWithPassword = async (
  username: string,
  password: string
) => {
  return await pb.collection("users").authWithPassword(username, password);
};

export const logout = () => {
  pb.authStore.clear();
};

export const getAllUsers = async (loggedInUser: string) => {
  return pb.collection("users").getList(1, 10, {
    filter: `id != "${loggedInUser}"`,
  });
};

export const getAllMessagesBetweenFriends = async (
  loggedInUser: string,
  friendUser: string
) => {
  return pb.collection("messages").getFullList({
    filter: `((from_user.id = "${loggedInUser}" && to_user.id =  "${friendUser}") 
    || (from_user.id = "${friendUser}" && to_user.id =  "${loggedInUser}"))`,
    sort: "created",
    expand: "from_user, to_user",
  });
};

export const saveMessageBetweenFriends = async (
  loggedInUser: string,
  friendUser: string,
  text: string
) => {
  const data = {
    from_user: loggedInUser,
    to_user: friendUser,
    text,
  };

  await pb.collection("messages").create(data);
};
