import React from 'react';
import assets from '../assets/assets';

const Logo = ({ theme, className = '' }) => {
    return (
        <img
            src={theme === 'dark' ? assets.logo_dark : assets.logo}
            className={`h-10 sm:h-14 w-auto scale-125 sm:scale-[1.7] origin-left ${className}`}
            alt="Abhinav Dasari"
        />
    );
};

export default Logo;
