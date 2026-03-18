import React, { useState, useEffect } from 'react'
import { Home, Info, Briefcase, Calendar, Building } from 'lucide-react'

const SecondaryNav = ({ currentPage, setCurrentPage }) => {
  const [activeSection, setActiveSection] = useState('');
  
  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // Get all sections and their positions
      const aboutSection = document.getElementById('about');
      const servicesSection = document.getElementById('services');
      const eventsSection = document.getElementById('events');
      
      // Check which section is currently in view
      if (aboutSection && scrollPosition >= aboutSection.offsetTop - 100 && 
          servicesSection && scrollPosition < servicesSection.offsetTop - 100) {
        setActiveSection('about');
      } else if (servicesSection && scrollPosition >= servicesSection.offsetTop - 100 && 
                 eventsSection && scrollPosition < eventsSection.offsetTop - 100) {
        setActiveSection('services');
      } else if (eventsSection && scrollPosition >= eventsSection.offsetTop - 100) {
        setActiveSection('events');
      } else {
        setActiveSection('home');
      }
    };
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();
    
    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Handle navigation click
  const handleNavClick = (section) => {
    if (section === 'guesthouse') {
      setCurrentPage('guesthouse');
      return;
    }
    
    setActiveSection(section);
    setCurrentPage('home');
    
    setTimeout(() => {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else if (section === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };
  return (
    <div className="bg-gray-700 shadow-lg">
      <div className="container mx-auto overflow-x-auto">
        <div className="flex flex-nowrap md:flex-wrap items-center justify-start md:justify-center gap-1 text-white text-xs md:text-sm whitespace-nowrap px-2 md:px-0">
          <a 
            href="#" 
            onClick={(e) => {e.preventDefault(); handleNavClick('home')}} 
            className={`flex items-center gap-1 md:gap-2 px-2 md:px-5 py-2 md:py-3 hover:bg-gray-600 transition ${activeSection === 'home' ? 'bg-gray-600' : ''}`}
          >
            <Home size={16} />
            <span>HOME</span>
          </a>
          <a 
            href="#" 
            onClick={(e) => {e.preventDefault(); handleNavClick('about')}} 
            className={`flex items-center gap-1 md:gap-2 px-2 md:px-5 py-2 md:py-3 hover:bg-gray-600 transition ${activeSection === 'about' ? 'bg-gray-600' : ''}`}
          >
            <Info size={16} />
            <span>ABOUT IEI</span>
          </a>
          <a 
            href="#" 
            onClick={(e) => {e.preventDefault(); handleNavClick('services')}} 
            className={`flex items-center gap-1 md:gap-2 px-2 md:px-5 py-2 md:py-3 hover:bg-gray-600 transition ${activeSection === 'services' ? 'bg-gray-600' : ''}`}
          >
            <Briefcase size={16} />
            <span>SERVICES</span>
          </a>
          <a 
            href="#" 
            onClick={(e) => {e.preventDefault(); handleNavClick('events')}} 
            className={`flex items-center gap-1 md:gap-2 px-2 md:px-5 py-2 md:py-3 hover:bg-gray-600 transition ${activeSection === 'events' ? 'bg-gray-600' : ''}`}
          >
            <Calendar size={16} />
            <span>FORTHCOMING EVENTS</span>
          </a>
          <a 
            href="#" 
            onClick={(e) => {e.preventDefault(); handleNavClick('guesthouse')}} 
            className={`flex items-center gap-1 md:gap-2 px-2 md:px-5 py-2 md:py-3 hover:bg-gray-600 transition ${currentPage === 'guesthouse' ? 'bg-gray-600' : ''}`}
          >
            <Building size={16} />
            <span>IEI GUEST HOUSE</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default SecondaryNav
