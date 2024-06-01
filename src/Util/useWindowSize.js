import { useState, useEffect } from 'react';

/**
 * @author Jonatas Silva
 * @description captura o tamanho de tela
 * @example {
 *  const {width, height} = useWindowSize();
 *  const isMobile = width < 768;  
 * }
 * @returns {HTMLElement}
 */
export const useWindowSize = () => {
  if (typeof window !== 'undefined') {
    const [windowSize, setWindowSize] = useState({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    useEffect(() => {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }

      window.addEventListener('resize', handleResize);

      handleResize();
      return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    return windowSize;
  }

  return {};
};