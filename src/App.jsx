import { useState, useEffect } from 'react';

function App() {
  const [amount, setAmount] = useState('');
  const [crypto, setCrypto] = useState('bitcoin'); // Crypto type
  const [price, setPrice] = useState(null); // Price in USD
  const [convertedAmount, setConvertedAmount] = useState('0.00'); // Conversion result
  const [isUsdToCrypto, setIsUsdToCrypto] = useState(false); // Default to Crypto to USD

  // Fetch price whenever crypto changes
  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=usd`);
        const data = await response.json();
        if (data[crypto]?.usd) {
          setPrice(data[crypto].usd);
        } else {
          console.error('Unexpected data format:', data);
          setPrice(null);
        }
      } catch (error) {
        console.error('Error fetching price:', error);
        setPrice(null);
      }
    };

    fetchPrice();
  }, [crypto]);

  // Handle direction toggle
  const toggleDirection = () => {
    setIsUsdToCrypto((prev) => !prev);
    setAmount('');
    setConvertedAmount('0.00');
  };

  // Reset values on crypto change
  const handleCryptoChange = (e) => {
    setCrypto(e.target.value);
    setAmount(''); // Reset input value
    setConvertedAmount('0.00'); // Reset converted amount
  };

  // Perform conversion based on the selected direction
  const handleConvert = () => {
    if (price && amount) {
      let result = '0.00';
      if (isUsdToCrypto) {
        result = (parseFloat(amount) / price).toFixed(6); // USD to Crypto
      } else {
        result = (parseFloat(amount) * price).toFixed(2); // Crypto to USD
      }
      setConvertedAmount(result);
    } else {
      setConvertedAmount('0.00');
    }
  };

/* filepath: /c:/Users/Zeus/crypto-tracker/src/App.jsx */
useEffect(() => {
  const container = document.querySelector('.background-animation');
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 5}s`;
    container.appendChild(particle);
  }
}, []);
  
  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
          <div className="background-animation"></div>
     
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md border border-gray-700 hover:border-green-500/50 transition-all duration-300">
        <h1 className="text-2xl font-bold text-gray-100 mb-6 font-Orbitron text-center">
          Crypto Converter
        </h1>

        <div className="space-y-4 ">
          <button
            onClick={toggleDirection}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors mb-4 font-Sora"
          >
            Switch to {isUsdToCrypto ? 'Crypto to USD' : 'USD to Crypto'}
          </button>

          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {isUsdToCrypto ? '$' : ''}
            </span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full font-Sora bg-gray-700 text-gray-100 border border-gray-600 rounded-lg pl-8 pr-4 py-2 focus:outline-none focus:border-green-500 transition-colors appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield] overflow-hidden text-ellipsis"
              placeholder={`Enter ${isUsdToCrypto ? 'USD' : 'Crypto'} amount`}
              min="0"
              step="0.01"
            />
            <span className="absolute bg-gray-700 right-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-Sora text-sm">
              {isUsdToCrypto ? 'USD' : crypto.toUpperCase()}
            </span>
          </div>

          <select
            value={crypto}
            onChange={handleCryptoChange}
            className="w-full bg-gray-700 text-gray-100 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-green-500 transition-colors font-Sora"
          >
            <option value="bitcoin">Bitcoin (BTC)</option>
            <option value="ethereum">Ethereum (ETH)</option>
            <option value="tether">Tether (USDT)</option>
          </select>

          <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
            <div className="text-sm text-gray-400 font-Sora">Converted Amount</div>
            <div className="text-xl font-bold text-green-500 overflow-hidden text-ellipsis font-Sora">
              {convertedAmount} {isUsdToCrypto ? crypto.toUpperCase() : 'USD'}
            </div>
          </div>

          <button
            onClick={handleConvert}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors font-Sora"
          >
            Convert
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
