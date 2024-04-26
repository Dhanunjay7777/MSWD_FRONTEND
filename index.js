import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './login';
import Home from './home'
import { BrowserRouter, Routes, Route,useLocation } from 'react-router-dom';//useLocation also include
import SnakeGame from './SnakeGame';
import GuessTheNumber from './GuessTheNumber';
import Places from './Places';
import Egypt from './Egypt';
import Netherland from './Netherland';
import MyProfile from './myprofile';
import Changepwd from './changepwd';
import Tower from './TowerGame';
import ContactForm from './contact';
import India from './India';
import Cairo from './Cairo';
import Pyramid from './Pyramid';
import Tphile from './Tphile';
import Hurghada from './Hurghada';
import Amsterdam from './Amsterdam';
import Rotterdam from './Rotterdam';
import Delft from './Delft';
import Hague from './Hague';
import Indiagate from './Indiagate';
import Mysore from './Mysore';
import Manali from './Manali';
import Udaipur from './Udaipur';
import Admin from './admin';
import AdminHome from './adminhome';
import Tourists from './Tourists';
import Viewusers from './Viewusers';
import Viewqu from './viewqu';
import TodoList from './todo';
import Aboutus from './About';
import Photoboot from './Photoboot';
import Security from './Security';
function ChatWidget() {
  const location = useLocation();

  React.useEffect(() => {
    // Check if the current path is allowed for the chat widget
    const isChatWidgetAllowed = () => {
      const allowedRoutes = ['/', '/admin', '/home', '/adminhome', '/login', '/adminlogin'];
      return allowedRoutes.includes(location.pathname);
    };

    // Load the chat widget script if the current path is allowed
    if (isChatWidgetAllowed()) {
      (function (d, m) {
        var kommunicateSettings =
          {
            "appId":"32cf8d804efb194db36bf09abb194ecc5",
            "popupWidget": true,
            "automaticChatOpenOnNavigation": true
          };
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.async = true;
        s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
        var h = document.getElementsByTagName("head")[0];
        h.appendChild(s);
        window.kommunicate = m;
        m._globals = kommunicateSettings;
      })(document, window.kommunicate || {});
    }
  }, [location.pathname]);

  return null;
}

function Website() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/About" element={<Aboutus />} />

        <Route path="/home" element={<Home />} />
        <Route path="/SnakeGame" element={<SnakeGame />} />
        <Route path="/GuessTheNumber" element={<GuessTheNumber />} />
        <Route path="/TowerGame" element={<Tower />} />
        <Route path="/Places" element={<Places />} />
        <Route path="/India" element={<India />} />
        <Route path="/Indiagate" element={<Indiagate />} />
        <Route path="/Mysore" element={<Mysore />} />
        <Route path="/Manali" element={<Manali />} />
        <Route path="/Udaipur" element={<Udaipur />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/adminhome" element={<AdminHome />} />
        <Route path="/Viewusers" element={<Viewusers />} />
        <Route path="/viewqu" element={<Viewqu />} />


        <Route path="/Tourists" element={<Tourists />} />

        <Route path="/Egypt" element={<Egypt />} />
        <Route path="/Cairo" element={<Cairo />} />
        <Route path="/Pyramid" element={<Pyramid />} />
        <Route path="/Tphile" element={<Tphile />} />
        <Route path="/Hurghada" element={<Hurghada />} />
        <Route path="/Netherland" element={<Netherland />} />
        <Route path="/Amsterdam" element={<Amsterdam />} />
        <Route path="/Rotterdam" element={<Rotterdam />} />
        <Route path="/Delft" element={<Delft />} />
        <Route path="/Hague" element={<Hague />} />

        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/Changepwd" element={<Changepwd />} />
        <Route path="/todo" element={<TodoList />} />
        <Route path="/Photoboot" element={<Photoboot/>}/>
        <Route path="/Security" element={<Security/>}/>


      </Routes>
      <ChatWidget /> 
    </BrowserRouter>
  );
}

ReactDOM.render(<Website />, document.getElementById('root'));
