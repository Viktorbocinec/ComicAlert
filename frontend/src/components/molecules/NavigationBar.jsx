import React, { useContext } from 'react';
import TimeContext from './TimeContext';
import TransparentLogo from '../../assets/white-cat-transparent.png';
import { Link } from 'react-router-dom';
import '../../General.css';
import formatDate from './FormDate';
import LoginPopUp from './LoginPopUp';
import LogoutButton from './LogoutButton';
import '../../fonts/fonts.css'

const NavigationBar = ({showRegisterButton, showLoginButton, showLogoutButton}) => {
  const currentTime = useContext(TimeContext);
  const username = localStorage.getItem("username");

  return (
    <div className="navbar" style={{ fontFamily: 'CustomFont' }}>
      <div className="navbar-container">
        <div>
          <Link to="/">
            <img src={TransparentLogo} alt="Logo" className="logo" />
          </Link>
          <div>
            <span>{formatDate(currentTime)} {currentTime && currentTime.toLocaleTimeString()}</span>
          </div>
        </div>
        <div>
          <h1 className="company-name">ComicAlert</h1>
        </div>
        <div className="button-container">
            {!username && <div>{showLoginButton && (<div className="button"><LoginPopUp /></div>)}
            {showRegisterButton && (<div className="button"><Link to="/register"><button className="button">Register</button></Link></div>)}</div>}


            {showLogoutButton && username && (<div className="button"><LogoutButton /></div>)}
          </div>
      </div>
    </div>
  );
};

export default NavigationBar;