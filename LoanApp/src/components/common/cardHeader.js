import React from 'react';
import { View } from 'react-native';


const CardHeader = (props) => {
  return (
    <View style={styles.cardConatiner}>
      {props.children}
    </View>
  );
};
const styles = {
  cardConatiner: {
    borderBottomWidth: 2,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative'


  }
};
export { CardHeader };
