// Libraries/Packages 
import { Routes, Route } from "react-router-dom";

// Components
import Layout from "./components/Layout";
import Login from "./components/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/" element={<Layout />}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
