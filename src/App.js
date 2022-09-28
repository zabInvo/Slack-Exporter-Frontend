// Libraries/Packages
import { Routes, Route } from "react-router-dom";

// Components
import Login from "./components/Login";
import SignUp from "./components/Signup";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
