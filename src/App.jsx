import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUp";
import ConfirmPage from "./pages/Confirm";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignUpPage />} />
        <Route path="confirm/" element={<ConfirmPage />} />
      </Routes>
    </div>
  );
}

export default App;
