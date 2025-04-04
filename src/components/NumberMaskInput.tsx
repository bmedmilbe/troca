import React, { useState, ChangeEvent } from "react";

function NumberMaskInput(): JSX.Element {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/\D/g, ""); // Remove non-digits
    const formattedValue = value.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add commas

    setInputValue(formattedValue);
  };

  return (
    <div>
      <label htmlFor="numberInput">Enter Number:</label>
      <input
        type="text"
        id="numberInput"
        value={inputValue}
        onChange={handleInputChange}
      />
      <p>Formatted Value: {inputValue}</p>
    </div>
  );
}

export default NumberMaskInput;
