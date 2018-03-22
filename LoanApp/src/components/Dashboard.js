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
	TouchableHighlight,
  	ScrollView,
	Dimensions,
	AsyncStorage,
	Alert,
	WebView,
	Platform
	

} from 'react-native';

import {
 
  	showLoading,
	clearResponse,
	emailSubscription,


} from '../actions/EmailSubscriptionAction';
import {Card} from './common';
const SideMenu   = require('react-native-side-menu');
const Menu       = require('./Menu');
const logoSmall  = require("../res/facebook.png");
const hamburger  = require('../res/hamburger.png');
const backImg  = require('../res/back.png');
import{ Actions} from 'react-native-router-flux';
const window = Dimensions.get('window');
import CustomAlertDialog from './CustomAlertDialog';
import OfflineBar from 'react-native-offline-status';

class Dashboard extends Component{

	state = {
    		isOpen: false,
    		selectedItem: 'Dashboard',
			qualified_amount:0,
			userName:'Bankroll',
			address:'',
			city:'',
			state:'',
			zipcode:'',
			dob:'',
			ssn:'',
			is_requested:false,
			req_loan_amt:0,
			qualified_for_loan:false,
			isShowDialog:false,
			isTerm:false,
			userId:'',
			is_loan_complete:false,
			loanUniqueId:'',
			loandId:'',
			isEmailSubscribed:false,
  	};

		constructor() {
	      super();

	      		
	      	
	      		


	  }
  	toggle() {
    	this.setState({
      		isOpen: !this.state.isOpen,
    	});
  	}

  	onBackPress(){
  		this.setState({isTerm:false});
  	}

  	updateMenuState(isOpen) {

    	this.setState({ isOpen, });
  	}

  	componentWillMount(){
  		
    	this.getUserDataFromAsync();
       
    }

    componentDidUpdate() {
    	if(this.props.emailSubRes!=''){
    				AsyncStorage.setItem("userData",JSON.stringify(this.props.emailSubRes.data));
					this.props.clearResponse();
					this.props.showLoading(false);
		}
     }
  	getUserDataFromAsync(){


				AsyncStorage.getItem("userData").then((value) => {
					if(value) {

							console.log('qualificationRes if='+value);
							

							let obj = JSON.parse(value);
							this.setState({qualified_amount:obj.qualified_amt});
							this.setState({is_requested:obj.is_requested});
							this.setState({req_loan_amt:obj.requested_loan_amt});
							this.setState({is_loan_complete:obj.is_loan_complete});
							this.setState({loanUniqueId:obj.loanUniqueId});
							this.setState({loandId:obj.loanId});
							this.setState({isEmailSubscribed:obj.isEmailSubscriptionOn});
							console.log('in userdata user id for checking'+obj.isEmailSubscriptionOn);
							if(obj._id!=undefined){
								this.setState({userId:obj._id});
							}
							
							if(obj.firstname==undefined&&obj.lastname==undefined){
									this.setState({userName:'Bankroll'})
							}
							else{
								this.setState({userName:obj.username})
							}

							if(obj.address==undefined&&obj.state==undefined&&obj.city==undefined&&obj.zipcode==undefined){
									this.setState({address:''});
							}
							else{
									this.setState({address:'address done'});
							}
							if(obj.dob==undefined){
								this.setState({dob:''})
							}
							else{
								this.setState({dob:obj.dob});
							}
							if(obj.ssn==undefined){
								this.setState({qualified_for_loan:false});
								this.setState({ssn:''});
							}
							else{
								this.setState({qualified_for_loan:true});
								this.setState({ssn:obj.ssn});
							}
						
							


					}
					else {

							console.log('qualificationRes else='+value);
					}
				}).done();

  	}

  	getIsEmailSubscribe(){
  			AsyncStorage.getItem("userData").then((value) => {
					if(value) {

							console.log('getIsEmailSubscribe if='+value);
							

							let obj = JSON.parse(value);
						
							if(obj.isEmailSubscriptionOn==true){

					  			this.callEmailSubscriptionApi(false);
					  		}
					  		else{
					  			this.callEmailSubscriptionApi(true);
					  		}
							console.log('getIsEmailSubscribe checking'+obj.isEmailSubscriptionOn);
					
					}
					else {

							console.log('qualificationRes else='+value);
					}
				}).done();
  	}

  	onMenuSwitchChange = (item) => {

  		console.log('onMenuSwitchChange '+item);
  		this.getIsEmailSubscribe();
  		
  	}

  	onMenuItemSelected = (item) => {
    	this.setState({
      		isOpen: false,
      		selectedItem: item,
    	});
			if(item=='Logout'){

				  AsyncStorage.getItem("isQuickAccess").then((value) => {
				          if(value) {

				              if(value=='true'){
				               
				                  Actions.Slider({type: "reset"});
				              }
				              else{
				                 Actions.LoginComponent({type: "reset"});
								 AsyncStorage.clear();
				              }
				          }
				          else{
				          	  Actions.LoginComponent({type: "reset"});
							  AsyncStorage.clear();
				          }
				    }).done();
				
			}
			else if(item=='Support'){
				Actions.Support();
			}
			else if(item=='Referral'){
				Actions.Referals();
			}
			else if(item=='Profile'&&this.state.qualified_for_loan==true){
				Actions.Profile();
			}
			else if(item=='Profile'&&this.state.qualified_for_loan==false){
				 this.setState({isShowDialog:true});
				 
			}
			// else if(item=='MyLoan'&&this.state.qualified_for_loan==true){
			// 	Actions.MyLoan();
			// }
			else if(item=='MyLoan'&&this.state.qualified_for_loan==true){
				if(this.state.loandId!=''&&this.state.loandId!=undefined){
				  Actions.MyLoanDetail();
				}
				else{
					Actions.Profile();
				}
			}
			else if(item=='MyLoan'&&this.state.qualified_for_loan==false){
				this.setState({isShowDialog:true});
				
			}
			else if(item=='Account'&&this.state.qualified_for_loan==true){
				Actions.Account();
			}
			else if(item=='Account'&&this.state.qualified_for_loan==false){
				this.setState({isShowDialog:true});
				
			}
			else if(item=='FAQ'){
				Actions.FAQ();
			}
			else if(item=='Settings'){
				Actions.SettingComponent();
	 		}
			else if(item=='Quick Access'){
				Actions.CreateNewPin();
	 		}
	 		else if(item=='Notification'){
			
				//this.getIsEmailSubscribe();
			
	 		}
  	   }
		onRequestBankRollClick=()=>{

			

				AsyncStorage.getItem("userData").then((value) => {
					if(value) {

							
							

							let obj = JSON.parse(value);
							this.setState({qualified_amount:obj.qualified_amt});
							this.setState({is_requested:obj.is_requested});
							this.setState({req_loan_amt:obj.requested_loan_amt});
							this.setState({is_loan_complete:obj.is_loan_complete});
							this.setState({loanUniqueId:obj.loanUniqueId});
							this.setState({isEmailSubscribed:obj.isEmailSubscriptionOn});
							console.log('onRequestBankRollClick==='+obj.isEmailSubscriptionOn);

							if(obj.firstname==undefined&&obj.lastname==undefined){

									this.setState({userName:'Bankroll'})
							}
							else{

								this.setState({userName:obj.username})
							}

							if(obj.address==undefined&&obj.state==undefined&&obj.city==undefined&&obj.zipcode==undefined){
								
									this.setState({address:''});
							}
							else{
									this.setState({address:'address done'});
							}

							if(obj.dob==undefined){
								
								this.setState({dob:''})
							}
							else{
					
								this.setState({dob:obj.dob});
							}

							if(obj.ssn==undefined){
								
								this.setState({ssn:''});
								this.setState({qualified_for_loan:false});
							}
							else{
						
								this.setState({ssn:obj.ssn});
								this.setState({qualified_for_loan:true});

							}
							


							if(this.state.ssn!=''&&this.state.ssn!=undefined&&this.state.qualified_amount==0&&this.state.is_requested==false&&this.state.is_loan_complete==false&&obj.dwolla_funding_source_id==null){
									//Actions.SelectLoanAmount()
									
									Actions.AddBankAccount();

							}
							else if(this.state.ssn!=''&&this.state.ssn!=undefined&&this.state.qualified_amount!=0&&this.state.is_requested==true&&this.state.is_loan_complete==true&&obj.dwolla_funding_source_id!=null){
									//Actions.SelectLoanAmount()
									
									Actions.AddBankAccount();

							}
							else if(this.state.ssn!=''&&this.state.ssn!=undefined&&this.state.qualified_amount!=0&&this.state.is_requested==false&&this.state.is_loan_complete==false&&obj.dwolla_funding_source_id!=null){
								   
								   	Actions.SelectLoanAmount();
							}
							else{

								    
								    Actions.RequestLoanAmountStep1();
									
							}

							


					}
					else {

							
							if(this.state.ssn!=''&&this.state.ssn!=undefined){
								Actions.AddBankAccount();
							}
							else{
								Actions.RequestLoanAmountStep1()
								
							}


							
					}
				}).done();
			

		}
	 	componentDidMount() {
      	
      		this.offlineBarRef.triggerAnimation
      	}
		onChechStatusClick=()=>{
			Actions.RequestedLoanDetailNew();
		}
		onRefferalClick=()=>{
			Actions.Referals();
		}

		onTermsClick=()=>{
			if(this.state.isTerm==false){
				this.setState({isTerm:true});
			}
			else{
				this.setState({isTerm:false});
			}
		}
		
		onDialogButtonClick(){
			this.setState({isShowDialog:false});
		}

		callEmailSubscriptionApi(isSubscribe){

			console.log('isSubscribe= ',isSubscribe);
			this.props.showLoading(true);

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
    		AsyncStorage.getItem("userData").then((value) => {
                        if(value) {

                            console.log('userData if='+value);
                            let obj = JSON.parse(value);
                    
                          
                           var postdata={

                     			authToken:access_token,
                            	userId:obj._id,
                            	status:isSubscribe

                          };
                          console.log('Update USER='+JSON.stringify(postdata));
                          this.props.emailSubscription(postdata);
   

                        }
                        else {

                            console.log('userData else='+value);
                        }
                      }).done();
		}



		setDashboardData(){

			if(this.state.is_requested==true &&this.state.qualified_amount!=0&&this.state.is_loan_complete==false){

				console.log('Request Sent');
				return(
						<View>
						<Card>
						<Text style={styles.forgotDetailText}>Loan Approved!</Text>
						<Text style={styles.qualifyText}>You have requested a loan of ${this.state.req_loan_amt}!</Text>
						<View style={styles.cardButtonViewStyle}>
								<TouchableOpacity
								 onPress={this.onChechStatusClick}
								 style={styles.buttonLogin}>
										<Text style={styles.buttonTextStyle}>View Loan</Text>
								</TouchableOpacity>
						</View>
						</Card>
					</View>
					);
				   
			}
			else if(this.state.is_requested==true &&this.state.qualified_amount!=0&&this.state.is_loan_complete==true){
				console.log('Congratulation');
				return(
						<View>
						<Card>
						<Text style={styles.forgotDetailText}>Congratulation!</Text>
						<Text style={styles.qualifyText}>You have successfully completed your loan!</Text>
						<View style={styles.cardButtonViewStyle}>
								<TouchableOpacity
								 onPress={this.onRequestBankRollClick}
								 style={styles.buttonLogin}>
										<Text style={styles.buttonTextStyle}>Request a Bankroll</Text>
								</TouchableOpacity>
						</View>
						</Card>
					</View>
					);
				   
			}
			else if(this.state.qualified_amount==0&&this.state.is_requested==false&&this.state.is_loan_complete==false){
				
				console.log('Get Cash Instantly');
				return(
					<View>
						<Card>
						<Text style={styles.forgotDetailText}>Get Cash Instantly!</Text>
						<Text style={styles.qualifyText}>Qualify for up to $500 instantly!</Text>
						<View style={styles.cardButtonViewStyle}>
								<TouchableOpacity
								 onPress={this.onRequestBankRollClick}
								 style={styles.buttonLogin}>
										<Text style={styles.buttonTextStyle}>Request a Bankroll</Text>
								</TouchableOpacity>
						</View>
						</Card>
					</View>
				);
			}
			else if(this.state.qualified_amount!=0&&this.state.is_requested==false&&this.state.is_loan_complete==false){
				
				console.log('Get Cash!');
				return(
					<View>
						<Card>
							<Text style={styles.forgotDetailText}>Get Cash!</Text>
							<Text style={styles.qualifyText}>You have qualified for up to ${this.state.qualified_amount}!</Text>
							<View style={styles.cardButtonViewStyle}>
									<TouchableOpacity
									 onPress={this.onRequestBankRollClick}
									 style={styles.buttonLogin}>
											<Text style={styles.buttonTextStyle}>Request a Bankroll</Text>
									</TouchableOpacity>
							</View>
						</Card>
					</View>
				);
			}
		}


    render(){

    	
    	
		const menu = <Menu onItemSelected={this.onMenuItemSelected}
						   onSwitchChange={this.onMenuSwitchChange}
					 />;

	
    
      return(

      			this.state.isTerm==true?<View style={{flex:1}}>

      				<Image style={styles.logoContainer}
				                    source={require('../res/header.png')}>

									   <Image 
										source={require('../res/vertical_logo.png')}>
										</Image>
										<TouchableOpacity underlayColor="transparent" style={styles.hamBurgerContainer} onPress={() => this.onBackPress()}>
					          				<Image
					                  			source={backImg}
					                  			resizeMode="contain">
					                		</Image>
					          			</TouchableOpacity>

					</Image>

					<WebView
					
                		source={{uri: 'https://www.stagingsdei.com:5051/#/termsofusemobile'}}
                		javaScriptEnabledAndroid={true}
                		javaScriptEnabled={true}
    					startInLoadingState={true}
                		style={styles.webviewcontainer}
                		
              		/>


      			</View>:
				<SideMenu
							menu={menu}
							isOpen={this.state.isOpen}
							onChange={(isOpen) => this.updateMenuState(isOpen)}>

							<Image style={styles.container}
			                   source={require('../res/bg.png')}>

								<Image style={styles.logoContainer}
				                    source={require('../res/header.png')}>

									   <Image 
										source={require('../res/vertical_logo.png')}>
										</Image>
										<TouchableOpacity underlayColor="transparent" style={styles.hamBurgerContainer} onPress={() => this.toggle()}>
					          				<Image
					                  			source={hamburger}
					                  			resizeMode="contain">
					                		</Image>
					          			</TouchableOpacity>

								</Image>
						<ScrollView>

							<OfflineBar ref={(r) => this.offlineBarRef = r} />
							<View>	

					          <View style={styles.welcomeContainer}>
					              <Text style={styles.welcomeText}>{this.state.userName=='Bankroll'?'Welcome to':'Welcome'}</Text>
					              <Text style={styles.bankrollText}>{this.state.userName}</Text>

					          </View>
			          		
								<View style={styles.cardsContainer}>

									{this.setDashboardData()}
									<Card>
									<Text style={styles.forgotDetailText}>Want to earn cash?</Text>
									<Text style={styles.qualifyText}>Refer a friend and receive $20 cash!*</Text>
									<View style={styles.cardButtonViewStyle}>
											<TouchableOpacity
											 onPress={this.onRefferalClick}
											 style={styles.buttonLogin}>
													<Text style={styles.buttonTextStyle}>Refer a Friend</Text>
											</TouchableOpacity>
									</View>
									</Card>
								</View>

								<View style={styles.termsContainer}>
								<TouchableOpacity
								 onPress={this.onTermsClick}
								 >
									<Text style={styles.termsText}>*Terms and Conditions apply</Text>
								</TouchableOpacity>
								</View>
							</View>		
						</ScrollView>
								{this.state.isShowDialog==true?<View style={styles.dialogViewStyle}>
			             		 <CustomAlertDialog title='Bankroll' onPress={this.onDialogButtonClick.bind(this)} subtitle="Please complete your profile to access this feature. To complete your profile, simply click on 'Request a Bankroll' from the 'Home' screen." />
			              			</View>:null}

				          

			        </Image>

				</SideMenu>

      );
    }

   
}
const mapStateToProps = ({ emailSubscriptionReducer }) => {

  const {isLoading,emailSubRes} = emailSubscriptionReducer;
  console.log("emailSubRes Output: "+JSON.stringify(emailSubRes));

  return {

	isLoading:isLoading,
    emailSubRes:emailSubRes,


  }
}
export default connect(mapStateToProps,{

	showLoading,
	clearResponse,
	emailSubscription,

})(Dashboard);



const styles = StyleSheet.create({
  container: {
    flex: 1,
		width: null,
		height: null,
		resizeMode: 'cover',
  },
   webviewcontainer: {
    
    width: null,
    height: null,
    
   },
	welcomeContainer:{
		
		justifyContent: 'center',
		alignItems: 'center',
		marginTop:30,
		
	},
	cardsContainer:{

		marginTop:30,
		marginLeft:10,
		marginRight:10,
		justifyContent: 'center',
	},

	termsContainer:{
		marginTop:30,
		padding:10,
		justifyContent: 'center',
		alignItems: 'center',
	},

	welcomeText: {
    color:'#ffffff',
    fontSize: 22,
    textAlign: 'center',
	marginTop:10,
	fontFamily:'FuturaStd-Book',
  },

	bankrollText: {
    color:'#ffffff',
    fontSize: 28,
    textAlign: 'center',
	marginTop:10,
	fontFamily:'FuturaStd-Book',


  },

  forgotDetailText: {
	marginTop:30,
    color:'#ffffff',
    fontSize: 18,
	fontWeight:'bold',
    textAlign: 'center',
    fontFamily:'FuturaStd-Book',

  },

	qualifyText: {
	paddingLeft:10,
	paddingRight:10,
	marginTop:10,
    color:'#ffffff',
    fontSize: 18,
    fontFamily:'FuturaStd-Book',
    textAlign: 'center',

  },

	termsText: {

    color:'#ffffff',
    fontSize: 14,
    fontFamily:'FuturaStd-Book',


  },

	cardButtonViewStyle:{
		height: 80,
		backgroundColor:'#ffffff',
		marginTop:20,
		alignItems:'center',
		justifyContent: 'center',
		borderBottomLeftRadius: 5,
	    borderBottomRightRadius: 5,

	},
	buttonLogin:{
		height: 45,
		borderRadius: 5,
		paddingTop:(Platform.OS === 'ios') ? 5 : 0,
		justifyContent: 'center', 
        alignItems: 'center', 
		width:window.width*0.5,
		backgroundColor: '#7ACBBC'},

	buttonTextStyle:{
			color:'#ffffff',
			fontSize: 18,
	    	alignSelf: 'center',
			fontFamily:'FuturaStd-Book',
	  },

	hamBurgerContainer:{

			position: 'absolute',
			left: 5,
			paddingTop:(Platform.OS === 'ios') ? 20 : 15,
			paddingRight:20,
			padding:10
	},

	logoContainer:{
			height:(Platform.OS === 'ios') ? 64 : 56,
			width: null,
			paddingTop:(Platform.OS === 'ios') ? 10 : 5,
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			resizeMode: 'cover',
		},

	dialogViewStyle:{

  	position: 'absolute', 
  	top: 0, left: 0, 
  	right: 0, 
  	bottom: 0, 
  	justifyContent: 'center', 
  	alignItems: 'center',

  },

});
