//src/components/ConversionResult.js

import React from 'react';

function ConversionResult({ conversionAmount, convertedAmount, destinationCurrency }) {
  if (convertedAmount === null) return null;

  return (
    <div className="ConversionResult">
      <h2>Conversion Result:</h2>
      <p>
        {conversionAmount} NPR is approximately {convertedAmount.amount} {destinationCurrency}
      </p>
      <p>Buy Rate: {convertedAmount.buyRate}</p>
      <p>Sell Rate: {convertedAmount.sellRate}</p>
    </div>
  );
}

export default ConversionResult;
