import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function useLocationHook() {
  const [isHomePage, setIsHomePage] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    setIsHomePage(location.pathname === '/');
  }, [location]);

  return isHomePage;
}
