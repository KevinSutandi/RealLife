import * as React from 'react';
import { Text, StyleSheet, View, TextInput } from 'react-native';

const FormInputs = ({ placeholder, onChangeText}) => {
  return (
    <>
      <View style={styles.textInput}>
        <View style={styles.label}>
          <Text style={[styles.label1, styles.label1Typo]}>{placeholder}</Text>
        </View>
        <View style={styles.baseInputField}>
          <TextInput
            style={styles.inputPlaceholder}
            onChangeText={onChangeText}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  label1Typo: {
    textAlign: 'left',
    color: 'white',
    lineHeight: 24,
    fontSize: 16,
  },
  label1: {
    position: 'absolute',
    marginTop: -12,
    top: '50%',
    left: '0%',
    fontWeight: '500',
  },
  label: {
    width: 343,
    height: 24,
  },
  inputPlaceholder: {
    flex: 1,
    paddingHorizontal: 20,
    fontSize: 16,
    color: 'white',
  },
  baseInputField: {
    alignSelf: 'stretch',
    borderRadius: 100,
    backgroundColor: '#333333',
    height: 48,
    marginTop: 4,
  },
  textInput: {
    width: '100%',
    marginVertical: 7,
  },
});

export default FormInputs;