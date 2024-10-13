import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

interface IAppContext {
  loggedInUser: string;
  selectedFriend: string;
  setSelectedFriend: (value: string) => void;
}

const AppContext = createContext<IAppContext>(undefined!);

export const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  const [selectedFriend, setSelectedFriend] = useState<string>("");
  return (
    <AppContext.Provider
      value={{
        loggedInUser: "test1",
        selectedFriend,
        setSelectedFriend,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
