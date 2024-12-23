import { Service } from '../types/services';

export const SERVICES: Service[] = [
  {
    id: 1,
    title: "Men's Hair Cut",
    description: 'Professional haircut with styling',
    price: 35,
    rating: 4.8,
    duration: '30 min',
    location: '2.5 km',
    imageUrl: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&h=400&fit=crop',
  },
  {
    id: 2,
    title: 'Beard Grooming',
    description: 'Expert beard trim and shape',
    price: 25,
    rating: 4.7,
    duration: '20 min',
    location: '3.1 km',
    imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&h=400&fit=crop',
  },
  {
    id: 3,
    title: 'Hair Color & Style',
    description: 'Full color treatment and styling',
    price: 85,
    rating: 4.9,
    duration: '90 min',
    location: '1.8 km',
    imageUrl: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&h=400&fit=crop',
  },
];