// Libraries/Packages
import { Routes, Route } from "react-router-dom";

// Components
import Layout from "./components/Layout";
import Login from "./components/Login";
import Dashboard from "./components/dashboard";
import PublicChannels from "./components/channels/PublicChannels";
import PrivateChannels from "./components/channels/PrivateChannels";
import PrivateMapping from "./components/mappings/PrivateMapping";
import PublicMapping from "./components/mappings/PublicMapping";
import { useEffect } from "react";
import { fetchAuthedData } from "./redux/actions/action";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();

  const user = useSelector((state) =>
    state.authReducers ? state.authReducers : {}
  );

  useEffect(() => {
    dispatch(fetchAuthedData());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        {user?.userData?.data?.user?.displayName ? (
          <Route path="/" element={<Layout user={user} />}>
            <Route path="dashboard" element={<Dashboard stats={``} />} />
            <Route path="public" element={<PublicChannels />} />
            <Route path="private" element={<PrivateChannels />} />
            <Route path="publicmap" element={<PublicMapping />} />
            <Route path="privatemap" element={<PrivateMapping />} />
            <Route path="general" element={<div>Under Construction. 🚧</div>} />
            <Route path="account" element={<div>Under Construction. 🚧</div>} />
            <Route
              path="prefrences"
              element={<div>Under Construction. 🚧</div>}
            />
          </Route>
        ) : (
          <Route path="*" element={<Login user={user} />}></Route>
        )}
      </Routes>
    </>
  );
}

export default App;
