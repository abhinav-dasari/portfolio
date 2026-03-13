import React, { useState } from 'react'
import Navbar from './component/Navbar';
import Hero from './component/Hero';
import AboutMe from './component/AboutMe';
import Skills from './component/Skills';
import Certificates from './component/Certificates';
import assets from './assets/assets';

const App = () => {

  const [theme, setTheme] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light')
  return (
    <div className='dark:bg-black relative'>

      <Navbar theme={theme} setTheme={setTheme} />
      <Hero theme={theme} setTheme={setTheme}/>
      <AboutMe theme={theme} />
      <Skills theme={theme} />
      <Certificates theme={theme} />
    </div>
  )
}

export default App
