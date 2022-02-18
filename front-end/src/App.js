import logo from "./logo.svg";
import "./Styles/App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import UploadProduct from "./Pages/UploadProduct";

import NavBar from "./component/NavBar";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Homepage />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/signup" element={<Signup />}></Route>
          <Route exact path="/upload" element={<UploadProduct />}></Route>
        </Routes>

        <NavBar />
      </div>
    </Router>
  );
}

export default App;
