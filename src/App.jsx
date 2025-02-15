import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TicketSelection from "./pages/TicketSelection";
import ProfileUpload from "./pages/ProfileUpload";
import TicketGeneration from "./pages/TicketGeneration";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TicketSelection />} />
        <Route path="/profile" element={<ProfileUpload />} />
        <Route path="/ticket" element={<TicketGeneration />} />
      </Routes>
    </Router>
  );
}

export default App;
