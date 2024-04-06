import React, { useState } from 'react';
import "../../styles/pastcases.css";
function FilterBar() {
  const [year, setYear] = useState('');
  const [caseTypes, setCaseTypes] = useState({
    criminal: false,
    civil: false,
    whiteCollar: false,
	Homicide: false,
	Assault: false,
	Robbery: false,
	Burglary : false,
	Larceny:false,




  });
  const [cases, setCases] = useState([]);

  
 // const apiUrl = 'https://your-api-endpoint.com/cases';

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch(apiUrl);
//       const data = await response.json();
//       setCases(data);
//     };

//     fetchData();
//   }, []);
  const [courts, setCourts] = useState({
    supreme: false,
    high: false,
    district: false,

  });
  const [article, setArticle] = useState('');

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleCaseTypeChange = (event) => {
    setCaseTypes({
      ...caseTypes,
      [event.target.name]: event.target.checked,
    });
  };

  const handleCourtChange = (event) => {
    setCourts({
      ...courts,
      [event.target.name]: event.target.checked,
    });
  };

  const handleArticleChange = (event) => {
    setArticle(event.target.value);
  };
  
//   const filteredCases = cases.filter((caseData) => {
//     const yearMatch = year ? caseData.year === year : true;
//     const caseTypeMatch = Object.values(caseTypes).some((type) => caseData.type === type);
//     const courtMatch = Object.values(courts).some((court) => caseData.court === court);
//     const articleMatch = article ? caseData.title.toLowerCase().includes(article.toLowerCase()) : true;
//     return yearMatch && caseTypeMatch && courtMatch && articleMatch;
//   });

  const handleSubmit = (event) => {
    event.preventDefault();
      console.log(
      `Year: ${year}, Case Types: ${JSON.stringify(caseTypes)}, Courts: ${JSON.stringify(courts)}, Article: ${article}`
    );
  };

  return (
	
	<div className='container'>
    <div className="filter-bar">
      <form onSubmit={handleSubmit}>
        <div className="filter-group">
          <label htmlFor="year"><h4>Year:</h4></label>
		  <br/>
          <select id="year" value={year} onChange={handleYearChange}>
            <option value="">Select Year</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
			<option value="2020">2020</option>
			<option value="2019">2019</option>
			<option value="2018">2018</option>
			<option value="2017">2017</option>
			<option value="2016">2016</option>
			<option value="2015">2015</option>
          </select>
        </div>
        <div className="filter-group">
          <h4>Case Type:</h4>
          <label>
            <input
              type="checkbox"
              name="criminal"
              checked={caseTypes.criminal}
              onChange={handleCaseTypeChange}
            />
            Criminal Cases
          </label>
          <label>
            <input
              type="checkbox"
              name="civil"
              checked={caseTypes.civil}
              onChange={handleCaseTypeChange}
            />
            Civil Cases
          </label>
          <label>
            <input
              type="checkbox"
              name="whiteCollar"
              checked={caseTypes.whiteCollar}
              onChange={handleCaseTypeChange}
            />
            White Collar Cases
          </label>
		  <label>
            <input
              type="checkbox"
              name="Homicide"
              checked={caseTypes.Homicide}
              onChange={handleCaseTypeChange}
            />
            Homicide cases
          </label>
		  <label>
            <input
              type="checkbox"
              name="Assault"
              checked={caseTypes.Assault}
              onChange={handleCaseTypeChange}
            />
            Assault
          </label>
		  <label>
            <input
              type="checkbox"
              name="Robbery"
              checked={caseTypes.Robbery}
              onChange={handleCaseTypeChange}
            />
            Robbery

          </label>
		  <label>
            <input
              type="checkbox"
              name="Burglary"
              checked={caseTypes.Burglary}
              onChange={handleCaseTypeChange}
            />
            Burglary
          </label>
		  <label>
            <input
              type="checkbox"
              name="Larency"
              checked={caseTypes.Larceny}
              onChange={handleCaseTypeChange}
            />
            Larceny
          </label>
        </div>
        <div className="filter-group">
          <h4>Court:</h4>
          <label>
            <input
              type="checkbox"
              name="supreme"
              checked={courts.supreme}
              onChange={handleCourtChange}
            />
            Supreme Court
          </label>
          <label>
            <input
              type="checkbox"
              name="high"
              checked={courts.high}
              onChange={handleCourtChange}
            />
            High Court
          </label>
          <label>
            <input
              type="checkbox"
              name="district"
              checked={courts.district}
              onChange={handleCourtChange}
            />
            District Court
          </label>
        </div>
        <div className="filter-group" id ="articlee">
          <label htmlFor="article"><h4>Article No. :</h4></label>
          <input
            type="text"
            id="article"
            value={article}
            onChange={handleArticleChange}
			style={{ width: '150px', height: '20px'  , color: 'white'  }} 
          />
        </div>
	
        <button  className='submit-button' type="submit">Apply Filters</button>
		
      </form>
    </div>
	<div className="search-bar">
        <input type="text" placeholder="Search for related past cases" style={{ width: '450px', height: '20px'  , color: 'white'  }}  />
        <button type="button"><i className="fas fa-search"></i></button>
		
      </div>
	</div>
	
	
  );
}

export default FilterBar;
