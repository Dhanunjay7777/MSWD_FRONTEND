import React, { Component } from 'react';
import './about.css';
import profileImage from '../src/images/adminbg.jpg';

class Aboutus extends Component {
  render() {
    return (
      <html lang="en">
          <div className="Aboutusmain-nav">
            <ul className="Aboutusnav">
              <li className="Aboutusname">DHANUNJAY</li>
              <li><a href="/">🏠Home</a></li>
              <li><a href="/">Experience</a></li>
            </ul>
          </div>

          <div className='Aboutusheader'>
          <img src={profileImage} alt="Profile" className="profile-image" />
            <h1 className="tag name">Hello, I’m Dhanunjay.😊</h1>
            <p className="tag location">My home🏠 is India,Kl University </p>
          </div>

          <main className="Aboutusflex">
            <div className="Aboutuscard">
              <h2>Background</h2>
              <p>I’m an aspiring web developer who loves everything about the web. I've lived in lots of different places and have worked in lots of different jobs. I’m excited to bring my life experience to the process of building fantastic looking websites.</p>
              <p>I'm a life-long learner who's always interested in expanding my skills.</p>
            </div>

            <div className="Aboutuscard">
              <h2>Goals</h2>
              <p>I want to master the process of building web sites and increase my knowledge, skills and abilities in:</p>
              <ul className="skills">
                <li>HTML</li>
                <li>CSS</li>
                <li>JavaScript</li>
                <li>ExpressJS</li>
                <li>ReactJS</li>
              </ul>
              <p>I’d like to work for a web development firm helping clients create an impressive online presence.</p>
            </div>
            <div className="Aboutuscard1">
            <h2>Social</h2>
              <p>I want to master the process of building web sites and increase my knowledge, skills and abilities in:</p>
              <ul className="skills">
  <a href="https://www.linkedin.com/in/puttagunta-dhanunjay-48241626a/">📞Linkedin</a>
  <br></br>
  <br></br>
  <a href="https://github.com/Dhanunjay7777">☎️GitHub</a>
  <br></br>
  <br></br>
  <a href="https://leetcode.com/klu_2200030719/">🌐LeetCode</a>
</ul>

            </div>
            
          </main>        
      </html>
    );
  }
}

export default Aboutus;
