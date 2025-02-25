import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import QRScanner from "./pages/Scanner";
import Stream from "./pages/Stream";
import PWAInstallPrompt from "./pages/PWAInstallPrompt";

import "./App.css";
const App = () => {
  return (
    <BrowserRouter>
      <PWAInstallPrompt />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/scanner" element={<QRScanner />}></Route>
        <Route path="/stream" element={<Stream />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
