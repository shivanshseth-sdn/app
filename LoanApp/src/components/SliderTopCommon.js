import { View, Text, Image,Platform } from 'react-native';
import React from 'react';

const SliderTopCommon = ({ source, title, subtitle }) => {
  return (
    <View style={styles.container}>
    <Image style={{ width: 150, height: 150 }} source={source} />
    <Text style={styles.titleStyle}>{title}</Text>
    <View style={styles.subtitleContainer}>
    <Text style={styles.subtitleStyle}>{subtitle}</Text>
    </View>
    </View>
  );
};

const styles = {
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginBottom: 100
  },

  titleStyle: {
    marginTop: 60,
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    fontFamily:'FuturaStd-Book'

  },
  subtitleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,

   


  },
  subtitleStyle: {
    fontSize: 15,
    color: 'white',
    marginTop: 10,
    paddingLeft:10,
    paddingRight:10,
    textAlign: 'center',
    fontFamily:'FuturaStd-Book',
    lineHeight:(Platform.OS === 'ios') ? 0 : 25,

   
  }
};

export default SliderTopCommon;
