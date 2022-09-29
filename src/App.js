// Libraries/Packages
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

// Components
import Layout from "./components/Layout";
import Login from "./components/Login";
import PublicChannels from "./components/PublicChannels";

function App() {
  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route path="public" element={<PublicChannels />} />
          </Route>
        </Routes>
      </Provider>
    </>
  );
}

export default App;
