import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Netherland extends Component {
  render() {
    return (
      <div className='full-height'>       
        <div className="card15-content15">
          <Link to="/Amsterdam">
          <div className="card15">
          Amssterdam
          </div>
          </Link>
        </div>

        <div className="card16-content16">
          <Link to="/TheHague">
          <div className="card16">
          The Hague
          </div>
          </Link>
        </div>

        <div className="card17-content17">
        <Link to="/Rotterdam">
          <div className="card17">
         Rotterdam
          </div>
          </Link>
        </div>

        <div className="card18-content18">
          <Link to="/Delft">
          <div className="card18">
          Delft
          </div>
          </Link>
        </div>
      </div>
    );
  }
}

export default Netherland;
