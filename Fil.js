import React from 'react';

export default function Fil({ setRegion }) {
  const handleRegionClick = (region) => {
    setRegion(region); // Update the region in the App component
  };

  return (
    <div>
      <div className="dropdown" style={{position:"relative",left:"800px",bottom:'50px'}}>
        <button className="btn btn-secondary dropdown-toggle" style={{backgroundColor:"white",color:"black"}} type="button" data-bs-toggle="dropdown" aria-expanded="false">
          Filter by region
        </button>
        <ul className="dropdown-menu">
          <li><button className="dropdown-item" onClick={() => handleRegionClick("All")}>All</button></li>
          <li><button className="dropdown-item" onClick={() => handleRegionClick("Africa")}>Africa</button></li>
          <li><button className="dropdown-item" onClick={() => handleRegionClick("Asia")}>Asia</button></li>
          <li><button className="dropdown-item" onClick={() => handleRegionClick("Europe")}>Europe</button></li>
          <li><button className="dropdown-item" onClick={() => handleRegionClick("Americas")}>Americas</button></li>
          <li><button className="dropdown-item" onClick={() => handleRegionClick("Oceania")}>Oceania</button></li>
        </ul>
      </div>
    </div>
  );
}
