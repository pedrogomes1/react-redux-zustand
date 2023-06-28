// import { Provider as ReduxProvider } from "react-redux";
// import { store } from "./store";
import { Player } from "./pages/Player";
import "./styles/global.css";

function App() {
  return (
    //Zustand does not need the provider
    // <ReduxProvider store={store}>
    <Player />
    // </ReduxProvider>
  );
}

export default App;
