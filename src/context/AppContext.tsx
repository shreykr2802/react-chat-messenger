import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

export type User = {
  id: string;
  username: string;
};

interface IProp {
  loggedInUser: User;
}

interface IAppContext {
  loggedInUser: User;
  selectedFriend: User;
  setSelectedFriend: (value: User) => void;
}

const AppContext = createContext<IAppContext>(undefined!);

export const AppProvider: FC<PropsWithChildren<IProp>> = ({
  children,
  loggedInUser,
}) => {
  const [selectedFriend, setSelectedFriend] = useState<User>({
    id: "",
    username: "",
  });
  return (
    <AppContext.Provider
      value={{
        loggedInUser,
        selectedFriend,
        setSelectedFriend,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
