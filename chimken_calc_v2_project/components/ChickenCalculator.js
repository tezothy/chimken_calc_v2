import React, { useState, useEffect } from 'react';

const ChickenCalculator = () => {
  const [dollarAmount, setDollarAmount] = useState('');
  const [displayAmount, setDisplayAmount] = useState('');
  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);
  
  // Chicken sandwich price - you can update this as needed
  const CHICKEN_PRICE = 2.29;
  
  useEffect(() => {
    if (result !== null) {
      setShowResult(true);
    }
  }, [result]);
  
  const handleInputChange = (e) => {
    let value = e.target.value;
    
    // Remove any non-numeric characters except decimal point
    value = value.replace(/[^\d.]/g, '');
    
    // Ensure only one decimal point
    const parts = value.split('.');
    if (parts.length > 2) {
      value = parts[0] + '.' + parts.slice(1).join('');
    }
    
    // Limit to 2 decimal places
    if (parts.length > 1 && parts[1].length > 2) {
      value = parts[0] + '.' + parts[1].substring(0, 2);
    }
    
    setDollarAmount(value);
  };
  
  const handleCalculate = () => {
    // Reset show result to trigger animation on new calculations
    setShowResult(false);
    
    const amount = parseFloat(dollarAmount);
    if (isNaN(amount) || amount < 0) {
      setResult(null);
      return;
    }
    
    // Save the current dollar amount for display purposes
    setDisplayAmount(dollarAmount);
    
    // Calculate total chicken sandwiches (as a decimal)
    const totalChickens = amount / CHICKEN_PRICE;
    
    // Round down to nearest whole number
    const wholeChickens = Math.floor(totalChickens);
    
    // Calculate leftover money
    const leftoverMoney = amount - (wholeChickens * CHICKEN_PRICE);
    
    // Small delay to ensure animation triggers properly
    setTimeout(() => {
      setResult({
        wholeChickens,
        leftoverMoney: leftoverMoney.toFixed(2)
      });
    }, 100);
  };
  
  // Format number with commas
  const formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  // Get formatted display value for input
  const getDisplayValue = () => {
    if (!dollarAmount) return '';
    
    // For display purposes only, format with commas if over 1000
    const numericValue = parseFloat(dollarAmount);
    if (!isNaN(numericValue) && numericValue >= 1000) {
      // Split by decimal point to handle decimals correctly
      const parts = dollarAmount.split('.');
      const formattedInteger = formatNumberWithCommas(parts[0]);
      return parts.length > 1 ? `${formattedInteger}.${parts[1]}` : formattedInteger;
    }
    
    return dollarAmount;
  };
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">How Many McChimkens?</h1>
        
        <div className="mb-6">
          <label htmlFor="dollarAmount" className="mb-2 block text-sm font-medium text-gray-700">
            Enter Dollar Amount:
          </label>
          <div className="relative mt-1 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500">$</span>
            </div>
            <input
              type="text"
              id="dollarAmount"
              className="block w-full rounded-md border border-gray-300 pl-7 pr-12 py-2 text-black font-medium focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="0.00"
              value={getDisplayValue()}
              onChange={handleInputChange}
            />
          </div>
        </div>
        
        <button
          onClick={handleCalculate}
          className="w-full rounded-md bg-yellow-500 py-2 px-4 font-medium text-white hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
        >
          Calculate
        </button>
        
        {result !== null && (
          <div 
            className={`mt-6 rounded-md bg-gray-50 p-4 transition-all duration-500 ease-in-out transform ${
              showResult ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
            }`}
          >
            <div className="flex flex-col items-center">
              <img 
                src="public/static/images/mchimken.png" 
                alt="McChicken sandwich" 
                className="w-24 h-24 mb-3 object-contain"
                onError={(e) => {
                console.log("Image failed to load:", e);
                 e.target.src = "https://via.placeholder.com/150"; // Fallback image
                  }}
              />
              <div className="text-sm text-gray-700 text-center">
                <p className="font-medium">Result:</p>
                <p className="mt-1">
                  Damn, that&apos;s like <span className="font-bold text-yellow-600">{formatNumberWithCommas(result.wholeChickens)}</span> McChimkens.</p>
                <p className="mt-2 text-xs text-gray-500">
                  ...with ${result.leftoverMoney} left over.
                </p>
                <div className="mt-4 text-xs text-gray-500 pt-3 border-t border-gray-200">
                  <p>Based on an estimated chicken sandwich price of ${CHICKEN_PRICE}</p>
                  <p>Price may vary by location</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChickenCalculator;