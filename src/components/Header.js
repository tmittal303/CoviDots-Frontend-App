import {React, useContext} from 'react';
import "../css/App.css";
import logo from '../images/Logo.png';
import coviDotsContext from '../context/coviDotsContext';
import {Link} from "react-router-dom";
    

const Header = () => {

    const { headerButtonText, headerButtonLink } = useContext(coviDotsContext)
    return (
        <header>
             <a href="/">
            <img src={logo} alt="CoviDots Logo"/>
            </a>
            <Link to= {"" + headerButtonLink + ""}>
            <button className="headerSigninBtn">{headerButtonText}</button>
            </Link>
        </header>
    )
}

export default Header
