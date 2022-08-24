import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
function NavBar() {
  return (
    <div>
      <nav className="navbar">
        <div className="divFor">
          <Link to="/rating"><p className="link" id="idForDate">date </p></Link>
       
          <Link to="/rating"><p className="link" id="idForRating">Rating</p></Link>
          </div>
                  <img id="logoRight" src={require("./logoHilAyabasha.png")} alt="logo" />

        <img id="logoLeft" src={require("./logoHatal.png")} alt="logo" />
      </nav>
    </div>
  );
}

export default NavBar;
