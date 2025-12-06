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