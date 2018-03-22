import React,{Component} from 'react';
import { connect } from 'react-redux';
import Dimensions from 'Dimensions';
import {
	Image,
	StyleSheet,
	Navigator,
	View,
  Text,
  Button,
	TouchableOpacity,
  ScrollView,
	AsyncStorage,
	Alert
} from 'react-native';
import {

  showLoading,
	clearResponse,
	connectBank
} from '../actions/ConnectBankAccount';
import FloatingLabel from 'react-native-floating-labels';
import{ Actions} from 'react-native-router-flux';
import * as Progress from 'react-native-progress';
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

class CompleteReferralCode extends Component{


		constructor(props){
		 super(props)
		 this.state = {
									 errorMsg: '',
									 resData:'',
									 code:'',
									 msg:''

									}
		}

		componentWillReceiveProps(nextProps) {

			
		}
		componentDidUpdate() {

			
		}

    onNextClick=()=>{
			Actions.Dashboard();
		}
		 onShareClick=()=>{
			Actions.Referals();
		}
		
    componentWillMount(){

    }


    render(){
      return(

       
        <Image style={styles.container}
          source={require('../res/bg.png')}>
         
          <ScrollView>
            <View>
              <View style={{alignItems:'center'}}>
             <Progress.Bar progress={0.50} width={DEVICE_WIDTH*0.9} unfilledColor={'#FFFFFF'} color={'#7ACBBC'} />
             <Text style={styles.screenProgressText}>05/10</Text>
            </View>
	            <View style={styles.linkAccountImageContainer}>
	            <Image
	              source={require('../res/referral_success.png')}>
	            </Image>
	            </View>
            	<Text style={styles.forgotText}>Referral Complete</Text>
            	<Text style={styles.forgotDetailText}>We have credited $20 to your linked account.</Text>

	            <View style={styles.buttonViewStyle}>

	                  <TouchableOpacity style={styles.buttonLogin}
	                  onPress={this.onNextClick}
	                  >
	                  <Text style={styles.buttonTextStyle}>Next</Text>
	              </TouchableOpacity>
	            </View>  

              	<Text style={styles.forgotDetailText}>Or</Text>

              	<Text style={styles.forgotDetailText}>Share your referral code with your friends and earn cash, deposited directly to your account, on every repaid loan.</Text>
           
	           	 <View style={styles.buttonViewStyle}>

	                  <TouchableOpacity style={styles.buttonLogin}
	                  onPress={this.onShareClick}
	                  >
	                  <Text style={styles.buttonTextStyle}>Share</Text>
	              </TouchableOpacity>
	            </View>  
	         </View>   
          </ScrollView>
        </Image>
      );
    }
}



export default CompleteReferralCode;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
    justifyContent:'center',
    resizeMode: 'cover',
    paddingTop: 80
  },
  forgotText: {
    color:'#ffffff',
    fontSize: 20,
    textAlign: 'center',
    paddingTop:20,
    fontFamily:'FuturaStd-Book',
    backgroundColor:'transparent'
  },
  forgotDetailText: {
    color:'#ffffff',
    fontSize: 16,
    textAlign: 'center',
    paddingTop:25,
    paddingLeft:20,
    paddingRight:20,
    fontFamily:'FuturaStd-Book',
    backgroundColor:'transparent'

  },
  screenProgressText:{
  color:'#ffffff',
    fontSize: 15,
    textAlign: 'right',
    fontFamily:'FuturaStd-Book',
    alignSelf: 'flex-end',  
    paddingRight:20,
    paddingTop:10,
    backgroundColor:'transparent'
  },

  buttonViewStyle:{
    paddingTop:40,
    marginLeft: 20,
    marginRight:20,
    alignSelf: 'stretch',
  },

  buttonLogin:{
    height: 45,
    borderRadius: 5,
    paddingTop:5,
     justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#7ACBBC'},

  buttonTextStyle:{
        color:'#ffffff',
        fontSize: 18,
        alignSelf: 'center',
       fontFamily:'FuturaStd-Book',
  },
  linkAccountImageContainer:{
  	marginTop:20,
    alignItems:'center'
  },
	circles: {
		    position:'absolute',
		    left:0,
		    right:0,
		    top:0,
		    bottom:0,
		    justifyContent:'center',
				alignItems:'center'
			},
	progress: {
		    margin: 10,

		  },

});
