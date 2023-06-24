import Login from "./Components/login";
import { Route, Routes } from "react-router-dom";
import Profile from "./Components/profile";
import "./Components/style.css";
import { useState } from "react";

const App = () => {
  const [id, setId] = useState("");
  const [details, setDetails] = useState({});
  // console.log(id);
  return (
    <div id="container">
      <Routes>
        <Route path="/" element={<Login setId={setId} setDetail={setDetails} />} />
        {/* {console.log(details)} */}
        <Route path="/profile" element={<Profile id={id} />} />
      </Routes>
    </div>
  );
};
export default App;
