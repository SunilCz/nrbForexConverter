// src/components/ForexTable.js
import React from 'react';

function ForexTable({ forexData }) {
  // Your sorting logic here

  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Currency</th>
          <th>Buy Rate</th>
          <th>Sell Rate</th>
        </tr>
      </thead>
      <tbody>
        {forexData.map((day) =>
          day.rates.map((rate) => (
            <tr key={`${day.date}-${rate.currency.iso3}`}>
              <td>{day.date}</td>
              <td>{rate.currency.name}</td>
              <td>{rate.buy}</td>
              <td>{rate.sell}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default ForexTable;
