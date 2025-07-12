import React from 'react';
import { RotateCcw } from 'lucide-react';

interface ColorPickerProps {
  onColorSelect: (color: string) => void;
  onReset: () => void;
  onClose: () => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ onColorSelect, onReset, onClose }) => {
  const colors = [
    { name: 'Original Green', color: 'hsl(152, 76%, 36%)' },
    { name: 'Ocean Blue', color: 'hsl(200, 80%, 45%)' },
    { name: 'Purple', color: 'hsl(270, 70%, 50%)' },
    { name: 'Orange', color: 'hsl(25, 85%, 55%)' },
    { name: 'Pink', color: 'hsl(330, 75%, 60%)' },
    { name: 'Teal', color: 'hsl(180, 70%, 40%)' },
    { name: 'Red', color: 'hsl(0, 75%, 55%)' },
    { name: 'Indigo', color: 'hsl(240, 70%, 55%)' }
  ];

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Color Picker */}
      <div className="absolute top-16 right-4 bg-white/95 backdrop-blur-lg rounded-2xl p-4 shadow-2xl z-30 min-w-[280px] color-picker-transition animate-in fade-in-0 zoom-in-95">
        <h3 className="text-gray-800 font-medium mb-3">Background Color</h3>
        
        {/* Reset Button */}
        <button
          onClick={onReset}
          className="flex items-center gap-2 w-full p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors mb-3"
        >
          <RotateCcw className="w-4 h-4 text-gray-600" />
          <span className="text-gray-700">Reset to Original</span>
        </button>
        
        {/* Color Grid */}
        <div className="grid grid-cols-2 gap-2">
          {colors.map((colorOption) => (
            <button
              key={colorOption.name}
              onClick={() => onColorSelect(colorOption.color)}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div
                className="w-6 h-6 rounded-full shadow-sm border border-white/20"
                style={{ background: `linear-gradient(135deg, ${colorOption.color}, ${colorOption.color.replace(/\d+%\)$/, match => `${parseInt(match) - 8}%)`)})` }}
              />
              <span className="text-sm text-gray-700">{colorOption.name}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};
