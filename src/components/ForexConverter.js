
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
  // convertedAmount,
  handleAmountChange,
}) {
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
