import React, { useState, useEffect } from "react";

import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";

function App() {
  const denominations: number[] = [5000, 2000, 1000, 500, 200, 100, 50];
  const coins: number[] = [100, 50, 10, 5, 2, 1];

  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [selectedCurrency, setSelectedCurrency] = useState<string>('RUB'); // Default currency is RUB
  const controls = useAnimation();

  // Conversion rates (replace with real rates)
  const conversionRates: Record<string, number> = {
    RUB: 1,
    EUR: 0.012, // Replace with the correct conversion rate
    USD: 0.014, // Replace with the correct conversion rate
  };

  const exchangeMoney = (amount: number, currency: string): string => {
    const convertedAmount = amount * conversionRates[currency];
    let remainingAmount = Math.floor(convertedAmount);
    let result: string = '';

    denominations.forEach((denomination) => {
      if (remainingAmount >= denomination) {
        const count = Math.floor(remainingAmount / denomination);
        result += `${denomination} ${currency} - ${count} купюр\n`;
        remainingAmount %= denomination;
      }
    });

    if (remainingAmount > 0) {
      result += `Осталось: ${remainingAmount} ${currency}\n`;
    }

    const cents = Math.floor((convertedAmount - Math.floor(convertedAmount)) * 100);
    let remainingCents = cents;

    if (cents > 0) {
      // result += '\nКопеек/центов:\n';
      result += '\n\n';
      coins.forEach((coin) => {
        while (remainingCents >= coin) {
          result += `${coin} копеек/центов\n`;
          remainingCents -= coin;
        }
      });
    }

    return result.trim(); // Remove leading/trailing whitespaces
  };

  const handleButtonClick = () => {
    const inputValue: number = parseFloat(input);
    if (!isNaN(inputValue)) {
      const result: string = exchangeMoney(inputValue, selectedCurrency);
      setOutput(result);
    } else {
      setOutput('Please enter a valid monetary amount');
    }
  };

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 1.5 },
    });
  }, [controls]);

  return (
    <Container initial={{ opacity: 0, y: -50 }} animate={controls}>
      <Input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Введите число"
      />
      <SelectCurrency value={selectedCurrency} onChange={(e) => setSelectedCurrency(e.target.value)}>
        <option value="RUB">RUB</option>
        <option value="EUR">EUR</option>
        <option value="USD">USD</option>
        {/* Add more currency options as needed */}
      </SelectCurrency>
      <ButtonContainer>
        <Button onClick={handleButtonClick} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          Обменять
        </Button>
      </ButtonContainer>
      <Output>{output}</Output>
    </Container>
  );
}

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  outline: none;
`;

const SelectCurrency = styled.select`
  margin-bottom: 10px;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  outline: none;
`;

const ButtonContainer = styled.div`
  margin-bottom: 10px;
`;

const Button = styled(motion.button)`
  padding: 12px;
  font-size: 16px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  outline: none;

  &:hover {
    background-color: #45a049;
  }
`;

const Output = styled.div`
  margin-top: 20px;
  font-size: 18px;
  white-space: pre-line;
`;

export default App;
