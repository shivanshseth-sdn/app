const React = require('react');
const {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  AsyncStorage,
  TouchableOpacity,
} = require('react-native');
const { Component } = React;

const window = Dimensions.get('window');


const styles = StyleSheet.create({

  menuItemContainer:{
     width: window.width*0.4,
     height: window.height*0.15,
     backgroundColor:'#FFFFFF',
     justifyContent:'center',
     alignItems: 'center', 
     borderRadius: 5
  },
 
 
 

  itemContainer:{

    padding:10,
    alignItems: 'center',

  },
 
  contentText: {
    color:'#407D7B',
    fontSize: 16,
    fontFamily:'FuturaStd-Book',
    fontWeight: '400',
    paddingLeft:10
  },


});

module.exports = class CreatePinDailog extends Component {
 

  constructor( props ) {
    super( props );
   
   
  }



  render() {
    return (

     
        <View style={styles.menuItemContainer}>
      
              <TouchableOpacity onPress={this.props.onPress}>
                <View style={styles.itemContainer}>
                    <Text style={styles.contentText}>
                      Reset Pin?
                    </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.props.onPressForgot}>
                <View style={styles.itemContainer}>
                  <Text style={styles.contentText}>
                    Forgot Pin?
                  </Text>
                </View>
              </TouchableOpacity>

        </View>
         
  

    );
  }
};
