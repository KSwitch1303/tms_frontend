import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [locations] = useState(['Main St', '2nd Ave', '3rd Blvd', '4th St', '5th Ave', '6th Rd']);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    if (selectedLocation) {
      const fetchRecommendations = async () => {
        try {
          const response = await axios.get(`https://tms-backend-tuqu.onrender.com/recommendations/${selectedLocation}`);
          setRecommendations(response.data);
        } catch (error) {
          console.error('Error fetching recommendations:', error);
        }
      };

      fetchRecommendations();
    }
  }, [selectedLocation]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Traffic Management Recommendations</h1>
        <div>
          <label htmlFor="location">Select Location: </label>
          <select id="location" onChange={(e) => setSelectedLocation(e.target.value)}>
            <option value="">--Select a Location--</option>
            {locations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
        <ul>
          {recommendations.map((rec, index) => (
            <li key={index}>
              <p><strong>Location:</strong> {selectedLocation}</p>
              <p><strong>Result:</strong> {rec.result}</p>
              <p><strong>Action:</strong> {rec.action}</p>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
