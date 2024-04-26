import React, { useState, useEffect } from 'react';
import './Tourists.css';

const Tourists = () => {
    const [tripData, setTripData] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [searchCriteria, setSearchCriteria] = useState('FullName');

    useEffect(() => {
        fetchTripData();
    }, []);

    const fetchTripData = () => {
        const url = 'http://localhost:5000/tripregistration/submit';

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

    const handlePrint = () => {
        window.print();
    };

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleSearchCriteriaChange = (e) => {
        setSearchCriteria(e.target.value);
    };

    const filteredTrips = tripData.filter(trip => {
        if (searchCriteria === 'FullName') {
            return trip.FullName.toLowerCase().includes(searchValue.toLowerCase());
        } else if (searchCriteria === 'DestinationPlace') {
            return trip.DestinationPlace.toLowerCase().includes(searchValue.toLowerCase());
        } else if (searchCriteria === 'DestinationCountry') {
            return trip.DestinationCountry.toLowerCase().includes(searchValue.toLowerCase());
        }
        return false;
    });

    const downloadCsv = () => {
        const csvContent = "data:text/csv;charset=utf-8," +
            Object.keys(filteredTrips[0]).map(key => key.toUpperCase()).join(",") + "\n" +
            filteredTrips.map(trip => Object.values(trip).join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "trip_data.csv");
        document.body.appendChild(link);
        link.click();
    };

    return (
        <div>
            <h2 style={{ textAlign: 'center', color: 'blue', textDecoration: 'underline' }}>Trip Registered Data</h2>
            <div className="button10-container">
                <button1 onClick={handlePrint} className="custom-button10">🖨️Print</button1>
                <br></br>
                <br></br>
                <button1 style={{ textAlign: 'center', color: 'green',marginRight: '-58px',cursor:'pointer' }} onClick={downloadCsv}>⬇️Download CSV</button1>
            </div>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="🔍Search..."
                    value={searchValue}
                    onChange={handleSearchChange}
                    style={{
                        width: '155px',height: '25px', padding: '1px', fontSize: '14px', border: '1px solid #ccc', borderRadius: '5px', marginLeft: '70px',
                        marginTop:'1px'
                    }}
                />
                <select value={searchCriteria} onChange={handleSearchCriteriaChange}>
                    <option value="FullName">Full Name</option>
                    <option value="DestinationPlace">Destination Place</option>
                    <option value="DestinationCountry">Destination Country</option>
                </select>
            </div>
            <table className="trip-table">
                <thead>
                    <tr>
                        <th>Destination Country</th>
                        <th>Destination Place</th>
                        <th>Full Name</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                        <th>No.of Tourists</th>
                        <th>Birth Date</th>
                        <th>Gender</th>
                        <th>Address</th>
                        <th>Country</th>
                        <th>City</th>
                        <th>Residency</th>
                        <th>Room Type</th>
                        {/* <th>Proof</th> */}
                    </tr>
                </thead>
                <tbody>
                    {filteredTrips.map((trip, index) => (
                        <tr key={index}>
                            <td>{trip.DestinationCountry}</td>
                            <td>{trip.DestinationPlace}</td>
                            <td>{trip.FullName}</td>
                            <td>{trip.PhoneNumber}</td>
                            <td>{trip.emailid}</td>
                            <td>{trip.nvisitors}</td>
                            <td>{trip.BirthDate}</td>
                            <td>{trip.Gender}</td>
                            <td>{trip.Address}</td>
                            <td>{trip.Country}</td>
                            <td>{trip.City}</td>
                            <td>{trip.Residency}</td>
                            <td>{trip.RoomType}</td>
                            {/* <td>
                            {trip.adharurl && (
                           <a href={require('./images/adhar/' + trip.adharurl)} download>
                           Download
                           </a>
                            )}
                         </td> */}


                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Tourists;
