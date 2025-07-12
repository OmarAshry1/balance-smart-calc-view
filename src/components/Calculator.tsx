import React, { useState, useEffect } from 'react';
import { ArrowLeft, ChevronLeft } from 'lucide-react';
import { ColorPicker } from './ColorPicker';
import { useNavigate } from 'react-router-dom';

interface CalculatorProps {
  balance?: number;
}

const Calculator: React.FC<CalculatorProps> = ({ balance = 24757.22 }) => {
  const navigate = useNavigate();
  const [display, setDisplay] = useState('0');
  const [formula, setFormula] = useState('');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [bgColor, setBgColor] = useState('hsl(152, 76%, 36%)');
  const [isAnimating, setIsAnimating] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(String(num));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
      setFormula(`${inputValue} ${nextOperation}`);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = performCalculation();

      setDisplay(String(newValue));
      setPreviousValue(newValue);
      setFormula(`${newValue} ${nextOperation}`);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const inputParentheses = () => {
    const currentFormula = formula || display;
    const openParenCount = (currentFormula.match(/\(/g) || []).length;
    const closeParenCount = (currentFormula.match(/\)/g) || []).length;
    
    if (openParenCount > closeParenCount) {
      // There are unclosed parentheses, add closing parenthesis
      setFormula(currentFormula + ')');
      setDisplay(display + ')');
    } else {
      // No unclosed parentheses, add opening parenthesis
      if (waitingForOperand || display === '0') {
        setDisplay('(');
        setFormula((formula || '') + '(');
      } else {
        setDisplay(display + '(');
        setFormula(currentFormula + '(');
      }
      setWaitingForOperand(true);
    }
  };

  const performCalculation = () => {
    const prev = previousValue || 0;
    const current = parseFloat(display);

    switch (operation) {
      case '+':
        return prev + current;
      case '−':
        return prev - current;
      case '*':
        return prev * current;
      case '/':
        return current !== 0 ? prev / current : 0;
      default:
        return current;
    }
  };

  const calculate = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      setIsAnimating(true);
      
      setTimeout(() => {
        const newValue = performCalculation();
        setDisplay(String(newValue));
        setFormula(`${previousValue} ${operation} ${inputValue} =`);
        setPreviousValue(null);
        setOperation(null);
        setWaitingForOperand(true);
        setIsAnimating(false);
      }, 300);
    }
  };

  const clear = () => {
    if (display !== '0') {
      setDisplay('0');
    } else {
      setDisplay('0');
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(false);
      setFormula('');
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const applyPercentage = (percent: number) => {
    const result = (balance * percent) / 100;
    setDisplay(String(result));
    setFormula(`${percent}% of $${balance.toLocaleString()}`);
    setWaitingForOperand(true);
  };

  const formatDisplay = (value: string) => {
    const num = parseFloat(value);
    if (isNaN(num)) return '0';
    return num.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    });
  };

  const handleColorSelect = (color: string) => {
    setBgColor(color);
    setShowColorPicker(false);
  };

  const resetToOriginal = () => {
    setBgColor('hsl(152, 76%, 36%)');
    setShowColorPicker(false);
  };

  const Button: React.FC<{
    children: React.ReactNode;
    onClick: () => void;
    className?: string;
    variant?: 'number' | 'operator' | 'equals' | 'percentage' | 'clear';
  }> = ({ children, onClick, className = '', variant = 'number' }) => {
    const baseClasses = "rounded-2xl text-2xl font-sf-pro transition-all duration-200 active:scale-95 font-medium";
    const variantClasses = {
      number: "text-white font-sf-pro",
      operator: "bg-white/15 backdrop-blur-sm border border-white/25 text-white font-sf-pro",
      equals: "bg-white text-gray-800 font-sf-pro",
      percentage: "bg-white/20 backdrop-blur-sm border border-white/30 text-white font-sf-pro",
      clear: "backdrop-blur-sm border border-blue-700/50 text-white flex items-center justify-center font-sf-pro"
    };

    let buttonStyle = {};
    if (variant === 'clear') {
      buttonStyle = { backgroundColor: '#070738' };
    } else if (variant === 'number') {
      buttonStyle = { backgroundColor: '#ffffff65' };
    }

    return (
      <button
        onClick={onClick}
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        style={buttonStyle}
      >
        {children}
      </button>
    );
  };

  const GearIcon = () => (
        d="M12.65 10C12.42 9.37 11.86 8.95 11.19 8.95H11.18C10.51 8.95 9.95 9.37 9.72 10L9.33 11.05C9.1 11.68 8.54 12.1 7.87 12.1C7.2 12.1 6.64 11.68 6.41 11.05L6.02 10C5.79 9.37 5.23 8.95 4.56 8.95C3.89 8.95 3.33 9.37 3.1 10L2.71 11.05C2.48 11.68 1.92 12.1 1.25 12.1C0.58 12.1 0.02 11.68 -0.21 11.05L-0.6 10C-0.83 9.37 -1.39 8.95 -2.06 8.95C-2.73 8.95 -3.29 9.37 -3.52 10L-3.91 11.05C-4.14 11.68 -4.7 12.1 -5.37 12.1C-6.04 12.1 -6.6 11.68 -6.83 11.05L-7.22 10C-7.45 9.37 -8.01 8.95 -8.68 8.95C-9.35 8.95 -9.91 9.37 -10.14 10L-10.53 11.05C-10.76 11.68 -11.32 12.1 -11.99 12.1C-12.66 12.1 -13.22 11.68 -13.45 11.05L-13.84 10C-14.07 9.37 -14.63 8.95 -15.3 8.95C-15.97 8.95 -16.53 9.37 -16.76 10" 
      {/* Simple 8-tooth gear */}
      <path 
        d="M12 2L13.5 4.5L16 3L16.5 6L19.5 6.5L18 9L21 10.5L19.5 12L21 13.5L18 15L19.5 17.5L16.5 18L16 21L13.5 19.5L12 22L10.5 19.5L8 21L7.5 18L4.5 17.5L6 15L3 13.5L4.5 12L3 10.5L6 9L4.5 6.5L7.5 6L8 3L10.5 4.5L12 2Z" 
        fill="white"
      />
      {/* Center hole */}
      <circle cx="12" cy="12" r="4" fill="none" stroke={bgColor} strokeWidth="8"/>
    </svg>
  );

  const getParenthesesButtonText = () => {
    const currentFormula = formula || display;
    const openParenCount = (currentFormula.match(/\(/g) || []).length;
    const closeParenCount = (currentFormula.match(/\)/g) || []).length;
    
    return openParenCount > closeParenCount ? ')' : '(';
  };

  return (
    <div 
      className="min-h-screen flex flex-col relative font-sf-pro"
      style={{ backgroundColor: bgColor }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-12 relative z-10">
        <button 
          className="p-2"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-white text-xl font-medium">Calculate</h1>
        <button 
          className="p-2 relative"
          onClick={() => setShowColorPicker(!showColorPicker)}
        >
          <GearIcon />
        </button>
      </div>

      {/* Color Picker Dropdown */}
      {showColorPicker && (
        <ColorPicker
          onColorSelect={handleColorSelect}
          onReset={resetToOriginal}
          onClose={() => setShowColorPicker(false)}
        />
      )}

      {/* Calculator Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 max-w-sm mx-auto w-full">
        {/* Display Area */}
        <div className="text-white mb-8 w-full">
          <div className={`text-lg opacity-75 min-h-[24px] mb-2 text-right font-sf-pro transition-all duration-300 ${isAnimating ? 'transform -translate-y-2 opacity-50' : ''}`}>
            {formula}
          </div>
          <div className={`text-6xl font-light leading-tight mb-4 text-right font-sf-pro transition-all duration-300 ${isAnimating ? 'transform translate-y-8 opacity-50' : ''}`}>
            {formatDisplay(display)}
          </div>
          <div className="text-sm opacity-75 text-right font-sf-pro">
            Your balance: ${balance.toLocaleString()} (available)
          </div>
        </div>

        {/* Percentage Buttons */}
        <div className="grid grid-cols-4 gap-2 mb-2 w-full">
          {[25, 50, 75, 100].map((percent) => (
            <Button
              key={percent}
              onClick={() => applyPercentage(percent)}
              className="h-12 text-lg"
              variant="percentage"
            >
              {percent}%
            </Button>
          ))}
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-4 gap-2 w-full">
          {/* Row 1 */}
          <Button onClick={() => inputOperation('/')} variant="operator" className="h-16">/</Button>
          <Button onClick={inputDecimal} variant="operator" className="h-16">.</Button>
          <Button onClick={inputParentheses} variant="operator" className="h-16">( )</Button>
          <Button onClick={() => inputOperation('%')} variant="operator" className="h-16">%</Button>

          {/* Row 2 */}
          <Button onClick={() => inputOperation('*')} variant="operator" className="h-16">*</Button>
          <Button onClick={() => inputNumber('1')} variant="number" className="h-16">1</Button>
          <Button onClick={() => inputNumber('2')} variant="number" className="h-16">2</Button>
          <Button onClick={() => inputNumber('3')} variant="number" className="h-16">3</Button>

          {/* Row 3 */}
          <Button onClick={() => inputOperation('+')} variant="operator" className="h-16">+</Button>
          <Button onClick={() => inputNumber('4')} variant="number" className="h-16">4</Button>
          <Button onClick={() => inputNumber('5')} variant="number" className="h-16">5</Button>
          <Button onClick={() => inputNumber('6')} variant="number" className="h-16">6</Button>

          {/* Row 4 */}
          <Button onClick={() => inputOperation('−')} variant="operator" className="h-16">−</Button>
          <Button onClick={() => inputNumber('7')} variant="number" className="h-16">7</Button>
          <Button onClick={() => inputNumber('8')} variant="number" className="h-16">8</Button>
          <Button onClick={() => inputNumber('9')} variant="number" className="h-16">9</Button>

          {/* Row 5 */}
          <Button onClick={clear} variant="clear" className="h-16">
            <ChevronLeft className="w-8 h-8" />
          </Button>
          <Button onClick={() => inputNumber('0')} variant="number" className="h-16">0</Button>
          <Button 
            onClick={calculate} 
            variant="equals"
            className="h-16 col-span-2"
          >
            =
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;