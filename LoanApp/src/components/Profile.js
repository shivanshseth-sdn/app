import React,{Component} from 'react';
import { connect } from 'react-redux';

import {
	Image,
	StyleSheet,
	Navigator,
	View,
  	Text,
  	Button,
	TouchableOpacity,
	TextInput,
	ListView,
	ListViewDataSource,
	InteractionManager,
	RefreshControl,
	Animated, Platform, Dimensions,
	ScrollView,
	Alert,
	AsyncStorage
} from 'react-native';

import {
    firstNameChanged,
    lastNameChanged,
	addressChanged,
	addressChanged2,
	cityChanged,
    stateChanged,
	zipChanged,
	dobChanged,
	phoneChanged,
	showLoading,
	clearResponse,
	updateUserProfile
} from '../actions/UpdateProfileAction';

import DatePicker from 'react-native-datepicker'
import {Card} from './common';
import data from '../../data.json';
const window = Dimensions.get('window');
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').heigh
import Moment from 'moment';
//import Countries from '../../countries.json';
//import USStates from '../../states.json';
import AutoComplete from 'react-native-autocomplete';

import{ Actions} from 'react-native-router-flux';
import * as Progress from 'react-native-progress';
import CustomAlertDialog from './CustomAlertDialog';


import {
  showLoadingMyLoan,
  clearResponseMyLoan,
  getMyLoanReq,
	
} from '../actions/MyLoanAction';

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


const cityArray=[];
const stateArray=[];
class DynamicListRow extends Component {

    // these values will need to be fixed either within the component or sent through props

    _defaultTransition  = 500;

    state = {

        _rowOpacity : new Animated.Value(0)
    };

    componentDidMount() {
        Animated.timing(this.state._rowOpacity, {
            toValue  : 1,
            duration : this._defaultTransition
        }).start()
    }

    render() {
        return (
            <Animated.View
              >
                {this.props.children}
            </Animated.View>
        );
    }
}

class Profile extends Component{

	state = {

			data: [],
			citydata: [],
			statedata: [],
			loading     : true,
			dataSource  : new ListView.DataSource({
					rowHasChanged : (row1, row2) => true
			}),
			refreshing  : false,
			address: '',
			fullAddress: '',
			onlyAddress: '',
			city:'',
			state:'',
			zipcode:'',
			email: '',
			phone: '',
			dobDate: '',
			isEditable:false,
			isLoanRequest:false,
			responseData:'',
			code:'',
			msg:'',
			errorMsg: '',
			errorOnTextField:'',
        	responseDataRecent:'',
        	codeRecent:'',
        	msgRecent:'',
        	dataRecent:[],
        	dialogMsg:'',
            isShowDialog:false,

            resDataCity:'',
			codeCity:'',
			msgCity:'',

			resDataStates:'',
			codeStates:'',
			msgStates:'',



	};

	constructor(props) {
	super(props);

	}

		onDialogButtonClick(){
			this.setState({isShowDialog:false});
			this.setState({dialogMsg:''});
		}

	componentWillReceiveProps(nextProps) {


		console.log('LoginComponent componentWillReceiveProps ==== '+nextProps.responseData);
		this.setState({responseData:nextProps.responseData});
		this.setState({code:nextProps.responseData.code});
		this.setState({msg:nextProps.responseData.message});
		

		console.log('LoginComponent componentWillReceiveProps ==== ');
		var resData=JSON.stringify(nextProps.responseData.data);
		
		console.log(' LoginComponent componentWillReceiveProps ==== '+resData);

		try {
			if(resData != undefined&&resData!='')
			{
				let obj = JSON.parse(resData);
				if(resData!=undefined){

					AsyncStorage.setItem("userData",resData);
					
				}			
							
			}
			

		} catch (ex) {
			console.error(ex);
		}

		this.setState({responseDataRecent:nextProps.myLoanRes});
		this.setState({codeRecent:nextProps.myLoanRes.code});
		this.setState({msgRecent:nextProps.myLoanRes.message});
		var resDataRecent=JSON.stringify(nextProps.myLoanRes.data);


              try {
                if(resDataRecent != undefined&&resDataRecent!=''&&resDataRecent!="{}")
                {
                  let obj = JSON.parse(resDataRecent);
                  this.setState({dataRecent:obj});
				  console.log('myloan componentWillReceiveProps ==== '+obj);   
                        
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

	componentDidUpdate() {

			console.log('profile componentDidUpdate ==== ');
			if(this.state.responseData!=''){
				{
					console.log('profile componentDidUpdate ==== update profile');
					if(this.state.code==200){
					  this.props.clearResponse();
					  this.props.showLoading(false);
					  this.setState({isEditable:false});
					  this.setUserDetail();
			
					}
					else{
						this.props.clearResponse();
						this.props.showLoading(false);
						//Alert.alert(this.state.msg);
						this.setState({isShowDialog:true});
						 this.setState({dialogMsg:this.state.msg});
					}
				}
			}

			if(this.state.responseDataRecent!=''){
					{if(this.state.codeRecent==200){
						this.props.showLoadingMyLoan(false);
						this.props.clearResponseMyLoan();	
					}
					else{
						this.props.showLoadingMyLoan(false);
						this.props.clearResponseMyLoan();
						//Alert.alert(this.state.msgRecent);
						this.setState({isShowDialog:true});
						 this.setState({dialogMsg:this.state.msgRecent});
					}
				}
			}

		
	}
	formatPhoneNumber(s) {

		  var s2 = (""+s).replace(/\D/g, '');
		  var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
		  return (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
		
		}

	componentWillMount(){

  
   		 this.props.showLoadingMyLoan(true);
    	 AsyncStorage.getItem("userData").then((value) => {
                        if(value) {

                            console.log('for recent userData if='+value);
                            let obj = JSON.parse(value);
                    
                          
                           var user={

                           	authToken:obj.token,
                            userId:obj._id,

                          };
                          console.log('Update USER='+JSON.stringify(user));
                          this.props.getMyLoanReq(user);


                            
                        }
                        else {

                            console.log('userData else='+value);
                        }
                      }).done();

        this.props.showLoadingCity(true);
     	this.props.CityReq();

     	this.props.showLoadingStates(true);
     	this.props.StatesReq();              

  	}
	componentDidMount() {
			InteractionManager.runAfterInteractions(() => {
					this._loadData()
					this.setUserDetail();
			});

	}
	_loadData(refresh) {
			refresh && this.setState({
					refreshing : true
			});

			this.dataLoadSuccess({data : this.state.dataRecent});
	}

	dataLoadSuccess(result) {

			this._data = result.data;

			let ds = this.state.dataSource.cloneWithRows(this._data);

			this.setState({
					loading     : false,
					refreshing  : false,
					dataSource  : ds
			});
	}
	statusStyle(status) {

		if(status=='pending'){
			return {
				color    : '#FC5622',
				padding:5,
				fontFamily:'FuturaStd-Book',
				fontSize : 14
			}
		}
		if(status=='inprogress'){
			return {
				color    : '#FC5622',
				padding:5,
				fontFamily:'FuturaStd-Book',
				fontSize : 14
			}
		}
		else if(status=='cancelled'){
			return {
				color    : '#F24235',
				padding:5,
				fontFamily:'FuturaStd-Book',
				fontSize : 14
			}
		}
		else if(status=='completed'){
			return {
				color    : '#427E7B',
				padding:5,
				fontFamily:'FuturaStd-Book',
				fontSize : 14
			}
		}

 }

  loanStatusText(loan_paid_status){
   
      if(loan_paid_status=='pending'){
        return(
            <View style={styles.listItemTextView}>
                 <Text style={this.statusStyle(loan_paid_status)}>APPROVED</Text>
            </View>
        );
      }
      else if(loan_paid_status=='inprogress'){
         return(
            <View style={styles.listItemTextView}>
                 <Text style={this.statusStyle(loan_paid_status)}>DEPOSITED</Text>
            </View>
        );
      }
      else if(loan_paid_status=='completed'){
         return(
            <View style={styles.listItemTextView}>
                 <Text style={this.statusStyle(loan_paid_status)}>COMPLETED</Text>
            </View>
        );
      }
      else if(loan_paid_status=='cancelled'){
         return(
            <View style={styles.listItemTextView}>
                 <Text style={this.statusStyle(loan_paid_status)}>CANCELLED</Text>
            </View>
        );
      }
    }
	_renderRow(rowData, sectionID, rowID) {
			return (
					<DynamicListRow>
							<View style={styles.rowStyle}>
									<View style={styles.contact}>
											<View style={styles.listLoanIdTextView}>
												<Text style={[styles.loanid]}>Loan ID <Text style={styles.loanidVal}>{rowData.loanUniqueId}</Text></Text>
											</View>

											
											{this.loanStatusText(rowData.loan_paid_status)}
											

											<View style={styles.listItemAmountTextView}>
												<Text style={[styles.amount]}>${rowData.loan_amt?parseFloat(rowData.loan_amt).toFixed(2):'0.00'}</Text>
											</View>

									</View>
									<View>
										<Text style={styles.date}>{Moment(rowData.createdAt).format('MMM DD YYYY hh:mm A')}</Text>
									</View>
							</View>
					</DynamicListRow>
			);
	}

	onEditClick(){
		if(this.state.isEditable==false){
			this.setState({isEditable:true});
			//this.props.addressChanged(this.state.onlyAddress);
			//this.props.addressChanged2(this.state.address);
		}
		else{
			
			//this.props.addressChanged(this.state.onlyAddress);
			this.setState({isEditable:false});
		}
	}

	textInputStyle(){
		if(this.state.isEditable==false){
			return{
					flex:1,
					borderBottomWidth: 1,
					height:30,
					textAlignVertical: 'center',
					fontSize:14,
					fontFamily:'FuturaStd-Book',
					color:'#D1D2D4',
					borderColor: '#FFF',
			}
		}
		else{
			return{
					flex:1,
					borderBottomWidth: 1,
					textAlignVertical: 'center',
					fontSize:14,
					height:30,
					color:'#000',
					fontFamily:'FuturaStd-Book',
					borderColor: '#FFF',
			}
		}
	}

	datePalceHolderInputStyle(){
		if(this.state.isEditable==false){
			
			return{
					dateInput: 
						{
						    position: 'absolute',
						    left: 5,
						    bottom:18,
						    backgroundColor:'white',
						    marginLeft: 0,
						    borderBottomWidth: 0,
						    borderLeftWidth: 0,
						    borderTopWidth: 0,
						    borderRightWidth: 0,
						    height:17
				        },
					    dateText:
					    {
							color:'#D1D2D4',
						    fontSize:14,
						    backgroundColor:'white',
						    fontFamily:'FuturaStd-Book',
						},
						placeholderText:
						{
							color:'#D1D2D4',
							fontSize:14,
							backgroundColor:'white',
							fontFamily:'FuturaStd-Book',
						}
					
			}
		}
		else{
			return{
					
						dateInput: 
						{
						    position: 'absolute',
						    left: 5,
						    bottom:5,
						    marginLeft: 0,
						    borderBottomWidth: 0,
						    borderLeftWidth: 0,
						    borderTopWidth: 0,
						    borderRightWidth: 0,
				        },
					    dateText:
					    {
							color:'#000000',
						    fontSize:14,
						    fontFamily:'FuturaStd-Book',
						},
						placeholderText:
						{
							color:'#000000',
							fontSize:14,
							fontFamily:'FuturaStd-Book',
						}
					
			}
		}
	}

	setUserDetail(){

		AsyncStorage.getItem("userData").then((value) => {
        if(value) {

            console.log('set user userData if='+value);
            let obj = JSON.parse(value);
            if(obj.address1!=undefined &&obj.address2!=undefined&& obj.state!=undefined && obj.city!=undefined && obj.zipcode!=undefined){
            	
            	var combineAddress=obj.address1+' '+obj.address2+' '+obj.city+', '+obj.state+', '+obj.zipcode;
            	
            	this.setState({fullAddress:combineAddress});
            	this.setState({address:obj.address2});
            	this.setState({city:obj.city});
            	this.setState({state:obj.state});
            	this.setState({zipcode:obj.zipcode});
            	this.setState({onlyAddress:obj.address1});
            	
            	this.props.addressChanged(obj.address1);
            	this.props.addressChanged2(obj.address2);
            	this.props.zipChanged(obj.zipcode);
            	this.props.cityChanged(obj.city);
            	this.props.stateChanged(obj.state);
            }
            else{
            	this.setState({address:''});
            }
            if(obj.email!=undefined){
            	this.setState({email:obj.email});
            }
            else{
            	this.setState({email:''});
            }

            if(obj.contact!=undefined){

            	var num=this.formatPhoneNumber(obj.contact);
            	this.setState({dobDate:num});
            	this.setState({phone:num});
            	this.props.phoneChanged(num);
            }
            else{
            	this.setState({phone:''});
            }

            if(obj.dob!=undefined){
            	this.setState({dobDate:obj.dob});
            	this.props.dobChanged(obj.dob);
            }
            else{
            	this.setState({dobDate:''});
            }

            if(obj.is_requested!=undefined){
            	console.log('in is requested if '+obj.is_requested)
            	this.setState({isLoanRequest:obj.is_requested})
            }
            else{
            	console.log('in is requested else '+obj.is_requested)
            	this.setState({isLoanRequest:false})
            }

            
        }
        else {

            console.log('userData else='+value);
        }
      }).done();
	}
		onDOBChange(text){
			 this.setState({errorMsg:''});
      		this.setState({errorOnTextField:''});
			this.props.dobChanged(text);
		}

		onTyping(text) {
				    const countries = cityArray
				        .filter(country => country.city.toLowerCase().startsWith(text.replace(/^\s+|\s+$/g,"").toLowerCase()))
				        .map(country => country.city);
				 
				     this.setState({ citydata: countries });
				     this.props.cityChanged(text);
		}

		onStateTyping(text) {

			if(text.length<=2){
				  const states = stateArray
			        .filter(states => states.state_abbreviation.toLowerCase().startsWith(text.replace(/^\s+|\s+$/g,"").toLowerCase()))
			        .map(states => states.state_abbreviation);
			    this.setState({ statedata: states });
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

	    onAddressChange(text){

	    		 this.setState({errorMsg:''});
      			 this.setState({errorOnTextField:''});
      			 console.log('address changes'+text+'========'+this.props.address);
				this.props.addressChanged(text);
		}

		onAddressChange2(text){

	    		 this.setState({errorMsg:''});
      			this.setState({errorOnTextField:''});

				this.props.addressChanged2(text);
		}

	   onStateChange(text){

				console.log('state'+text);
				
				 this.setState({errorMsg:''});
      			this.setState({errorOnTextField:''});
				this.props.stateChanged(text);
		}

		onCityChange(text){
				 this.setState({errorMsg:''});
      			this.setState({errorOnTextField:''});
				this.props.cityChanged(text);
		}

		

		onZipChange(text){
				 this.setState({errorMsg:''});
      			 this.setState({errorOnTextField:''});
				this.props.zipChanged(text);
		}

		onPhoneChange(text){

				console.log('onPhoneChange'+text);

				 this.setState({errorMsg:''});
      			 this.setState({errorOnTextField:''});
			
				if(text.length<10){
 			       
 			       this.props.phoneChanged(text);

				}
				else{
					console.log('onPhoneChange else'+text);
				    var num=this.formatPhoneNumber(text);
			        console.log('format num ==== '+num);
			        if(num!=null){
						this.props.phoneChanged(num);
			        }
			        else{
			        	 this.props.phoneChanged(text);
			        }
					
				}
			
	  
		}


	   autoCompletTextStyle(){
		if(this.state.isEditable==false){
			return{
				    width:DEVICE_WIDTH*0.35,
				    height:30,
				    borderColor: '#FFFFFF',
				    borderWidth: 0,
				    color:'#D1D2D4',
				    fontSize:14,
				    fontFamily:'FuturaStd-Book',

				  }
		}
		else{

			return{
				    width:DEVICE_WIDTH*0.35,
				    height:30,
				    borderColor: '#FFFFFF',
				    borderWidth: 0,
				    color:'#000000',
				    fontSize:14,
				    fontFamily:'FuturaStd-Book',

				  }
		}
	}

	updateUserProfile(){


		
		
			

		 if (this.props.address.replace(/^\s+|\s+$/g,"") == ''){

			 //Alert.alert('Please enter your address.');
			 this.setState({errorMsg:'Please enter your address.'});
    		 this.setState({errorOnTextField:0});
			
		 }
		 else if(this.props.city.replace(/^\s+|\s+$/g,"")==''){


			 //Alert.alert('Please select your city.');

			 this.setState({errorMsg:'Please select your city.'});
    		 this.setState({errorOnTextField:0});
		 }
		 else if(this.props.state.replace(/^\s+|\s+$/g,"")==''){
			 //Alert.alert('Please select your state.');
			  this.setState({errorMsg:'Please select your state.'});
    		 this.setState({errorOnTextField:0});
		 }
		 else if (stateArray.filter(e => e.state_abbreviation.toLowerCase()  == this.props.state.replace(/^\s+|\s+$/g,"").toLowerCase()).length == 0) {
			     console.log('in update profile method???????????'+this.props.state); 
				 this.setState({errorMsg:this.props.state+' is not valid U.S. state.'});
    		     this.setState({errorOnTextField:0});
		 }
		 else if(this.props.zipcode.replace(/^\s+|\s+$/g,"")==''){
			 //Alert.alert('Please enter your zip code.');
			  this.setState({errorMsg:'Please enter your zip code.'});
    		 this.setState({errorOnTextField:0});
		 }

		 else if(this.props.zipcode.length<5){
			 //Alert.alert('Please enter valid zip code.');
			 this.setState({errorMsg:'Please enter valid zip code.'});
    		 this.setState({errorOnTextField:0});
		 }
		 
		 else if(this.props.phone==''){
			 //Alert.alert('Please enter your phone number.');
			  this.setState({errorMsg:'Please enter your phone number.'});
    		 this.setState({errorOnTextField:0});
		 }
		 else if(this.props.phone.replace(/[\s()-]+/gi, '').length<10){
			 //Alert.alert('Please enter valid phone number.');
			 this.setState({errorMsg:'Please enter valid phone number.'});
    		 this.setState({errorOnTextField:0});
		 }
		 else if(this.props.dob==''){
			 //Alert.alert('Please select your Date of Birth.');
			  this.setState({errorMsg:'Please select your Date of Birth.'});
    		 this.setState({errorOnTextField:0})

		 }
		 else{
		 		
		 	 var age = Moment().diff(this.props.dob, 'years');

		 	 if(age<18){

		 	 		 //Alert.alert('Sorry Bankroll not allowing you to update your age below 18.');
		 	 		 this.setState({errorMsg:'Sorry Bankroll not allowing you to update your age below 18.'});
    		 		this.setState({errorOnTextField:0})
		 	 }
		 	 else{

		 	 	 this.props.showLoading(true);
			 	 let access_token,inNewNum;
			 	 if(this.state.phone!=this.props.phone)
			 	 {
			 	 	inNewNum='true';
			 	 }
				 else{
			 		inNewNum='false';
			 	 }
			 	 AsyncStorage.getItem("userData").then((value) => {
			       
			        if(value) {

		
			            console.log('update value userData if='+value);
			            let obj = JSON.parse(value);
			          	 var user={
			              authToken:obj.token,
			              userId:obj._id,
			              firstname:obj.firstname,
			              lastname:obj.lastname,
			              contact:parseInt(this.props.phone.replace(/[\s()-]+/gi, ''), 10),
			              address1:this.props.address,
			              address2:this.props.address2,
			              isPhoneNew:inNewNum,
			              zipcode:parseInt(this.props.zipcode, 10),
			              city:this.props.city,
			              state:this.props.state,
			              dob:this.props.dob
			            
			            };
			            console.log('Update profile='+JSON.stringify(user));
			            this.props.updateUserProfile(user);
			            
			        }
			        else {

			            console.log('userData else='+value);
			        }
			      }).done();

		 	 }
			
		   }
		}


    render(){
      return(
				<Image style={styles.container}
                source={require('../res/bg.png')}>
                
						<View>

								{
				                  this.state.errorMsg!=''&&this.state.errorOnTextField==0?<Text style={styles.errorText}>{this.state.errorMsg}</Text>:null
				                }
							 
							<Card>


								<ScrollView>
									<View style={styles.userInfoHeader}>
										   <Text style={styles.myinfoText}>My Info</Text>

											{this.props.isLoanRequest ?
									           null :this.state.isEditable==false?<TouchableOpacity onPress={this.onEditClick.bind(this)}>
													<Image style={styles.eidtIconHeader}
														source={require('../res/edit.png')}>
													</Image>
												</TouchableOpacity>:<TouchableOpacity onPress={this.updateUserProfile.bind(this)}>
													<Text style={styles.myinfoText}>Save</Text>
												</TouchableOpacity>}
									
									</View>
									<View style={styles.userDetailView}>

												<View style={styles.addressView}>
													<Image style={styles.eidtIcon}
														source={require('../res/home_profile.png')}>
													</Image>
													<TextInput style={this.textInputStyle()}
				 									underlineColorAndroid='transparent'
				 									editable={this.state.isEditable}
				 									height={(Platform.OS === 'ios') ? 35 : 40}
				 									placeholder="Address"
				 									autoCapitalize='words'
				 									placeholderTextColor={this.state.isEditable==true?'#000':'#D1D2D3'}
													onChangeText={this.onAddressChange.bind(this)}
				        							value={this.props.address}
													/>

													
												</View>

												<View style={styles.zipTextStyle} ><TextInput style={this.textInputStyle()}
				 									underlineColorAndroid='transparent'
				 									editable={this.state.isEditable}
				 									placeholder="Apartment/Suite"									
				 									autoCapitalize='words'
				 									height={(Platform.OS === 'ios') ? 35 : 40}
				 									placeholderTextColor={this.state.isEditable==true?'#000':'#D1D2D3'}
													onChangeText={this.onAddressChange2.bind(this)}
				        							value={this.props.address2}
													/>
												</View>

												{
													(Platform.OS === 'ios') ?

																 <View style={styles.pickerMainContainer}>

														 <View style={styles.pickerContainer}>
											                <AutoComplete
														          style={this.autoCompletTextStyle()}
														          suggestions={this.state.citydata}
														          onTyping={this.onTyping.bind(this)}
														          onSelect={this.onCitySelect.bind(this)}
														          placeholder="City"
														          returnKeyType="next"
														          editable={this.state.isEditable}
														          placeholderTextColor={this.state.isEditable==true?'#000':'#D1D2D3'}
														          autoCompleteTableTopOffset={this.state.citydata.length==1?-70:this.state.citydata.length==2?-110:-130}
														          autoCompleteTableSizeOffset={-10}
														          autoCompleteTableBorderColor="lightblue"
														          autoCompleteTableBackgroundColor="azure"
														          autoCompleteTableCornerRadius={5}
														          autoCompleteTableBorderWidth={1}
														          autoCompleteFontSize={14}
														          autoCompleteRegularFontName="FuturaStd-Book"
														          autoCompleteBoldFontName="FuturaStd-Book"
														          autoCompleteTableCellTextColor={'dimgray'}
														          autoCompleteRowHeight={40}
														          autoCompleteFetchRequestDelay={100}
														          maximumNumberOfAutoCompleteRows={3}
														          onChangeText={this.onCityChange.bind(this)}
					      										  value={this.props.city}
														        />
															
										                </View>

										                <View style={styles.pickerContainer}>
											                  <AutoComplete
														          style={this.autoCompletTextStyle()}
														          suggestions={this.state.statedata}
														          onTyping={this.onStateTyping.bind(this)}
														          onSelect={this.onStateSelect.bind(this)}
														          placeholder="State"													          														          returnKeyType="next"
														          placeholderTextColor={this.state.isEditable==true?'#000':'#D1D2D3'}
														          autoCompleteTableTopOffset={this.state.statedata.length==1?-70:this.state.statedata.length==2?-110:-130}
														          autoCompleteTableSizeOffset={-10}
														          autoCompleteTableBorderColor="lightblue"
														          autoCompleteTableBackgroundColor="azure"
														          autoCompleteTableCornerRadius={5}
														          autoCompleteTableBorderWidth={1}
														          autoCompleteFontSize={14}
														          editable={this.state.isEditable}
														          autoCompleteRegularFontName="FuturaStd-Book"
														          autoCompleteBoldFontName="FuturaStd-Book"
														          autoCompleteTableCellTextColor={'dimgray'}
														          autoCompleteRowHeight={40}
														           autoCapitalize='characters'
														          autoCompleteFetchRequestDelay={100}
														          maximumNumberOfAutoCompleteRows={3}
														          onChangeText={this.onStateChange.bind(this)}
					      										  value={this.props.state}
														        />
															
										                    </View>
										            </View>
													 : 

													 <View style={styles.pickerMainContainer}>

            			  

									            			  	<TextInput
														                  style={this.textInputStyle()}
														                  editable={this.state.isEditable}
				 														  placeholder="City"												                 
														                  placeholderTextColor={this.state.isEditable==true?'#000':'#D1D2D3'}												                  
														                  underlineColorAndroid='transparent'  
																		  autoCorrect={false}
																		  autoCapitalize='words'
																		  height={(Platform.OS === 'ios') ? 35 : 40}
																		  onChangeText={this.onCityChange.bind(this)}
																      	  value={this.props.city}
																          ref='cityRef'

														        />
									            			  

									            			 

									            			   	<TextInput
														                  style={this.textInputStyle()}
														                  editable={this.state.isEditable}
				 														  placeholder="State"
														               	  placeholderTextColor={this.state.isEditable==true?'#000':'#D1D2D3'}								                 
														                  underlineColorAndroid='transparent'  
																		  autoCorrect={false}
																		  autoCapitalize='characters'
																		  maxLength={2}
																		  height={(Platform.OS === 'ios') ? 35 : 40}
																		  onChangeText={this.onStateChange.bind(this)}
																      	  value={this.props.state}
																          ref='stateRef'
																         
														        />
									            			  
									            	</View>
												}
													

												



											
												   <View style={styles.zipTextStyle}>
														
														<TextInput style={this.textInputStyle()}
															 underlineColorAndroid='transparent'
															 editable={this.state.isEditable}
															  keyboardType='numeric'							
															  maxLength={5}
															  placeholder="Zip"
															  height={(Platform.OS === 'ios') ? 35 : 40}
				 									          placeholderTextColor={this.state.isEditable==true?'#000':'#D1D2D3'}
															  onChangeText={this.onZipChange.bind(this)}
															 value={this.props.zipcode}

														/>
													</View>
												
									       

								                	<View style={styles.addressView}>
														<Image style={styles.eidtIcon}
															source={require('../res/profile_email.png')}>
														</Image>
														<TextInput style={styles.addressInputText}
														 underlineColorAndroid='transparent'
														 editable={false}
														 keyboardType='email-address'										
														 placeholder="Email"
														 height={(Platform.OS === 'ios') ? 35 : 40}
				 									     placeholderTextColor={this.state.isEditable==true?'#000':'#D1D2D3'}
														 onChangeText={(email) => this.setState({email})}
														 value={this.state.email}
														/>
													</View>

													<View style={styles.addressView}>
														<Image style={styles.eidtIcon}
																source={require('../res/phone.png')}>
														</Image>
														<TextInput style={this.textInputStyle()}
															 underlineColorAndroid='transparent'
															 editable={this.state.isEditable}
															 keyboardType='phone-pad'
															 maxLength={14}			
															 height={(Platform.OS === 'ios') ? 35 : 40}								
															 placeholder="Phone Number"
				 									         placeholderTextColor={this.state.isEditable==true?'#000':'#D1D2D3'}
															 onChangeText={this.onPhoneChange.bind(this)}
															 value={this.props.phone}
														/>
													</View>

													<View style={styles.addressView}>
															<Image style={styles.eidtIconDatePicker}
																source={require('../res/calender_small.png')}>
															</Image>
													
															 
											                <View style={styles.pickerDateContainer}>
												                <DatePicker
												                  style={{width:DEVICE_WIDTH*0.8, height:30,backgroundColor:'white'}}
												                  date={this.props.dob}
												                  mode="date"
												                  showIcon={false}
												                  placeholder="Date of Birth"
												                  format="MMM DD YYYY"
												                  minDate="05 01 1920"
												                  disabled={this.state.isEditable==true?false:true}
												                  maxDate={Moment().add(-18,'y').format('MMM DD YYYY') }
												                  confirmBtnText="Confirm"
												                  cancelBtnText="Cancel"
												                  customStyles={this.datePalceHolderInputStyle()}
												                  onDateChange={this.onDOBChange.bind(this)}
												                 
												                />
											               </View>
													</View>


											
									</View>	

								</ScrollView>

											{this.props.isLoading ?
														<View style={styles.circles}>

															 <Progress.CircleSnail
																 style={styles.progress}
																 thickness={5}
																 size={55}
																 color={[
																	 '#427E7B',
																	 '#427E7B',
																	 '#427E7B',
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

							</Card>

							<Card>
								<View style={styles.listHeader}>
									<Text style={styles.myinfoText}>Recent Activity</Text>
								</View>

								
								<ScrollView contentContainerStyle={{backgroundColor:'#fff',paddingBottom:700}}>
								{this.state.dataRecent.length!=0?<View>
								<ListView
										refreshControl={
											<RefreshControl
												refreshing={this.state.refreshing}
												onRefresh={this._loadData.bind(this, true)}
												tintColor="#00AEC7"
												title="Loading..."
												titleColor="#00AEC7"
												colors={['#FFF', '#FFF', '#FFF']}
												progressBackgroundColor="#427E7B"

											/>
										}
										enableEmptySections={true}
										dataSource={this.state.dataSource}
										renderRow={this._renderRow.bind(this)}
								/>

								
								</View>:<View style={styles.noDataView}><Text style={styles.noData}>No recent activity.</Text></View>}
								</ScrollView>
								

						        </Card>

											{this.props.isLoadingMyLoan ?
														<View style={styles.circles}>

															 <Progress.CircleSnail
																 style={styles.progress}
																 thickness={5}
																 size={55}
																 color={[
																	 '#427E7B',
																	 '#427E7B',
																	 '#427E7B',
																 ]}
															 />
													 </View> : null
											}	

						 </View>



								{this.state.isShowDialog==true?<View style={styles.dialogViewStyle}>
			             			<CustomAlertDialog title='Bankroll' onPress={this.onDialogButtonClick.bind(this)} subtitle={this.state.dialogMsg} />
			    				</View>:null} 	

				</Image>
      );
    }
}
const mapStateToProps = ({ updateProfileReducer,myLoanReducer ,getCityReducer,getStatesReducer}) => {

  const {firstname, lastname,address,address2,city,state,zipcode,phone,dob,isLoading,responseData} = updateProfileReducer;
  const {isLoadingMyLoan,myLoanRes} = myLoanReducer;
  const {isLoadingCity, responseDataCity} = getCityReducer;
  const {isLoadingStates, responseDataStates} = getStatesReducer;
  console.log("update Output: "+JSON.stringify(responseData));

  console.log("profile Output city: "+JSON.stringify(responseDataCity));
  console.log("profile Output states: "+JSON.stringify(responseDataStates));

  return {
        firstname: firstname,
        lastname: lastname,
		address:address,
		address2:address2,
		city:city,
		state:state,
		zipcode:zipcode,
		phone:phone,
		dob:dob,
		isLoading:isLoading,
        responseData:responseData,
        isLoadingMyLoan:isLoadingMyLoan,
    	myLoanRes:myLoanRes,
    	isLoadingCity:isLoadingCity,
	    responseDataCity:responseDataCity,
	    isLoadingStates:isLoadingStates,
	    responseDataStates:responseDataStates
  }
}


export default connect(mapStateToProps,{showLoadingCity,clearResponseCity,CityReq,showLoadingMyLoan,clearResponseMyLoan,getMyLoanReq,showLoading,clearResponse,updateUserProfile,dobChanged,phoneChanged,firstNameChanged,lastNameChanged,addressChanged,addressChanged2,cityChanged,stateChanged,zipChanged,showLoadingStates,clearResponseStates,StatesReq})(Profile);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
    paddingTop:(Platform.OS === 'ios') ? 60 : 40,
  },
	userInfoContainer:{
		flex:1.6,
		marginLeft:10,
		marginRight:10
	},
	recentActivityContainer:{
		flex:1,
		marginLeft:10,
		marginRight:10,

	},
	userInfoHeader:{
		flexDirection:'row',
		justifyContent: 'space-between',
		paddingTop:10
	},
	listHeader:{
		flexDirection:'row',
		justifyContent: 'space-between',
		
	},
	myinfoText:{
		color:'#ffffff',
		fontSize: 16,
		padding:10,
		fontFamily:'FuturaStd-Book',
	},

	eidtIcon:{
		
		marginRight:10,
		marginTop:5
	},

	eidtIconDatePicker:{
		
		marginRight:10,
		marginTop:2
	},
	eidtIconHeader:{
		
		marginRight:10,
		marginTop:15
	},

	userDetailView:{
		backgroundColor:'#ffffff',
		borderBottomLeftRadius: 5,
		borderBottomRightRadius: 5,

	},
	addressView:{

		flexDirection:'row',
		marginLeft:10,
		marginRight:10,
		
		

	},

	pickerDateContainer:{

      borderBottomWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      borderRightWidth: 0,
      backgroundColor:'white',
      borderColor: '#FFF',
      marginBottom:10
    },

	addressInputText:{
		flex:1,
		borderBottomWidth: 1,
		textAlignVertical: 'center',
		fontSize:14,
		color:'#D1D2D4',
		fontFamily:'FuturaStd-Book',
		borderColor: '#FFF',



	},
	listContainer: {
		paddingBottom: window.height*0.63

  	},

	noData    : {
			color     : '#000',
			fontSize  : 18,
			fontFamily:'FuturaStd-Book',
			alignSelf : 'center',
			backgroundColor:'transparent',
			top:(Platform.OS === 'ios') ? 120 : 80,
			
			

	},
	rowStyle : {
			backgroundColor   : '#FFF',
			paddingVertical   : 10,
			paddingHorizontal : 10,
			borderBottomColor : '#ccc',
			borderBottomWidth : 1,

	},
	loanid    : {
			color    : '#000',
			padding:5,
			fontFamily:'FuturaStd-Book',
			fontSize : 14
	},

	amount    : {
			color    : '#427E7B',
			fontWeight:'bold',
			padding:4,
			fontFamily:'FuturaStd-Book',
			fontSize : 15
	},
	date   : {
			color    : '#D1D3D4',
			padding:5,
			fontFamily:'FuturaStd-Book',
			fontSize : 14
	},
	contact : {
			width     : window.width,
			alignSelf : 'flex-start',
			flexDirection     : 'row'

	},
	listLoanIdTextView:{
		flex:2.1
	},

	listItemTextView:{
		flex:1.1
	},
	listItemAmountTextView:{
		flex:0.8
	},
	pickerMainContainer: {
      flexDirection:'row',
      justifyContent: 'space-between',
      paddingLeft: 45,
      paddingRight:10
      

    },

    zipTextStyle:{

		
		paddingLeft: 45,
		marginRight:10,
		

	},
    pickerContainer:{
		flexDirection:'row',
	    width: DEVICE_WIDTH*0.35,
	    borderBottomWidth: 1,
	    borderLeftWidth: 0,
	    borderTopWidth: 0,
	    borderRightWidth: 0,
	    borderColor: '#FFFFFF',
    
  },
  autocomplete: {
    width:DEVICE_WIDTH*0.35,
    height:30,
    borderColor: '#D3E8E1',
    borderWidth: 0,
    color:'#000000',
    fontSize:14,
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
loanidVal    : {
			color    : '#000',
			padding:5,
			fontFamily:'FuturaStd-Book',
			fontSize : 14
	},


	 noDataView: {
        justifyContent:'center',
		alignItems:'center'
	},

 dialogViewStyle:{

  	position: 'absolute', 
  	top: 0, left: 0, 
  	right: 0, 
  	bottom: 0, 
  	justifyContent: 'center', 
  	alignItems: 'center'
  },
  errorText: {
    color:'red',
    fontSize: 14,
    textAlign: 'center',
    paddingTop:20,
    paddingLeft:20,
    paddingRight:20,
    backgroundColor:'transparent',
    fontFamily:'FuturaStd-Book'
  },
   pickerContainerForAndroid:{
	
    width: DEVICE_WIDTH*0.4,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
   	color:'#ffffff',
    
  },


});
