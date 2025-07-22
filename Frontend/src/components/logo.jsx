import assets  from '../assets/asset.js';
import logo from '../assets/Logo1.png';
import React from 'react';

const Logo = () => {
    return (
        <div className="logo-container">
            <img src={logo} alt={logo} height={50} width={50} />
        </div>
    );
}

export default Logo;