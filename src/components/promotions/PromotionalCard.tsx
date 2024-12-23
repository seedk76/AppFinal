import React from 'react';
import type { Promotion } from '../../hooks/usePromotions';

type PromotionalCardProps = Promotion;

export function PromotionalCard({ discount, title, description }: PromotionalCardProps) {
  return (
    <div 
      className="w-full p-6 rounded-2xl"
      style={{
        background: 'linear-gradient(135deg, #FFA733 0%, #FFC73A 100%)'
      }}
    >
      <span className="inline-block px-3 py-1 bg-black/20 rounded-full text-sm text-white mb-2">
        {discount}
      </span>
      <h2 className="text-2xl font-bold mb-2 text-white">{title}</h2>
      <p className="text-sm text-white/90 whitespace-pre-line">{description}</p>
    </div>
  );
}