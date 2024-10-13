import "./App.css";
import { Header } from "./components/molecules/Header";
import { Layout } from "./components/molecules/Layout";
import { Sidebar } from "./components/molecules/Sidebar";
import { AppProvider } from "./context/AppContext";

function App() {
  return (
    <AppProvider>
      <div className="app">
        <Sidebar />
        <Header />
        <Layout />
      </div>
    </AppProvider>
  );
}

export default App;
