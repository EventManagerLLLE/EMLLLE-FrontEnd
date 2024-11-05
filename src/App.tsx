import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import CreateUser from "./components/CreateUser/CreateUser";
import EventList from "./components/EventList/EventList";
import CreateEvent from "./components/CreateEvent/CreateEvent";
import LoginUser from "./components/LoginUser/LoginUser";
import Home from "./components/Home/Home";
import CreateOrganization from "./components/CreateOrganization/CreateOrganization";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/register" element={<CreateUser />} />
          <Route path="/login" element={<LoginUser />} />
          <Route path="/events" element={<EventList />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/create-organization" element={<CreateOrganization />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
