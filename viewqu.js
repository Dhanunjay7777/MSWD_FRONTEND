import React, { useState, useEffect } from 'react';
import './Tourists.css';

const Viewcontact = () => {
    const [viewcontactData, setViewcontactData] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        fetchViewcontactData();
    }, []);

    const fetchViewcontactData = () => {
        const url = 'http://localhost:5000/viewcontact';

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setViewcontactData(data);
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
        // Construct the URL for deletion using the email
        const url = `http://localhost:5000/contactus/delete/${email}`;

        fetch(url, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Fetch the updated contact data after deletion
            fetchViewcontactData();
        })
        .catch(error => {
            console.error('Error deleting data:', error);
        });
    };

    const filteredContacts = viewcontactData.filter(contact =>
        contact.FirstName.toLowerCase().includes(searchValue.toLowerCase())
    );

    const convertToCSV = (data) => {
        const header = Object.keys(data[0]).join(',');
        const rows = data.map(contact => Object.values(contact).join(',')).join('\n');
        return header + '\n' + rows;
    };

    const downloadCSV = () => {
        const csvData = convertToCSV(filteredContacts);
        const blob = new Blob([csvData], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'contacts.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div>
            <h2 style={{ textAlign: 'center', color: 'blue', textDecoration: 'underline' }}>Contacts Data</h2>

            <div className="button10-container">
                <button1 onClick={handlePrint} className="custom-button10">🖨️ Print</button1>
                <br/><br/>
                <button1 style={{ textAlign: 'center', color: 'green', marginRight: '-58px', cursor:'pointer' }} onClick={downloadCSV}>⬇️ Download CSV</button1>
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
                        marginTop:'1px',
                    }}
                />
            </div>

            <table className="trip-table">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Contact Number</th>
                        <th>Message</th>
                        <th>Action</th> {/* Added delete column */}
                    </tr>
                </thead>
                <tbody>
                    {filteredContacts.map((contact, index) => (
                        <tr key={index}>
                            <td>{contact.FirstName}</td>
                            <td>{contact.LastName}</td>
                            <td>{contact.Email}</td>
                            <td>{contact.ContactNumber}</td>
                            <td>{contact.Message}</td>
                            <td>
                                <button onClick={() => handleDelete(contact.Email)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Viewcontact;
