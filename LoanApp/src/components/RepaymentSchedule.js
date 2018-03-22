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
	AsyncStorage,
	Platform
} from 'react-native';

import {
  	repayDate1Changed,
	repayDate2Changed,
  	showLoading,
	clearResponse,
	repayCalculation,
	getLoanRepaymentOption
} from '../actions/LoanRepaymentCalculationAction';
import{ Actions} from 'react-native-router-flux';
import * as Progress from 'react-native-progress';
import DatePicker from 'react-native-datepicker';
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
import Moment from 'moment';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import CustomAlertDialog from './CustomAlertDialog';

var radio_props = [
  {label: 'One', value: 1 },
  {label: 'Two', value: 2 }
];
class RepaymentSchedule extends Component{

	  	constructor() {
	      super();

				this.state = {
	        		value: 1,
					errorMsg: '',
					resData:'',
					code:'',
					msg:'',
					minDate: Moment().add(7,'d').format('MMM DD YYYY'),
					maxDate: Moment().add(31,'d').format('MMM DD YYYY'),
					errorOnTextField:'',
					dialogMsg:'',
					repaymentOption:1,
        			isShowDialog:false,
	      };

	  	}

	    componentWillMount(){
	    	
	    	AsyncStorage.getItem("token").then((value) => {
				if(value) {

						access_token=value;
						console.log('token if='+access_token);
						this.props.showLoading(true);
						this.props.getLoanRepaymentOption(access_token);
				}
				else {

						console.log('token else='+value);
				}
			}).done();

	    	
	  	}
		componentWillReceiveProps(nextProps) {

			this.setState({resData:nextProps.responseData});
			this.setState({code:nextProps.responseData.code});
			this.setState({msg:nextProps.responseData.message});
			var resData=JSON.stringify(nextProps.responseData.data);
			var resUserData;
			nextProps.responseData.userdata?
			resUserData=JSON.stringify(nextProps.responseData.userdata.fundingBankDetailId):'';		
			
			try {
				if(resData != undefined)
				{
					console.log('repayment response=== '+resUserData);
					AsyncStorage.setItem("calculatedAmount",resData);

				}

			} catch (ex) {
				console.error(ex);
			}

			try {
				if(resUserData != undefined&&resUserData !='')
				{
					console.log('repayment response=== '+resUserData);
					AsyncStorage.setItem("bankDetails",resUserData);

				}

			} catch (ex) {
				console.error(ex);
			}


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

			if(this.props.repayOptionRes!=''){
				
				if(this.props.repayOptionRes.code==200){
					console.log('repayment res option== ',this.props.repayOptionRes.data?this.props.repayOptionRes.data[0].repayment_option:1);
					this.setState({repaymentOption:this.props.repayOptionRes.data?this.props.repayOptionRes.data[0].repayment_option:1});
					this.props.clearResponse();
					this.props.showLoading(false);
				}
				else{
					this.props.clearResponse();
					this.props.showLoading(false);
				}
					
			}
		}

		onRepayDate1Change(text){
				this.props.repayDate1Changed(text);
				this.setState({errorMsg:''});
					this.setState({errorOnTextField:''});
		}

		onRepayDate2Change(text){
				this.props.repayDate2Changed(text);
				this.setState({errorMsg:''});
				this.setState({errorOnTextField:''});
		}
		 onDialogButtonClick(){
			this.setState({isShowDialog:false});
			this.setState({dialogMsg:''});
		}

		createUserReq(){
			this.props.showLoading(true);
			let access_token;
			let loan_id;
			let loan_amount;

			AsyncStorage.getItem("token").then((value) => {
				if(value) {

						access_token=value;
						console.log('token if='+access_token);

				}
				else {

						console.log('token else='+value);
				}
			}).done();

			AsyncStorage.getItem("userData").then((value) => {
				if(value) {

						console.log('qualificationRes if='+value);
						let obj = JSON.parse(value);
						loan_id=obj.qualified_for_loan_type;
						console.log(' qualificationRes componentWillReceiveProps ====>>>> '+obj.qualified_for_loan_type);
						console.log(' qualificationRes componentWillReceiveProps ====>>>> '+obj.qualified_amt);
				}
				else {

						console.log('qualificationRes else='+value);
				}
			}).done();

			AsyncStorage.getItem("loanAmount").then((value) => {
				if(value) {
						loan_amount=value;
						console.log('loanAmount if='+value);
				}
				else {

						console.log('loanAmount else='+value);
				}
			}).done();



		AsyncStorage.getItem("userId").then((value) => {
				if(value) {
						console.log('userId if='+access_token);
						var user={
						 authToken:access_token,
						 userId:value,
						 loan_amt:parseInt(loan_amount, 10),
						 repaymentOption:this.state.value,
						 loanId:loan_id,
						 repaymentDate1:Moment(this.props.repayDate1).format(),
						 repaymentDate2:Moment(this.props.repayDate2).format()

					 };
					 console.log('Update USER='+JSON.stringify(user));
					 this.props.repayCalculation(user);

				}
				else {

						console.log('userId else='+value);
				}
			}).done();

	}

		callRepayAmoutCalculationWS(){

			if(this.state.value==1){
				if (this.props.repayDate1 == ''){

					//Alert.alert('Please select repay amount date.');
					this.setState({errorMsg:'Please select your repayment date.'});
    		 		this.setState({errorOnTextField:0});
					//this.popupDialog.show();
				}
				else{
					this.setState({errorMsg:''});
					this.setState({errorOnTextField:''});
				 	this.createUserReq();

				}

			}
			else if(this.state.value==2){
				if (this.props.repayDate1 == ''){

					//Alert.alert('Please select first repay amount date.');
					this.setState({errorMsg:'Please select your first repayment date.'});
    		 		this.setState({errorOnTextField:0});
					//this.popupDialog.show();
				}
				else if(this.props.repayDate2 == ''){
					//Alert.alert('Please select second repay amount date.');
					this.setState({errorMsg:'Please select your second repayment date.'});
					this.setState({errorOnTextField:1});
				}
				else if(this.compareDate(this.props.repayDate1,this.props.repayDate2)==1){
					//Alert.alert('First repay amount date should be less than second date.');
					//this.setState({errorMsg:'First repayment date should not be greater than second repayment date.'});
					//.setState({errorOnTextField:0});
					this.props.repayDate2Changed('');
				}
				else if(this.compareDate(this.props.repayDate1,this.props.repayDate2)==0){
					//Alert.alert('First repay amount date should not be equal to second date.');
					this.setState({errorMsg:'The second repayment date must be 7 days after the first repayment date.'});
					this.setState({errorOnTextField:1});
				}

				else{
					this.setState({errorMsg:''});
					this.setState({errorOnTextField:''});
				    this.createUserReq();

				}
			}


		}

		compareDate(dateTimeA, dateTimeB) {

		    var momentA = Moment(dateTimeA,"MMM DD YYYY");
		    var momentB = Moment(dateTimeB,"MMM DD YYYY");
		    if (momentA > momentB) return 1;
		    else if (momentA < momentB) return -1;
		    else return 0;
		}

		onInfoClick(){
				console.log('inside onInfoClick');
				this.setState({isShowDialog:true});
				this.setState({dialogMsg:'Bankroll aims to make repayment as flexible as possible, offering the ability to repay your loan in one or two repayments. Please not you must choose these repayments to be within 31 days from today, but no sooner than 7 days from today(due to state regulations). Your first repayment must be before the second repayment.'});
				
		}



    onNextClick=()=>{

      Actions.CalculatedTotalLoan();
    }

		selectRepaySchedule(value){
			if(value==1){
				return(
					<View>
					<View style={styles.pickerContainer}>
							<DatePicker
								style={{width:DEVICE_WIDTH}}
								date={this.props.repayDate1}
								mode="date"
								showIcon={true}
								placeholder="First Payment"
								format="MMM DD YYYY"
								minDate={this.state.minDate}
								maxDate={this.state.maxDate}
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
											color:'#407C7A',
											fontSize:16,
											fontFamily:'FuturaStd-Book',
										},
										placeholderText:{
											color:'#000',
											fontSize:16,
											fontFamily:'FuturaStd-Book',
										}
									}}
								onDateChange={this.onRepayDate1Change.bind(this)}
							/>
						
					</View>
					 	{
		                  this.state.errorMsg!=''&&this.state.errorOnTextField==0?<Text style={styles.errorText}>{this.state.errorMsg}</Text>:null
		                }
					</View>
				);
			}
			else if(value==2){
				return(

					<View>
					<View style={styles.pickerContainer}>
							<DatePicker
								style={{width:DEVICE_WIDTH}}
								date={this.props.repayDate1}
								mode="date"
								showIcon={true}
								placeholder="First Payment"
								format="MMM DD YYYY"
								minDate={this.state.minDate}
								maxDate={this.state.maxDate}
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
											color:'#407C7A',
											fontSize:16,
											fontFamily:'FuturaStd-Book',
										},
										placeholderText:{
											color:'#000',
											fontSize:16,
											fontFamily:'FuturaStd-Book',
										}
									}}
								onDateChange={this.onRepayDate1Change.bind(this)}
							/>
						
					</View>

					   {
		                  this.state.errorMsg!=''&&this.state.errorOnTextField==0?<Text style={styles.errorText}>{this.state.errorMsg}</Text>:null
		                }

					<View style={styles.picker2Container}>
							<DatePicker
								style={{width:DEVICE_WIDTH}}
								date={this.props.repayDate2}
								mode="date"
								showIcon={true}
								placeholder="Second Payment"
								format="MMM DD YYYY"
								minDate={this.compareDate(this.props.repayDate1, this.state.maxDate)==0?this.state.maxDate:Moment(this.props.repayDate1).add(7,'d').format('MMM DD YYYY')}
								maxDate={this.state.maxDate}
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
											color:'#407C7A',
											fontSize:16,
											fontFamily:'FuturaStd-Book',
										},
										placeholderText:{
											color:'#000',
											fontSize:16,
											fontFamily:'FuturaStd-Book',
										}
									}}
								onDateChange={this.onRepayDate2Change.bind(this)}
							/>
						
					</View>

						{
		                  this.state.errorMsg!=''&&this.state.errorOnTextField==1?<Text style={styles.errorText}>{this.state.errorMsg}</Text>:null
		                }


				</View>
				)
			}
		}

    render(){
      return(
        <Image style={styles.container}
          source={require('../res/bg.png')}>
          		
          <View style={styles.referCodeContainer}>
              <View style={styles.termText}>
                  <Text style={styles.forgotText}>Max Loan Term</Text>
                  <Text style={styles.daysText}>31 Days</Text>
              </View>
          </View>
          <View style={styles.socialContainer}>

            <View>
			{(this.state.repaymentOption==1)?
			<Text style={styles.infoText}>Please select your repayment date.</Text>
			:<View><Text style={styles.infoText}>How many payments would you like to make?</Text><TouchableOpacity 
			onPress={this.onInfoClick.bind(this)}
			>
			<Image style={styles.infoImage}
			  source={require('../res/info.png')}>
			</Image>

	   </TouchableOpacity></View>
			}

              {/*<TouchableOpacity 
                  onPress={this.onInfoClick.bind(this)}
                  >
	              <Image style={styles.infoImage}
	                source={require('../res/info.png')}>
	              </Image>

             </TouchableOpacity>*/
			  }
            </View>
            
            {
            	(this.state.repaymentOption==2)?<View style={styles.radioButtonView}>

			            <RadioForm
			               radio_props={radio_props}
			               initial={0}
			               formHorizontal={true}
			               buttonColor={'#427E7C'}
			               labelStyle={{padding:15,fontSize:18,color:'#427E7B',fontFamily:'FuturaStd-Book'}}
			               onPress={(value) => {this.setState({value:value})}}
			             />
            		</View>:null	
            }
          

            <View style={styles.radioButtonView}>
				{this.selectRepaySchedule(this.state.value)}
            </View>

            <View style={styles.buttonViewStyle}>

                  <TouchableOpacity style={styles.buttonLogin}
                  onPress={this.callRepayAmoutCalculationWS.bind(this)}
                  >
                  <Text style={styles.buttonTextStyle}>Next</Text>
              </TouchableOpacity>
           		 </View>
						{this.props.isLoading ?
							<View style={styles.circles}>

								 <Progress.CircleSnail
									 style={styles.progress}
                   thickness={5}
                   size={55}
									 color={[
										 '#427E7C',
										 '#427E7C',
										 '#427E7C',
									 ]}
								 />
						 </View> : null
					 }
          		</View>

          		 
								{this.state.isShowDialog==true?<View style={styles.dialogViewStyle}>
			             			<CustomAlertDialog title='Bankroll' onPress={this.onDialogButtonClick.bind(this)} subtitle={this.state.dialogMsg} />
			    				</View>:null} 	


        </Image>
      )
    }
}
const mapStateToProps = ({ repayCalculation }) => {

  const {repayDate1,repayDate2,isLoading,responseData,repayOptionRes} = repayCalculation;
  console.log("update Output: "+JSON.stringify(responseData));
  return {
    repayDate1:repayDate1,
		repayDate2:repayDate2,
		isLoading:isLoading,
    responseData:responseData,
    repayOptionRes:repayOptionRes
  }
}

export default connect(mapStateToProps,{getLoanRepaymentOption,repayDate1Changed,repayDate2Changed,showLoading,clearResponse,repayCalculation})(RepaymentSchedule);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
     paddingTop:(Platform.OS === 'ios') ? 80 : 60,
  },
  referCodeContainer:{

    flex:0.08,

  },
  socialContainer:{
    flex:0.92,
    backgroundColor:'#ffffff',
    paddingLeft:20,
    paddingRight:20
  },

  forgotText: {
    flex:1,
    color:'#ffffff',
    fontSize: 16,
    paddingLeft:20,
    textAlign: 'left',
    paddingTop:10,
    fontFamily:'FuturaStd-Book',
    backgroundColor:'transparent'
  },
  daysText: {
    flex:1,
    color:'#ffffff',
    fontSize: 16,
    textAlign: 'right',
    paddingRight:20,
    paddingTop:10,
    fontFamily:'FuturaStd-Book',
    backgroundColor:'transparent'
  },
  codeText: {
    color:'#ffffff',
    fontSize: 50,
    fontWeight:'bold',
    textAlign: 'center',
    alignItems:'center',
    paddingTop:10,
    fontFamily:'FuturaStd-Book',
    backgroundColor:'transparent'
  },

  infoText: {

    color:'#000',
    fontSize: 16,
    paddingTop:30,
    fontFamily:'FuturaStd-Book',

  },
  calculateAmountText:{
    color:'#427E7B',
    fontSize: 35,
    fontWeight:'bold',
    textAlign: 'center',
    alignItems:'center',
    fontFamily:'FuturaStd-Book',

  },

  loanCalculateContainer:{
    flexDirection:'row',
    paddingTop:50,
    justifyContent:'center',
    marginLeft:50,
    marginRight:50
  },
  buttonViewStyle:{
    paddingTop:60,

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
  termText:{flexDirection:'row',paddingTop:5,},
  radioButtonView:{
      paddingTop:20,
  },
  pickerContainer:{

      marginTop:10,
      borderBottomWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      borderRightWidth: 0,
      borderColor: '#407E7B',
    },
    picker2Container:{

        marginTop:30,
        borderBottomWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderColor: '#407E7B',
      },
      calendarImage:{
        position:'absolute',
        right:10,
        bottom:10
      },
      infoImage:{
        position:'absolute',
        right:-10,
        bottom:10,
        padding:10,
        
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

});
