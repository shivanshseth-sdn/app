import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children }) => {
  const { buttonStyles, textStyle } = styles;
return (
  <TouchableOpacity style={buttonStyles} onPress={onPress} >
    <Text style={textStyle} > {children} </Text>
  </TouchableOpacity>

);
};

const styles = {
  buttonStyles: {
    flex: 1,
    alignSelf: 'stretch',
    borderRadius: 5,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: '#7ACBBC'
  },
  textStyle: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '100',
    paddingTop: 10,
    paddingBottom: 10
  }
};

export { Button };
