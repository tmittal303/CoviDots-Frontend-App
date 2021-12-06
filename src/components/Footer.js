import React from 'react';
import "../css/App.css";
import facebookIcon from '../images/FacebookIcon.png';
import instagramIcon from '../images/InstagramIcon.png';
import twitterIcon from '../images/TwitterIcon.png';

const Header = () => {
    return (
        <footer>
            <p>@ Copyright 2021</p>
            <h4>STAY IN TOUCH:</h4>
            <img src={facebookIcon} alt="Facebook icon"/>
            <img src={instagramIcon} alt="Instagram icon"/>
            <img src={twitterIcon} alt="Twitter icon"/>
        </footer>
    )
}

export default Header