//src/components/ForexConverter.js
import React, { useEffect, useState } from 'react';
import formatDate from '../utils/formatDate';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function ForexConverter({
  forexData,
  destinationCurrency,
  selectedDate,
  onDestinationCurrencyChange,
  onDateChange,
  conversionAmount,
  handleAmountChange,
  onConversionResult,
}) {
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    // Ensure that necessary data is available before performing calculations
    if (forexData.length > 0 && selectedDate && destinationCurrency !== '') {
      const selectedDay = forexData.find((day) => day.date === formatDate(selectedDate));
      if (selectedDay && selectedDay.rates) {
        const destinationCurrencyData = selectedDay.rates.find(
          (rate) => rate.currency.iso3 === destinationCurrency
        );

        if (destinationCurrencyData) {
          const destinationRate = parseFloat(destinationCurrencyData.buy);
          const unitDestination = destinationCurrencyData.currency.unit || 1;

          const adjustedBuyRate = destinationRate / unitDestination;
          const newConvertedAmount = (conversionAmount * adjustedBuyRate).toFixed(2);

          // Check if the converted amount has changed before updating state
          if (newConvertedAmount !== (convertedAmount ? convertedAmount.amount : null)) {
            setConvertedAmount({
              amount: newConvertedAmount,
              buyRate: destinationRate,
              sellRate: parseFloat(destinationCurrencyData.sell),
            });

            // Callback to inform the parent component about the conversion result
            onConversionResult({
              amount: newConvertedAmount,
              buyRate: destinationRate,
              sellRate: parseFloat(destinationCurrencyData.sell),
            });
          }
        }
      }
    }
  }, [destinationCurrency, conversionAmount, forexData, selectedDate, convertedAmount, onConversionResult]);

  const renderDestinationCurrencyOptions = () => {
    const selectedDay = forexData.find((day) => day.date === formatDate(selectedDate));
    if (!selectedDay) return null;

    return selectedDay.rates.map((rate) => (
      <option key={rate.currency.iso3} value={rate.currency.iso3}>
        {rate.currency.name} ({rate.currency.unit})
      </option>
    ));
  };

  return (
    <div>
      <div>
        <label>
          Select Date:
          <DatePicker selected={selectedDate} onChange={onDateChange} />
        </label>
      </div>
      <div>
        <label>
          Enter Amount (NPR):
          <input
            type="number"
            value={conversionAmount}
            onChange={handleAmountChange}
          />
        </label>
      </div>
      <div>
        <label>
          Select Destination Currency:
          <select
            value={destinationCurrency}
            onChange={onDestinationCurrencyChange}
          >
            {renderDestinationCurrencyOptions()}
          </select>
        </label>
      </div>
    </div>
  );
}

export default ForexConverter;
