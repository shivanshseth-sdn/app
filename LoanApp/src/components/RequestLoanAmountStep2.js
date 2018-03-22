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
	Keyboard,
	Platform
} from 'react-native';

import {  Picker } from 'native-base';
import {
    addressChanged,
    addressChanged2,
    cityChanged,
	stateChanged,
	zipChanged,
    showLoading,
	clearResponse,
	updateUserAddress
} from '../actions/UpdateUserAddressInfoAction';

import {
    showLoadingCity,
    clearResponseCity,
    CityReq,
	
} from '../actions/GetCityAction';

import {
    showLoadingStates,
    clearResponseStates,
    StatesReq,
	
} from '../actions/GetStatesAction';

import FloatingLabel from 'react-native-floating-labels';
import{ Actions} from 'react-native-router-flux';
import * as Progress from 'react-native-progress';
import AutoComplete from 'react-native-autocomplete';
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
import { Container, Content, Form, Item, Input,Label} from 'native-base';
//import Countries from '../../countries.json';
//import USStates from '../../states.json';
import CustomAlertDialog from './CustomAlertDialog';
import TextField from 'react-native-md-textinput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const cityArray=[];
const stateArray=[];
class RequestLoanAmountStep2 extends Component{

		constructor() {
				super();
				this.onTyping = this.onTyping.bind(this)
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

					data: [],
					stateDate:[],
					stateNames:['State',
											'Florida',
											],

					cityNames:[ 'City',
								'Alachua',
								'Altamonte Springs',
								'Anna Maria',
								'Apalachicola',
								'Apopka',
								'Atlantic Beach',
								'Auburndale',
								'Aventura',
								'Avon Park',
								'Bal Harbour',
								'Bartow',
								'Bay Harbor Islands',
								'Boca Raton',
								'Bonita Springs',
								'Boynton Beach',
								'Bradenton',
								'Brooksville',
								'Cape Canaveral',
								'Cape Coral',
								'Casselberry',
								'Celebration',
								'Chipley',
								'Cinco Bayou',
								'Clearwater',
								'Clewiston',
								'Cocoa',
								'Cocoa Beach',
								'Coconut Creek',
								'Coral Gables',
								'Coral Springs',
								'Crystal River',
								'Dania Beach',
						],
					errorMsg: '',
					resData:'',
					code:'',
					msg:'',
					selectState:'State',
					selectCity:'City',
					address:'',
					dob:'',
					ssn:'',
					errorOnTextField:'',
					popuMsg:'',
					isSkip:false,
					resDataCity:'',
				    codeCity:'',
					msgCity:'',

					resDataStates:'',
				    codeStates:'',
					msgStates:'',

				};
		}

		onTyping(text) {


				console.log('on city typeing'+text);

			    const countries = cityArray
			        .filter(country => country.city.toLowerCase().startsWith(text.replace(/^\s+|\s+$/g,"").toLowerCase()))
			        .map(country => country.city);	 
			    this.setState({ data: countries });
			    this.props.cityChanged(text);

		}

		onStateTyping(text) {

			if(text.length<=2){
				  const states = stateArray
			        .filter(states => states.state_abbreviation.toLowerCase().startsWith(text.replace(/^\s+|\s+$/g,"").toLowerCase()))
			        .map(states => states.state_abbreviation);	

			    this.setState({ stateDate: states });
   				this.props.stateChanged(text);
			}
			else{
				this.props.stateChanged('');
			}
			  
		}

		onCitySelect(value) {
		    console.log('select city'+value);
		    this.props.cityChanged(value);
		 }

		 onStateSelect(value) {
		   console.log('select state'+value);
		    this.props.stateChanged(value);
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

		     this.setState({resDataCity:nextProps.responseDataCity});
    	     this.setState({codeCity:nextProps.responseDataCity.code});
    		 this.setState({msgCity:nextProps.responseDataCity.message});

    		 console.log('SignUp componentWillReceiveProps ==== '+this.state.msgCity);

              var resDataCity=JSON.stringify(nextProps.responseDataCity.data);
             
              console.log(' city componentWillReceiveProps ====>>>>>>>>????????????? '+resDataCity);

              try {
                if(resDataCity != undefined&&resDataCity!=''&&resDataCity!="{}")
                {
                  let obj = JSON.parse(resDataCity);
                  //SECTIONS=obj.slice();
                  cityArray=obj.slice();

                  console.log(' city data componentWillReceiveProps ====>>>>>>>> '+cityArray);
                        
                }
                

              } catch (ex) {
                console.error(ex);
              }


             this.setState({resDataStates:nextProps.responseDataStates});
    	     this.setState({codeStates:nextProps.responseDataStates.code});
    		 this.setState({msgStates:nextProps.responseDataStates.message});
     
    		   var resDataStates=JSON.stringify(nextProps.responseDataStates.data);
             
              console.log(' resDataStates componentWillReceiveProps ====>>>>>>>>????????????? '+resDataStates);

              try {
                if(resDataStates != undefined&&resDataStates!=''&&resDataStates!="{}")
                {
                  let obj = JSON.parse(resDataStates);
                  //SECTIONS=obj.slice();
                  stateArray=obj.slice();

                  console.log(' city data componentWillReceiveProps ====>>>>>>>> '+stateArray);
                        
                }
                

              } catch (ex) {
                console.error(ex);
              }



	  }

	componentWillMount(){


    	this.props.showLoadingCity(true);
     	this.props.CityReq();

     	this.props.showLoadingStates(true);
     	this.props.StatesReq();
        console.log('city componentWillMount ==== ');
  	}
 
	componentWillUnmount(){
			    this.props.addressChanged('');
			    this.props.addressChanged2('');
			   	this.props.stateChanged('');
			   	this.props.cityChanged('');
			   	this.props.zipChanged('');
			   	
			     console.log('SignUp componentWillUnmount ==== ');
			  }

	componentDidMount() {
      InteractionManager.runAfterInteractions(() => {
         this.getUserDataFromAsync();
      });
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
						 this.setState({popuMsg:this.state.msg});
						//Alert.alert(this.state.msg);
					}
				}
			}

			if(this.state.resDataCity!=''){
        
              if(this.state.codeCity==200){

                this.props.showLoadingCity(false);
                this.props.clearResponseCity();

              }
              else{

                 this.props.showLoadingCity(false);
                 this.props.clearResponseCity();
                 console.log("+++++++++++else++++++++++++");
                 //Alert.alert(this.state.msg);
                 //this.setState({isShowDialog:true});
                 //this.setState({dialogMsg:this.state.msg});

              }
        
          }
	  }

		onAddressChange(text){
				this.setState({errorMsg:''});
    		 	this.setState({errorOnTextField:''});
				this.props.addressChanged(text);
		}

		onAddressChange2(text){
				this.setState({errorMsg:''});
    		 	this.setState({errorOnTextField:''});
				this.props.addressChanged2(text);
		}

		onStateChange(text){
			     this.setState({errorMsg:''});
    		     this.setState({errorOnTextField:''});
				 console.log('state'+this.state.stateDate);
			
				//this.setState({selectState:text});
				this.props.stateChanged(text);
		}

		onCityChange(text){

				this.setState({errorMsg:''});
    		 	this.setState({errorOnTextField:''});
				//this.setState({selectCity:text});
				this.props.cityChanged(text);
		}

		onZipChange(text){

				this.setState({errorMsg:''});
    		    this.setState({errorOnTextField:''});
				this.props.zipChanged(text);
				if(text.length==5){
					 Keyboard.dismiss();
				}
		}

		onAddressClearClick(){
			this.props.addressChanged('');
			this.refs.addressinput.focus();
		}

		onAddress2ClearClick(){
			this.props.addressChanged2('');			
			this.refs.address2input.focus();
		}

		onCityClearClick(){
			this.props.cityChanged('');			
			//this.refs.address2input.focus();
		}
		onStateClearClick(){
			this.props.stateChanged('');			
			//this.refs.address2input.focus();
		}
		// onCityClearClick(){
		// 	this.props.cityChanged('');
			
		// 	this.refs.cityRef.focus();
		// }

		// onStateClearClick(){
		// 	this.props.stateChanged('');
			
		// 	this.refs.stateRef.focus();
		// }

		onZipClearClick(){


			this.props.zipChanged('');
			
			this.refs.inputZip.focus();
		}


	    onNextClick =()=>{


	    		Actions.RequestLoanAmountStep3();
			 //    if(this.state.dob==''){
				// 	Actions.RequestLoanAmountStep3()
				// }
				// else if(this.state.ssn==''){
				// 	Actions.RequestLoanAmountStep4()
				// }
				// else{
				// 	Actions.AddBankAccount();
				// }
	      
	    }


	       getUserDataFromAsync(){


        AsyncStorage.getItem("userData").then((value) => {
          if(value) {

              console.log('qualificationRes if='+value);
              

              let obj = JSON.parse(value);
            
				if(obj.address1!=undefined&&obj.state!=undefined&&obj.city!=undefined&&obj.zipcode!=undefined){
						
						this.onAddressChange(obj.address1)
						
						if(obj.address2!=undefined&&obj.address2!=null&&obj.address2!=''){
							this.onAddressChange2(obj.address2)
						}		
						
						this.onStateChange(obj.state)
						this.onCityChange(obj.city);
						this.onZipChange(obj.zipcode);
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
   

		updateUserAddress(){


		 console.log('props state val'+this.props.state);
		 if (this.props.address.replace(/^\s+|\s+$/g,"") == ''){

			 //Alert.alert('Please enter your address.');
			 this.setState({errorMsg:'Please enter your address.'});
    		 this.setState({errorOnTextField:0});
			 //this.popupDialog.show();
		 }
		 else if(this.props.city.replace(/^\s+|\s+$/g,"")==''||this.props.city=='City'){
			 //Alert.alert('Please select your city.');
			 this.setState({errorMsg:'Please select your city.'});
    		 this.setState({errorOnTextField:1});

		 }
		 else if(this.props.states.replace(/^\s+|\s+$/g,"")==''||this.props.states=='State'){
			 //Alert.alert('Please select your state.');
			  this.setState({errorMsg:'Please select your state.'});
    		 this.setState({errorOnTextField:3});
		 }
		 else if (stateArray.filter(e => e.state_abbreviation.toLowerCase() == this.props.states.replace(/^\s+|\s+$/g,"").toLowerCase()).length == 0) {
				 //Alert.alert(this.props.states+' is not state of U.S.');
				  this.setState({errorMsg:this.props.states+' is not valid U.S. state.'});
    		     this.setState({errorOnTextField:3});
	     }
		 else if(this.props.zip.replace(/^\s+|\s+$/g,"")==''){
			 //Alert.alert('Please enter your zip code.');
			   this.setState({errorMsg:'Please enter your zip code.'});
    		 this.setState({errorOnTextField:2});
		 }
		 else if(this.props.zip.length<5){
			 //Alert.alert('Please enter valid zip code.');
			 this.setState({errorMsg:'Please enter a valid zip code.'});
    		 this.setState({errorOnTextField:2});
		 }
		 else{
		 	
			 this.props.showLoading(true);
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
							address1:this.props.address,
							address2:this.props.address2,
							state:this.props.states,
							city:this.props.city,
							zipcode:this.props.zip,
						};
						console.log('Update USER='+JSON.stringify(user));
						this.props.updateUserAddress(user);

				 }
				 else {

						 console.log('userId else='+value);
				 }
			 }).done();


		 }
		}

		_focusNextField(nextField) {
        	this.refs[nextField]._onFocus()
    	}


 onDialogButtonClick(){
      this.setState({popuMsg:''});
    }


     onSkipClick=()=>{
      Actions.RequestLoanAmountStep3();
    }
	

    render(){

			let allStateNames = this.state.stateNames.map( (s, i) => {
            var key = 'key'+i;
            return <Picker.Item key={i} value={s} label={s}  style={{width:100}}/>
        });

			let allCityNames = this.state.cityNames.map( (s, i) => {
	            var key = 'key'+i;
	            return <Picker.Item key={i} value={s} label={s} style={{width:100}}/>
	        });
      return(
        <Image style={styles.container}
          source={require('../res/bg.png')}>

          <KeyboardAwareScrollView keyboardShouldPersistTaps={'always'} contentContainerStyle={{paddingBottom:50}}>
            <View>
             <View style={{alignItems:'center'}}>
             <Progress.Bar progress={0.70} width={DEVICE_WIDTH*0.9} unfilledColor={'#FFFFFF'} color={'#7ACBBC'} />
             <Text style={styles.screenProgressText}>07/10</Text>
            </View>
            <Text style={styles.forgotText}>BASIC DETAIL</Text>
            <Text style={styles.forgotDetailText}>Please confirm the address associated with your bank account.</Text>

            

            <View style={styles.inputContainer}>
             <TextField

                  labelStyle={{fontFamily:'FuturaStd-Book'}}
                  inputStyle={{fontFamily:'FuturaStd-Book'}}
                  label={'Address'}
                  highlightColor={'#FFFFFF'}
                  height={(Platform.OS === 'ios') ? 35 : 40}
                  labelColor={'#FFFFFF'}
                  textColor={'#FFFFFF'}
                  borderColor={'#FFFFFF'} 
                  returnKeyType='next'
                  selectionColor='#FFFFFF'
                  underlineColorAndroid='transparent'
				  onChangeText={this.onAddressChange.bind(this)}
				  autoCorrect={false}
				  autoCapitalize='words'
				  autoCorrect={false}
				  value={this.props.address}
				  ref='addressinput'
				  onSubmitEditing={(event)=>{this.refs.address2input.focus()}}
                />

             
                {this.props.address!=''?<View style={styles.inlineImg}><TouchableOpacity  onPress={this.onAddressClearClick.bind(this)}><Image style={styles.clearImageStyle}
                                source={require('../res/clrfield.png')}></Image></TouchableOpacity></View>:null}  
          			
                 
            
            </View>
            {this.state.errorMsg!=''&&this.state.errorOnTextField==0?<Text style={styles.errorText}>{this.state.errorMsg}</Text>:null}

            <View style={styles.inputContainer}>



             <TextField
                  	labelStyle={{fontFamily:'FuturaStd-Book'}}
                	inputStyle={{fontFamily:'FuturaStd-Book'}}
                  	label={'Apartment/Suite'}
                  	highlightColor={'#FFFFFF'}
                  	labelColor={'#FFFFFF'}
                  	textColor={'#FFFFFF'}
                  	height={(Platform.OS === 'ios') ? 35 : 40}
                  	borderColor={'#FFFFFF'} 
                 	returnKeyType='next'
                    selectionColor='#FFFFFF'
                    underlineColorAndroid='transparent'
					onChangeText={this.onAddressChange2.bind(this)}
					autoCorrect={false}
					autoCapitalize='words'
					autoCorrect={false}
					value={this.props.address2}
					ref='address2input'
                    onSubmitEditing={() => (Platform.OS === 'ios') ? this._focusNextField('cityRef'):this.refs.cityRef.focus()}
                />

            
             

          		 {this.props.address2!=''?<View style={styles.inlineImg}><TouchableOpacity  onPress={this.onAddress2ClearClick.bind(this)}><Image style={styles.clearImageStyle}
                                source={require('../res/clrfield.png')}></Image></TouchableOpacity></View>:null}  
                
          			
              
            </View>

              {
            	(Platform.OS === 'ios') ? 

            		  <View style={styles.pickerMainContainer}>

            		  <View>

		                <View style={styles.pickerContainer}>

		                
			                <AutoComplete

						          style={styles.autocomplete}
						          suggestions={this.state.data}
						          onTyping={this.onTyping.bind(this)}
						          onSelect={this.onCitySelect.bind(this)}
						          placeholder="City"		         
						          returnKeyType="next"
						          placeholderTextColor="#ffffff"
						          autoCompleteTableTopOffset={this.state.data.length==1?-80:this.state.data.length==2?-120:-180}
						          autoCompleteTableSizeOffset={-10}
						          autoCompleteTableBorderColor="lightblue"
						          autoCompleteTableBackgroundColor="azure"
						          autoCompleteTableCornerRadius={5}
						          autoCompleteTableBorderWidth={1}
						          autoCompleteFontSize={15}
						          autoCompleteRegularFontName="FuturaStd-Book"
						          autoCompleteBoldFontName="FuturaStd-Book"
						          autoCompleteTableCellTextColor={'dimgray'}
						          autoCompleteRowHeight={40}
						          autoCompleteFetchRequestDelay={100}
						          maximumNumberOfAutoCompleteRows={4}

						          onChangeText={this.onCityChange.bind(this)}
							      value={this.props.city}
							      ref='cityRef'
							      autoCorrect={false}
							        autoCapitalize='words'
							      selectionColor='#FFFFFF'
							      onSubmitEditing={() => this._focusNextField('stateRef')}
							      
						        />							

		                </View>

		                {this.props.city!=''?<View style={styles.inlineCityImg}><TouchableOpacity  onPress={this.onCityClearClick.bind(this)}><Image style={styles.clearImageStyle}
                                source={require('../res/clrfield.png')}></Image></TouchableOpacity></View>:null}  

		            </View>    

		              

		            <View>
		                <View style={styles.pickerContainer}>

			                  <AutoComplete
						          style={styles.autocomplete}
						          suggestions={this.state.stateDate}
						          onTyping={this.onStateTyping.bind(this)}
						          onSelect={this.onStateSelect.bind(this)}
						          placeholder="State"
						          returnKeyType="next"
						          placeholderTextColor="#ffffff"
						          autoCompleteTableTopOffset={this.state.stateDate.length==1?-80:this.state.stateDate.length==2?-120:-180}
						          autoCompleteTableSizeOffset={-10}
						          autoCompleteTableBorderColor="lightblue"
						          autoCompleteTableBackgroundColor="azure"
						          autoCompleteTableCornerRadius={5}
						          autoCompleteTableBorderWidth={1}
						          autoCompleteFontSize={15}
						          autoCompleteRegularFontName="FuturaStd-Book"
						          autoCompleteBoldFontName="FuturaStd-Book"
						          autoCompleteTableCellTextColor={'dimgray'}
						          autoCompleteRowHeight={40}
						          autoCompleteFetchRequestDelay={100}
						          maximumNumberOfAutoCompleteRows={4}

						          onChangeText={this.onStateChange.bind(this)}
							      value={this.props.states}
							      ref='stateRef'
							      autoCorrect={false}
							      autoCapitalize='characters'
							      selectionColor='#FFFFFF'
							      onSubmitEditing={(event)=>{this.refs.inputZip.focus()}}
						          
						        />
							
							 
		                </View>
		                
		                {this.props.states!=''?<View style={styles.inlineCityImg}><TouchableOpacity  onPress={this.onStateClearClick.bind(this)}><Image style={styles.clearImageStyle}
                                source={require('../res/clrfield.png')}></Image></TouchableOpacity></View>:null} 
                    </View>

            		</View> :  
            		<View style={styles.pickerMainContainer}>

            			  
            			<View>
            			  	<TextField

					                  labelStyle={{fontFamily:'FuturaStd-Book'}}
					                  inputStyle={{fontFamily:'FuturaStd-Book'}}
					                  style={styles.pickerContainerForAndroid}
					                  label={'City'}
					                  highlightColor={'#FFFFFF'}
					                  height={(Platform.OS === 'ios') ? 35 : 40}
					                  labelColor={'#FFFFFF'}
					                  textColor={'#FFFFFF'}
					                  borderColor={'#FFFFFF'} 
					                  returnKeyType='next'
					                  selectionColor='#FFFFFF'
					                  underlineColorAndroid='transparent'  
									  autoCorrect={false}
									  autoCapitalize='words'
									  onChangeText={this.onCityChange.bind(this)}
							      	  value={this.props.city}
							          ref='cityRef'
							          autoCorrect={false}
							          onSubmitEditing={(event)=>{this.refs.stateRef.focus()}}


					        />

					        {this.props.city!=''?<View style={styles.inlineImg}><TouchableOpacity  onPress={this.onCityClearClick.bind(this)}><Image style={styles.clearImageStyle}
                                source={require('../res/clrfield.png')}></Image></TouchableOpacity></View>:null}  
            			  

            			 </View>

            			 <View>

            			   	<TextField

					                  labelStyle={{fontFamily:'FuturaStd-Book'}}
					                  inputStyle={{fontFamily:'FuturaStd-Book'}}
					                  style={styles.pickerContainerForAndroid}
					                  label={'State'}
					                  highlightColor={'#FFFFFF'}
					                  height={(Platform.OS === 'ios') ? 35 : 40}
					                  labelColor={'#FFFFFF'}
					                  textColor={'#FFFFFF'}
					                  borderColor={'#FFFFFF'} 
					                  returnKeyType='next'
					                  selectionColor='#FFFFFF'
					                  underlineColorAndroid='transparent'  
									  autoCorrect={false}
									  autoCapitalize='characters'
									  onChangeText={this.onStateChange.bind(this)}
									  maxLength={2}
							      	  value={this.props.states}
							          ref='stateRef'
							          onSubmitEditing={(event)=>{this.refs.inputZip.focus()}}
					        	/>

					         {this.props.states!=''?<View style={styles.inlineImg}><TouchableOpacity  onPress={this.onStateClearClick.bind(this)}><Image style={styles.clearImageStyle}
                                source={require('../res/clrfield.png')}></Image></TouchableOpacity></View>:null}  
            			 </View>  
            		</View>
             }

             {
                  this.state.errorMsg!=''&&this.state.errorOnTextField==1?<Text style={styles.errorCityText}>{this.state.errorMsg}</Text>:null
             }

             {
                  this.state.errorMsg!=''&&this.state.errorOnTextField==3?<Text style={styles.errorStateText}>{this.state.errorMsg}</Text>:null
             }

            <View style={styles.inputContainer}>


             <TextField
                  labelStyle={{fontFamily:'FuturaStd-Book'}}
                  inputStyle={{fontFamily:'FuturaStd-Book'}}
                  label={'Zip'}
                  highlightColor={'#FFFFFF'}
                  labelColor={'#FFFFFF'}
                  height={(Platform.OS === 'ios') ? 35 : 40}
                  textColor={'#FFFFFF'}
                  borderColor={'#FFFFFF'} 
                  underlineColorAndroid='transparent'
                       returnKeyType='done'
                 	   selectionColor='#FFFFFF'
                       underlineColorAndroid='transparent'
					   keyboardType='numeric'
					   onChangeText={this.onZipChange.bind(this)}
					   value={this.props.zip}
					   autoCorrect={false}
					   ref='inputZip'
                       maxLength={5}
                />

          


          		  {this.props.zip!=''?<View style={styles.inlineImg}><TouchableOpacity  onPress={this.onZipClearClick.bind(this)}><Image style={styles.clearImageStyle}
                                source={require('../res/clrfield.png')}></Image></TouchableOpacity></View>:null}  


           
            </View>

            
                 {
                  this.state.errorMsg!=''&&this.state.errorOnTextField==2?<Text style={styles.errorText}>{this.state.errorMsg}</Text>:null
                }


            <View style={styles.buttonViewStyle}>

                  <TouchableOpacity style={styles.buttonLogin}
                  onPress={this.updateUserAddress.bind(this)}
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

					 {this.props.isLoadingCity || this.props.isLoadingStates?
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
          </KeyboardAwareScrollView>

            {this.state.popuMsg!=''&&this.state.popuMsg!=undefined?<View style={styles.dialogViewStyle}>
                       <CustomAlertDialog title='Bankroll' onPress={this.onDialogButtonClick.bind(this)} subtitle={this.state.popuMsg}/>
                          </View>:null}
        </Image>
      );
    }
}

const mapStateToProps = ({ updateUserAddress,getCityReducer,getStatesReducer }) => {

  const {address, address2, city,states,zip,isLoading,responseData} = updateUserAddress;
  const {isLoadingCity, responseDataCity} = getCityReducer;
  const {isLoadingStates, responseDataStates} = getStatesReducer;
  console.log("update Output: "+JSON.stringify(responseData));
  console.log("update Output city: "+JSON.stringify(responseDataCity));
   console.log("update Output states: "+JSON.stringify(responseDataStates));

  return {
    address: address,
    address2:address2,
    city: city,
	states:states,
	zip:zip,
	isLoading:isLoading,
    responseData:responseData,
    isLoadingCity:isLoadingCity,
    responseDataCity:responseDataCity,
    isLoadingStates:isLoadingStates,
    responseDataStates:responseDataStates

  }
}

    
    

export default connect(mapStateToProps,{showLoadingCity,clearResponseCity,CityReq,addressChanged,addressChanged2,cityChanged,stateChanged,zipChanged,showLoading,clearResponse,updateUserAddress,showLoadingStates,clearResponseStates,StatesReq})(RequestLoanAmountStep2);

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
    paddingLeft:15,
    backgroundColor:'transparent'

  },
  formInput: {
    borderBottomWidth: 1,
    marginLeft: 20,
    marginRight:20,
    borderColor: '#FFFFFF',
    alignSelf: 'stretch',

  },

  zipInput: {
    borderBottomWidth: 1,
    marginLeft: 20,
    marginRight:20,
    borderColor: '#FFFFFF',
    width:DEVICE_WIDTH*0.4

  },
  input: {
    borderWidth: 0,
    paddingLeft:15,
    color:'#ffffff',

  },
  inputContainer: {
    marginTop:10,
    marginRight:20,
    marginLeft:20
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
        justifyContent: 'center', 
        alignItems: 'center', 
        fontFamily:'FuturaStd-Book',
    },
  pickerMainContainer: {
      flexDirection:'row',
      justifyContent: 'space-between',
      marginTop:25,
      paddingLeft: 20,
      paddingRight:20,

    },
  pickerContainer:{
	flexDirection:'row',
    width: DEVICE_WIDTH*0.4,
    borderBottomWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderColor: '#FFFFFF',
    
  },

  pickerContainerForAndroid:{
	
    width: DEVICE_WIDTH*0.4,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
   	color:'#ffffff',
    
  },

  picker: {
        width: DEVICE_WIDTH*0.5,
        color:'#ffffff',

  },
	dropDownImage:{
		position:'absolute',
		right:10,
		bottom:20
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

 autocomplete: {
    width:DEVICE_WIDTH*0.4,
    height:40,
    marginTop: 10,
    borderColor: '#ffffff',
    borderWidth: 0,
    color:'#ffffff',

    fontFamily:'FuturaStd-Book',

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

   errorCityText: {
    color:'red',
    fontSize: 14,
    textAlign: 'left',
    paddingTop:10,
    paddingLeft:20,
    backgroundColor:'transparent',
    fontFamily:'FuturaStd-Book'
  },

   errorStateText: {
    color:'red',
    fontSize: 14,
    textAlign: 'right',
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
		bottom:16,
		
	},

 inlineCityImg: {
		position: 'absolute',
		right: 5,
		bottom:10,
		
	},


  clearImageStyle:{

  	padding:10,
  },

});
