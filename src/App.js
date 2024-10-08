// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register"; // 필요에 따라 추가
import Login from "./components/Login";
import Sketchbook from "./components/Sketchbook";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/sketchbook" element={isLoggedIn ? <Sketchbook /> : <Login onLogin={handleLogin} />} />
      </Routes>
    </Router>
  );
}

export default App;
