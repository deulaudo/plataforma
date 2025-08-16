"use client";

import { DayPicker } from "react-day-picker";
import { ptBR } from "react-day-picker/locale";
import "react-day-picker/dist/style.css";

type HighlightedDate = {
  date: Date;
  color: "blue" | "red" | "green" | "yellow" | "purple" | "indigo";
};

type CalendarProps = {
  highlightedDates: HighlightedDate[];
  onDateClick: (date: Date) => void;
  className?: string;
};

const Calendar = ({
  highlightedDates, 
  onDateClick, 
  className = ""
}: CalendarProps) => {
  const handleDayClick = (date: Date) => {
    onDateClick(date);
  };

  // Agrupa as datas por cor para criar modificadores específicos
  const modifiersByColor = highlightedDates.reduce((acc, item) => {
    if (!acc[item.color]) {
      acc[item.color] = [];
    }
    acc[item.color].push(item.date);
    return acc;
  }, {} as Record<string, Date[]>);

  const colorVariants = {
    blue: {
      bg: "#3b82f6", // blue-500
      bgHover: "#2563eb", // blue-600
    },
    red: {
      bg: "#ef4444", // red-500
      bgHover: "#dc2626", // red-600
    },
    green: {
      bg: "#10b981", // emerald-500
      bgHover: "#059669", // emerald-600
    },
    yellow: {
      bg: "#f59e0b", // amber-500
      bgHover: "#d97706", // amber-600
    },
    purple: {
      bg: "#8b5cf6", // violet-500
      bgHover: "#7c3aed", // violet-600
    },
    indigo: {
      bg: "#6366f1", // indigo-500
      bgHover: "#4f46e5", // indigo-600
    },
  };

  return (
    <div className={`calendar-container ${className}`}>
      <DayPicker
        mode="single"
        onDayClick={handleDayClick}
        modifiers={modifiersByColor}
        modifiersClassNames={Object.keys(modifiersByColor).reduce((acc, color) => {
          acc[color] = `highlighted-date-${color}`;
          return acc;
        }, {} as Record<string, string>)}
        className="rdp-custom"
        locale={ptBR}
      />
      
      <style jsx global>{`
        /* Estilos para cada cor */
        ${Object.entries(colorVariants).map(([color, variant]) => `
          .rdp-custom .highlighted-date-${color} {
            background-color: ${variant.bg} !important;
            color: white !important;
            font-weight: bold !important;
            border-radius: 4px !important;
            cursor: pointer !important;
          }
          
          .rdp-custom .highlighted-date-${color}:hover {
            background-color: ${variant.bgHover} !important;
            transform: scale(1.05);
          }
        `).join('')}
        
        .rdp-custom .rdp-day:not(.highlighted-date):hover {
          background-color: var(--bg-hover, #f3f4f6);
          color: var(--text-primary);
        }
        
        .rdp-custom .highlighted-date {
          cursor: pointer;
        }
        
        .rdp-custom .rdp-day:not(.highlighted-date) {
          cursor: default;
          opacity: 0.9;
        }
        
        /* Dark mode support */
        .dark .rdp-custom {
          color: white;
        }
        
        .dark .rdp-custom .rdp-head_cell {
          color: #9ca3af;
        }
        
        .dark .rdp-custom .rdp-day:not(.highlighted-date):hover {
          background-color: #374151;
        }
      `}</style>
    </div>
  );
};

export default Calendar;