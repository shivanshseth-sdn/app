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
	AsyncStorage,
	
	
} from 'react-native';

import{ Actions} from 'react-native-router-flux';
import * as Progress from 'react-native-progress';
import {Card} from './common';
//import data from '../../data.json';
const window = Dimensions.get('window');
import Moment from 'moment';
import CustomAlertDialog from './CustomAlertDialog';
import {
  showLoadingMyLoan,
  clearResponseMyLoan,
  getMyLoanReq,
	
} from '../actions/MyLoanAction';


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

class MyLoan extends Component{

	state = {
			loading     : true,
			dataSource  : new ListView.DataSource({
					rowHasChanged : (row1, row2) => true
			}),
			refreshing  : false,
			errorMsg: '',
        	responseData:'',
        	code:'',
        	msg:'',
        	data:[],
        	dialogMsg:'',
        	isShowDialog:false,
		

	};

	constructor(props) {
	super(props);

	}

	onDialogButtonClick(){
			this.setState({isShowDialog:false});
			this.setState({dialogMsg:''});
		}

	componentWillReceiveProps(nextProps) {
		this.setState({responseData:nextProps.myLoanRes});
		this.setState({code:nextProps.myLoanRes.code});
		this.setState({msg:nextProps.myLoanRes.message});
		var resData=JSON.stringify(nextProps.myLoanRes.data);


              try {
                if(resData != undefined&&resData!=''&&resData!="{}")
                {
                  let obj = JSON.parse(resData);
                  this.setState({data:obj});
				  AsyncStorage.setItem("loanDetail", resData);
				  console.log('myloan componentWillReceiveProps ==== '+obj);   
                        
                }
                

              } catch (ex) {
                console.error(ex);
              }
     

 	 }
	  componentDidUpdate() {

	      console.log('VerifyPhoneNumber componentDidUpdate ==== ');
				if(this.state.responseData!=''){
					{if(this.state.code==200){

						this.props.clearResponseMyLoan();	
					}
					else{
						this.props.clearResponseMyLoan();
						//Alert.alert(this.state.msg);
						this.setState({isShowDialog:true});
						this.setState({dialogMsg:this.state.msg});
					}
				}
				}


	  }

	componentWillMount(){
    	this.props.showLoadingMyLoan(true);
    	AsyncStorage.getItem("userData").then((value) => {
                        if(value) {

                            console.log('userData if='+value);
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

     
        console.log('SignUp componentWillMount ==== ');
  	}
	componentDidMount() {
			InteractionManager.runAfterInteractions(() => {
					this._loadData()
			});
	}
	_loadData(refresh) {
			refresh && this.setState({
					refreshing : true
			});

			this.dataLoadSuccess({data : this.state.data});
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
		else if(status=='inprogress'){
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
 onListItemClick(loanId){
    console.log('row id= '+loanId);
    AsyncStorage.setItem("selectedLoanId", loanId);
    Actions.MyLoanDetail();
 }
	_renderRow(rowData, sectionID, rowID) {



			return (


					<DynamicListRow>
          <TouchableOpacity onPress={() => this.onListItemClick(rowData._id)}>
          <View style={styles.rowStyle}>
              <View style={styles.contact}>
                  <View style={styles.listLoanIdTextView}>
                    <Text style={[styles.loanid]}>Loan ID <Text style={styles.loanidVal}>{rowData.loanUniqueId}</Text></Text>
                  </View>

                  <View
                    style={styles.listItemTextView}
                   >
                    <Text
                    style={this.statusStyle(rowData.loan_paid_status)}
                     >{rowData.loan_paid_status.toUpperCase()}</Text>
                  </View>

                  <View style={styles.listItemAmountTextView}>
                    <Text style={[styles.amount]}>${rowData.loan_amt?parseFloat(rowData.loan_amt).toFixed(2):'0.00'}</Text>
                  </View>

              </View>
              <View>
                <Text style={styles.date}>{Moment(rowData.createdAt).format('MMM DD YYYY hh:mm A')}</Text>
              </View>
          </View>
          </TouchableOpacity>

					</DynamicListRow>
			);
	}

	goDashboard(){

		Actions.Dashboard({type:"reset"});
		
	}

    render(){

    	console.log('render my loand '+JSON.stringify(this.state.data));
    	if(this.state.data.length!=0){
    		    	console.log('render my loand ??????????????'+JSON.stringify(this.state.data[0].loan_amt));

    	}
      return(
				<Image style={styles.container}
          source={require('../res/bg.png')}>
          			
          				{this.state.data.length!=0?
						<View>

			  				{this.state.data.length!=0?<View>
				              <Text style={styles.nextPaymentText}>Next Repayment</Text>
				              <Text style={styles.amountText}>${this.state.data[0].loan_amt?parseFloat(this.state.data[0].loan_amt).toFixed(2):'0.00'}</Text>

				              <Text style={styles.dateText}>Scheduled on {Moment(this.state.data[0].repaymentDate1).format('MMM DD YYYY')}</Text>
				              </View>:null}			

							<ScrollView contentContainerStyle={{backgroundColor:'#fff',paddingBottom:window.height}}
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
							>
							<View >
								<ListView

										enableEmptySections={true}
										dataSource={this.state.dataSource}
										renderRow={this._renderRow.bind(this)}
								/>
								</View>
							</ScrollView>
						 </View>:<View style={{marginTop:30}}>

						 				 <View style={styles.linkAccountImageContainer}>
								            <Image
								              source={require('../res/conatct_logo.png')}>
								            </Image>
								         </View>

								         <Text style={styles.forgotDetailText}>No loan is associated with your account. To request a loan, click on the ‘Request a Bankroll’ button below to complete your profile.</Text>

						 				<View style={styles.buttonViewStyle}>
											<TouchableOpacity
											 onPress={this.goDashboard}
											 style={styles.buttonLogin}>
													<Text style={styles.buttonTextStyle}>Request a Bankroll</Text>
											</TouchableOpacity>
										</View></View>}

					{this.props.isLoadingMyLoan ?
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

				 	{this.state.isShowDialog==true?<View style={styles.dialogViewStyle}>
			             			<CustomAlertDialog title='Bankroll' onPress={this.onDialogButtonClick.bind(this)} subtitle={this.state.dialogMsg} />
			    				</View>:null} 	
	       

				</Image>
      );
    }
}

const mapStateToProps = ({ myLoanReducer }) => {

  const {isLoadingMyLoan,myLoanRes} = myLoanReducer;
  console.log("Phone verify Output: "+JSON.stringify(myLoanRes));
  return {
    
    isLoadingMyLoan:isLoadingMyLoan,
    myLoanRes:myLoanRes
  }
}
  	

export default connect(mapStateToProps,{showLoadingMyLoan,clearResponseMyLoan,getMyLoanReq})(MyLoan);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
    paddingTop: 80
  },
	userInfoContainer:{
		flex:1.4,
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
	},
	nextPaymentText:{
		color:'#ffffff',
		fontSize: 20,
    textAlign: 'center',
	padding:5,
 
    fontFamily:'FuturaStd-Book',
    backgroundColor:'transparent'
	},
  amountText:{
    color:'#ffffff',
    fontSize: 25,
    fontWeight:'400',
    textAlign: 'center',
    padding:5,
    fontFamily:'FuturaStd-Book',
    backgroundColor:'transparent'
  },

  dateText:{
    color:'#ffffff',
    fontSize: 16,
    textAlign: 'center',
    padding:5,
    fontFamily:'FuturaStd-Book',
    paddingBottom:30,
    backgroundColor:'transparent'
  },
  myinfoText:{
    color:'#ffffff',
    fontSize: 16,
    padding:10,
    fontFamily:'FuturaStd-Book',
  },

	eidtIcon:{
		padding:10,
		marginTop:10,
		marginRight:10
	},
	userDetailView:{
		backgroundColor:'#ffffff',
		borderBottomLeftRadius: 5,
		borderBottomRightRadius: 5,

	},
	addressView:{

		flexDirection:'row',
		padding:5,
		marginLeft:10,
		marginRight:10,

	},
	addressInputText:{
		flex:1,
		borderBottomWidth: 1,
		borderColor: '#D3E8E1',


	},

	noData    : {
			color     : '#000',
			fontSize  : 18,
			alignSelf : 'center',
			fontFamily:'FuturaStd-Book',
			top       : 200
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

	loanidVal    : {
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
  listContainer: {
    paddingBottom: window.height*0.2

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

	 noDataView: {
       flex: 1,
    justifyContent:'center',
		alignItems:'center'
	},
	progress: {
    margin: 10,

  },

   buttonViewStyle:{
    
    marginLeft: 20,
    marginRight:20,
    marginTop:30,
    justifyContent:'center',	
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

      dialogViewStyle:{

  	position: 'absolute', 
  	top: 0, left: 0, 
  	right: 0, 
  	bottom: 0, 
  	justifyContent: 'center', 
  	alignItems: 'center'
  },

  linkAccountImageContainer:{

    alignItems:'center'
  },
  forgotDetailText: {
    color:'#ffffff',
    fontSize: 16,
    textAlign: 'center',
    paddingTop:40,
    paddingLeft:30,
    paddingRight:30,
    fontFamily:'FuturaStd-Book',
    paddingBottom:10,
    backgroundColor:'transparent',
    lineHeight:(Platform.OS === 'ios') ? 0 : 25,

  },


});
