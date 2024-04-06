import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import { AuthData } from "../services/AuthService";
import "../styles/Sidebar.css";
function Navbar() {
  const [profileSec, setProfileSec] = useState(false);
  const { showSidebar, toggleSidebar } = AuthData();
  const { user } = AuthData();
  return (
    <div className="Navbar">
      <div className={showSidebar ? "top-nav" : "top-nav"}>
        <div className="title">
          <span
            className={showSidebar ? `hide-element` : `menu-toggle-icon`}
            onClick={toggleSidebar}
          >
            <FontAwesomeIcon icon={faBars} />
          </span>
          <span
            className={showSidebar ? `menu-toggle-icon` : `hide-element`}
            onClick={toggleSidebar}
          >
            <FontAwesomeIcon icon={faX} />
          </span>
          {/* <span className="initial login-txt">T</span> */}
          <span className="login-txt">justice</span>
          <span className="initial login-txt">C</span>
          <span className="login-txt">ompanion</span>
        </div>
        {user.isAuthenticated && (
              <Link to="/me" className="nav-link links">
                  <div className="profileHolder" style ={{borderRadius: "50%", height: "2.3rem", width : "2.3rem", margin : "auto"}}>
                    <img style ={{height: "100%", width : "100%", borderRadius: "50%", overflow:"hidden"}}
        src = {JSON.parse(user.user).image === "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" ? JSON.parse(user.user).image : `${process.env.REACT_APP_SERVER}/uploads/${JSON.parse(user.user).image}`}
        />
                  </div>
              </Link>
        )}
        {!user.isAuthenticated && (
          <div className="nav-but">
            <button className="nav-btn">
              <Link to="/login" className="nav-link links">
                Login
              </Link>
            </button>
            <button className="nav-btn">
              <Link to="/sign-up" className="nav-link links">
                Sign Up
              </Link>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
