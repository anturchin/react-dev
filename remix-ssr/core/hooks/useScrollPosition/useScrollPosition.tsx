import { useEffect, useRef } from 'react';

export const useScrollPosition = () => {
  const scrollPositionRef = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollPositionRef.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, scrollPositionRef.current);
  });
};
