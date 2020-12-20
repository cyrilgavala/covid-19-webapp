import React from "react";
import logo from "../images/header-logo.png";

function Header() {

    return (
        <div id="app-header">
            <img id="app-header-logo" src={logo} alt={"Header logo"}/> Covid-19 visualization examples
        </div>
    )
}

export default Header;