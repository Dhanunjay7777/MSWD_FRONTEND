// Import necessary dependencies and components
import React, { useState } from 'react';
import logo from './images/logo1.png';
import './admin.css';
import { callApi, errorResponse, setSession } from './main';

// Styles for various components
const popupwindowstyle = { width: '300px', height: '450px', background: 'white' };
const logostyle = { width: '75px', height: '75px', position: 'absolute', left: '115px', top: '10px' };
const logodivstyle = { height: '100px' };
const space = { height: '10px' };

function Admin() {
    const [showLoginPopup] = useState(true);

    function validate() {
        var T1 = document.getElementById('T1');
        var T2 = document.getElementById('T2');

        var url = 'http://localhost:5000/admin/signin';
        var data = JSON.stringify({
            adminid: T1.value,
            adminpwd: T2.value,
        });
        callApi('POST', url, data, adminSuccess, errorResponse);
    }
    function handleUserLogin() {
        window.location.replace('/'); // Redirect to user login page
    }
    function adminSuccess(res) {
        var data = JSON.parse(res);
        if (data === 1) {
            var T1 = document.getElementById('T1');
            setSession('sid', T1.value, 24 * 60);
            window.location.replace('/adminhome');
        } else alert('Invalid Credentials!');
    }
    return (
        <div className='full-height'>
            {/* Header with "KL University", "Login", "About us", and "Contact us" */}
            <div className='adminheader'>
                <div className="kl-university-adminheader" style={{ float: 'left', marginLeft: '4px', marginTop: '1px' }}>
                    TOURISM AND HOSPITALITY
                </div>
                <div className='adminheader-links'>
                    {/* Add "User" element with onClick event handler */}
                    <span onClick={handleUserLogin}>👨🏻‍💻User</span>
                </div>
            </div>
            <div id='content' className='admincontent'>
                <div id='login' className='adminpopup' style={{ display: showLoginPopup ? 'block' : 'none' }}>
                    <div id='popupwindow' className='adminwindow' style={popupwindowstyle}>
                        <div className='adminstyle1'>Admin Login</div>
                        <div className='adminstyle2'>
                            <div style={logodivstyle}>
                                <img src={logo} alt='' style={logostyle} />
                            </div>
                            <div>Username*</div>
                            <div>
                                <input type='text' id='T1' className='admintxtbox' />
                            </div>
                            <div style={space}></div>
                            <div>Password*</div>
                            <div>
                                <input type='password' id='T2' className='admintxtbox' />
                            </div>
                            <div style={space}></div>
                            <div style={space}></div>
                            <div>
                                <button className='adminbtn' onClick={validate}>
                                    Sign In
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                </div>
            <div id='footer' className='adminfooter'>
                Copyright @ KL University. All rights reserved.
            </div>
        </div>
    );
}

export default Admin;
