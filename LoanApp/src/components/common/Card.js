import React from 'react';
import { View, Text ,Platform} from 'react-native';


const Card = (props) => {
return (
  <View style={styles.containerStyles}>
  {props.children}
  </View>
);

};

const styles = {

  containerStyles: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#427E7C',
    backgroundColor:'#427E7C',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: (Platform.OS === 'ios') ? 1 : 0,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
  


  }

};

export { Card };
