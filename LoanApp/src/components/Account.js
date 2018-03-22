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
import {AddAccountCard} from './common';
import CustomAlertDialog from './CustomAlertDialog';
import DeleteAlert from './DeleteAlert';
import {

  showLoadingGetBankAccount,
  clearResponse,
  getBankAccountReq,
	
} from '../actions/GetLinkAccountAction';

import {

  showLoadingDeleteAccount,
  clearResponseDeleteAccount,
  deleteAccountReq,
	
} from '../actions/DeleteAccountAction';
import * as Progress from 'react-native-progress';
const window = Dimensions.get('window');

//class for create the list row item and add animation in listview
class DynamicListRow extends Component {


	_defaultHeightValue = 100;
	_defaultTransition  = 500;

	state = {
			_rowHeight  : new Animated.Value(this._defaultHeightValue),
			_rowOpacity : new Animated.Value(0)
	};

	componentDidMount() {
			
			Animated.timing(this.state._rowOpacity, {
					toValue  : 1,
					duration : this._defaultTransition
			}).start()
	}

	componentWillReceiveProps(nextProps) {
			if (nextProps.remove) {
					this.onRemoving(nextProps.onRemoving);
			} else {
					this.resetHeight()
			}
	}

	onRemoving(callback) {
			Animated.timing(this.state._rowHeight, {
					toValue  : 0,
					duration : this._defaultTransition
			}).start(callback);
	}

	resetHeight() {
			Animated.timing(this.state._rowHeight, {
					toValue  : this._defaultHeightValue,
					duration : 0
			}).start();
	}

	render() {
			return (
					<Animated.View
							style={{height: this.state._rowHeight, opacity: this.state._rowOpacity}}>
							{this.props.children}
					</Animated.View>
			);
	}
}


class Account extends Component{

	//define initial value of state variable
	state = {
			loading     : true,
			dataSource  : new ListView.DataSource({
					rowHasChanged : (row1, row2) => true
			}),
			refreshing  : false,
			rowToDelete : null,
			data:[],
			errorMsg: '',
        	responseData:'',
        	code:'',
        	msg:'',
        	responseDataDel:'',
        	codeDel:'',
        	msgDel:'',
        	dialogMsg:'',
        	isShowDialog:false,
        	isShowDelDialog:false,
        	accountId:'',

	};


	onDialogButtonClick(){
			this.setState({isShowDialog:false});
			this.setState({dialogMsg:''});
	}

	onDialogYesButtonClick(){
			this.setState({isShowDelDialog:false});
			this.deleteAccountReq(this.state.accountId);
       	
			
	}
	onDialogNoButtonClick(){
			this.setState({isShowDelDialog:false});
			
	}

	
	

	componentWillReceiveProps(nextProps) {


		this.setState({responseData:nextProps.linkedAccountRes});
		this.setState({code:nextProps.linkedAccountRes.code});
		this.setState({msg:nextProps.linkedAccountRes.message});
		this.setState({responseDataDel:nextProps.responseDeleteAccount});
		this.setState({codeDel:nextProps.responseDeleteAccount.code});
		this.setState({msgDel:nextProps.responseDeleteAccount.message});


		var resData=JSON.stringify(nextProps.linkedAccountRes.data);
		var resDataDel=JSON.stringify(nextProps.responseDeleteAccount.data);



             try {
                if(resData != undefined&&resData!=''&&resData!="{}")
                {
                  let obj = JSON.parse(resData);
                  this.setState({data:obj});
                  this.dataLoadSuccess({data : obj});      
                }
                

              } catch (ex) {
                console.error(ex);
              }

              try {
                if(resDataDel != undefined&&resDataDel!=''&&resDataDel!="{}")
                {
                  let obj = JSON.parse(resDataDel);
                  this.setState({data:obj});
                        
                }
                

              } catch (ex) {
                console.error(ex);
              }
     

 	 }
	 componentDidUpdate() {

	      console.log('Account componentDidUpdate ==== ');
				if(this.state.responseData!=''){
					{if(this.state.code==200){

						this.props.clearResponse();	
						this.props.showLoadingGetBankAccount(false);
					}
					else{
						this.props.clearResponse();
						this.props.showLoadingGetBankAccount(false);
						this.setState({isShowDialog:true});
						this.setState({dialogMsg:this.state.msg});
					}
					}
				}

				if(this.state.responseDataDel!=''){

					{if(this.state.codeDel==200){

						this.props.clearResponseDeleteAccount();	
						this.props.showLoadingDeleteAccount(false);
							this.setState({
			            	rowToDelete : this.state.accountId
			        	});

					}
					else{

						this.props.clearResponseDeleteAccount();
						this.props.showLoadingDeleteAccount(false);
						this.setState({isShowDialog:true});
						this.setState({dialogMsg:this.state.msgDel});
					}
					}
				}


	  }

	  //Function for go to Add account by palid screen.
	  onAddBankAccountClick(){

	  	Actions.AddAccountByPlaid();

	  }

	  componentWillMount(){

    	this.props.showLoadingGetBankAccount(true);
    	AsyncStorage.getItem("userData").then((value) => {
                        if(value) {

                            console.log('userData if='+value);
                            let obj = JSON.parse(value);
                    
                          
                           var user={

                           	authToken:obj.token,
                            userId:obj._id,

                          };
                          console.log('Update USER='+JSON.stringify(user));
                          this.props.getBankAccountReq(user);
   

                        }
                        else {

                            console.log('userData else='+value);
                        }
                      }).done();

     
      
  	}


  	//Function for call delete account service
  	deleteAccountReq(id){

  		this.props.showLoadingDeleteAccount(true);
    	AsyncStorage.getItem("userData").then((value) => {
                       
                        if(value) {

                            console.log('userData if='+value);
                            let obj = JSON.parse(value);
                    
                          
                           var user={

                           	authToken:obj.token,
                            userId:obj._id,
                            id:id

                          };
                          console.log('Update USER='+JSON.stringify(user));
                          this.props.deleteAccountReq(user);
   

                        }
                        else {

                            console.log('userData else='+value);
                        }
                      }).done();

     
  	}

  	//Render title of the screen
  	renderTitle = () => {


      this.refreshList();

      return (
        <View></View>
      )
    }

    //For referesh list
    refreshList(){
    
    		if(this.props.isLoadingLinkAccount==false){
    			this.props.showLoadingGetBankAccount(true);
    	   		 AsyncStorage.getItem("userData").then((value) => {
                        if(value) {

                            console.log('userData if='+value);
                            let obj = JSON.parse(value);
                    
                          
                           var user={

                           	authToken:obj.token,
                            userId:obj._id,

                          };
                       
                          this.props.getBankAccountReq(user);
   

                        }
                        else {

                            console.log('userData else='+value);
                        }
                      }).done();
    		}

    		

    }

	componentDidMount() {

			Actions.refresh({ renderRightButton: this.renderTitle})

			console.log('in did mount account ===');
			InteractionManager.runAfterInteractions(() => {
					this._loadData()
			});

		
	}

	

	// For load data to list
	_loadData(refresh) {
			refresh && this.setState({
					refreshing : true
			});

			this.dataLoadSuccess({data : this.state.data});
	}

	//For render data to list
	dataLoadSuccess(result) {

			this._data = result.data;

			let ds = this.state.dataSource.cloneWithRows(this._data);

			this.setState({
					loading     : false,
					refreshing  : false,
					dataSource  : ds
			});
	}


	// For render list item
	_renderRow(rowData, sectionID, rowID) {

			console.log("render row account");

			return (


					<DynamicListRow
					remove={rowData._id === this.state.rowToDelete}
					onRemoving={this._onAfterRemovingElement.bind(this)}
					>
						<AddAccountCard>
							<View style={styles.rowStyle}>
									<View style={styles.contact}>

											<Image
												source={require('../res/banklogoacc.png')}>
											</Image>

											<View
												style={styles.listItemTextView}
											 >
												<Text style={styles.bankNameText}>{rowData.bankName}</Text>
												<Text style={styles.checkingText}>{rowData.name}</Text>
												<Text style={styles.checkingText}>{rowData.type}: {rowData.accountNumber.replace(/\d(?=\d{4})/g, "X")}</Text>
											</View>
											<TouchableOpacity  onPress={() => this._deleteItem(rowData._id)}>
													<Image style={{padding:10}}
														source={require('../res/trash.png')}>
													</Image>
											</TouchableOpacity>


									</View>

							</View>
					</AddAccountCard>

					</DynamicListRow>
			);
	}
    render(){

    	

    return(



        	<View style={{flex:1}}>
       
					<Image style={styles.imgContainer}
								source={require('../res/bg.png')}>

								<View>
								<Text style={styles.accountMsgText}>You can manage your linked bank accounts from here.</Text>
								</View>
							</Image>

						<ScrollView contentContainerStyle={{backgroundColor:'#fff',paddingBottom:220}}
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
						<View>

						<ListView
								enableEmptySections={true}
								dataSource={this.state.dataSource}
								renderRow={this._renderRow.bind(this)}
						/>

						</View>
						<View style={styles.buttonViewStyle}>
									<TouchableOpacity style={styles.buttonLogin}
									onPress={this.onAddBankAccountClick.bind(this)}
									>

									<Text style={styles.buttonTextStyle}>Add Bank Account</Text>
							</TouchableOpacity>
						</View>


						    {this.props.isLoadingLinkAccount ?
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

					              {this.props.isLoadingDeleteAccount ?
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

					</ScrollView>

					{this.state.isShowDialog==true?<View style={styles.dialogViewStyle}>
			             			<CustomAlertDialog title='Bankroll' onPress={this.onDialogButtonClick.bind(this)} subtitle={this.state.dialogMsg} />
			    				</View>:null} 

			    	{this.state.isShowDelDialog==true?<View style={styles.dialogViewStyle}>
			             			<DeleteAlert title='Bankroll' onPressYes={this.onDialogYesButtonClick.bind(this)} onPressNo={this.onDialogNoButtonClick.bind(this)} subtitle={'Are you sure you want to delete account?'} />
			    	</View>:null}		
					
				</View>


      );
    }

	componentWillUpdate(nexProps, nexState) {

		 console.log('Account componentWillUpdate ==== ');	

        if (nexState.rowToDelete !== null) {
            this._data = this._data.filter((item) => {
                if (item._id !== nexState.rowToDelete) {
                    return item;
                }
            });
        }
    }


    // Call to delete list item
    _deleteItem(id) {
    	console.log('delete account id= '+id);
    	this.setState({accountId:id});
    	this.setState({isShowDelDialog:true});
    	
    }

    //update list after remove item from list
    _onAfterRemovingElement() {
        this.setState({
            rowToDelete : null,
            dataSource  : this.state.dataSource.cloneWithRows(this._data)
        });
    }

}


const mapStateToProps = ({ getLinkAccountReducer,deleteAccountReducer }) => {

  const {isLoadingLinkAccount,linkedAccountRes} = getLinkAccountReducer;
  const {isLoadingDeleteAccount,responseDeleteAccount} = deleteAccountReducer;
  console.log("Linked accounts output: "+JSON.stringify(linkedAccountRes));
  console.log("delete accounts output: "+JSON.stringify(responseDeleteAccount));
  return {
    
    isLoadingLinkAccount:isLoadingLinkAccount,
    linkedAccountRes:linkedAccountRes,
    isLoadingDeleteAccount:isLoadingDeleteAccount,
    responseDeleteAccount:responseDeleteAccount,
  }
}
  	
export default connect(mapStateToProps,{showLoadingGetBankAccount,clearResponse,getBankAccountReq,showLoadingDeleteAccount,clearResponseDeleteAccount,deleteAccountReq})(Account);



// define style for UI
const styles = StyleSheet.create({
	imgContainer: {
		width: null,
		height: null,
		resizeMode: 'cover',
		paddingTop:70
	},
	accountMsgText:{
		textAlign:'center',
		color:'#ffffff',
		fontSize:16,
		paddingTop:40,
		paddingRight:25,
		paddingLeft:25,
		paddingBottom:40,
		fontFamily:'FuturaStd-Book',
		backgroundColor:'transparent',
		 lineHeight:(Platform.OS === 'ios') ? 0 : 25,
	},
	noData    : {
			color     : '#000',
			fontSize  : 18,
			fontFamily:'FuturaStd-Book',
			alignSelf : 'center',
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
			fontSize : 15
	},

	amount    : {
			color    : '#427E7B',
			fontWeight:'bold',
			padding:5,
			fontFamily:'FuturaStd-Book',
			fontSize : 16
	},
	date   : {
			color    : '#D1D3D4',
			padding:5,
			fontFamily:'FuturaStd-Book',
			fontSize : 14
	},
	contact : {
			width     : window.width - 40,
			alignSelf : 'flex-start',
			flexDirection     : 'row',
			alignItems: 'center',
			paddingTop:10,
			paddingBottom:10
	},
	listLoanIdTextView:{
		flex:2
	},

	listItemTextView:{
		flex:1,
		paddingLeft:20

	},

	buttonViewStyle:{
    paddingTop:20,
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
	bankNameText:{

		color:'#427E7B',
		fontSize: 16,
		fontFamily:'FuturaStd-Book',
	},
	checkingText:{

		color:'#000',
		fontSize: 14,
		fontFamily:'FuturaStd-Book',
		paddingTop:5
	},

	 dialogViewStyle:{

    position: 'absolute', 
    top: 0, left: 0, 
    right: 0, 
    bottom: 0, 
    justifyContent: 'center', 
    alignItems: 'center'
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
