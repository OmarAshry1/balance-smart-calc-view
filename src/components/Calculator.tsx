
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Settings } from 'lucide-react';

interface CalculatorProps {
  balance?: number;
}

const Calculator: React.FC<CalculatorProps> = ({ balance = 24757.22 }) => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [calculation, setCalculation] = useState('');

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
      setCalculation(`${inputValue} ${nextOperation}`);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = performCalculation();

      setDisplay(String(newValue));
      setPreviousValue(newValue);
      setCalculation(`${newValue} ${nextOperation}`);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const performCalculation = () => {
    const prev = previousValue || 0;
    const current = parseFloat(display);

    switch (operation) {
      case '+':
        return prev + current;
      case '−':
        return prev - current;
      case '×':
        return prev * current;
      case '÷':
        return current !== 0 ? prev / current : 0;
      default:
        return current;
    }
  };

  const calculate = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = performCalculation();
      setDisplay(String(newValue));
      setCalculation(`${previousValue} ${operation} ${inputValue} =`);
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
    setCalculation('');
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
    setCalculation(`${percent}% of $${balance.toLocaleString()}`);
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

  const Button: React.FC<{
    children: React.ReactNode;
    onClick: () => void;
    className?: string;
    variant?: 'default' | 'operator' | 'equals';
  }> = ({ children, onClick, className = '', variant = 'default' }) => {
    const baseClasses = "calc-button rounded-xl text-lg font-medium transition-all duration-200 active:scale-95";
    const variantClasses = {
      default: "text-white",
      operator: "text-white",
      equals: "bg-white text-gray-800 shadow-lg"
    };

    return (
      <button
        onClick={onClick}
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      >
        {children}
      </button>
    );
  };

  return (
    <div className="calc-gradient min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-12">
        <button className="p-2">
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-white text-xl font-medium">Calculate</h1>
        <button className="p-2">
          <Settings className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Display Area */}
      <div className="flex-1 px-6 py-8">
        <div className="text-white text-right mb-4">
          <div className="text-lg opacity-75 min-h-[24px]">
            {calculation}
          </div>
          <div className="text-5xl font-light leading-tight">
            {formatDisplay(display)}
          </div>
        </div>

        <div className="text-white text-center opacity-75 text-sm mt-8">
          Your balance: ${balance.toLocaleString()} (available)
        </div>

        {/* Percentage Buttons */}
        <div className="grid grid-cols-4 gap-3 mt-8 mb-6">
          {[25, 50, 75, 100].map((percent) => (
            <Button
              key={percent}
              onClick={() => applyPercentage(percent)}
              className="h-12"
            >
              {percent}%
            </Button>
          ))}
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-4 gap-3 max-w-sm mx-auto">
          {/* Row 1 */}
          <Button onClick={() => inputOperation('÷')} className="h-16">÷</Button>
          <Button onClick={inputDecimal} className="h-16">.</Button>
          <Button onClick={() => inputOperation('(')} className="h-16">(</Button>
          <Button onClick={() => inputOperation('%')} className="h-16">%</Button>

          {/* Row 2 */}
          <Button onClick={() => inputOperation('×')} className="h-16">×</Button>
          <Button onClick={() => inputNumber('1')} className="h-16">1</Button>
          <Button onClick={() => inputNumber('2')} className="h-16">2</Button>
          <Button onClick={() => inputNumber('3')} className="h-16">3</Button>

          {/* Row 3 */}
          <Button onClick={() => inputOperation('+')} className="h-16">+</Button>
          <Button onClick={() => inputNumber('4')} className="h-16">4</Button>
          <Button onClick={() => inputNumber('5')} className="h-16">5</Button>
          <Button onClick={() => inputNumber('6')} className="h-16">6</Button>

          {/* Row 4 */}
          <Button onClick={() => inputOperation('−')} className="h-16">−</Button>
          <Button onClick={() => inputNumber('7')} className="h-16">7</Button>
          <Button onClick={() => inputNumber('8')} className="h-16">8</Button>
          <Button onClick={() => inputNumber('9')} className="h-16">9</Button>

          {/* Row 5 */}
          <Button onClick={clear} className="h-16 bg-gray-800 text-white">C</Button>
          <Button onClick={() => inputNumber('0')} className="h-16">0</Button>
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
