'use client'

import React from 'react';
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const MakerRatingDemo = () => {
  const makers = [
    "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-55958-614810.jpg&fm=jpg",
    "https://img.freepik.com/free-photo/portrait-cheerful-caucasian-man_53876-13440.jpg",
    "https://img.freepik.com/free-photo/portrait-cheerful-caucasian-man_53876-13440.jpg",
    "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-55958-614810.jpg&fm=jpg",
    "https://img.freepik.com/free-photo/portrait-cheerful-caucasian-man_53876-13440.jpg"
  ];
  const rating = 4;
  const count = 4106;

  return (
    <div className="flex items-center bg-gray-900 p-2 rounded-md max-w-md">
      <div className="flex -space-x-2 mr-2">
        {makers.map((maker, index) => (
          <Avatar key={index} className="w-8 h-8 border-2 border-gray-900">
            <AvatarImage src={maker} alt={`Maker ${index + 1}`} />
          </Avatar>
        ))}
      </div>
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            size={16}
            fill={index < rating ? "#FBBF24" : "none"}
            stroke={index < rating ? "#FBBF24" : "#4B5563"}
            className={index < rating ? "text-yellow-400" : "text-gray-600"}
          />
        ))}
      </div>
      <span className="text-white text-sm ml-2">
        {count} makers ship faster
      </span>
    </div>
  );
};

export default MakerRatingDemo;