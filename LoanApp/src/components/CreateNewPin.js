import React,{Component} from 'react';
import { connect } from 'react-redux';
import Dimensions from 'Dimensions';
import DeviceInfo from 'react-native-device-info';


import {
	Image,
	StyleSheet,
	Navigator,
	View,
  Text,
  Button,
	TouchableOpacity,
  ScrollView,
  Alert,
  AsyncStorage,
  TouchableWithoutFeedback,
  Platform

} from 'react-native';

import {
  
    pinChanged,
    confirmPinChanged,
    showLoadingCreatePin,
    clearResponseCreatePin,
    CreatePin

} from '../actions/CreateQuickAccessPinAction';

import FloatingLabel from 'react-native-floating-labels';
import{ Actions} from 'react-native-router-flux';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
import { Container, Content, Form, Item, Input,Label} from 'native-base';
import CustomAlertDialog from './CustomAlertDialog';
import TextField from 'react-native-md-textinput';
import * as Progress from 'react-native-progress';
class CreateNewPin extends Component{

  constructor() {
			super();
			this.state = {
				errorMsg: '',
        responseData:'',
        code:'',
        msg:'',
        fbresponseData:'',
        fbcode:'',
        fbmsg:'',
        newPin:'',
        confirmPin:'',
        errorOnTextField:'',
        dialogMsg:'',
        isShowDialog:false,
        

			};

	}

    onDialogButtonClick(){
      this.setState({isShowDialog:false});
      this.setState({dialogMsg:''});
        Actions.pop();
     setTimeout(()=> Actions.refresh(), 100); 
    }


  componentWillReceiveProps(nextProps) {

              this.setState({responseData:nextProps.createPinRes});
              this.setState({code:nextProps.createPinRes.code});
              this.setState({msg:nextProps.createPinRes.message});


              console.log('create pin componentWillReceiveProps ==== ');
              var resData=JSON.stringify(nextProps.createPinRes.data);
             
              console.log(' create pin componentWillReceiveProps ==== '+resData);

              try {
                if(resData != undefined)
                {
                  let obj = JSON.parse(resData);
                  if(resData!=undefined){

                    AsyncStorage.setItem("userData",resData);
                   
                  }

                  if(obj._id!=undefined){
                           console.log(' LoginComponent componentWillReceiveProps ====>>>> '+obj._id);
                             
                          AsyncStorage.setItem("userId", obj._id);
                  }
                  if(obj.token!=undefined){
                    AsyncStorage.setItem("token", obj.token);
                  }       
                        
                }
                

              } catch (ex) {
                console.error(ex);
              }


  }

  componentWillUnmount(){
     this.props.pinChanged('');
     this.props.confirmPinChanged('');
   
  }

  componentDidUpdate() {

    
    if(this.state.responseData!=''){
        
          if(this.state.code==200){
            this.props.showLoadingCreatePin(false);
            this.props.clearResponseCreatePin();
            AsyncStorage.setItem("isQuickAccess",'true');
            //Alert.alert('Your quick access PIN has been successfully created.');
            this.setState({isShowDialog:true});
            this.setState({dialogMsg:'Your quick access PIN has been successfully created.'});
           
          }
          else{
             this.props.showLoadingCreatePin(false);
            this.props.clearResponseCreatePin();
           
            //Alert.alert(this.state.msg);
            this.setState({isShowDialog:true});
            this.setState({dialogMsg:this.state.msg});
          }
        
      }

  }

    componentWillMount(){

    }
 
  onNewPinChanged(text){
     this.setState({errorMsg:''});
      this.setState({errorOnTextField:''});
       this.props.pinChanged(text);
       if(text.length==4){
          this.refs.inputConfrimPass.focus();
       }
  }
  onConfirmPinChanged(text){
     this.setState({errorMsg:''});
      this.setState({errorOnTextField:''});
       this.props.confirmPinChanged(text);
       if(text==this.props.pin){
        this.refs.inputConfrimPass.blur();

       }
  }

  onOkClick(){

    console.log('in create pin button click');
    if(this.props.pin==''){
     
      this.setState({errorMsg:'Please enter your 4-digit PIN.'});
      this.setState({errorOnTextField:0});
    }
    if(this.props.pin.length<4){
     
      this.setState({errorMsg:'Please enter your 4-digit PIN.'});
      this.setState({errorOnTextField:0});
    }
    else if(this.props.confirmPin==''){
    
      this.setState({errorMsg:'Please confirm your 4-digit PIN.'});
      this.setState({errorOnTextField:1});
    }
    else if(this.props.pin!=this.props.confirmPin){
    
       this.setState({errorMsg:"PIN's do not match. Please reenter PIN."});
      this.setState({errorOnTextField:1});

    }
    else{

      console.log('in create pin button click else');
   

        this.props.showLoadingCreatePin(true);
        this.setState({errorMsg:''});
        this.setState({errorOnTextField:''});
        let access_token;
        AsyncStorage.getItem("token").then((value) => {
         if(value) {

             access_token=value;
             console.log('token if='+access_token);

         }
         else {

             console.log('token else='+value);
         }
       }).done();
       AsyncStorage.getItem("userId").then((value) => {
         if(value) {


             console.log('userId if='+access_token);
             var user={
              authToken:access_token,
              userId:value,
              access_pin:this.props.pin,
              deviceId:DeviceInfo.getUniqueID()
            };
            console.log('Update USER='+JSON.stringify(user));
            this.props.CreatePin(user);

         }
         else {

             console.log('userId else='+value);
         }
       }).done();
       


    }
  }

  onPINClearClick(){
      this.props.pinChanged('');
      this.setState({errorMsg:''});
      this.setState({errorOnTextField:''});
      
    }

    onConfirmPINClearClick(){
      this.props.confirmPinChanged('');
      this.setState({errorMsg:''});
      this.setState({errorOnTextField:''});
      
    }

  render(){
    

    return(

      <TouchableWithoutFeedback onPress={() => {this.setState({isNeedHelpClick:false})}}>
      <Image style={styles.container}
        source={require('../res/bg.png')}>

      <ScrollView keyboardShouldPersistTaps={'always'}>
      <View >


             <Text style={styles.forgotText}>ACCOUNT ACCESS?</Text>
            <Text style={styles.forgotDetailText}>Please select a 4-digit PIN for secure and easy access to your Bankroll account.</Text>
            
            <View style={styles.inputContainer}>


                <TextField
                  labelStyle={{fontFamily:'FuturaStd-Book'}}
                  inputStyle={{fontFamily:'FuturaStd-Book'}}
                  label={'PIN'}
                  highlightColor={'#FFFFFF'}
                  labelColor={'#FFFFFF'}
                  textColor={'#FFFFFF'}
                   height={(Platform.OS === 'ios') ? 35 : 40}
                  borderColor={'#FFFFFF'} 
                  underlineColorAndroid='transparent'
                  returnKeyType='next'
                  secureTextEntry={true}
                  maxLength={4}
                  selectionColor='#FFFFFF'
                  keyboardType='numeric'
                  autoCorrect={false}
                  onChangeText={this.onNewPinChanged.bind(this)}
                  value={this.props.pin}
                  ref='inputPass'
                  onSubmitEditing={(event)=>{this.refs.inputConfrimPass.focus()}}
                      
                />



                 {this.props.pin!=''?<View style={styles.inlineImg}><TouchableOpacity  onPress={this.onPINClearClick.bind(this)}><Image style={styles.clearImageStyle}
                                source={require('../res/clrfield.png')}></Image></TouchableOpacity></View>:null} 

               
            
               
            </View>

                {
                  this.state.errorMsg!=''&&this.state.errorOnTextField==0?<Text style={styles.errorText}>{this.state.errorMsg}</Text>:null
                }
            <View style={styles.inputContainer}>



                  <TextField
                    labelStyle={{fontFamily:'FuturaStd-Book'}}
                    inputStyle={{fontFamily:'FuturaStd-Book'}}
                    label={'Confirm PIN'}
                    highlightColor={'#FFFFFF'}
                    labelColor={'#FFFFFF'}
                    textColor={'#FFFFFF'}
                     height={(Platform.OS === 'ios') ? 35 : 40}
                    borderColor={'#FFFFFF'} 
                    selectionColor='#FFFFFF'
                    secureTextEntry={true}
                    underlineColorAndroid='transparent'
                    returnKeyType='done'
                    keyboardType='numeric'
                    maxLength={4}
                    autoCorrect={false}
                    onChangeText={this.onConfirmPinChanged.bind(this)}
                    value={this.props.confirmPin}
                    ref='inputConfrimPass'
                     
                        
                  />

      


                 {this.props.confirmPin!=''?<View style={styles.inlineImg}><TouchableOpacity  onPress={this.onConfirmPINClearClick.bind(this)}><Image style={styles.clearImageStyle}
                                source={require('../res/clrfield.png')}></Image></TouchableOpacity></View>:null} 


              
            </View>


                {
                  this.state.errorMsg!=''&&this.state.errorOnTextField==1?<Text style={styles.errorText}>{this.state.errorMsg}</Text>:null
                }

              {this.props.isLoadingCreatePin ?
              <View style={styles.circles}>

                 <Progress.CircleSnail
                   style={styles.progress}
                             thickness={5}
                             size={55}
                   color={[
                     '#FFFFFF',
                     '#FFFFFF',
                     '#FFFFFF',
                   ]}
                 />
             </View> : null}
            <View style={styles.buttonViewStyle}>

		              <TouchableOpacity style={styles.buttonLogin}
									onPress={this.onOkClick.bind(this)}
		  						>
                  <Text style={styles.buttonTextStyle}>Ok</Text>
              </TouchableOpacity>
            </View>

      
          
      </View>
      </ScrollView>


                {this.state.isShowDialog==true?<View style={styles.dialogViewStyle}>
                        <CustomAlertDialog title='Bankroll' onPress={this.onDialogButtonClick.bind(this)} subtitle={this.state.dialogMsg} />
                  </View>:null}   
		
      </Image>

    </TouchableWithoutFeedback>

    );
  }
}

const mapStateToProps = ({ createAccessPinReducer }) => {

  const {pin,confirmPin,isLoadingCreatePin,createPinRes} = createAccessPinReducer;
  console.log("create pin Output: "+JSON.stringify(createPinRes));

  return {
    pin: pin,
    confirmPin: confirmPin,
    isLoadingCreatePin:isLoadingCreatePin,
    createPinRes:createPinRes
  }
}

export default connect(mapStateToProps,{pinChanged,confirmPinChanged,showLoadingCreatePin,clearResponseCreatePin,CreatePin})(CreateNewPin);

const styles = StyleSheet.create({

  container: {
    flex: 1,
		width: null,
		height: null,
		justifyContent:'center',
		resizeMode: 'cover',
		paddingTop: 20
  },
  forgotText: {
    color:'#7ACBBC',
    fontSize: 18,
    textAlign: 'center',
    paddingTop:20,
    backgroundColor:'transparent',
    fontFamily:'FuturaStd-Heavy'
  },
  forgotDetailText: {
    color:'#ffffff',
    fontSize: 15,
    textAlign: 'center',
    paddingTop:25,
    paddingLeft:20,
    paddingRight:20,
    backgroundColor:'transparent',
    fontFamily:'FuturaStd-Book',
    lineHeight:(Platform.OS === 'ios') ? 0 : 25,


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

  labelInput: {
		color: '#FFFFFF',
		paddingLeft:5,
    backgroundColor:'transparent'

	},
	formInput: {
		borderBottomWidth: 1,
		marginLeft: 20,
		marginRight:20,
		borderColor: '#FFFFFF',
		alignSelf: 'stretch',


	},
	input: {
		borderWidth: 0,
		paddingLeft:5,
		color:'#ffffff',
	},
  inputContainer: {
    marginTop:15,
    marginLeft:20,
    marginRight:20
  },
  buttonViewStyle:{
		paddingTop:40,
		marginLeft: 20,
		marginRight:20,
		alignSelf: 'stretch',
	},
  fbbuttonViewStyle:{
    paddingTop:20,
    marginLeft: 20,
    marginRight:20,
    alignSelf: 'stretch',
  },

  buttonLogin:{
    height: 40,
    borderRadius: 5,
    paddingTop:(Platform.OS === 'ios') ? 5 : 0,
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#7ACBBC'},

  buttonTextStyle:{
    		color:'#ffffff',
    		fontSize: 18,
        alignSelf: 'center',
        fontFamily:'FuturaStd-Book'
    },

	dialogText: {
	    color:'#000000',
	    fontSize: 15,
			fontWeight:'bold',
	    textAlign: 'center',
	    paddingTop:25,
	    paddingLeft:20,
	    paddingRight:20

	  },

	forgotDialogStyle:{
			marginLeft: 20,
			marginRight:20,
		},

	buttonDialogStyle:{

		marginLeft: 50,
		marginRight:50,
		paddingTop:20,

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
   orText: {
    color:'#ffffff',
    fontSize: 15,
    textAlign: 'center',
    paddingTop:20,
     fontFamily:'FuturaStd-Book',
    backgroundColor:'transparent'
  },
  buttonFBLogin:{

      height: 45,
      borderRadius: 5,
      justifyContent: 'center', 
           alignItems: 'center', 
      backgroundColor: '#3D65C4'},

  fbicon:{

        position:'absolute',
        left:5,
        width: 40,
        height: 40,

  },
   errorText: {
    color:'red',
    fontSize: 14,
    textAlign: 'left',
    paddingTop:10,
    paddingLeft:20,
    backgroundColor:'transparent',
    fontFamily:'FuturaStd-Book'
  },

   dialogViewStyle:{

    position: 'absolute', 
    top: 0, left: 0, 
    right: 0, 
    bottom: 0, 
    justifyContent: 'center', 
    alignItems: 'center'
  },

inlineImg: {
    position: 'absolute',
    right: 5,
    bottom:16,


  },

   clearImageStyle:{

    padding:10,
  },
});
