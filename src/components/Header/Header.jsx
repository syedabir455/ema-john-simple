import React from 'react';
import './Header.css';
import logo from '../../images/Logo.svg'

const Header = () => {
    return (
        <nav className='header'>
            <img src={logo} alt="" />
            {/* a*4[href=$]{$} */}
            <div>
                <a href="/order">order</a>
                <a href="review">review</a>
                <a href="manage">manage</a>
                <a href="login">login</a>
            </div>
        </nav>
    );
};

export default Header;