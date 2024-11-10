import React from "react";
import { Link } from "react-router-dom";
import Menu from "./Menu";
import '../css/Navbar.css';

export default function Navbar() {
  return (
    <div className="Navbar">
      <Link to="/" className="logo-link">
        <span className="logo-text">Live Events</span>
      </Link>
      <Menu />
    </div>
  );
}
