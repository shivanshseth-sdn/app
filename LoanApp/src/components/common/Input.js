import React from 'react';
import {
  View,
  Text,
  TextInput
} from 'react-native';

const Input = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
  return (
    <View style={styles.viewStyle}>
    <Text style={styles.labelStyle}>{label}</Text>
    <TextInput
      secureTextEntry={secureTextEntry}
      placeholder={placeholder}
      autoCorrect={false}
      underlineColorAndroid="transparent"
      style={styles.inputStyle}
      value={value}
      onChangeText={onChangeText} />
    </View>
  );
};

const styles = {
  inputStyle: {
    color: '#000',
    paddingLeft: 5,
    paddingRight: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 5,
    flex: 1
  },
  viewStyle: {
    height: 40,
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'


  }

};


export { Input };
