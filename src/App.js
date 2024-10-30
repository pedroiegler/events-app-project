import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Events from "./components/Events";
import EventDetails from "./components/EventDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Events />} />
        <Route path="/event/:id" element={<EventDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
