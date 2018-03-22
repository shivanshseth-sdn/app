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
	Alert,
  InteractionManager,
	AsyncStorage,
  Platform
} from 'react-native';

import {
  dobChanged,
  showLoading,
	clearResponse,
	updateDOB
} from '../actions/UpdateUserDOBAction';
import FloatingLabel from 'react-native-floating-labels';
import{ Actions} from 'react-native-router-flux';
import * as Progress from 'react-native-progress';
import DatePicker from 'react-native-datepicker'
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
import Moment from 'moment';
import CustomAlertDialog from './CustomAlertDialog';


class RequestLoanAmountStep3 extends Component{


    constructor(props){
     super(props)

		 AsyncStorage.getItem("userData").then((value) => {
			 if(value) {

					 console.log('qualificationRes if='+value);
					 let obj = JSON.parse(value);
					 this.setState({qualified_amount:obj.qualified_amt});

					 if(obj.ssn==undefined){
						 this.setState({ssn:''});
					 }
					 else{
						 this.setState({ssn:obj.ssn});
					 }

					 console.log(' qualificationRes componentWillReceiveProps ====>>>> '+obj.username);
					 console.log(' qualificationRes componentWillReceiveProps ====>>>> '+this.state.userName);

			 }
			 else {

					 console.log('qualificationRes else='+value);
			 }
		 }).done();
     this.state = {date:"",
									 errorMsg: '',
									 resData:'',
									 code:'',
									 msg:'',
									 ssn:'',
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

    componentDidMount() {
      InteractionManager.runAfterInteractions(() => {
         this.getUserDataFromAsync();
      });
  }

   onSkipClick=()=>{
      Actions.RequestLoanAmountStep4();
    }

      getUserDataFromAsync(){

        AsyncStorage.getItem("userData").then((value) => {
          if(value) {

              console.log('qualificationRes if='+value);
              

              let obj = JSON.parse(value);
            
              if(obj.dob!=undefined){
                  this.onDOBChange(obj.dob);
                  this.setState({isSkip:true});
              }
              else{

                  this.setState({isSkip:false});
              }
             

              console.log(' step1 async  ====>>>> '+obj.username);
              console.log(' step1 async ====>>>> '+this.state.userName);

          }
          else {

                this.setState({isSkip:false});
              console.log('qualificationRes else='+value);
          }
        }).done();

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
     componentWillMount(){
    }

    onDialogButtonClick(){
      this.setState({isShowDialog:false});
      this.setState({dialogMsg:''});
    }
    componentWillUnmount(){
            this.props.dobChanged('');
            
           console.log('SignUp componentWillUnmount ==== ');
        }

		onDOBChange(text){
       this.setState({errorMsg:''});
				this.props.dobChanged(text);
		}

    onNextClick=()=>{

      Actions.RequestLoanAmountStep4()
	 // if(this.state.ssn==''){
		// 		Actions.RequestLoanAmountStep4()
		// 	}
		// 	else{
		// 		Actions.AddBankAccount();
		// 	}

    }
		updateUserDOB(){

		if (this.props.dob == ''){

			 //Alert.alert('Please select your Date of Birth.');
        this.setState({errorMsg:'Please select your date of birth.'});
			 //this.popupDialog.show();
		 }
		 else{

         var age = Moment().diff(this.props.dob, 'years');
			

          if(age<18){

                    this.setState({errorMsg:'You must 18 years old to qualify for Bankroll.'});
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
                     var user={
                      authToken:access_token,
                      userId:value,
                      dob:this.props.dob,

                    };
                    console.log('Update USER='+JSON.stringify(user));
                    this.props.updateDOB(user);

                 }
                 else {

                     console.log('userId else='+value);
                 }
               }).done();
          }




		 }
		}

    onDOBClearClick(){
      this.props.dobChanged('');
      this.setState({errorMsg:''});
     
      
    }


    render(){
      return(
        <Image style={styles.container}
          source={require('../res/bg.png')}>
     
          <ScrollView keyboardShouldPersistTaps={'always'}>
            <View>

             <View style={{alignItems:'center'}}>
             <Progress.Bar progress={0.80} width={DEVICE_WIDTH*0.9} unfilledColor={'#FFFFFF'} color={'#7ACBBC'} />
             <Text style={styles.screenProgressText}>08/10</Text>
            </View>
            <Text style={styles.forgotText}>DOB</Text>
            <Text style={styles.forgotDetailText}>Bankroll is required by law to collect this information. It in no way impacts your credit score.</Text>
            <View style={styles.inputContainer}>
                <View style={styles.pickerContainer}>
                <DatePicker
                  style={{width:DEVICE_WIDTH}}
                  date={this.props.dob}
                  mode="date"
                  showIcon={false}
                  placeholder="Date of Birth"
                  format="MMM DD YYYY"
                  minDate="05 01 1920"
                  maxDate={Moment().add(-18,'y').format('MMM DD YYYY') }
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                      dateInput: {
                        position: 'absolute',
                        left: 5,
                        marginLeft: 0,
                        borderBottomWidth: 0,
                        borderLeftWidth: 0,
                        borderTopWidth: 0,
                        borderRightWidth: 0,
                      },
                      dateText:{
                        color:'#ffffff',
                        fontSize:18,
                         fontFamily:'FuturaStd-Book',
                      },
                      placeholderText:{
                        color:'#ffffff',
                        fontSize:18,
                         fontFamily:'FuturaStd-Book',
                      }
                    }}
                  onDateChange={this.onDOBChange.bind(this)}
                 
                />

                 {this.props.dob!=''?<View style={styles.inlineImg}><TouchableOpacity  onPress={this.onDOBClearClick.bind(this)}><Image style={styles.clearImageStyle}
                                source={require('../res/clrfield.png')}></Image></TouchableOpacity></View>:null}   
                </View>
            </View>
             {
                  this.state.errorMsg!=''?<Text style={styles.errorText}>{this.state.errorMsg}</Text>:null
             }

            <View style={styles.buttonViewStyle}>

                  <TouchableOpacity style={styles.buttonLogin}
                  onPress={this.updateUserDOB.bind(this)}
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

const mapStateToProps = ({ updateDOB }) => {

  const {dob,isLoading,responseData} = updateDOB;
  console.log("update Output: "+JSON.stringify(responseData));
  return {
    dob: dob,
		isLoading:isLoading,
    responseData:responseData
  }
}

export default connect(mapStateToProps,{dobChanged,updateDOB,showLoading,clearResponse})(RequestLoanAmountStep3);

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
    paddingRight:20,
    fontFamily:'FuturaStd-Book',
    backgroundColor:'transparent',
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
    marginTop:30
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
  pickerContainer:{

      marginLeft: 20,
      marginRight:20,
      borderBottomWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      borderRightWidth: 0,
      borderColor: '#FFFFFF',
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
    paddingRight:20,
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
    bottom:10,
 

  },
    clearImageStyle:{

    padding:10,
  },
});
