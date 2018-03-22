import React,{Component} from 'react';
import Dimensions from 'Dimensions';
import { connect } from 'react-redux';
import {
	Image,
	StyleSheet,
	Navigator,
	View,
  Text,
  Button,
	TouchableOpacity,
  ScrollView,
  InteractionManager,
	Alert,
	AsyncStorage,
  Keyboard,
  Platform

} from 'react-native';

import {
  ssnChanged,
  showLoading,
	clearResponse,
	updateSSN
} from '../actions/UpdateUserSSNAction';
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
import FloatingLabel from 'react-native-floating-labels';
import{ Actions} from 'react-native-router-flux';
import * as Progress from 'react-native-progress';
import { Container, Content, Form, Item, Input,Label} from 'native-base';
import CustomAlertDialog from './CustomAlertDialog';
import TextField from 'react-native-md-textinput';

class RequestLoanAmountStep4 extends Component{


	constructor(props){
	 super(props)
	 this.state = {
								 errorMsg: '',
								 resData:'',
								 code:'',
								 msg:'',
                 dialogMsg:'',
                 isShowDialog:false,
                 isSkip:false

								}
	}

	componentWillReceiveProps(nextProps) {

		this.setState({resData:nextProps.responseData});
		this.setState({code:nextProps.responseData.code});
		this.setState({msg:nextProps.responseData.message});

        //var msg=nextProps.signupRes.message;
    var response=JSON.stringify(nextProps.responseData.data);

    try {
      if(response != undefined)
      {
        let obj = JSON.parse(response);
        AsyncStorage.setItem("userData",response);
        console.log(' signupRes componentWillReceiveProps ====>>>> '+obj.token);
        if(obj._id!=undefined){
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
      componentWillMount(){
   
    }
	componentDidUpdate() {

		if(this.state.resData!=''){
			{
				if(this.state.code==200){
					this.props.clearResponse();
					this.onNextClick();
				}
				else{
					this.props.clearResponse();
					//Alert.alert(this.state.msg);
          this.setState({isShowDialog:true});
          this.setState({dialogMsg:this.state.msg});
				}
			}
		}
	}


    onDialogButtonClick(){
      this.setState({isShowDialog:false});
      this.setState({dialogMsg:''});
    }

    formatSSNNumber(s) {

       console.log('format ssn val0=== '+s);
      var s2 = (""+s).replace(/\D/g, '');
      var m = s2.match(/^(\d{3})(\d{2})(\d{4})$/);
      console.log('format ssn val1=== '+s2);
      console.log('format ssn val2=== '+m);
      return (!m) ? null :  m[1] + "-" + m[2] + "-" + m[3];
    
    }

  componentWillUnmount(){
          this.props.ssnChanged('');
          
           console.log('SignUp componentWillUnmount ==== ');
        }

    componentDidMount() {
      InteractionManager.runAfterInteractions(() => {
         this.getUserDataFromAsync();
      });
    }    

    getUserDataFromAsync(){

        AsyncStorage.getItem("userData").then((value) => {
          if(value) {

              console.log('qualificationRes if='+value);
              

              let obj = JSON.parse(value);
            
              if(obj.ssn!=undefined){
                  this.onSSNChange(obj.ssn);
                  this.setState({isSkip:true});

              }
              else{

                this.setState({isSkip:false});
              }
             

            

          }
          else {
              this.setState({isSkip:false});
              console.log('qualificationRes else='+value);
          }
        }).done();

    }
        

	onSSNChange(text){
		
       this.setState({errorMsg:''});
      if(text.length<9){
      this.props.ssnChanged(text);

      }
      else{
      var num=this.formatSSNNumber(text);
        console.log('format num ==== '+num);
         if(num!=null){
            
              this.props.ssnChanged(num);
               Keyboard.dismiss();
              }
              else{
                  this.props.ssnChanged(text);
              }
      
      }
	}

   onSSNClearClick(){
      this.props.ssnChanged('');
      this.setState({errorMsg:''});
     
      
    }

	updateUserSSN(){

	 if (this.props.ssn == ''){

		 //Alert.alert('Please enter 9 digit SSN number.');
      this.setState({errorMsg:'Please enter a 9-digit social security number.'});
		 //this.popupDialog.show();
	 }
   else if(this.props.ssn.replace(/[\s()-]+/gi, '').length<9){

        //Alert.alert('Please enter valid 9 digit SSN number.');
         this.setState({errorMsg:'Please enter a valid 9-digit social security number.'});
   }
	 else{
		 this.props.showLoading(true);
       this.setState({errorMsg:''});
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
					 var ssv_val=this.props.ssn.replace(/[\s()-]+/gi, '');
					 var user={
						authToken:access_token,
						userId:value,
						ssn:ssv_val,

					};
					console.log('Update USER='+JSON.stringify(user));
					this.props.updateSSN(user);

			 }
			 else {

					 console.log('userId else='+value);
			 }
		 }).done();


	 }
	}

    onSkipClick=()=>{
      Actions.AddBankAccount();
    }

    onNextClick =()=>{
      Actions.AddBankAccount();
    }

    render(){
      return(
        <Image style={styles.container}
          source={require('../res/bg.png')}>

          <ScrollView keyboardShouldPersistTaps={'always'}>
            <View>

            <View style={{alignItems:'center'}}>
             <Progress.Bar progress={0.90} width={DEVICE_WIDTH*0.9} unfilledColor={'#FFFFFF'} color={'#7ACBBC'} />
             <Text style={styles.screenProgressText}>09/10</Text>
            </View>
            <Text style={styles.forgotText}>SSN</Text>
            <Text style={styles.forgotDetailText}>Bankroll is required by law to collect this information. It in no way impacts your credit score. Bankroll is PCI compliant with 256-bit encryption to secure your data.</Text>
            <View style={styles.inputContainer}>

                <TextField
                labelStyle={{fontFamily:'FuturaStd-Book'}}
                inputStyle={{fontFamily:'FuturaStd-Book'}}
                 height={(Platform.OS === 'ios') ? 35 : 40}
              label={'Social Security Number'}
              highlightColor={'#FFFFFF'}
              labelColor={'#FFFFFF'}
              textColor={'#FFFFFF'}
              borderColor={'#FFFFFF'} 
            
                     returnKeyType='done'
                        selectionColor='#FFFFFF'
                        keyboardType='numeric'
                        underlineColorAndroid='transparent'
                        onChangeText={this.onSSNChange.bind(this)}
                        value={this.props.ssn}
                        maxLength={11}
                        
                />

                {this.props.ssn!=''?<View style={styles.inlineImg}><TouchableOpacity  onPress={this.onSSNClearClick.bind(this)}><Image style={styles.clearImageStyle}
                                source={require('../res/clrfield.png')}></Image></TouchableOpacity></View>:null} 
                
         
            
            </View>

                    {
                  this.state.errorMsg!=''?<Text style={styles.errorText}>{this.state.errorMsg}</Text>:null
             }


            <View style={styles.buttonViewStyle}>

                  <TouchableOpacity style={styles.buttonLogin}
                  	onPress={this.updateUserSSN.bind(this)}
                  >
                  <Text style={styles.buttonTextStyle}>Next</Text>
              </TouchableOpacity>
            </View>

                        {/*{this.state.isSkip==true? <View>
              <Text style={styles.forgotDetailText}
              onPress={this.onSkipClick}
              >Skip & Continue</Text>
            </View>:null}*/}

						{this.props.isLoading ?
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
						 </View> : null
					 }

            </View>
          </ScrollView>

            {this.state.isShowDialog==true?<View style={styles.dialogViewStyle}>
                   <CustomAlertDialog title='Bankroll' onPress={this.onDialogButtonClick.bind(this)} subtitle={this.state.dialogMsg} />
          </View>:null}   
        </Image>
      );
    }
}
const mapStateToProps = ({ updateSSN }) => {

  const {ssn,isLoading,responseData} = updateSSN;
  console.log("update Output: "+JSON.stringify(responseData));
  return {
    ssn: ssn,
		isLoading:isLoading,
    responseData:responseData
  }
}
export default connect(mapStateToProps,{ssnChanged,updateSSN,showLoading,clearResponse})(RequestLoanAmountStep4);
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
    color:'#7ACBBC',
    fontSize: 18,
    textAlign: 'center',
    paddingTop:20,
    fontFamily:'FuturaStd-Heavy',
    backgroundColor:'transparent'
  },
  forgotDetailText: {
    color:'#ffffff',
    fontSize: 15,
    textAlign: 'center',
    paddingTop:25,
    paddingLeft:20,
    fontFamily:'FuturaStd-Book',
    paddingRight:20,backgroundColor:'transparent',
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
    paddingLeft:5,backgroundColor:'transparent'

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
    marginTop:20,
    marginLeft:20,
    marginRight:20
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
     paddingTop:(Platform.OS === 'ios') ? 5 : 0,
      justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#7ACBBC'},

  buttonTextStyle:{
        color:'#ffffff',
        fontSize: 18,
        alignSelf: 'center',
        fontFamily:'FuturaStd-Book',
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
