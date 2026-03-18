import React, { useState, useEffect } from 'react'
import { Facebook, Linkedin, Instagram, Twitter, ChevronDown, Menu, X } from 'lucide-react'
import PresidentModal from './PresidentModal'
import SecretaryModal from './SecretaryModal'
import CommitteeModal from './CommitteeModal'
import PastLeadersModal from './PastLeadersModal'

const Header = ({ currentPage, setCurrentPage }) => {
  const [dropdownOpen, setDropdownOpen] = useState(null)
  const [presidentModalOpen, setPresidentModalOpen] = useState(false)
  const [secretaryModalOpen, setSecretaryModalOpen] = useState(false)
  const [committeeModalOpen, setCommitteeModalOpen] = useState(false)
  const [pastLeadersModalOpen, setPastLeadersModalOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleMouseEnter = (menu) => {
    setDropdownOpen(menu)
  }

  const handleMouseLeave = () => {
    setDropdownOpen(null)
  }
  
  const handleNavClick = (page, sectionId) => {
    setCurrentPage(page);
    setActiveSection(page);
    
    if (page === 'home' && sectionId) {
      // Wait for page to load if needed, then scroll to section
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Scroll to top for other pages
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  return (
    <>
      {/* Action Buttons Bar */}
      <div className="bg-white py-2 px-4">
        <div className="container mx-auto flex flex-wrap justify-end items-center gap-2 md:gap-3">
          <a 
            href="https://www.ieindia.org/webui/IEI-RegistrationForMembApp.aspx"
            className="px-2 sm:px-4 py-1.5 bg-orange-500 text-white text-xs sm:text-sm rounded hover:bg-orange-600 transition inline-block">
            Be a Member
          </a>
          <a 
            href="https://www.ieielections.in/"
            className="px-2 sm:px-4 py-1.5 bg-pink-500 text-white text-xs sm:text-sm rounded hover:bg-pink-600 transition inline-block">
            IEI Election
          </a>
          <button 
            onClick={() => setPresidentModalOpen(true)}
            className="px-2 sm:px-4 py-1.5 bg-gray-700 text-white text-xs sm:text-sm rounded hover:bg-gray-800 transition">
            Secretary
          </button>
          <button 
            onClick={() => setSecretaryModalOpen(true)}
            className="px-2 sm:px-4 py-1.5 bg-gray-800 text-white text-xs sm:text-sm rounded hover:bg-gray-900 transition">
            Chairman
          </button>
          <button 
            onClick={() => setCommitteeModalOpen(true)}
            className="px-2 sm:px-4 py-1.5 bg-purple-600 text-white text-xs sm:text-sm rounded hover:bg-purple-700 transition">
            Committee
          </button>
          <button 
            onClick={() => setPastLeadersModalOpen(true)}
            className="px-2 sm:px-4 py-1.5 bg-indigo-600 text-white text-xs sm:text-sm rounded hover:bg-indigo-700 transition">
            Past Leaders
          </button>
          <button 
            onClick={() => setCurrentPage('admin')}
            className="px-2 sm:px-4 py-1.5 bg-blue-600 text-white text-xs sm:text-sm rounded hover:bg-blue-700 transition">
            Admin
          </button>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-50" onMouseLeave={handleMouseLeave}>
        <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 py-2 sm:py-4">
          {/* Logos */}
          <div className="flex items-center gap-3 sm:gap-6">
            {/* IEI Logo */}
            <div className="flex items-center bg-white rounded-full p-1 shadow-md">
              <img 
                src="/images/iei_Logo.jpg" 
                alt="IEI Logo" 
                className="h-12 w-12 sm:h-16 md:h-20 sm:w-16 md:w-20 object-contain rounded-full"
              />
            </div>
            {/* Sambhaji Nagar Logo */}
            <div className="flex items-center bg-white rounded-full p-1 shadow-md">
              <img 
                src="/images/sambhajinagar.png" 
                alt="Sambhaji Nagar Logo" 
                className="h-12 w-12 sm:h-16 md:h-20 sm:w-16 md:w-20 object-contain rounded-full"
              />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
            >
              {mobileMenuOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1">
            <div className="relative"
                 onMouseEnter={() => handleMouseEnter('home')}
            >
              <a 
                href="#" 
                onClick={() => handleNavClick('home')} 
                className={`px-4 py-2 ${activeSection === 'home' ? 'text-blue-700' : 'text-gray-700'} font-bold hover:bg-blue-50 hover:text-blue-900 transition-all duration-200 text-sm flex items-center gap-1 rounded-md`}
              >
                HOME <ChevronDown size={14} />
              </a>
              
              {/* Home Dropdown Mega Menu */}
              {dropdownOpen === 'home' && (
                <div className="absolute top-full left-0 mt-0 bg-white shadow-2xl border-t-4 border-blue-600 min-w-[300px] z-50">
                  <div className="p-6">
                    <ul className="space-y-2">
                      <li><a href="#" onClick={(e) => {e.preventDefault(); handleNavClick('home', 'about')}} className="text-gray-700 hover:text-blue-600 hover:underline block py-1">About IEI</a></li>
                      <li><a href="#" onClick={(e) => {e.preventDefault(); handleNavClick('home', 'services')}} className="text-gray-700 hover:text-blue-600 hover:underline block py-1">Services</a></li>
                      <li><a href="#" onClick={(e) => {e.preventDefault(); handleNavClick('home', 'events')}} className="text-gray-700 hover:text-blue-600 hover:underline block py-1">Forthcoming Events</a></li>
                      <li><a href="#" onClick={(e) => {e.preventDefault(); handleNavClick('guesthouse')}} className="text-gray-700 hover:text-blue-600 hover:underline block py-1">IEI Guest House</a></li>
                      <li><a href="#" onClick={(e) => {e.preventDefault(); handleNavClick('home', 'contact')}} className="text-gray-700 hover:text-blue-600 hover:underline block py-1">Contacts</a></li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
            <a href="#" onClick={(e) => {e.preventDefault(); handleNavClick('home', 'highlights')}} className={`px-4 py-2 ${activeSection === 'highlights' ? 'text-blue-700' : 'text-gray-700'} font-semibold hover:bg-blue-50 hover:text-blue-900 transition-all duration-200 text-sm rounded-md`}>IEI HIGHLIGHT</a>
            <a href="#" onClick={(e) => {e.preventDefault(); handleNavClick('home', 'events')}} className={`px-4 py-2 ${activeSection === 'events' ? 'text-blue-700' : 'text-gray-700'} font-semibold hover:bg-blue-50 hover:text-blue-900 transition-all duration-200 text-sm rounded-md`}>UPCOMING EVENTS</a>
            <a href="#" onClick={(e) => {e.preventDefault(); handleNavClick('gallery')}} className={`px-4 py-2 ${activeSection === 'gallery' ? 'text-blue-700' : 'text-gray-700'} font-semibold hover:bg-blue-50 hover:text-blue-900 transition-all duration-200 text-sm rounded-md`}>GALLERY</a>
            <a href="#" onClick={(e) => {e.preventDefault(); handleNavClick('guesthouse')}} className={`px-4 py-2 ${activeSection === 'guesthouse' ? 'text-blue-700' : 'text-gray-700'} font-semibold hover:bg-blue-50 hover:text-blue-900 transition-all duration-200 text-sm rounded-md`}>IEI GUEST HOUSE</a>
            <a href="#" onClick={(e) => {e.preventDefault(); handleNavClick('iei-network')}} className={`px-4 py-2 ${activeSection === 'iei-network' ? 'text-blue-700' : 'text-gray-700'} font-semibold hover:bg-blue-50 hover:text-blue-900 transition-all duration-200 text-sm rounded-md`}>IEI NETWORK</a>
            <a href="#" onClick={(e) => {e.preventDefault(); handleNavClick('home', 'activities')}} className={`px-4 py-2 ${activeSection === 'activities' ? 'text-blue-700' : 'text-gray-700'} font-semibold hover:bg-blue-50 hover:text-blue-900 transition-all duration-200 text-sm rounded-md`}>IEI ACTIVITIES</a>
            <a href="https://www.ieindia.org/webui/IEI-Activities.aspx#download" className={`px-4 py-2 ${activeSection === 'downloads' ? 'text-blue-700' : 'text-gray-700'} font-semibold hover:bg-blue-50 hover:text-blue-900 transition-all duration-200 text-sm rounded-md`}>DOWNLOADS</a>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 py-2">
            <div className="container mx-auto px-4">
              <ul className="space-y-2">
                <li>
                  <a 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault(); 
                      handleNavClick('home');
                      setMobileMenuOpen(false);
                    }} 
                    className={`block py-2 px-4 ${activeSection === 'home' ? 'text-blue-700 bg-blue-50' : 'text-gray-700'} font-semibold rounded-md`}
                  >
                    HOME
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault(); 
                      handleNavClick('home', 'about');
                      setMobileMenuOpen(false);
                    }} 
                    className="block py-2 px-4 text-gray-700 hover:bg-gray-50 rounded-md"
                  >
                    ABOUT IEI
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault(); 
                      handleNavClick('home', 'highlights');
                      setMobileMenuOpen(false);
                    }} 
                    className={`block py-2 px-4 ${activeSection === 'highlights' ? 'text-blue-700 bg-blue-50' : 'text-gray-700'} font-semibold rounded-md`}
                  >
                    IEI HIGHLIGHT
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault(); 
                      handleNavClick('home', 'events');
                      setMobileMenuOpen(false);
                    }} 
                    className={`block py-2 px-4 ${activeSection === 'events' ? 'text-blue-700 bg-blue-50' : 'text-gray-700'} font-semibold rounded-md`}
                  >
                    UPCOMING EVENTS
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault(); 
                      handleNavClick('home', 'services');
                      setMobileMenuOpen(false);
                    }} 
                    className={`block py-2 px-4 ${activeSection === 'services' ? 'text-blue-700 bg-blue-50' : 'text-gray-700'} font-semibold rounded-md`}
                  >
                    SERVICES
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault(); 
                      handleNavClick('gallery');
                      setMobileMenuOpen(false);
                    }} 
                    className={`block py-2 px-4 ${activeSection === 'gallery' ? 'text-blue-700 bg-blue-50' : 'text-gray-700'} font-semibold rounded-md`}
                  >
                    GALLERY
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault(); 
                      handleNavClick('guesthouse');
                      setMobileMenuOpen(false);
                    }} 
                    className={`block py-2 px-4 ${activeSection === 'guesthouse' ? 'text-blue-700 bg-blue-50' : 'text-gray-700'} font-semibold rounded-md`}
                  >
                    IEI GUEST HOUSE
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault(); 
                      handleNavClick('iei-network');
                      setMobileMenuOpen(false);
                    }} 
                    className={`block py-2 px-4 ${activeSection === 'iei-network' ? 'text-blue-700 bg-blue-50' : 'text-gray-700'} font-semibold rounded-md`}
                  >
                    IEI NETWORK
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault(); 
                      handleNavClick('home', 'activities');
                      setMobileMenuOpen(false);
                    }} 
                    className={`block py-2 px-4 ${activeSection === 'activities' ? 'text-blue-700 bg-blue-50' : 'text-gray-700'} font-semibold rounded-md`}
                  >
                    IEI ACTIVITIES
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.ieindia.org/webui/IEI-Activities.aspx#download"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-2 px-4 ${activeSection === 'downloads' ? 'text-blue-700 bg-blue-50' : 'text-gray-700'} font-semibold rounded-md`}
                  >
                    DOWNLOADS
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </nav>

      {/* Modals */}
      <PresidentModal 
        isOpen={presidentModalOpen} 
        onClose={() => setPresidentModalOpen(false)} 
      />
      <SecretaryModal 
        isOpen={secretaryModalOpen} 
        onClose={() => setSecretaryModalOpen(false)} 
      />
      <CommitteeModal 
        isOpen={committeeModalOpen} 
        onClose={() => setCommitteeModalOpen(false)} 
      />
      <PastLeadersModal 
        isOpen={pastLeadersModalOpen} 
        onClose={() => setPastLeadersModalOpen(false)} 
      />
    </>
  )
}

export default Header
