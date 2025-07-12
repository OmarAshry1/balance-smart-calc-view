
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calculator } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Dummy Financial App
        </h1>
        <button
          onClick={() => navigate('/calculator')}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg transition-all duration-200 flex items-center gap-3 mx-auto"
        >
          <Calculator className="w-6 h-6" />
          Open Calculator
        </button>
      </div>
    </div>
  );
};

export default Home;
