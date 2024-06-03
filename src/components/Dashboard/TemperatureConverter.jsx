import React, { useState } from 'react';
import { Input, Button } from 'antd';

const TemperatureConverter = () => {
  const [celsius, setCelsius] = useState('');
  const [fahrenheit, setFahrenheit] = useState('');

  const handleCelsiusChange = (e) => {
    const c = e.target.value;
    setCelsius(c);
    setFahrenheit((c * 9 / 5) + 32);
  };

  const handleFahrenheitChange = (e) => {
    const f = e.target.value;
    setFahrenheit(f);
    setCelsius((f - 32) * 5 / 9);
  };

  const handleReset = () => {
    setCelsius('')
    setFahrenheit('')
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <h2 style={{ textAlign: 'center' }}>Temperature converter</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', width: '50%' }}>
        <Input type='number'
          placeholder="Celsius"
          value={celsius}
          onChange={handleCelsiusChange}
        />
        <Input type='number'
          placeholder="Fahrenheit"
          value={fahrenheit}
          onChange={handleFahrenheitChange}
        />
        <Button block danger type="primary" onClick={handleReset}>Reset</Button>
      </div>
    </div>
  );
};

export default TemperatureConverter;