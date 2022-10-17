import React from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "./pages/auth/Signup";
import Signin from "./pages/auth/Signin";
import Home from "./pages/Home";
import "../src/App.css";
import Chat from "./pages/Chat";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/chat/:id" element={<Chat />} />
      </Routes>
    </div>
  );
};

export default App;
