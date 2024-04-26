import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class India extends Component {
  
  render() {
    return (
      <div className='full-height'>       
        <div className="card19-content19">
          
          <Link to="/IndiaGate">
          <div className="card19">
          India Gate 
          </div>
          </Link>
        </div>

        <div className="card20-content20">
          <Link to="/Mysore">
          <div className="card20">
            Mysore Palace
          </div>
          </Link>
        </div>

        <div className="card21-content21">
        <Link to="/Manali">
          <div className="card21">
          Manali
          </div>
          </Link>
        </div>

        <div className="card22-content22">
          <Link to="/Udaipur">
          <div className="card22">
           
          Udaipur
          </div>
          </Link>
        </div>
      </div>
    );
  }
}


export default India;
