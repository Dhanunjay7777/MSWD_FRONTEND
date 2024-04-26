import React, { Component } from 'react';
import { callApi, errorResponse,getSession,callApiFileUpload } from './main';
import './Places.css';

export function uploadAdhar(){
  var FU = document.getElementById('FU');

  var url = "http://localhost:5000/uploadadhar";
  var data = new FormData();
  data.append("aname", getSession("sid"));
  data.append("myfile", FU.files[0]);
  callApiFileUpload("POST", url, data, uploadSuccess, errorResponse);
}
export function uploadSuccess(res)
{
    var data = JSON.parse(res);
    alert(data);
}
class Amsterdam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showOrderCard: false,
    };
    this.Tripregister = this.Tripregister.bind(this);
    this.dismissOrderCard = this.dismissOrderCard.bind(this);
  }

  Tripregister(event) {
    event.preventDefault();

    const RT1 = document.getElementById('RT1');
    const RT2 = document.getElementById('RT2');
    const RT3 = document.getElementById('RT3');
    const RT4 = document.getElementById('RT4');
    const RT5 = document.getElementById('RT5');
    const RT6 = document.getElementById('check-male');
    const RT7 = document.getElementById('RT7');
    const RT8 = document.getElementById('RT8');
    const RT9 = document.getElementById('RT9');
    const RT10 = document.getElementById('RT10');
    const RT11 = document.getElementById('RT11');
    const RT12=document.getElementById('RT12');
    const RT13=document.getElementById('RT13');

    // Validation
    const inputs = [RT3, RT4, RT5, RT6, RT7, RT8, RT9,RT10,RT11,RT12,RT13];
    for (let input of inputs) {
      if (input.value === '') {
        input.style.border = '1px solid Blue';
        input.focus();
        return;
      }
    }

    const url = 'http://localhost:5000/Tripregistration/submit';
    const data = JSON.stringify({
      DestinationCountry: RT1.value,
      DestinationPlace: RT2.value,
      FullName: RT3.value,
      PhoneNumber: RT4.value,
      BirthDate: RT5.value,
      Gender: RT6.checked ? 'Male' : 'Female',
      Address: RT7.value,
      Country: RT8.value,
      City: RT9.value,
      Residency: RT10.value,
      RoomType: RT11.value,
      emailid:RT12.value,
      nvisitors:RT13.value,
    });

    callApi('POST', url, data, this.TripregisteredSuccess, errorResponse);

    // Clear input fields after submission
    for (let input of inputs) {
      input.value = '';
    }

    this.setState({ showOrderCard: true });
  }

  TripregisteredSuccess(res) {
    // You can handle success response here if needed
  }

  dismissOrderCard() {
    this.setState({ showOrderCard: false });
  }
  
  render() {
    return (
      <div className='full-height'>
        {!this.state.showOrderCard && (
          <section className="containerplace">
            <header>Trip Registration Form</header>
            <form className="form" onSubmit={this.Tripregister}>
              <div className="column">
                <div className="input-box">
                  <label>Destination Country</label>
                  <input required="" placeholder="Enter destination country" type="text" id="RT1" defaultValue="Netherland" disabled />
                </div>
                <div className="input-box">
                  <label>Destination Place</label>
                  <input required="" placeholder="Enter destination place" type="text" id="RT2" defaultValue="Amsterdam" disabled />
                </div>
              </div>
              <div className="input-box">
                <label>Full Name*</label>
                <input required="" placeholder="Enter full name" type="text" id="RT3" />
              </div>
              <div className="column">
              <div className="input-box">
                <label>Email id*</label>
                <input required="" placeholder="Enter Email id" type="text" id="RT12" />
              </div>
              <div className="input-box">
                <label>No of Visitors*</label>
                <input required="" placeholder="Enter No of visitors" type="number" id="RT13" />
              </div>
              </div>
              <div className="column">
                <div className="input-box">
                  <label>Phone Number*</label>
                  <input required="" placeholder="Enter phone number" type="tel" id="RT4" />
                </div>
                <div className="input-box">
                  <label>Birth Date*</label>
                  <input required="" placeholder="Enter birth date" type="date" id="RT5" />
                </div>
              </div>
              <div className="gender-box">
                <label>Gender*</label>
                <div className="gender-option">
                  <div className="gender">
                    <input name="gender" id="check-male" type="radio" />
                    <label htmlFor="check-male">Male</label>
                  </div>
                  <div className="gender">
                    <input name="gender" id="check-female" type="radio" />
                    <label htmlFor="check-female">Female</label>
                  </div>
                  <div className="gender">
                    <input name="gender" id="check-other" type="radio" />
                    <label htmlFor="check-other">Prefer not to say</label>
                  </div>
                </div>
              </div>
              <div className="column">
              <div className="input-box">
    <label for="residency">Residency*</label>
    <select required id="RT10" name="residency">
      <option value="" disabled selected>Select Your Residency</option>
      <option value="Sharm El Sheikh">Sharm El Sheikh</option>
      <option value="Alexandria">Alexandria</option>
      <option value="Luxor ">Luxor </option>
      
      </select>
  </div>
  <div className="input-box">
    <label for="roomType">Room Type*</label>
    <select required id="RT11" name="roomType">
      <option value="" disabled selected>Select Room Type</option>
      <option value="Standard Room">Standard Rooom</option>
      <option value="Executive Room">Executive Room</option>
      <option value="Family Room">Family Room</option>
    
    </select>
  </div>
</div>

              <div className="input-box address">
                <label>Address*</label>
                <input required="" placeholder="Enter street address" type="text" id="RT7" />
              </div>
              <div className="column">
                <div className="input-box">
                  <label>Country*</label>
                  <input required="" placeholder="Enter country" type="text" id="RT8" />
                </div>
                <div className="input-box">
                  <label>City*</label>
                  <input required="" placeholder="Enter city" type="text" id="RT9" />
                </div>
              </div>
              <div className="uploadcontainer">
                <br></br>
                <label htmlFor="arquivo">Upload Adhar:</label>
                <input accept=".pdf" className="inpdddut"  id="FU" type="file" onChange={uploadAdhar} />
              </div>
              <button type="submit">Submit</button>
            </form>
          </section>
        )}
        {this.state.showOrderCard && (
          <div className="ordercard">
            <div className="orderheader">
              <div className="div_image_v">
                <div className="image">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 7L9.00004 18L3.99994 13"></path>
                  </svg>
                </div>
              </div>
              <div className="ordercontent">
                <button className="dismiss" type="button" onClick={this.dismissOrderCard}>X</button>
                <span className="ordertitle">Order validated</span>
                <p className="ordermessage">Thank you for your purchase. Your Trip Confirmation details you will recieve Soon</p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Amsterdam;

