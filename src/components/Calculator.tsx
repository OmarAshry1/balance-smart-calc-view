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
    setButtonPressed('equals');
    setTimeout(() => setButtonPressed(null), 150);
    
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
    setButtonPressed('clear');
    setTimeout(() => setButtonPressed(null), 150);
    
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
    setButtonPressed(`percent-${percent}`);
    setTimeout(() => setButtonPressed(null), 150);
    
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
    id?: string;
  }> = ({ children, onClick, className = '', variant = 'number' }) => {
    const isPressed = buttonPressed === id;
    const baseClasses = `rounded-2xl text-2xl font-sf-pro transition-all duration-150 font-medium ${
      isPressed ? 'scale-95 brightness-90' : 'hover:scale-105 active:scale-95'
    }`;
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
    setButtonPressed(`op-${nextOperation}`);
      {/* 8-tooth gear shape */}
      <g fill="white">
        {/* Main gear body */}
        <circle cx="12" cy="12" r="8" />
        {/* 8 teeth around the gear */}
        <rect x="11" y="2" width="2" height="3" />
        <rect x="11" y="19" width="2" height="3" />
        <rect x="2" y="11" width="3" height="2" />
        <rect x="19" y="11" width="3" height="2" />
        <rect x="16.5" y="4.5" width="2" height="2" transform="rotate(45 17.5 5.5)" />
        <rect x="5.5" y="4.5" width="2" height="2" transform="rotate(-45 6.5 5.5)" />
        <rect x="16.5" y="17.5" width="2" height="2" transform="rotate(-45 17.5 18.5)" />
        <rect x="5.5" y="17.5" width="2" height="2" transform="rotate(45 6.5 18.5)" />
      </g>
      {/* Center hole */}
      <circle cx="12" cy="12" r="3" fill={bgColor} />
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
          className={`p-2 relative transition-all duration-200 rounded-full ${
            gearPressed ? 'scale-90 bg-white/20' : 'hover:scale-110 active:scale-90'
          }`}
          onClick={() => {
            setGearPressed(true);
            setTimeout(() => setGearPressed(false), 150);
            setShowColorPicker(!showColorPicker);
          }}
        >
          <GearIcon />
        </button>
      </div>

      {/* Color Picker Dropdown */}
      <div className={`transition-all duration-300 ${
        showColorPicker ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
      }`}>
        <ColorPicker
          onColorSelect={handleColorSelect}
          onReset={resetToOriginal}
          onClose={() => setShowColorPicker(false)}
        />
      </div>

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
              id={`percent-${percent}`}
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
          <Button id="op-/" onClick={() => inputOperation('/')} variant="operator" className="h-16">/</Button>
          <Button id="decimal" onClick={inputDecimal} variant="operator" className="h-16">.</Button>
          <Button id="parentheses" onClick={inputParentheses} variant="operator" className="h-16">( )</Button>
          <Button id="op-%" onClick={() => inputOperation('%')} variant="operator" className="h-16">%</Button>

          {/* Row 2 */}
          <Button id="op-*" onClick={() => inputOperation('*')} variant="operator" className="h-16">*</Button>
          <Button id="num-1" onClick={() => inputNumber('1')} variant="number" className="h-16">1</Button>
          <Button id="num-2" onClick={() => inputNumber('2')} variant="number" className="h-16">2</Button>
          <Button id="num-3" onClick={() => inputNumber('3')} variant="number" className="h-16">3</Button>

          {/* Row 3 */}
          <Button id="op-+" onClick={() => inputOperation('+')} variant="operator" className="h-16">+</Button>
          <Button id="num-4" onClick={() => inputNumber('4')} variant="number" className="h-16">4</Button>
          <Button id="num-5" onClick={() => inputNumber('5')} variant="number" className="h-16">5</Button>
          <Button id="num-6" onClick={() => inputNumber('6')} variant="number" className="h-16">6</Button>

          {/* Row 4 */}
          <Button id="op-−" onClick={() => inputOperation('−')} variant="operator" className="h-16">−</Button>
          <Button id="num-7" onClick={() => inputNumber('7')} variant="number" className="h-16">7</Button>
          <Button id="num-8" onClick={() => inputNumber('8')} variant="number" className="h-16">8</Button>
          <Button id="num-9" onClick={() => inputNumber('9')} variant="number" className="h-16">9</Button>

          {/* Row 5 */}
          <Button id="clear" onClick={clear} variant="clear" className="h-16">
            <ChevronLeft className="w-8 h-8" />
          </Button>
          <Button id="num-0" onClick={() => inputNumber('0')} variant="number" className="h-16">0</Button>
          <Button 
            id="equals"
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