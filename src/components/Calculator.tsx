import React, { useState, useEffect } from 'react';
import { ArrowLeft, Settings, ChevronLeft } from 'lucide-react';
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
  const [animateResult, setAnimateResult] = useState(false);

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
      const newValue = performCalculation();
      setDisplay(String(newValue));
      setFormula(`${previousValue} ${operation} ${inputValue} =`);
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
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
    const baseClasses = "rounded-2xl text-xl font-sf-pro transition-transform duration-200 hover:scale-105";
    const variantClasses = {
      number: "text-white font-sf-pro-thin",
      operator: "bg-white/15 backdrop-blur-sm border border-white/25 text-white font-sf-pro-thin",
      equals: "bg-white text-gray-800 font-sf-pro-thin",
      percentage: "bg-white/20 backdrop-blur-sm border border-white/30 text-white font-sf-pro-thin",
      clear: "backdrop-blur-sm border border-blue-700/50 text-white flex items-center justify-center font-sf-pro-thin"
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

  const getParenthesesButtonText = () => {
    const currentFormula = formula || display;
    const openParenCount = (currentFormula.match(/\(/g) || []).length;
    const closeParenCount = (currentFormula.match(/\)/g) || []).length;
    
    return openParenCount > closeParenCount ? ')' : '(';
  };

  // Safe mathematical expression evaluator
  const evaluateExpression = (expr: string): number => {
    // Remove whitespace and validate input
    const cleanExpr = expr.replace(/\s/g, '');
    
    // Validate that expression only contains allowed characters
    const allowedChars = /^[0-9+\-*/.()%]+$/;
    if (!allowedChars.test(cleanExpr)) {
      throw new Error('Invalid characters in expression');
    }
    
    // Replace − with standard minus sign
    const normalizedExpr = cleanExpr.replace(/−/g, '-');
    
    // Simple recursive descent parser for basic math expressions
    let index = 0;
    
    const parseNumber = (): number => {
      let numStr = '';
      while (index < normalizedExpr.length && /[0-9.]/.test(normalizedExpr[index])) {
        numStr += normalizedExpr[index++];
      }
      return parseFloat(numStr) || 0;
    };
    
    const parseFactor = (): number => {
      if (normalizedExpr[index] === '(') {
        index++; // skip '('
        const result = parseExpression();
        index++; // skip ')'
        return result;
      }
      
      if (normalizedExpr[index] === '-') {
        index++; // skip '-'
        return -parseFactor();
      }
      
      if (normalizedExpr[index] === '+') {
        index++; // skip '+'
        return parseFactor();
      }
      
      return parseNumber();
    };
    
    const parseTerm = (): number => {
      let result = parseFactor();
      
      while (index < normalizedExpr.length && /[*/%]/.test(normalizedExpr[index])) {
        const operator = normalizedExpr[index++];
        const factor = parseFactor();
        
        if (operator === '*') {
          result *= factor;
        } else if (operator === '/') {
          if (factor === 0) throw new Error('Division by zero');
          result /= factor;
        } else if (operator === '%') {
          result %= factor;
        }
      }
      
      return result;
    };
    
    const parseExpression = (): number => {
      let result = parseTerm();
      
      while (index < normalizedExpr.length && /[+-]/.test(normalizedExpr[index])) {
        const operator = normalizedExpr[index++];
        const term = parseTerm();
        
        if (operator === '+') {
          result += term;
        } else if (operator === '-') {
          result -= term;
        }
      }
      
      return result;
    };
    
    const result = parseExpression();
    
    // Ensure we've consumed the entire expression
    if (index < normalizedExpr.length) {
      throw new Error('Invalid expression syntax');
    }
    
    return result;
  };

  const handleButtonPress = (value: string) => {
    switch (value) {
      case '=':
        try {
          setAnimateResult(true);
          const result = evaluateExpression(formula);
          setDisplay(result.toString());
          setFormula('');
          setTimeout(() => setAnimateResult(false), 300);
        } catch (error) {
          setDisplay('Error');
          setFormula('');
        }
        break;
      default:
        if (display === '0' && !isNaN(Number(value))) {
          setDisplay(value);
          setFormula(value);
        } else {
          setDisplay(prev => prev + value);
          setFormula(prev => prev + value);
        }
        break;
    }
  };

  useEffect(() => {
    if (display !== '0') {
      setAnimateResult(true);
      const timer = setTimeout(() => setAnimateResult(false), 300);
      return () => clearTimeout(timer);
    }
  }, [display]);

  return (
    <div 
      className="min-h-screen flex flex-col relative font-sf-pro"
      style={{ backgroundColor: bgColor }}
    >
      <div className="page-transition">
        {/* Header */}
        <div className="flex items-center justify-between p-4 pt-12">
          <button 
            onClick={() => navigate('/')}
            className="p-2 transition-transform duration-200 hover:scale-105"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-white text-xl font-medium">Calculate</h1>
          <button 
            onClick={() => setShowColorPicker(!showColorPicker)}
            className="p-2 transition-transform duration-200 hover:scale-105"
          >
            <Settings className="w-6 h-6 text-white" />
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
          <div className="text-lg opacity-75 min-h-[24px] mb-2 text-right font-sf-pro">
            {formula}
          </div>
          <div className="text-6xl font-light leading-tight mb-4 text-right font-sf-pro">
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
                className="h-12"
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
    </div>
  );
};

export default Calculator;
