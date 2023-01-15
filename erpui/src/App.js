import "./App.scss";
import SideBar from "./components/SideBar/SideBar";
import ErpProvider from "./components/store/ErpProvider";

function App() {
  return (
    <ErpProvider>
      <SideBar />;
    </ErpProvider>
  );
}

export default App;
