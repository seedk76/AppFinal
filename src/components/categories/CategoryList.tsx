import React from 'react';
import { CategoryCard } from './CategoryCard';
import { CATEGORIES } from '../../data/categories';

export function CategoryList() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {CATEGORIES.map((category) => (
        <CategoryCard
          key={category.id}
          icon={category.icon}
          name={category.name}
        />
      ))}
    </div>
  );
}