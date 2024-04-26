import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Places extends Component {
  logout() {
    window.location.replace("/");
  }

  render() {
    return (
      <div className='full-height'>       
        <div className="card3-content3">
          <Link to="/Egypt">
          <div className="card3">
            <div className="card3 video">
              <video
                autoPlay
                loop
                muted
                style={{ width: '100%', height: '100%', objectFit: 'cover', zIndex: -1 }}
              >
                <source src="https://static.videezy.com/system/resources/previews/000/034/805/original/Travel-motion-egypt.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
          </Link>
        </div>     
        <div className="card5-content5">
  <Link to="/India">
    <div className="card5">
      <div className="card5 video">
    <video
                autoPlay
                loop
                muted
                style={{ width: '100%', height: '100%', objectFit: 'cover', zIndex: -1 }}
              >
                <source src="    https://static.videezy.com/system/resources/previews/000/039/487/original/India-Flag-Loop.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
    </div>
    </div>
  </Link>
     </div>
        {/* <div className="card4-content4">
          <Link to="/Japan">
          <div className="card4">
            <div className="card4 video">
              <video
                autoPlay
                loop
                muted
                style={{ width: '100%', height: '100%', objectFit: 'cover', zIndex: -1 }}
              >
                <source src="https://static.videezy.com/system/resources/previews/000/044/815/original/Comp_1_4.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
          </Link>
        </div> */}

        <div className="card1-content1">
        <Link to="/Netherland">
          <div className="card1">
            <div className="card1 video">
              <video
                autoPlay
                loop
                muted
                style={{ width: '100%', height: '100%', objectFit: 'cover', zIndex: -1 }}
              >
                <source src="https://static.videezy.com/system/resources/previews/000/034/808/original/travel_Natherland.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
          </Link>
        </div>

        
      </div>
    );
  }
}

export default Places;
