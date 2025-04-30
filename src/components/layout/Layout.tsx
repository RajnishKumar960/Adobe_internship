import { useState, useEffect } from 'react';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);
  const location = useLocation();

  // Trigger page transition animation when location changes
  useEffect(() => {
    setIsPageTransitioning(true);
    const timer = setTimeout(() => {
      setIsPageTransitioning(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow">
        <div 
          className={`transition-opacity duration-300 ${
            isPageTransitioning ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Layout;