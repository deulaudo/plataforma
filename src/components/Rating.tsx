"use client";

import { Star } from "lucide-react";
import React, { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type RatingProps = {
  onVideoRated: (rating: number) => void;
  value?: number | null;
  size?: number;
  className?: string;
};

const Rating: React.FC<RatingProps> = ({
  onVideoRated,
  value = null,
  size = 20,
  className,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedRating, setSelectedRating] = useState<number | null>(
    value && value > 0 ? value : null,
  );

  // Atualiza o rating selecionado quando o prop value mudar
  useEffect(() => {
    if (value !== null && value !== undefined && value > 0) {
      setSelectedRating(value);
    } else {
      setSelectedRating(null);
    }
  }, [value]);

  const handleClick = (index: number) => {
    const rating = index + 1;
    setSelectedRating(rating);
    onVideoRated(rating);
  };

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const getStarClass = (index: number) => {
    // Se está em hover, todas as estrelas até a hovered ficam amarelas, as da direita ficam cinza
    if (hoveredIndex !== null) {
      if (index <= hoveredIndex) {
        return "fill-yellow-500 text-yellow-500";
      }
      return "fill-gray-400 text-gray-400";
    }

    // Quando não está em hover, mostra a avaliação selecionada (todas até selectedRating ficam amarelas)
    if (
      selectedRating !== null &&
      selectedRating > 0 &&
      index < selectedRating
    ) {
      return "fill-yellow-500 text-yellow-500";
    }
    return "fill-gray-400 text-gray-400";
  };

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          size={size}
          className={cn(
            "cursor-pointer transition-colors",
            getStarClass(index),
          )}
          onClick={() => handleClick(index)}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        />
      ))}
    </div>
  );
};

export default Rating;
