import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About This App</Text>

      <Text style={styles.text}>Name: Arad Tahmasebifar</Text>
      <Text style={styles.text}>Student ID: 101357023</Text>

      <Text style={[styles.text, { marginTop: 16 }]}>
        This application converts an amount from one currency to another using live exchange
        rates from a currency API. It also displays the exchange rate used for the conversion.
      </Text>
    </View>
  );
};
