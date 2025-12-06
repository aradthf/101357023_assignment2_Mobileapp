import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import InputField from '../components/InputField';

const API_KEY = 'fca_live_3uSnpdS1Xa8BdmVyM9tRVsv9S7koDW82A0BI2SoZ';

const MainScreen = ({ navigation }) => {
  const [baseCurrency, setBaseCurrency] = useState('CAD');
  const [targetCurrency, setTargetCurrency] = useState('');
  const [amount, setAmount] = useState('1');
  const [result, setResult] = useState(null);
  const [rate, setRate] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const isValidCurrencyCode = (code) => /^[A-Z]{3}$/.test(code);

  const isValidAmount = (value) => {
    const num = Number(value);
    return !isNaN(num) && num > 0;
  };

  const handleConvert = async () => {
      setErrorMessage('');
      setResult(null);
      setRate(null);

      if (!isValidCurrencyCode(baseCurrency)) {
        setErrorMessage(
          'Base currency must be a 3-letter uppercase code (e.g., CAD, USD).'
        );
        return;
      }

      if (!isValidCurrencyCode(targetCurrency)) {
        setErrorMessage('Destination currency must be a 3-letter uppercase code.');
        return;
      }

      if (!isValidAmount(amount)) {
        setErrorMessage('Amount must be a positive number.');
        return;
      }

      setLoading(true);

      try {
        const response = await fetch(
          `https://api.freecurrencyapi.com/v1/latest?apikey=${API_KEY}&base_currency=${baseCurrency}`
        );

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Invalid API key. Please check your key.');
          } else {
            throw new Error(`API request failed with status ${response.status}`);
          }
        }

        const json = await response.json();

        if (!json || !json.data) {
          throw new Error('Unexpected response format from API.');
        }

        const rateValue = json.data[targetCurrency];

        if (!rateValue) {
          throw new Error(
            `Currency ${targetCurrency} not found in API response. Please check the code.`
          );
        }

        const numericAmount = Number(amount);
        const converted = numericAmount * rateValue;

        setRate(rateValue);
        setResult(converted);
      } catch (error) {
        setErrorMessage(error.message || 'An unknown error occurred.');
      } finally {
        setLoading(false);
      }
    };

return (
    <View style={styles.container}>
      <InputField
        label="Base Currency (e.g., CAD)"
        value={baseCurrency}
        onChangeText={setBaseCurrency}
        placeholder="CAD"
      />

      <InputField
        label="Destination Currency (e.g., USD)"
        value={targetCurrency}
        onChangeText={setTargetCurrency}
        placeholder="USD"
      />

      <InputField
        label="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        placeholder="1"
      />

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}

      {loading ? (
        <ActivityIndicator size="large" style={{ marginVertical: 12 }} />
      ) : (
        <Button title="Convert" onPress={handleConvert} disabled={loading} />
      )}

      {result !== null && rate !== null && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>
            Exchange rate ({baseCurrency} → {targetCurrency}): {rate.toFixed(4)}
          </Text>
          <Text style={styles.resultText}>
            {amount} {baseCurrency} = {result.toFixed(4)} {targetCurrency}
          </Text>
        </View>
      )}

      <View style={{ marginTop: 24 }}>
        <Button
          title="Go to About Screen"
          onPress={() => navigation.navigate('About')}
        />
      </View>
    </View>
  );
};

