import React, { useState, useEffect } from "react";
import "./App.css"; 
import Nav from './Nav';
import Fil from './Fil';
import Card from "./Card";

function App() {
  const [dark, setDark] = useState("light"); 
  const [countriesData, setCountriesData] = useState([]); 
  const [region, setRegion] = useState("All"); 
  const [query, setQuery] = useState('');

  // Toggle dark mode
  const DarkMode = () => {
    setDark((prevDark) => {
      const newMode = prevDark === "light" ? "dark" : "light";
      document.body.classList.toggle("dark-mode", newMode === "dark");
      return newMode;
    });
  };

  // Fetch countries data
  const fetchData = async () => {
    const url = "https://restcountries.com/v3.1/all";
    try {
      let data = await fetch(url);
      let parsedData = await data.json();
      setCountriesData(parsedData); 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(); 
  }, []); 

  // Filter countries based on the selected region
  const filteredCountries = countriesData.filter((country) => {
    if (region === "All") return true; 
    return country.region === region; 
  });

  // Further filter based on search query
  const countriesToDisplay = filteredCountries.filter((country) => 
    country.name.common.toLowerCase().includes(query)
  );

  return (
    <div className={`card1${dark} bg-${dark}`}>
      <Nav
        icn={dark === "light" ? "🌞" : "🌜"}
        color={dark}
        name={dark} 
        DarkMode={DarkMode} 
      />
      <div className={`Search-bar-${dark} bg-${dark}`} style={{ position: "relative", height: '70px', top: "0px", display: "flex", flexDirection: 'row' }}>
        <input  
          onChange={(e) => setQuery(e.target.value.toLowerCase())} 
          style={{ position: "relative", left: "50px", top: "20px", height: '30px' }} 
          type='text' 
          placeholder='Search...' 
        />
      </div>
      <Fil setRegion={setRegion} /> {/* Pass setRegion to Fil */}
      {countriesToDisplay.length === 0 ? (
        <p>Loading countries data...</p>
      ) : (
        <div className="card-container" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
          {countriesToDisplay.map((country) => (
            <Card
              color={dark}
              key={country.cca2} 
              name={country.name.common} 
              capital={country.capital ? country.capital[0] : "N/A"} 
              flag={country.flags.svg} 
              languages={country.languages ? Object.values(country.languages).join(', ') : "N/A"} 
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
