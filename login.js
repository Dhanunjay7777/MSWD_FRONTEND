// Import necessary dependencies and components
import React, { useState } from 'react';
import logo from './images/logo.png';
import './index.css'
import { callApi, errorResponse, setSession ,getSession} from './main';

// Styles for various components
const popupwindowstyle = { width: '300px', height: '450px', background: 'white' };
const registerwindowstyle = { width: '270px', height: '480px', background: 'white' };
const forgotwindowstyle = { width: '300px', height: '450px', background: 'white' };
const logostyle = { width: '75px', height: '75px', position: 'absolute', left: '115px', top: '10px' };
const logodivstyle = { height: '100px' };
const space = { height: '10px' };

function Login() {
    const [showLoginPopup, setShowLoginPopup] = useState(true);
    const [captchaChallenge, setCaptchaChallenge] = useState(generateCaptcha());
    const [captchaInput, setCaptchaInput] = useState('');

    function generateCaptcha() {
        // Generate a random string containing only numbers for captcha challenge
        const captchaLength = 6;
        let captcha = '';
        for (let i = 0; i < captchaLength; i++) {
            captcha += Math.floor(Math.random() * 10); // Random number between 0 and 9
        }
        return captcha;
    }
    function handleCaptchaClick() {
        // Generate a new captcha challenge when the captcha container is clicked
        setCaptchaChallenge(generateCaptcha());
        // Clear the input field
        setCaptchaInput('');
    }

    function toggleLoginPopup() {
        // Close other popups if they are open
        var reg = document.getElementById('registration');
        var forgot = document.getElementById('forgotPassword');
        if (reg.style.display === 'block') {
            reg.style.display = 'none';
        }
        if (forgot.style.display === 'block') {
            forgot.style.display = 'none';
        }
        // Toggle the login popup
        setShowLoginPopup(prevState => !prevState);
        
    }
    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            validate();
        }
    }
    
    function handleAdminLogin() {
        window.location.replace('/admin'); // Redirect to the admin login page
    }

    function validate() {
        var T1 = document.getElementById('T1');
        var T2 = document.getElementById('T2');

        if (captchaInput !== captchaChallenge) {
            alert('Captcha entered is wrong. Please try again.');
            setCaptchaInput('');
            setCaptchaChallenge(generateCaptcha());
            return;
        }

        var url = 'http://localhost:5000/login/signin';
        var data = JSON.stringify({
            emailid: T1.value,
            pwd: T2.value,
        });
        callApi('POST', url, data, loginSuccess, errorResponse);
    }
 function loginSuccess(res) {
  var data = JSON.parse(res);
  if (data === 1) {
    var T1 = document.getElementById('T1');
    setSession('sid', T1.value, 24 * 60);

    // Get the current login time
    var loginTime = new Date().toISOString();

    // Get the email ID from cookies
    var emailid = getSession('sid');

    // Send the data to the "send" database
    var url = 'http://localhost:5000/send';
    var dataToSend = JSON.stringify({
      emailid: emailid,
      loginTime: loginTime, // Initialize end time as empty, will be updated on logout
    });
    callApi('POST', url, dataToSend, () => {
      console.log('Data sent to send database');
    }, errorResponse);

    window.location.replace('/home');
  } else {
    alert('Invalid Credentials!');
  }
}

    function registration() {
        var T1 = document.getElementById('T1');
        var T2 = document.getElementById('T2');
        T1.value = '';
        T2.value = '';

        var reg = document.getElementById('registration');
        var login = document.getElementById('login');
        login.style.display = 'none';
        reg.style.display = 'block';
        setShowLoginPopup(true);
    }

function register() {
    var RT1 = document.getElementById('RT1');
    var RT2 = document.getElementById('RT2');
    var RT3 = document.getElementById('RT3');
    var RT4 = document.getElementById('RT4');
    var RT5 = document.getElementById('RT5');
    var RT6 = document.getElementById('RT6');
    RT1.style.border = '';
    RT2.style.border = '';
    RT3.style.border = '';
    RT4.style.border = '';
    RT5.style.border = '';
    RT6.style.border = '';
    if (RT1.value === '') {
        RT1.style.border = '1px solid red';
        RT1.focus();
        return;
    }
    if (RT2.value === '') {
        RT2.style.border = '1px solid red';
        RT2.focus();
        return;
    }
    if (RT3.value === '') {
        RT3.style.border = '1px solid red';
        RT3.focus();
        return;
    }
    if (RT4.value === '') {
        RT4.style.border = '1px solid red';
        RT4.focus();
        return;
    }
    if (RT5.value === '') {
        RT5.style.border = '1px solid red';
        RT5.focus();
        return;
    }
    if (RT6.value === '') {
        RT6.style.border = '1px solid red';
        RT6.focus();
        return;
    }
    if (RT5.value !== RT6.value) {
        alert('Password and Re-type Password must be the same');
        RT5.style.border = '1px solid red';
        RT5.focus();
        return;
    }

    var url = 'http://localhost:5000/registration/signup';
    var data = JSON.stringify({
        firstname: RT1.value,
        lastname: RT2.value,
        contactno: RT3.value,
        emailid: RT4.value,
        pwd: RT5.value,
        imgurl:""
    });

    // Call API to check if email already exists
    callApi('POST', 'http://localhost:5000/check-email', JSON.stringify({ email: RT4.value }), function(response) {
        var responseData = JSON.parse(response);
        if (responseData.exists) {
            alert('Email already exists. Please use a different email address.');
        } else {
            // Proceed with registration if email doesn't exist
            callApi('POST', url, data, registeredSuccess, errorResponse);
        }
    }, errorResponse);

    RT1.value = '';
    RT2.value = '';
    RT3.value = '';
    RT4.value = '';
    RT5.value = '';
    RT6.value = '';

    var login = document.getElementById('login');
    var registration = document.getElementById('registration');
    registration.style.display = 'none';
    login.style.display = 'block';
}

  


    function registeredSuccess(res) {
        var data = JSON.parse(res);
        alert(data);
    }

    function Forgotpassword() {
        var login = document.getElementById('login');
        var forgot = document.getElementById('forgotPassword');
        login.style.display = 'none';
        forgot.style.display = 'block';
    }

    function resetPassword() {
        var forgotEmail = document.getElementById('forgotEmail').value;
        var newPassword = document.getElementById('newPassword').value;

        if (!forgotEmail || !newPassword) {
            alert('Please enter your email and new password.');
            return;
        }

        var url = 'http://localhost:5000/forgot-password';
        var data = JSON.stringify({
            email: forgotEmail,
            newPassword: newPassword,
        });

        callApi('POST', url, data, resetPasswordSuccess, errorResponse);
    }

    function resetPasswordSuccess(res) {
        var data = JSON.parse(res);
        alert(data.message);
        if (data.message === 'Password updated successfully.') {
            setForgotPasswordMode(false);
        }
    }
    

    function setForgotPasswordMode(mode) {
        var login = document.getElementById('login');
        var forgot = document.getElementById('forgotPassword');
        login.style.display = mode ? 'none' : 'block';
        forgot.style.display = mode ? 'block' : 'none';
    }

    function handleContactUsClick() {
        // Replace window.location.replace with the URL you want to redirect to
        window.location.replace('/contact'); // Redirect to another page
        // Or, you can display a popup here
        // Example:
        // alert("Contact us popup would be displayed here");
        // Or, you can toggle a state to show/hide a popup component
    }
    function handleAboutus() {
        window.location.replace('/About');
    }
    
    return (
        <div className='full-height'>
            {/* Header with "KL University", "Login", "About us", and "Contact us" */}
            <div className='loginheader'>
                <div className="kl-university-loginheader" style={{ float: 'left', marginLeft: '4px', marginTop: '1px' }}>
                  TOURISM AND HOSPITALITY
                </div>
                
                <div className='loginheader-links'>
                    <span onClick={toggleLoginPopup}>🔒Login</span>
                    {/* <span>About us</span> */}
                     <span onClick={handleAdminLogin}>⚙️Admin</span>
                    <span onClick={handleContactUsClick}>☎️Contact us</span>
                    <span onClick={handleAboutus}>About us</span>
                </div>
            </div>
            {/* <h10 style={{color:'Green', fontSize:'24px', fontWeight:'bold', textAlign:'center',marginTop:'300px',marginLeft:'-300px'}}>TOURISM AND HOSPITALITY</h10> */}
            <div id='content' className='logincontent'>
                <div id='login' className='popup' style={{ display: showLoginPopup ? 'block' : 'none' }}>
                    <div id='popupwindow' className='popupwindow' style={popupwindowstyle}>
                        <div className='loginstyle1'>Login</div>
                        <div className='loginstyle2'>
                            <div style={logodivstyle}>
                                <img src={logo} alt='' style={logostyle} />
                            </div>
                            <div>Username*</div>
                            <div>
                                <input type='text' id='T1' className='txtbox' />
                            </div>
                            <div style={space}></div>
                            <div>Password*</div>
                            <div>
                            <input type='password' id='T2' className='txtbox' onKeyPress={handleKeyPress} />
                            </div>
                            <div style={space}></div>
                            {/* <div style={space}></div> */}
                            <div className='captcha'>
                                <input type='text' value={captchaInput} onChange={e => setCaptchaInput(e.target.value)} placeholder='Enter captcha' onKeyPress={handleKeyPress} />
                                <span onClick={handleCaptchaClick} style={{ cursor: 'pointer' }}>{captchaChallenge}</span>
                            </div>
                            <div>
                                <button className='btn' onClick={validate}>
                                    Sign In
                                </button>
                            </div>
                            <div style={space}></div>
                            <div style={space}></div>
                            <div style={space}></div>
               
                            <div>
                                New user?{' '}
                                <label className='linklabel' onClick={registration}>
                                    Register here
                                </label>
                            </div>
                            <br></br>
                            <div>
                                Forgot Password?{' '}
                                <label className='linklabel' onClick={Forgotpassword}>
                                    Reset here
                                </label>
                            </div>

                        </div>
                    </div>
                </div>
                
                <div id='registration' className='register'>
                    <div id='registrationwindow' className='registerwindow' style={registerwindowstyle}>
                        <div className='registerstyle1'>New Registration</div>
                        <div className='registerstyle2'>
                            <div>First Name*</div>
                            <div>
                                <input type='text' id='RT1' className='txtbox' />
                            </div>
                            <div style={space}></div>
                            <div>Last Name*</div>
                            <div>
                                <input type='text' id='RT2' className='txtbox' />
                            </div>
                            <div style={space}></div>
                            <div>Contact Number*</div>
                            <div>
                                <input type='text' id='RT3' className='txtbox' />
                            </div>
                            <div style={space}></div>
                            <div>Email ID*</div>
                            <div>
                                <input type='text' id='RT4' className='txtbox' />
                            </div>
                            <div style={space}></div>
                            <div>Password*</div>
                            <div>
                                <input type='password' id='RT5' className='txtbox' />
                            </div>
                            <div style={space}></div>
                            <div>Re-type Password*</div>
                            <div>
                                <input type='password' id='RT6' className='txtbox' />
                            </div>
                            <div style={space}></div>
                            
                            <div>
                                <button className='btn' onClick={register}>
                                    Register
                                </button>
                                <div>
            
                              <br />
                             Already have an account?{' '}
                          <span style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={toggleLoginPopup}>
                          Login
                          </span>
                          </div>

                                
                             
                        </div>
                        </div>
                    </div>
                </div>
                <div id='forgotPassword' className='forgot' style={{ display: 'none' }}>
                    <div id='forgotPasswordWindow' className='forgotwindow' style={forgotwindowstyle}>
                        <div className='forgotstyle1'>Forgot Password</div>
                        <div className='forgotstyle2'>
                            <div>Enter your email address:</div>
                            <div>
                                <input type='text' id='forgotEmail' className='txtbox' />
                            </div>
                            <div style={space}></div>
                            <div>New Password:</div>
                            <div>
                                <input type='password' id='newPassword' className='txtbox' />
                            </div>
                            <div style={space}></div>
                            <div>
                                <button className='btn' onClick={resetPassword}>
                                    Reset Password
                                </button>
                            </div>
                            <div style={space}></div>
                            <div>
                                <button className='btn' onClick={() => setForgotPasswordMode(false)}>
                                    Go Back
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id='footer' className='loginfooter'>
                Copyright @ Tourism and Hospitality. All rights reserved.
            </div>
        </div>
    );
}

export default Login;
