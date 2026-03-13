import React, { useState } from 'react'
import assets from '../assets/assets';
import ThemeToggleBtn from './ThemeToggleBtn';
import Logo from './Logo';

const Navbar = ({ theme, setTheme }) => {

    const [sidebarOpen, setSidebarOpen] = useState(false)
    return (
        <div className="flex justify-between items-center px-4
        sm:px-12 lg:px-24 xl:px-40 py-2 sticky top-0 z-20
        backdrop-blur-xl font-medium bg-white/50 dark:bg-gray-900/70">

            {/* Logo links to hero section */}
            <a href="#hero">
                <Logo theme={theme} />
            </a>

            <div className={`text-gray-700 dark:text-white sm:text-sm ${!sidebarOpen ?
                "max-sm:w-0 overflow-hidden" : "max-sm:w-full max-sm:pl-10"} max-sm:fixed top-0 bottom-0 right-0 max-sm:min-h-screen
            max-sm:h-full max-sm:flex-col max-sm:bg-primary max-sm:text-white
            max-sm:pt-20 flex sm:items-center gap-5 transition-all duration-300`}>

                <img src={assets.close_icon} alt="" className='absolute
                top-4 right-4 w-5 sm:hidden' onClick={() => setSidebarOpen(false)} />

                <a onClick={()=>setSidebarOpen(false)} href="#hero" className='sm:hover:border-b'>Home</a>
                <a onClick={()=>setSidebarOpen(false)} href="#about" className='sm:hover:border-b'>About</a>
                <a onClick={()=>setSidebarOpen(false)} href="#skills" className='sm:hover:border-b'>Skills</a>
                <a onClick={()=>setSidebarOpen(false)} href="#project" className='sm:hover:border-b'>Projects</a>
                <a onClick={()=>setSidebarOpen(false)} href="#cer" className='sm:hover:border-b'>Certificates</a>
                <a onClick={()=>setSidebarOpen(false)} href="#edu" className='sm:hover:border-b'>Education</a>
            </div>

            <div className='flex items-center gap-2 sm:gap-4'>
                <ThemeToggleBtn theme={theme} setTheme={setTheme}/>
                <img src={theme === "dark" ? assets.menu_icon_dark : assets.menu_icon} alt="" className='w-8 sm:hidden' onClick={() => setSidebarOpen(true)} />
                <a href="#contact" className='text-sm max-sm:hidden flex
                items-center gap-2 bg-primary text-white px-6 py-2 rounded-full
                cursor-pointer hover:scale-103 transition-all'>
                    Contact <img src={assets.arrow_icon} width={15} alt="" />
                </a>
            </div>
        </div>
    );
}

export default Navbar;
