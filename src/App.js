import React, { useState, useEffect } from 'react';
import Header from './header/Header';
import ForexConverter from './components/ForexConverter';
import forexApi from './api/forexApi';
import './App.css';

function App() {
  const [forexData, setForexData] = useState([]);
  const [destinationCurrency, setDestinationCurrency] = useState('USD');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [conversionAmount, setConversionAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    // Fetch Forex Data
    const fetchData = async () => {
      try {
        const data = await forexApi.getForexData(selectedDate);
        setForexData(data);
      } catch (error) {
        console.error('Error fetching Forex data:', error);
      }
    };

    fetchData();
  }, [selectedDate]);

  const handleDestinationCurrencyChange = (event) => {
    setDestinationCurrency(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleAmountChange = (event) => {
    setConversionAmount(event.target.value);
  };

  const handleConversionResult = (result) => {
    setConvertedAmount(result);
  };

  return (
    <div className="App">
      <Header />
      <div className="Container">
        <ForexConverter
          forexData={forexData}
          destinationCurrency={destinationCurrency}
          selectedDate={selectedDate}
          onDestinationCurrencyChange={handleDestinationCurrencyChange}
          onDateChange={handleDateChange}
          conversionAmount={conversionAmount}
          handleAmountChange={handleAmountChange}
          onConversionResult={handleConversionResult}
        />
      </div>
      {/* Conversion Result */}
      {convertedAmount && (
        <div className="ConversionResult">
          <h2>Converted Result:</h2>
          <p>
            {conversionAmount} NPR is approximately {convertedAmount.amount} {destinationCurrency}
          </p>
          <p>Buy Rate: {convertedAmount.buyRate}</p>
          <p>Sell Rate: {convertedAmount.sellRate}</p>
        </div>
      )}
    </div>
  );
}

export default App;
