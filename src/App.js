//App.js
import React, { useState, useEffect } from 'react';
import Header from './header/Header';
import ForexConverter from './components/ForexConverter';
import ForexTable from './components/ForexTable';
import forexApi from './api/forexApi';
import DateSelector from './components/DateSelector';
import './App.css';

function App() {
  const [forexData, setForexData] = useState([]);
  const [destinationCurrency, setDestinationCurrency] = useState('USD');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [conversionAmount, setConversionAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  useEffect(() => {
    // Fetch Forex Data
    const fetchData = async () => {
      try {
        const data = await forexApi.getForexData(selectedDate, toDate); // Change endDate to toDate
        setForexData(data);
      } catch (error) {
        console.error('Error fetching Forex data:', error);
      }
    };
  
    fetchData();
  }, [selectedDate, toDate]);

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
      <Header title="Nepali Rupees to Other Currencies Converter" />
      <div className="LeftContainer">
        <ForexConverter
          forexData={forexData}
          destinationCurrency={destinationCurrency}
          selectedDate={selectedDate}
          onDestinationCurrencyChange={handleDestinationCurrencyChange}
          onDateChange={handleDateChange}
          conversionAmount={conversionAmount}
          handleAmountChange={handleAmountChange}
          onConversionResult={handleConversionResult}
          toDate={toDate}
        />
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

      <Header title="Forex Table" />
      <div className="RightContainer">
        <div className="DateSelectors">
          <div className="DateSelector1">
            <DateSelector label="From" selectedDate={fromDate} onDateChange={setFromDate} />
          </div>
          <div className="DateSelector2">
            <DateSelector label="To" selectedDate={toDate} onDateChange={setToDate} />
          </div>
        </div>
        <ForexTable fromDate={fromDate} toDate={toDate} />
      </div>
    </div>
  );
}

export default App;