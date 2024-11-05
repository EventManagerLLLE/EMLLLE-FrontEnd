import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">EMLLLE Events</div>
        <div className="space-x-4">
          <Link to="/" className="text-gray-300 hover:text-white">
            Hem
          </Link>
          <Link to="/create-event" className="text-gray-300 hover:text-white">
            Skapa event
          </Link>
          <Link
            to="/create-organization"
            className="text-gray-300 hover:text-white"
          >
            Skapa organisation
          </Link>
          <Link to="/register" className="text-gray-300 hover:text-white">
            Registrera
          </Link>
          <Link to="/login" className="text-gray-300 hover:text-white">
            Logga in
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
