import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const sample = require("../assets/COI.json");

const SearchLegal = () => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (e) => {
    const query = e.target.value;
    if(query != ""){
     const filteredData = sample[0].filter((item) =>
      item.Name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredData);
    }
    console.log("results", searchResults);
  };
  return (
    <>
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
            placeholder="Search Articles!!"
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
    </>
  );
};

export default SearchLegal;
