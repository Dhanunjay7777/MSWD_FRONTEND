import React, { useState, useEffect } from 'react';
import { getSession } from './main';

const Security = () => {
  const [tripData, setTripData] = useState([]); // Initialize state with an empty array
  const emailid = getSession("sid"); // Get the emailid from the session

  useEffect(() => {
    fetchlogindata();
  }, []);

  const fetchlogindata = () => {
    const url = 'http://localhost:5000/senduser';

    fetch(url)
     .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
     .then(data => {
        setTripData(data);
      })
     .catch(error => {
        console.error('Error fetching trip registration data:', error);
      });
  };

  const filteredTrips = tripData.filter(trip => trip.emailid === emailid); // Filter trips based on emailid

  return (
    <div>
      <table className="trip-table">
        <thead>
          <tr>
            <th>User Mail</th>
            <th>Login time</th>
          </tr>
        </thead>
        <tbody>
          {filteredTrips.map((trip, index) => (
            <tr key={index}>
              <td>{trip.emailid}</td>
              <td>{trip.loginTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Security;