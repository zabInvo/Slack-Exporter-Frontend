// Libraries/Packages
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

// Components
import Layout from "./components/Layout";
import Login from "./components/Login";
import PublicChannels from "./components/channels/PublicChannels";
import PrivateChannels from "./components/channels/PrivateChannels";
import PrivateMapping from "./components/mappings/PrivateMapping";
import PublicMapping from "./components/mappings/PublicMapping";

function App() {
  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route
              path="dashboard"
              element={<div>Under Construction. 🚧</div>}
            />
            <Route path="public" element={<PublicChannels />} />
            <Route path="private" element={<PrivateChannels />} />
            <Route path="publicmap" element={<PublicMapping />} />
            <Route path="privatemap" element={<PrivateMapping />} />
          </Route>
        </Routes>
      </Provider>
    </>
  );
}

export default App;
