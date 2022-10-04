// Libraries/Packages
import { Routes, Route } from "react-router-dom";

// Components
import Layout from "./components/Layout";
import Login from "./components/Login";
import PublicChannels from "./components/PublicChannels";
import PrivateChannels from "./components/PrivateChannels";
import PrivateMapping from "./components/PrivateMapping";
import PublicMapping from "./components/PublicMapping";
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

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<div>Under Construction. 🚧</div>} />
          <Route path="public" element={<PublicChannels />} />
          <Route path="private" element={<PrivateChannels />} />
          <Route path="publicmap" element={<PublicMapping />} />
          <Route path="privatemap" element={<PrivateMapping />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
