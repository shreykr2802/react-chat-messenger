import { useState } from "react";
import "./App.css";
import { Header } from "./components/molecules/Header";
import { Layout } from "./components/molecules/Layout";
import { Sidebar } from "./components/molecules/Sidebar";
import { AppProvider, User } from "./context/AppContext";
import { Login } from "./components/molecules/Login";

function App() {
  const [loggedInUser, setLoggedInUser] = useState<User>({
    id: "",
    username: "",
  });

  return (
    <AppProvider loggedInUser={loggedInUser}>
      <div className="app">
        <Header />
        {loggedInUser.id ? (
          <>
            <Sidebar setLoggedInUser={setLoggedInUser} />
            <Layout />
          </>
        ) : (
          <Login setLoggedInUser={setLoggedInUser} />
        )}
      </div>
    </AppProvider>
  );
}

export default App;
