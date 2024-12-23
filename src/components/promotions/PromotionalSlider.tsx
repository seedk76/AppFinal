import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PromotionalCard } from './PromotionalCard';
import { usePromotions } from '../../hooks/usePromotions';

export function PromotionalSlider() {
  const { promotions, activeIndex, setActiveIndex } = usePromotions();
  const promotion = promotions[activeIndex];

  return (
    <div className="px-4 py-6">
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <PromotionalCard {...promotion} />
          </motion.div>
        </AnimatePresence>
        
        <div className="flex justify-center gap-2 mt-4">
          {promotions.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className="p-1"
            >
              <motion.div
                className="w-2 h-2 rounded-full"
                animate={{
                  scale: index === activeIndex ? 1.5 : 1,
                  backgroundColor: index === activeIndex ? '#FFA733' : '#D1D5DB',
                }}
                transition={{ duration: 0.2 }}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}