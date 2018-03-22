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
	InteractionManager,
  TouchableOpacity,
  ScrollView,
	Alert,
	AsyncStorage,
  Platform
} from 'react-native';
import {
  	firstNameChanged,
  	lastNameChanged,
  	showLoading,
	clearResponse,
	updateName
} from '../actions/UpdateUserInfoAction';

import FloatingLabel from 'react-native-floating-labels';
import{ Actions} from 'react-native-router-flux';
import * as Progress from 'react-native-progress';
import CustomAlertDialog from './CustomAlertDialog';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
import { Container, Content, Form, Item, Input,Label} from 'native-base';
import TextField from 'react-native-md-textinput';

class RequestLoanAmountStep1 extends Component{


		constructor() {
				super();
				AsyncStorage.getItem("userData").then((value) => {
					if(value) {

							console.log('qualificationRes if='+value);
							let obj = JSON.parse(value);
							this.setState({qualified_amount:obj.qualified_amt});

							if(obj.dob==undefined){
								this.setState({dob:''})
							}
							else{
								this.setState({dob:obj.dob});
							}
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

				this.state = {
					errorMsg: '',
					resData:'',
					code:'',
					msg:'',
					address:'',
					dob:'',
					ssn:'',
					errorOnTextField:'',
          popuMsg:'',
          isSkip:false

				};
		}

    componentWillMount(){
           
          console.log('step1 componentWillMount ==== ');
    }
    componentDidMount() {
      InteractionManager.runAfterInteractions(() => {
         this.getUserDataFromAsync();
      });
    }
		componentWillUnmount(){
			    this.props.firstNameChanged('');
			    this.props.lastNameChanged('');
          Actions.refresh({key: 'Dashboard'});
			     console.log('SignUp componentWillUnmount ==== ');
			  }


      getUserDataFromAsync(){

        AsyncStorage.getItem("userData").then((value) => {
          if(value) {

              console.log('qualificationRes if='+value);
              

              let obj = JSON.parse(value);
            
              if(obj.firstname!=undefined&&obj.lastname!=undefined&&obj.firstname!=''&&obj.lastname!=''){
                  this.onFirstNameChange(obj.firstname);
                  this.onLastNameChange(obj.lastname);
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
	  componentDidUpdate() {

			if(this.state.resData!=''){
				{
					if(this.state.code==200){
             this.setState({popuMsg:''});
						this.props.clearResponse();
						this.onNextClick();
					}
					else{
						this.props.clearResponse();
						//Alert.alert(this.state.msg);
            this.setState({popuMsg:this.state.msg});
					}
				}
			}
	  }

		onFirstNameChange(text){
      this.setState({errorMsg:''});
         this.setState({errorOnTextField:''});
				this.props.firstNameChanged(text);

		}

		onLastNameChange(text){
      this.setState({errorMsg:''});
         this.setState({errorOnTextField:''});
				this.props.lastNameChanged(text);
		}


    onNextClick =()=>{
      Actions.RequestLoanAmountStep2();
	  //   if(this.state.address==''){
			// 	Actions.RequestLoanAmountStep2()
			// }
			// else if(this.state.dob==''){
			// 	Actions.RequestLoanAmountStep3()
			// }
			// else if(this.state.ssn==''){
			// 	Actions.RequestLoanAmountStep4()
			// }
			// else{
			// 	Actions.AddBankAccount();
			// }

    }

    onDialogButtonClick(){
      this.setState({popuMsg:''});
    }

    onSkipClick=()=>{
      Actions.RequestLoanAmountStep2();
    }
		updateUserName(){




		 if (this.props.firstname.replace(/^\s+|\s+$/g,"") == ''){

			 //Alert.alert('Please enter your first name.');
			 this.setState({errorMsg:'Please enter your first name.'});
    		 this.setState({errorOnTextField:0});
		 }
		 else if(this.props.lastname.replace(/^\s+|\s+$/g,"")==''){

			 //Alert.alert('Please enter your last name.');
			 this.setState({errorMsg:'Please enter your last name.'});
    		 this.setState({errorOnTextField:1});
		 }
		 else{

			 this.props.showLoading(true);
			 let access_token;
			 this.setState({errorMsg:''});
    		 this.setState({errorOnTextField:''});
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
							firstname:this.props.firstname.replace(/^\s+|\s+$/g, ''),
							lastname:this.props.lastname.replace(/^\s+|\s+$/g, '')
						};
						console.log('Update USER='+JSON.stringify(user));
						this.props.updateName(user);

				 }
				 else {

						 console.log('userId else='+value);
				 }
			 }).done();

		 }
	}

   onFirstNameClearClick(){
      this.props.firstNameChanged('');
      this.setState({errorMsg:''});
      this.setState({errorOnTextField:''});
      
    }

    onLastNameClearClick(){
      this.props.lastNameChanged('');
      this.setState({errorMsg:''});
      this.setState({errorOnTextField:''});
      
    }

    render(){
      return(
        <Image style={styles.container}
          source={require('../res/bg.png')}>
    
          <ScrollView keyboardShouldPersistTaps={'always'}>
            <View>
            <View style={{alignItems:'center'}}>
             <Progress.Bar progress={0.60} width={DEVICE_WIDTH*0.9} unfilledColor={'#FFFFFF'} color={'#7ACBBC'} />
             <Text style={styles.screenProgressText}>06/10</Text>
            </View>
           
            <Text style={styles.forgotText}>CREATE ACCOUNT</Text>
            <Text style={styles.forgotDetailText}>Please enter your first name and last name.</Text>
            
             <View style={styles.inputContainer}>
               <TextField
              labelStyle={{fontFamily:'FuturaStd-Book'}}
              inputStyle={{fontFamily:'FuturaStd-Book'}}
              label={'First Name'}
              highlightColor={'#FFFFFF'}
              height={(Platform.OS === 'ios') ? 35 : 40}
              labelColor={'#FFFFFF'}
              textColor={'#FFFFFF'}
              borderColor={'#FFFFFF'} 
              autoCorrect={false}
              returnKeyType='next'
              underlineColorAndroid='transparent'
              returnKeyType='next'
              selectionColor='#FFFFFF'
              autoCapitalize='words'
              underlineColorAndroid='transparent'
              onChangeText={this.onFirstNameChange.bind(this)}
              value={this.props.firstname}
              onSubmitEditing={(event)=>{this.refs.inputLastName.focus()}}
            />


             {this.props.firstname!=''?<View style={styles.inlineImg}><TouchableOpacity  onPress={this.onFirstNameClearClick.bind(this)}><Image style={styles.clearImageStyle}
                                source={require('../res/clrfield.png')}></Image></TouchableOpacity></View>:null}  


          </View>


              {
                  this.state.errorMsg!=''&&this.state.errorOnTextField==0?<Text style={styles.errorText}>{this.state.errorMsg}</Text>:null
              }




            <View style={styles.inputContainer}>
               <TextField
                  labelStyle={{fontFamily:'FuturaStd-Book'}}
                  inputStyle={{fontFamily:'FuturaStd-Book'}}
                  ref='inputLastName'
                  label={'Last Name'}
                  highlightColor={'#FFFFFF'}
                  labelColor={'#FFFFFF'}
                  height={(Platform.OS === 'ios') ? 35 : 40}
                  textColor={'#FFFFFF'}
                  borderColor={'#FFFFFF'} 
                  autoCorrect={false}
                  underlineColorAndroid='transparent'
                  selectionColor='#FFFFFF'
                  returnKeyType='done'
                  autoCapitalize='words'
                  underlineColorAndroid='transparent'
                  onChangeText={this.onLastNameChange.bind(this)}
                  value={this.props.lastname}
                              />

        
                  {this.props.lastname!=''?<View style={styles.inlineImg}><TouchableOpacity  onPress={this.onLastNameClearClick.bind(this)}><Image style={styles.clearImageStyle}
                                source={require('../res/clrfield.png')}></Image></TouchableOpacity></View>:null}  

           </View>

                {
                  this.state.errorMsg!=''&&this.state.errorOnTextField==1?<Text style={styles.errorText}>{this.state.errorMsg}</Text>:null
                }

           

            <View style={styles.buttonViewStyle}>

                  <TouchableOpacity style={styles.buttonLogin}
                  onPress={this.updateUserName.bind(this)}
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
						 </View> : null}

            </View>
          </ScrollView>

            {this.state.popuMsg!=''&&this.state.popuMsg!=undefined?<View style={styles.dialogViewStyle}>
                       <CustomAlertDialog title='Bankroll' onPress={this.onDialogButtonClick.bind(this)} subtitle={this.state.popuMsg}/>
                          </View>:null}
        </Image>
      );
    }
}
const mapStateToProps = ({ updateUserInfo }) => {

  const {firstname, lastname,isLoading,responseData} = updateUserInfo;
  console.log("update Output: "+JSON.stringify(responseData));

  return {
    firstname: firstname,
    lastname: lastname,
		isLoading:isLoading,
    responseData:responseData
  }
}


export default connect(mapStateToProps,{firstNameChanged,lastNameChanged,updateName,showLoading,clearResponse})(RequestLoanAmountStep1);

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
    marginTop:10,
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
        fontFamily:'FuturaStd-Book',
        alignSelf: 'center',
       
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
