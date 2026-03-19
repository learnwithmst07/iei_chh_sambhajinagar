import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import RunningText from './components/RunningText'
import Header from './components/Header'
import Hero from './components/Hero'
import SecondaryNav from './components/SecondaryNav'
import HomePage from './components/HomePage'
import Content from './components/Content'
import UpcomingEvents from './components/UpcomingEvents'
import Services from './components/Services'
import Activities from './components/Activities'
import Gallery from './components/Gallery'
import IEINetwork from './components/IEINetwork'
import GuestHouse from './components/GuestHouse'
import AdminLogin from './admin/AdminLogin'
import AdminDashboard from './admin/AdminDashboard'
import HighlightDetail from './components/HighlightDetail'
import Footer from './components/Footer'

// function App() {
//   const [currentPage, setCurrentPage] = useState('home');
//   const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
//   const [selectedHighlight, setSelectedHighlight] = useState(null);

//   // Check if admin is logged in on mount
//   useEffect(() => {
//     const adminStatus = localStorage.getItem('adminLoggedIn');
//     if (adminStatus === 'true') {
//       setIsAdminLoggedIn(true);
//     }
//   }, []);

//   // Handle login success
//   const handleLoginSuccess = () => {
//     setIsAdminLoggedIn(true);
//   };

//   // Handle logout
//   const handleLogout = () => {
//     setIsAdminLoggedIn(false);
//     setCurrentPage('home');
//   };

//   // Handle highlight click
//   const handleHighlightClick = (highlight) => {
//     setSelectedHighlight(highlight);
//   };

//   // Close highlight detail
//   const closeHighlightDetail = () => {
//     setSelectedHighlight(null);
//   };

//   // Admin page route
//   if (currentPage === 'admin') {
//     if (!isAdminLoggedIn) {
//       return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
//     } else {
//       return <AdminDashboard onLogout={handleLogout} />;
//     }
//   }

//   return (
//     <Router>
//       <div className="min-h-screen bg-gray-50">
//         <RunningText />
//         <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />

//         {currentPage === 'home' ? (
//           <>
//             <Hero />
//             <SecondaryNav currentPage={currentPage} setCurrentPage={setCurrentPage} />
//             <HomePage />
//             <Content onHighlightClick={handleHighlightClick} />
//             <UpcomingEvents />
//             <Services />
//             <Activities />
//           </>
//         ) : currentPage === 'gallery' ? (
//           <Gallery />
//         ) : currentPage === 'iei-network' ? (
//           <IEINetwork />
//         ) : currentPage === 'guesthouse' ? (
//           <GuestHouse />
//         ) : null}

//         {/* Highlight Detail Modal */}
//         {selectedHighlight && (
//           <HighlightDetail
//             highlight={selectedHighlight}
//             onClose={closeHighlightDetail}
//           />
//         )}

//         <Footer />
//       </div>
//     </Router>
//   )
// }

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [selectedHighlight, setSelectedHighlight] = useState(null);

  const hostname = window.location.hostname;
  const isAdminDomain = hostname.startsWith("admin.");

  useEffect(() => {
    const adminStatus = localStorage.getItem('adminLoggedIn');
    if (adminStatus === 'true') {
      setIsAdminLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAdminLoggedIn(true);
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    setCurrentPage('home');
  };

  const handleHighlightClick = (highlight) => {
    setSelectedHighlight(highlight);
  };

  const closeHighlightDetail = () => {
    setSelectedHighlight(null);
  };

  // ✅ NEW LOGIC
  if (isAdminDomain) {
    if (!isAdminLoggedIn) {
      return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
    } else {
      return <AdminDashboard onLogout={handleLogout} />;
    }
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <RunningText />
        <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />

        {currentPage === 'home' ? (
          <>
            <Hero />
            <SecondaryNav currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <HomePage />
            <Content onHighlightClick={handleHighlightClick} />
            <UpcomingEvents />
            <Services />
            <Activities />
          </>
        ) : currentPage === 'gallery' ? (
          <Gallery />
        ) : currentPage === 'iei-network' ? (
          <IEINetwork />
        ) : currentPage === 'guesthouse' ? (
          <GuestHouse />
        ) : null}

        {selectedHighlight && (
          <HighlightDetail
            highlight={selectedHighlight}
            onClose={closeHighlightDetail}
          />
        )}

        <Footer />
      </div>
    </Router>
  );
}

export default App
