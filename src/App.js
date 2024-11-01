import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Events from "./components/Events";
import EventDetails from "./components/EventDetails";
import Chat from "./components/Chat/index";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Events />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/chat/:eventId" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;
