import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LegalGuideSidebar from "../../components/LegalGuideSidebar";
import ProfileNavbar from "../../components/ProfileNavbar";
import ArticlesRender from "./ArticlesRender";
import SearchLegal from "../../components/SearchLegal";
import Navbar from "../../components/Navbar";
import "../../styles/LegalGuide.css";
import { filter } from "@chakra-ui/react";
const sample = require("../../assets/COI.json");

function LegalGuide() {
  const [searchResults, setSearchResults] = useState(sample[0]);
  const fields = ["Name","ArtNo", "ArtDesc", "Status"];

  const handleSearch = (e) => {
    const query = e.target.value;
    if (query != "") {
      let filteredData = sample[0].filter((item) =>
        item.Name.toLowerCase().includes(query.toLowerCase())
        || item.ArtNo.includes(query.toLowerCase())
        // || item.SubHeading ? item.Subheading.includes(query.toLowerCase()) : ""
        //  || item.Status ? console.log("idhar") : ""
      );



      setSearchResults(filteredData);
    }
    console.log("results", searchResults);
  };

  useEffect(() => {
    localStorage.setItem("Index", 0);
  }, []);

  return (
    <>
      <Navbar />
      <div
        style={{
          display: "flex",
          marginTop: "2.5rem",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <input
            type="search"
            id="site-search"
            name="q"
            placeholder="Search articles, e.g: right to freedom etc."
            style={{
              backgroundColor: "#595555d4",
              border: "none",
              borderRadius: "1rem",
              height: "2rem",
              width: "25rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1rem",
            }}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div
        className="searchContainer"
        style={{ padding: "2rem", paddingBottom: "10rem" }}
      >
        {searchResults.length > 0 ? (
          searchResults.map((result) => (
            <div
              style={{
                backgroundColor: "rgba(102, 101, 101, 0.5)",
                borderRadius: "1rem",
                padding: "1rem",
                marginBottom: "1.5rem",
              }}
            >
              <div style={{ display: "flex", marginBottom: "0.5rem" }}>
                <span
                  style={{
                    marginRight: "0.6rem",
                    color: "#c47741",
                    fontWeight: "bold",
                  }}
                >
                  Article No:{" "}
                </span>
                <div>{result.ArtNo}</div>
              </div>
              <div style={{ display: "flex", marginBottom: "0.5rem" }}>
                <span
                  style={{
                    marginRight: "0.6rem",
                    color: "#c47741",
                    fontWeight: "bold",
                  }}
                >
                  Name :{" "}
                </span>
                <div>{result.Name}</div>
              </div>
              {result.SubHeading ? (
                <div style={{ display: "flex", marginBottom: "0.5rem" }}>
                  <span
                    style={{
                      marginRight: "0.6rem",
                      color: "#c47741",
                      fontWeight: "bold",
                    }}
                  >
                    SubHeading:{" "}
                  </span>
                  <div>{result.SubHeading}</div>
                </div>
              ) : (
                <></>
              )}
              {result.ArtDesc ? (
                <div style={{ display: "flex", marginBottom: "0.5rem" }}>
                  <span
                    style={{
                      marginRight: "0.6rem",
                      color: "#c47741",
                      fontWeight: "bold",
                    }}
                  >
                    Description:{" "}
                  </span>
                  <div>{result.ArtDesc}</div>
                </div>
              ) : (
                <></>
              )}
              {result.Status ? (
                <div style={{ display: "flex", marginBottom: "0.5rem" }}>
                  <span
                    style={{
                      marginRight: "0.6rem",
                      color: "#c47741",
                      fontWeight: "bold",
                    }}
                  >
                    Status :{" "}
                  </span>
                  <div>{result.Status}</div>
                </div>
              ) : (
                <></>
              )}
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
export default LegalGuide;
