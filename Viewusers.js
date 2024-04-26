import React, { useState, useEffect } from 'react';
import './Tourists.css';

const Viewusers = () => {
    const [viewuserData, setViewuserData] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        fetchViewuserData();
    }, []);

    const fetchViewuserData = () => {
        const url = 'http://localhost:5000/userregistration/submit';

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setViewuserData(data);
                // Set profile picture
                if (data[0] && data[0].imgurl) {
                    const IM1 = document.getElementById('IM1');
                    IM1.src = require('./images/photo/' + data[0].imgurl);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    const handlePrint = () => {
        window.print();
    };

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    };
    const handleDelete = (email) => {
        const url = `http://localhost:5000/userregistration/delete/${email}`;

        fetch(url, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Fetch the updated user data after deletion
            fetchViewuserData();
        })
        .catch(error => {
            console.error('Error deleting data:', error);
        });
    };


    const filteredUsers = viewuserData.filter(user =>
        user.firstname.toLowerCase().includes(searchValue.toLowerCase())
    );

    // Function to convert user data to CSV format
    const convertToCSV = (data) => {
        const header = Object.keys(data[0]).join(',');
        const rows = data.map(user => Object.values(user).join(',')).join('\n');
        return header + '\n' + rows;
    };

    // Function to download CSV file
    const downloadCSV = () => {
        const csvData = convertToCSV(filteredUsers);
        const blob = new Blob([csvData], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'users.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div>
            <h2 style={{ textAlign: 'center', color: 'blue', textDecoration: 'underline' }}>Users Data</h2>

            <div className="button10-container">
                <button1 onClick={handlePrint} className="custom-button10">🖨️Print</button1>
                <br></br>
                <br></br>
                <button1 style={{ textAlign: 'center', color: 'green', marginRight: '-58px', cursor: 'pointer' }} onClick={downloadCSV}>⬇️Download CSV</button1>

            </div>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="🔍Search by First Name"
                    value={searchValue}
                    onChange={handleSearchChange}
                    style={{
                        width: '155px',
                        height: '25px',
                        padding: '1px',
                        fontSize: '14px',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        marginLeft: '70px',
                        marginTop: '1px',
                        // Aligning to the right side
                    }}

                />
            </div>
            
            <table className="trip-table">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Contact Number</th>
                        <th>Email Id</th>
                        <th>Profile</th>
                        <th>Action</th>
                        <th>TRIP</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
    {filteredUsers.map((viewuser, index) => (
        <tr key={index}>
            <td>{viewuser.firstname}</td>
            <td>{viewuser.lastname}</td>
            <td>{viewuser.contactno}</td>
            <td>{viewuser.emailid}</td>
            <td>
                {viewuser.imgurl && (
                    <div className="user-picture">
                        <img src={require('./images/photo/' + viewuser.imgurl)} alt="Profile" className='imgstyle' />
                    </div>
                )}
            </td>
            <td>
                {viewuser.adharurl && (
                           <a href={require('./images/adhar/' + viewuser.adharurl)} download>
                           Download
                           </a>
                            )}
                         </td>  
                         <td>
                {viewuser.videourl && (
                           <a href={require('./images/video/' + viewuser.videourl)} download>
                           Download
                           </a>
                            )}
                         </td>           
                         <td>
                                <button onClick={() => handleDelete(viewuser.emailid)}>Delete</button>
                            </td>

        </tr>
    ))}
</tbody>

            </table>
        </div>
    );
};

export default Viewusers;
