import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  const buttons = [
    ['LIMPAR', 'DEL', '%', '/'],
    [7, 8, 9, '*'],
    [4, 5, 6, '-'],
    [1, 2, 3, '+'],
    [0, '.', '+/-', '='],
  ];

  const [currentNumber, setCurrentNumber] = useState('');
  const [lastNumber, setLastNumber] = useState(''); // Adicione esta linha

  function calculator() {
    const splitNumbers = currentNumber.split(' ');
    const firstNumber = parseFloat(splitNumbers[0]);
    const operator = splitNumbers[1];
    const secondNumber = parseFloat(splitNumbers[2]);
    let result = 0;

    if (operator === '+') {
      result = firstNumber + secondNumber;
    } else if (operator === '-') {
      result = firstNumber - secondNumber;
    } else if (operator === '*') {
      result = firstNumber * secondNumber;
    } else if (operator === '/') {
      result = firstNumber / secondNumber;
    } else if (operator === '%') {
      result = (firstNumber / 100) * secondNumber;
    }

    setCurrentNumber(result.toString());
  }

  function handleInput(buttonPressed) {
    if (
      typeof buttonPressed === 'number' ||
      buttonPressed === '.' ||
      buttonPressed === '0'
    ) {
      setCurrentNumber(currentNumber + buttonPressed.toString());
    } else if (buttonPressed === 'DEL') {
      setCurrentNumber(currentNumber.slice(0, -1));
    } else if (buttonPressed === 'LIMPAR') {
      setCurrentNumber('');
      setLastNumber('');
    } else if (buttonPressed === '+/-') {
      setCurrentNumber((-parseFloat(currentNumber)).toString());
    } else if (buttonPressed === '%') {
      setCurrentNumber(currentNumber + ' % ');
    } else if (buttonPressed === '=') {
      setLastNumber(currentNumber + ' = ');
      calculator();
    } else {
      setCurrentNumber(currentNumber + ' ' + buttonPressed + ' ');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.results}>
        <Text style={styles.historyText}>{lastNumber}</Text>
        <Text style={styles.resultText}>{currentNumber}</Text>
      </View>
      <View style={styles.buttons}>
        {buttons.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.buttonRow}>
            {row.map((button, columnIndex) => (
              <TouchableOpacity
                onPress={() => handleInput(button)}
                key={columnIndex.toString()}
                style={[
                  styles.button,
                  {
                    backgroundColor:
                      button === '=' ||
                        typeof button === 'number' ||
                        button === 'LIMPAR' ||
                        button === '.' ||
                        button === '+/-'
                        ? 'blue'
                        : 'blue',
                  },
                  button === '=' ? styles.equalButton : null,
                ]}>
                <Text
                  style={[
                    styles.textButton,
                    {
                      color:
                        button === 'DEL' ||
                          button === 'LIMPAR' ||
                          button === '%' ||
                          button === '/' ||
                          button === '*' ||
                          button === '-' ||
                          button === '+'
                          ? 'black'
                          : 'white',
                      fontSize: 30,
                    },
                  ]}>
                  {button}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
  },
  results: {
    flex: 2,
    justifyContent: 'flex-end',
    backgroundColor: 'silver',
    paddingRight: 10,
  },
  resultText: {
    color: '#282F38',
    fontSize: 32,
    fontWeight: 'bold',
    padding: 12,
    textAlign: 'right',
  },
  historyText: {
    color: '#7c7c7c',
    fontSize: 20,
    marginRight: 10,
    alignSelf: 'flex-end',
  },
  buttons: {
    flex: 5,
    flexDirection: 'column',
  },
  buttonRow: {
    flex: 1,
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: '#ccc',
  },
  textButton: {
    fontSize: 30,
  },
  equalButton: {
    backgroundColor: 'silver',
  },
});
