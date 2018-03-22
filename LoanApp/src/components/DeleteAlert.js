import { View, Text, Image ,Dimensions,TouchableOpacity,Platform} from 'react-native';
import React from 'react';

const window = Dimensions.get('window');
const popupHeigh=0;

const DeleteAlert = ({title, subtitle,onPressYes,onPressNo}) => {


  return (

    <View style={styles.container}>
      <View style={styles.menuItemContainer}>
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitleStyle}>{subtitle}</Text>
        </View>

        <View style={styles.buttonViewStyle}>

            <View style={{flexDirection:'row'}}>

              <TouchableOpacity style={styles.buttonLogin}
                  onPress={onPressYes}
                  >
                  <Text style={styles.buttonTextStyle}>Yes</Text>
              </TouchableOpacity>

               <TouchableOpacity style={styles.buttonLogin}
                  onPress={onPressNo}
                  >
                  <Text style={styles.buttonTextStyle}>No</Text>
              </TouchableOpacity>

            </View>

          </View>

      </View>
    </View>
  );
};

const styles = {

  container:{
    flex:1,
    width: window.width,
    backgroundColor:'#757D7F81',
    alignItems: 'center', 
    justifyContent: 'center', 
   

  },
 
  menuItemContainer:{
     width: window.width*0.8,
     backgroundColor:'#fff',
     alignItems: 'center', 
     borderRadius: 5,
     
  },

  lineView:{
     width: window.width*0.8,
     height: 1,
     backgroundColor:'#407D7B',
   
  },



  titleStyle: {
    marginTop: 10,
    color: '#407D7B',
    fontSize: 18,
    fontWeight: '500',
    backgroundColor:'transparent',
    fontFamily:'FuturaStd-Book'

  },
  subtitleContainer: {

    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    marginBottom:(Platform.OS === 'ios') ? 50 : 45,

  
  },
  subtitleStyle: {
    fontSize: 14,
    color: '#000',
    paddingLeft:10,
    paddingRight:10,
    paddingTop:10,
    paddingBottom:15,
    textAlign: 'center',
    fontFamily:'FuturaStd-Book',
    backgroundColor:'transparent',
    lineHeight:(Platform.OS === 'ios') ? 0 : 25,


   
  },

    buttonViewStyle:{
    position:'absolute',
    paddingBottom:10,
    bottom:5,

   
  },

  buttonLogin:{
    width: window.width*0.3,
    height: 35,
    borderRadius: 5,
    marginRight:10,
    marginLeft:10,
    paddingTop:(Platform.OS === 'ios') ? 5 : 0,
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#7ACBBC'},

  buttonTextStyle:{
        color:'#ffffff',
        fontSize: 18,
        fontFamily:'FuturaStd-Book',
        alignSelf: 'center',
       
    },
};

export default DeleteAlert;
