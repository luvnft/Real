'use client';

import React from 'react';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

const MakerRatingDemo = () => {
  const makers = [
    'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-55958-614810.jpg&fm=jpg',
    'https://img.freepik.com/free-photo/portrait-cheerful-caucasian-man_53876-13440.jpg',
    'https://img.freepik.com/free-photo/portrait-cheerful-caucasian-man_53876-13440.jpg',
    'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-55958-614810.jpg&fm=jpg',
    'https://img.freepik.com/free-photo/portrait-cheerful-caucasian-man_53876-13440.jpg'
  ];
  const rating = 4;
  const count = 4106;

  return (
    <div className="flex max-w-full flex-col items-center rounded-md bg-gray-900 p-2 sm:max-w-md sm:flex-row">
      <div className="mb-2 flex -space-x-2 sm:mb-0 sm:mr-2">
        {makers.map((maker, index) => (
          <Avatar
            key={index}
            className="h-6 w-6 border-2 border-gray-900 sm:h-8 sm:w-8"
          >
            <AvatarImage src={maker} alt={`Maker ${index + 1}`} />
          </Avatar>
        ))}
      </div>
      <div className="mb-2 flex items-center sm:mb-0">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            size={14}
            fill={index < rating ? '#FBBF24' : 'none'}
            stroke={index < rating ? '#FBBF24' : '#4B5563'}
            className={`${
              index < rating ? 'text-yellow-400' : 'text-gray-600'
            } sm:h-4 sm:w-4`}
          />
        ))}
      </div>
      <span className="text-center text-xs text-white sm:ml-2 sm:text-left sm:text-sm">
        {count} using our platform
      </span>
    </div>
  );
};

export default MakerRatingDemo;
