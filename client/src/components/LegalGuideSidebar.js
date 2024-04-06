import React, { useContext } from "react";
import { AuthData } from "../services/AuthService";
// import "../styles/ProfileSidebar.css";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import routes from "../routes/Routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import "../styles/LegalGuideSidebar.css";
const sample = require("../assets/COI.json");

function LegalGuideSidebar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showRights, setShowRights] = useState(false);
  const [showCitizen, setShowCitizen] = useState(false);
  const [showUnion, setShowUnion] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const { showSidebar } = AuthData();
  const { user } = AuthData();
  if (showSidebar !== true) return null;

  const handleDropdown = () => {
    if (showDropdown) {
      setShowDropdown(false);
    } else {
      setShowDropdown(true);
    }
  };

  const handleDropRights = () => {
    if (showRights) {
      setShowRights(false);
    } else {
      setShowRights(true);
    }
  };

  const handleCitizen = () => {
    if (showCitizen) {
      setShowCitizen(false);
    } else {
      setShowCitizen(true);
    }
  };

  const handleUnion = () => {
    if (showUnion) {
      setShowUnion(false);
    } else {
      setShowUnion(true);
    }
  };

  return (
    <div className="side-bar-parent">
      {/* <div className= "side-bar open"> */}

      <>
      <NavLink to = "/dashboard" style ={{textDecoration: "none", color : "white"}}> <div className="profile-dashboard-heading">
          <span className="prominent_letter">T</span>hemesis{" "}
          <span className="prominent_letter">G</span>uardian
        </div>
        </NavLink> 
        <ul className="sideBarContainer">

        <NavLink
            to="/guide"
            className={({ isActive }) => {
              {
                setIsActive(true);
              }
              return isActive ? "articleActiv" : "articleInactiv";
            }}
            style={{ textDecoration: "none" }}
            onClick={() => {
              localStorage.setItem("Index", 0);
            }}
          >
            <div
              className={
                window.location.pathname === "/guide"
                  ? "articleActv"
                  : "listIt"
              }
            >
              Legal Guide
            </div>
          </NavLink>
         


          <NavLink
            to="/guide/article/0"
            className={({ isActive }) => {
              {
                setIsActive(true);
              }
              return isActive ? "articleActiv" : "articleInactiv";
            }}
            style={{ textDecoration: "none" }}
            onClick={() => {
              localStorage.setItem("Index", 0);
            }}
          >
            <div
              className={
                window.location.pathname === "/guide/article/0"
                  ? "articleActv"
                  : "listItem"
              }
            >
              Preamble
            </div>
          </NavLink>

          <div className="article listItem" style={{ cursor: "pointer" }}>
            <span onClick={handleDropdown}>Articles</span>
            {showDropdown == true ? (
              <div className="dropdown-cntnt">
                {sample[0].map((article, index) => (
                  <NavLink
                    to={`/guide/article/${index}`}
                    className="linkdrop"
                    onClick={() => {
                      localStorage.setItem("Index", index);
                    }}
                  >
                    <div
                      className={
                        window.location.pathname === `/guide/article/${index}`
                          ? "dropdownItem articleActiv"
                          : "dropdownItem listItem"
                      }
                    >
                      Article {sample[0][index].ArtNo}
                    </div>
                  </NavLink>
                ))}
              </div>
            ) : (
              <></>
            )}
          </div>

          <div className="rights listItem" style={{ cursor: "pointer" }}>
            <span onClick={handleDropRights}>Fundamental Rights</span>

            {showRights == true ? (
              <div className="dropdown-content">
                {sample[1][2].Articles.map((index) => (
                  <NavLink
                    to={`/guide/article/${index}`}
                    className="linkdrop"
                    onClick={() => {
                      localStorage.setItem("Index", index);
                    }}
                  >
                    <div
                      className={
                        window.location.pathname === `/guide/article/${index}`
                          ? "dropdownItem articleActiv"
                          : "dropdownItem listItem"
                      }
                    >
                      Article {sample[0][index].ArtNo}
                    </div>
                  </NavLink>
                ))}
              </div>
            ) : (
              <></>
            )}
          </div>

          <div className="citizenship listItem" style={{ cursor: "pointer" }}>
            <span onClick={handleCitizen}>Citizenship</span>

            {showCitizen == true ? (
              <div className="dropdown-content">
                {sample[1][1].Articles.map((index) => (
                  <NavLink
                    to={`/guide/article/${index}`}
                    className="linkdrop"
                    onClick={() => {
                      localStorage.setItem("Index", index);
                    }}
                  >
                    <div
                      className={
                        window.location.pathname === `/guide/article/${index}`
                          ? "dropdownItem articleActiv"
                          : "dropdownItem listItem"
                      }
                    >
                      Article {sample[0][index].ArtNo}
                    </div>
                  </NavLink>
                ))}
              </div>
            ) : (
              <></>
            )}
          </div>

          <div className="union listItem" style={{ cursor: "pointer" }}>
            <span onClick={handleUnion}>The Union And Its Territory</span>

            {showUnion == true ? (
              <div className="dropdown-content">
                {sample[1][0].Articles.map((index) => (
                  <NavLink
                    to={`/guide/article/${index}`}
                    className="linkdrop"
                    onClick={() => {
                      localStorage.setItem("Index", index);
                    }}
                  >
                    <div
                      className={
                        window.location.pathname === `/guide/article/${index}`
                          ? "dropdownItem articleActiv"
                          : "dropdownItem listItem"
                      }
                    >
                      Article {sample[0][index].ArtNo}
                    </div>
                  </NavLink>
                ))}
              </div>
            ) : (
              <></>
            )}
          </div>
        </ul>
        {user.isAuthenticated && (
          <div className="side-bar-logout">
            <NavLink to="/logout" className="side-bar-logout">
              <button className="side-bar-buttons">
                <span className="side-bar-icon">
                  <FontAwesomeIcon icon={faArrowRightFromBracket} />
                </span>
                Logout
              </button>
            </NavLink>
          </div>
        )}
      </>
    </div>
    // </div>
  );
}

export default LegalGuideSidebar;
