import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Egypt extends Component {
  render() {
    return (
      <div className='full-height'>       
        <div className="card11-content11">
          <Link to="/Cairo">
          <div className="card11">
         <div className='Para'> 
         Cairo is located in northeastern Egypt. It is primarily on the eastern shore of the Nile River, some 500 miles (800 km) downstream from the Aswan High Dam. Cairo is the gateway to the Nile delta, where the lower Nile separates into the Rosetta and Damietta branches.
         </div>
          </div>
          </Link>
        </div>

        <div className="card14-content14">
          <Link to="/Hurghada">
          <div className="card14">
           Hurghada
          </div>
          </Link>
        </div>

        <div className="card12-content12">
        <Link to="/Pyramid">
          <div className="card12">
          Pyramid
          </div>
          </Link>
        </div>

        <div className="card13-content13">
          <Link to="/Tphile">
          <div className="card13">
          TempleofPhilae
          </div>
          </Link>
        </div>
      </div>
    );
  }
}

export default Egypt;
