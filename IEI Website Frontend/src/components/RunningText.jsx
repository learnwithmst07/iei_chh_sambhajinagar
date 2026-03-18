import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../config';

const RunningText = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActiveMessage();
    // Refresh message every 30 seconds
    const interval = setInterval(fetchActiveMessage, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchActiveMessage = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/messages/active`);
      const data = await response.json();
      if (data.success && data.data) {
        setMessage(data.data.message);
      }
    } catch (error) {
      console.error('Error fetching message:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !message) {
    return null;
  }

  return (
    <div className="w-full bg-white py-3 px-4 overflow-hidden">
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(100vw);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        
        .running-text {
          animation: scroll 25s linear infinite;
          white-space: nowrap;
          display: inline-block;
          padding-left: 100vw;
        }
        
        .running-text:hover {
          animation-play-state: paused;
          cursor: pointer;
        }
      `}</style>
      
      <div className="overflow-hidden w-full">
        <p className="running-text text-blue-700 font-bold text-base">
          📢 {message}
        </p>
      </div>
    </div>
  );
};

export default RunningText;
