import React, { useState, useEffect } from 'react'

const Hero = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [animationVisible, setAnimationVisible] = useState({
    title: false,
    tagline: false,
    charter: false,
    recognition1: false,
    recognition2: false,
    recognition3: false,
    recognition4: false,
  });
  
  const bannerImages = [
    '/images/one.jpeg',
    '/images/two.jpeg',
    '/images/three.jpeg',
     '/images/sambhajinagar_bg.jpg'
  ];
  
  // Auto-rotate banners
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % bannerImages.length);
    }, 6000); // Change banner every 6 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  // Sequential text animations
  useEffect(() => {
    // Animate title after a short delay
    const titleTimer = setTimeout(() => {
      setAnimationVisible(prev => ({ ...prev, title: true }));
    }, 150);
    
    // Animate tagline after title
    const taglineTimer = setTimeout(() => {
      setAnimationVisible(prev => ({ ...prev, tagline: true }));
    }, 450);
    
    // Animate charter
    const charterTimer = setTimeout(() => {
      setAnimationVisible(prev => ({ ...prev, charter: true }));
    }, 700);
    
    // Animate recognition text sequentially
    const recognition1Timer = setTimeout(() => {
      setAnimationVisible(prev => ({ ...prev, recognition1: true }));
    }, 900);
    
    const recognition2Timer = setTimeout(() => {
      setAnimationVisible(prev => ({ ...prev, recognition2: true }));
    }, 1050);
    
    const recognition3Timer = setTimeout(() => {
      setAnimationVisible(prev => ({ ...prev, recognition3: true }));
    }, 1200);
    
    const recognition4Timer = setTimeout(() => {
      setAnimationVisible(prev => ({ ...prev, recognition4: true }));
    }, 1350);
    
    // Cleanup timers
    return () => {
      clearTimeout(titleTimer);
      clearTimeout(taglineTimer);
      clearTimeout(charterTimer);
      clearTimeout(recognition1Timer);
      clearTimeout(recognition2Timer);
      clearTimeout(recognition3Timer);
      clearTimeout(recognition4Timer);
    };
  }, []);
  
  const handleBannerClick = (index) => {
    setActiveSlide(index);
  };
  
  return (
    <div id="home" className="relative h-[450px] sm:h-[450px] md:h-[500px] overflow-hidden bg-gradient-to-br from-blue-900 via-slate-700 to-blue-800">
      {/* Animated Banner Carousel */}
      <div className="absolute inset-0 w-full h-full">
        {bannerImages.map((image, index) => (
          <div 
            key={index}
            className={`absolute inset-0 w-full h-full banner-slide ${index === activeSlide ? 'active' : ''}`}
            style={{ 
              backgroundImage: `url(${image})`,
            }}
          />
        ))}
      </div>
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/60 via-blue-900/40 to-blue-900/60"></div>
      
      {/* Banner Navigation Indicators */}
      <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center">
        {bannerImages.map((_, index) => (
          <button
            key={index}
            onClick={() => handleBannerClick(index)}
            className={`banner-indicator mx-1 ${index === activeSlide ? 'active' : ''}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto h-full flex flex-col items-center justify-center text-center px-3 sm:px-4">
        {/* Main Heading with traditional Old English font */}
        <h1 className={`text-[28px] sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-1 md:mb-4 text-white drop-shadow-2xl transition-all duration-600 transform ${
            animationVisible.title ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
            style={{ 
              fontFamily: "'Old English Text MT', 'UnifrakturMaguntia', cursive",
              textShadow: '3px 3px 6px rgba(0,0,0,0.8), 0 0 25px rgba(59, 130, 246, 0.5)',
              letterSpacing: '0.02em',
              lineHeight: '1.1'
            }}>
          <span className="block">The Institution of Engineers</span>
          <span className="block">(India)</span>
          <span className="block text-orange-500 text-[24px] sm:text-3xl md:text-4xl lg:text-5xl">Chhatrapati Sambhajinagar (Local Centre)</span>
        </h1>
        
        {/* Tagline */}
        <p className={`text-base sm:text-lg md:text-xl lg:text-2xl text-blue-100 mb-1 md:mb-3 drop-shadow-md transition-all duration-600 transform ${
            animationVisible.tagline ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
           style={{
             fontFamily: "'Cormorant Garamond', Georgia, serif",
             fontStyle: 'italic',
             fontWeight: '600'
           }}>
          "A Century of Service to the Nation"
        </p>
        
        {/* Royal Charter Text */}
        <div className="space-y-1 sm:space-y-2 text-white">
          <p className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-pink-400 drop-shadow-lg transition-all duration-600 transform ${
            animationVisible.charter ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
             style={{
               fontFamily: "'Playfair Display', Georgia, serif",
               letterSpacing: '0.01em'
             }}>
            Incorporated by Royal Charter in 1935
          </p>
          
          {/* Recognition Text */}
          <div className="text-xs sm:text-base md:text-lg lg:text-xl space-y-0 sm:space-y-1 max-w-xs sm:max-w-md md:max-w-3xl mx-auto"
               style={{
                 fontFamily: "'Cinzel', Georgia, serif"
               }}>
            <p className={`font-medium drop-shadow-md transition-all duration-500 transform ${
              animationVisible.recognition1 ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
            }`}>
              RECOGNIZED AS A
            </p>
            <p className={`text-sm sm:text-lg md:text-xl lg:text-2xl font-bold drop-shadow-md transition-all duration-500 transform ${
              animationVisible.recognition2 ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
            }`}>
              SCIENTIFIC AND INDUSTRIAL<br className="hidden sm:inline"/> RESEARCH ORGANIZATION
            </p>
            <p className={`drop-shadow-md transition-all duration-500 transform ${
              animationVisible.recognition3 ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
            }`}>
              BY
            </p>
            <p className={`text-sm sm:text-lg md:text-xl font-bold text-blue-200 drop-shadow-md transition-all duration-500 transform ${
              animationVisible.recognition4 ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
            }`}>
              MINISTRY OF SCIENCE AND<br className="hidden sm:inline"/> TECHNOLOGY, GOVT. OF INDIA
            </p>
          </div>
        </div>
      </div>

      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-800 to-transparent"></div>
    </div>
  )
}

export default Hero
