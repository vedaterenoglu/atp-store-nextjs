/**
 * I18n Loading Component - Professional loading state for i18n initialization
 * SOLID Principles: SRP - Single responsibility for i18n loading UI
 * Design Patterns: Component Pattern - Reusable loading component
 * Dependencies: None (standalone component)
 */

import Image from 'next/image'

export function I18nLoading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Elegant background pattern */}
      <div className="absolute inset-0 opacity-20" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}
      ></div>
      
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-orange-500/5 via-transparent to-transparent"></div>
      
      <div className="relative flex flex-col items-center space-y-8">
        {/* Logo with glow effect */}
        <div className="relative">
          <div className="absolute inset-0 blur-3xl">
            <div className="h-full w-full rounded-full bg-gradient-to-r from-orange-500/20 to-amber-500/20 animate-pulse"></div>
          </div>
          <div className="relative">
            <Image
              src="/logo.png"
              alt="ATP Store"
              width={80}
              height={80}
              className="relative z-10 drop-shadow-2xl"
              priority
            />
          </div>
        </div>

        {/* Elegant loading spinner */}
        <div className="relative h-20 w-20">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border border-orange-500/20"></div>
          
          {/* Animated ring */}
          <svg
            className="absolute inset-0 -rotate-90 animate-spin"
            style={{ animationDuration: '3s' }}
            viewBox="0 0 80 80"
          >
            <circle
              cx="40"
              cy="40"
              r="38"
              stroke="url(#gradient)"
              strokeWidth="2"
              fill="none"
              strokeDasharray="238"
              strokeDashoffset="60"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="50%" stopColor="#fb923c" />
                <stop offset="100%" stopColor="#f97316" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Center dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-gradient-to-r from-orange-400 to-amber-400 animate-pulse"></div>
          </div>
        </div>

        {/* Text content */}
        <div className="flex flex-col items-center space-y-3">
          {/* Brand name */}
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 via-amber-400 to-orange-400 bg-clip-text text-transparent animate-gradient">
            ATP Store
          </h1>
          
          {/* Loading text */}
          <p className="text-sm font-light text-gray-400 tracking-wider uppercase">
            Initializing Language Settings
          </p>
          
          {/* Elegant dots animation */}
          <div className="flex items-center space-x-2 pt-2">
            <div className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 animate-pulse [animation-delay:0ms]"></div>
            <div className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 animate-pulse [animation-delay:150ms]"></div>
            <div className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 animate-pulse [animation-delay:300ms]"></div>
          </div>
        </div>

        {/* Premium progress indicator */}
        <div className="w-64 h-0.5 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-orange-500 to-transparent animate-slide"></div>
        </div>

        {/* Language flags */}
        <div className="mt-8 flex items-center gap-4">
          {/* English */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/30 to-amber-500/30 rounded blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="relative text-2xl hover:scale-110 transition-transform cursor-default" title="English">
              🇬🇧
            </span>
          </div>
          
          {/* Turkish */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/30 to-amber-500/30 rounded blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="relative text-2xl hover:scale-110 transition-transform cursor-default" title="Türkçe">
              🇹🇷
            </span>
          </div>
          
          {/* Swedish */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/30 to-amber-500/30 rounded blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="relative text-2xl hover:scale-110 transition-transform cursor-default" title="Svenska">
              🇸🇪
            </span>
          </div>
          
          {/* Danish */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/30 to-amber-500/30 rounded blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="relative text-2xl hover:scale-110 transition-transform cursor-default" title="Dansk">
              🇩🇰
            </span>
          </div>
          
          {/* German */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/30 to-amber-500/30 rounded blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="relative text-2xl hover:scale-110 transition-transform cursor-default" title="Deutsch">
              🇩🇪
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
