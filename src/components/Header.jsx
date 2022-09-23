import React from 'react'
import mainLogo from "../logo.png";

function Header(props) {
    const logo = <img src={mainLogo} className="logo" alt="logo" />
    return (
        <div className="header">
            {logo}
            <h1>Notekeeper</h1>
        </div>
    )
}

export default Header;
