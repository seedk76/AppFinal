import { useState, useEffect, useCallback } from 'react';

export interface Promotion {
  id: number;
  discount: string;
  title: string;
  description: string;
}

const PROMOTIONS: Promotion[] = [
  {
    id: 1,
    discount: '50% OFF',
    title: "Today's Special",
    description: 'Get a discount for every service order!\nOnly valid for today!',
  },
  {
    id: 2,
    discount: '30% OFF',
    title: 'Weekend Deal',
    description: 'Special weekend discounts on all services!',
  },
  {
    id: 3,
    discount: '20% OFF',
    title: 'First Booking',
    description: 'Special discount for your first service booking!',
  },
];

export function usePromotions() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [promotions] = useState(PROMOTIONS);

  const nextSlide = useCallback(() => {
    setActiveIndex((current) => (current + 1) % promotions.length);
  }, [promotions.length]);

  const previousSlide = useCallback(() => {
    setActiveIndex((current) => 
      current === 0 ? promotions.length - 1 : current - 1
    );
  }, [promotions.length]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return {
    promotions,
    activeIndex,
    setActiveIndex,
    nextSlide,
    previousSlide,
  };
}