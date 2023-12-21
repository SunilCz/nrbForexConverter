// App.js
import React, { useState, useEffect } from 'react';
import Header from './header/Header';
import ForexConverter from './components/ForexConverter';
import forexApi from './api/forexApi';
import formatDate from './utils/formatDate';
import './App.css';

function App() {
  const [forexData, setForexData] = useState([]);
  const [selectedCurrency] = useState('USD');
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

  useEffect(() => {
    // Calculate conversion result based on the new state
    if (forexData.length > 0) {
      const selectedDay = forexData.find((day) => day.date === formatDate(selectedDate));
      if (selectedDay && selectedDay.rates) {
        const destinationCurrencyData = selectedDay.rates.find(
          (rate) => rate.currency.iso3 === destinationCurrency
        );

        if (destinationCurrencyData) {
          const destinationRate = parseFloat(destinationCurrencyData.buy);
          const unitDestination = destinationCurrencyData.currency.unit || 1;

          const convertedAmount = convertCurrency(
            conversionAmount,
            destinationRate,
            unitDestination
          );

          setConvertedAmount({
            amount: convertedAmount,
            buyRate: destinationRate,
            sellRate: parseFloat(destinationCurrencyData.sell),
          });
        }
      }
    }
  }, [destinationCurrency, conversionAmount, forexData, selectedDate]);

  const convertCurrency = (amount, destinationRate, unitDestination) => {
    const adjustedBuyRate = destinationRate / unitDestination;
    return (amount * adjustedBuyRate).toFixed(2);
  };

  const handleDestinationCurrencyChange = (event) => {
    setDestinationCurrency(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleAmountChange = (event) => {
    setConversionAmount(event.target.value);
  };

  return (
    <div className="App">
      <Header />
      <div className="Container">
        <ForexConverter
          forexData={forexData}
          selectedCurrency={selectedCurrency}
          destinationCurrency={destinationCurrency}
          selectedDate={selectedDate}
          conversionAmount={conversionAmount}
          convertedAmount={convertedAmount}
          handleAmountChange={handleAmountChange}
          onDestinationCurrencyChange={handleDestinationCurrencyChange}
          onDateChange={handleDateChange}
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
