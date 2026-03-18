import React, { useState } from 'react'
import { Users, Code, GraduationCap, MapPin, Globe, Network, Building } from 'lucide-react'

const IEINetwork = () => {
  const [hoveredNode, setHoveredNode] = useState(null);
  
  const networkNodes = [
    {
      icon: Users,
      title: "IEI Centres and Overseas Chapters",
      subtitle: "130+ centres worldwide",
      color: "bg-gradient-to-br from-orange-500 to-orange-600",
      position: { top: '20%', left: '15%' },
      link: "https://www.ieindia.org/webui/IEI-Network.aspx#centres-OverseasChapters"
    },
    {
      icon: Code,
      title: "IEI Fora and Organ",
      subtitle: "15 Engineering Divisions",
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
      position: { top: '20%', right: '15%' },
      link: "https://www.ieindia.org/webui/IEI-Network.aspx#fora-organ"
    },
    {
      icon: GraduationCap,
      title: "IEI Student's Chapters",
      subtitle: "350+ student chapters",
      color: "bg-gradient-to-br from-green-500 to-green-600",
      position: { bottom: '15%', left: '15%' },
      link: "https://www.ieindia.org/webui/IEI-Network.aspx#students-chapters"
    },
    {
      icon: MapPin,
      title: "National Links",
      subtitle: "Pan-India presence",
      color: "bg-gradient-to-br from-red-500 to-red-600",
      position: { bottom: '15%', right: '15%' },
      link: "https://www.ieindia.org/webui/IEI-Network.aspx#national-links"
    },
    {
      icon: Globe,
      title: "International Links",
      subtitle: "Global partnerships",
      color: "bg-gradient-to-br from-cyan-500 to-cyan-600",
      position: { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 py-16">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <Network className="text-blue-600" size={48} />
            <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-900 via-blue-700 to-cyan-600 bg-clip-text text-transparent">
              IEI Network
            </h1>
          </div>
          <div className="flex justify-center gap-2 mb-4">
            <div className="h-1 w-20 bg-gradient-to-r from-transparent to-blue-600 rounded"></div>
            <div className="h-1 w-32 bg-blue-600 rounded"></div>
            <div className="h-1 w-20 bg-gradient-to-l from-transparent to-blue-600 rounded"></div>
          </div>
          <p className="text-gray-700 text-xl font-medium">
            Connecting Engineers Across India and the Globe
          </p>
        </div>

        {/* Network Hub Visualization */}
        <div className="relative max-w-5xl mx-auto" style={{ height: '600px' }}>
          {/* Central Hub */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="relative">
              {/* Pulsing rings */}
              <div className="absolute inset-0 animate-ping opacity-20">
                <div className="w-48 h-48 rounded-full bg-blue-500"></div>
              </div>
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex flex-col items-center justify-center shadow-2xl border-8 border-white relative group cursor-pointer hover:scale-110 transition-all duration-300">
                <Building size={60} className="text-white mb-2" />
                <p className="text-white font-bold text-lg">IEI</p>
                <p className="text-blue-100 text-xs">Central Hub</p>
              </div>
            </div>
          </div>

          {/* Connecting Lines (SVG) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 0.2 }} />
                <stop offset="50%" style={{ stopColor: '#3b82f6', stopOpacity: 0.8 }} />
                <stop offset="100%" style={{ stopColor: '#3b82f6', stopOpacity: 0.2 }} />
              </linearGradient>
            </defs>
            {/* Lines from center to each node */}
            <line x1="50%" y1="50%" x2="15%" y2="20%" stroke="url(#lineGradient)" strokeWidth="3" className="animate-pulse" />
            <line x1="50%" y1="50%" x2="85%" y2="20%" stroke="url(#lineGradient)" strokeWidth="3" className="animate-pulse" style={{ animationDelay: '0.2s' }} />
            <line x1="50%" y1="50%" x2="15%" y2="85%" stroke="url(#lineGradient)" strokeWidth="3" className="animate-pulse" style={{ animationDelay: '0.4s' }} />
            <line x1="50%" y1="50%" x2="85%" y2="85%" stroke="url(#lineGradient)" strokeWidth="3" className="animate-pulse" style={{ animationDelay: '0.6s' }} />
          </svg>

          {/* Network Nodes */}
          {networkNodes.filter((_, i) => i < 4).map((node, index) => {
            const Icon = node.icon;
            const positions = [
              { top: '10%', left: '5%' },
              { top: '10%', right: '5%' },
              { bottom: '5%', left: '5%' },
              { bottom: '5%', right: '5%' }
            ];
            return (
              <div 
                key={index} 
                className="absolute z-10"
                style={positions[index]}
                onMouseEnter={() => setHoveredNode(index)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <div className="flex flex-col items-center">
                  <a 
                    href={node.link}
                    className={`w-32 h-32 rounded-full ${node.color} flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer border-4 border-white group ${
                      hoveredNode === index ? 'scale-110' : 'scale-100'
                    }`}
                    onClick={(e) => {
                      // Open in same tab
                      window.location.href = node.link;
                      e.preventDefault();
                    }}
                  >
                    <Icon size={48} className="text-white" />
                  </a>
                  <div className={`mt-4 bg-white rounded-lg p-3 shadow-lg transition-all duration-300 ${
                    hoveredNode === index ? 'opacity-100 translate-y-0' : 'opacity-90'
                  }`}>
                    <p className="text-blue-900 font-bold text-sm text-center leading-tight">
                      {node.title}
                    </p>
                    <p className="text-gray-600 text-xs text-center mt-1">
                      {node.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  )
}

export default IEINetwork
