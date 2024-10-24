import React, { useState } from 'react';
import './App.css';

function add(numbers) {
  if (numbers === "") {
    return 0;
  }

  const checkForNegatives = (numbersArray) => {
    const negatives = numbersArray.filter(num => num < 0);
    if (negatives.length > 0) {
      throw new Error(`Negative numbers not allowed: ${negatives.join(", ")}`);
    }
  };

  let delimiter = /,|\n/;
  if (numbers.startsWith("//")) {
    const customDelimiterPattern = /^\/\/(.+)\n/;
    const match = numbers.match(customDelimiterPattern);
    if (match) {
      delimiter = new RegExp(match[1]);
      numbers = numbers.replace(customDelimiterPattern, "");
    }
  }

  const numberArray = numbers.split(delimiter).map(num => parseInt(num));
  checkForNegatives(numberArray);

  return numberArray.reduce((sum, num) => sum + (isNaN(num) ? 0 : num), 0);
}

function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleCalculate = () => {
    try {
      setError(null);
      const sum = add(input);
      setResult(sum);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="App">
      <h1>String Calculator</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter numbers (e.g., 1,2 or //;\n1;2)"
      />
      <button onClick={handleCalculate}>Calculate</button>

      {error && <p className="error">{error}</p>}
      {result !== null && !error && <p>Result: {result}</p>}
    </div>
  );
}

export default App;
