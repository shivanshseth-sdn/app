const React = require('react');
const {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  AsyncStorage,
  TouchableOpacity,
} = require('react-native');
const { Component } = React;

const window = Dimensions.get('window');
import { Switch } from 'react-native-switch';


const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    padding: 12,
    paddingBottom:10,
    marginBottom:10
  },
  userInfoContainer:{
    flex:1,
    padding: 20,
    justifyContent: 'center',
  },
  menuItemContainer:{
    flex:3,
  },
  logoutContainer:{
    flex:0.1,
    padding: 20,
    flexDirection:'row',
    alignItems: 'center',
    backgroundColor:'#ffffff',
    justifyContent: 'center',
  },
  name: {
    position: 'absolute',
    left: 70,
    top: 20,
  },
  item: {
    color:'#FFFFFF',
    fontSize: 16,
    fontWeight: '300',
    paddingLeft:15,
    fontFamily:'FuturaStd-Book',
    backgroundColor:'transparent'
  },
  container: {
    flex: 1,
		width: null,
		height: null,
		resizeMode: 'cover',
  },
  welcomeText:{
    color:'#7ACBBC',
    fontSize: 20,
    fontFamily:'FuturaStd-Book',
    backgroundColor:'transparent'
  },
  userNameText:{
    color:'#FFFFFF',
    fontSize: 24,
    paddingTop:10,
    fontFamily:'FuturaStd-Book',
    backgroundColor:'transparent'
  },
  lineView:{
    height:1,
    backgroundColor:'#FFFFFF'
  },

  lineViewItem:{
    marginTop:20,
    marginBottom:10,
    height:1,

    backgroundColor:'#FFFFFF'
  },
  itemContainer:{

    height:38,
    marginTop:5,
    marginBottom:5,
    flexDirection:'row',
    alignItems: 'center',

  },
  itemImage:{
    height:35,
    width:35,
  },
  logoutText: {
    color:'#000000',
    fontSize: 16,
    fontFamily:'FuturaStd-Book',
    fontWeight: '300',
    paddingLeft:10
  },


});

var isQuickAccess=false;
var userName='Bankroll';
var qualified_for_loan=false;
var isEmailSubscribe=false;
module.exports = class Menu extends Component {
  static propTypes = {
    onItemSelected: React.PropTypes.func.isRequired,
    onSwitchChange: React.PropTypes.func.isRequired,
  };

  constructor( props ) {
    super( props );

      console.log("constructor menu");
  
    this.getUserData();


    this.state = {
      //Add a state to track what current selected Item
      selectedItem: 'Home',


    };


  }

  getUserData(){
      AsyncStorage.getItem("userData").then((value) => {
      if(value) {

          console.log('menu if='+value);
          let obj = JSON.parse(value);
          isEmailSubscribe=obj.isEmailSubscriptionOn;

          console.log(' 111isEmailSubscribe ====>>>> '+isEmailSubscribe);
          if(obj.firstname==undefined&&obj.lastname==undefined){
              //this.setState({userName:'Bankroll'})
              userName='Bankroll';
          }
          else{

              userName=obj.username;
              //this.setState({userName:obj.username})
          }
          if(obj.ssn!=undefined&&obj.ssn!=''){

                qualified_for_loan=true;
                //this.setState({qualified_for_loan:true});
          }
          else{

              qualified_for_loan=false;
                //this.setState({qualified_for_loan:false});
          }


          console.log(' isEmailSubscribe ====>>>> '+isEmailSubscribe);
   

      }
      else {

          console.log('qualificationRes else='+value);
      }
    }).done();

  }

  drawerTextStyle(){
    if(qualified_for_loan==true){
      return{
          color:'#FFFFFF',
          fontSize: 16,
          fontWeight: '300',
          paddingLeft:15,
          fontFamily:'FuturaStd-Book',
          backgroundColor:'transparent'
        }
    }
    else{
      return{
          color:'#a8a8a8',
          fontSize: 16,
          fontWeight: '300',
          paddingLeft:15,
          fontFamily:'FuturaStd-Book',
          backgroundColor:'transparent'
        }
    }
  }

  componentWillUpdate(){
      console.log("componentWillUpdate menu");

          this.getUserData();
          AsyncStorage.getItem("isQuickAccess").then((value) => {
          if(value) {

              if(value=='true'){
                console.log('in quickAccess AsyncStorage');
                 isQuickAccess=true;
              }
              else{
                  isQuickAccess=false;
              }
          }
          else{
              isQuickAccess=false;
          }
    }).done();
   
  }

  onEmailSubscriptionChange(val) {

      if(!val){
        this.props.onSwitchChange(false);
      }
      else{
        this.props.onSwitchChange(true);
      }
    }



  render() {

    console.log("menu render");
    return (

      <Image style={styles.container}
        source={require('../res/bg.png')}>

        <View style={styles.userInfoContainer}>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.userNameText}>{userName}</Text>
        </View>
        <View style={styles.lineView}></View>

        <View style={styles.menuItemContainer}>
        <ScrollView scrollsToTop={false} style={styles.menu} contentContainerStyle={{paddingBottom:20}}>

          <TouchableOpacity onPress={() => this.props.onItemSelected('Home')}>
            <View style={styles.itemContainer}>

              <Image style={styles.itemImage}
                source={require('../res/home.png')}>
              </Image>
                <Text
                  style={styles.item}>
                  Home
                </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.props.onItemSelected('Profile')}>
            <View style={styles.itemContainer}>

              <Image style={styles.itemImage}
                source={require('../res/myprofile.png')}>
              </Image>
              <Text

                style={this.drawerTextStyle()}>
                My Profile
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.props.onItemSelected('MyLoan')}>
            <View style={styles.itemContainer}>

                <Image style={styles.itemImage}
                  source={require('../res/myloan.png')}>
                </Image>
              <Text

                style={this.drawerTextStyle()}>
                My Loans
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.props.onItemSelected('Account')}>
          <View style={styles.itemContainer}>

              <Image style={styles.itemImage}
                source={require('../res/addaccount.png')}>
              </Image>
              <Text

                style={this.drawerTextStyle()}>
                Account
              </Text>
          </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.props.onItemSelected('Referral')}>
          <View style={styles.itemContainer}>

              <Image style={styles.itemImage}
                source={require('../res/refferal.png')}>
              </Image>
              <Text

                style={styles.item}>
                Referrals
              </Text>
          </View>
          </TouchableOpacity>

          <View style={styles.lineViewItem}></View>


         
             <TouchableOpacity onPress={() => this.props.onItemSelected('Settings')}>

            <View style={styles.itemContainer}>

                <Image style={styles.itemImage}
                  source={require('../res/setting_icon.png')}>
                </Image>
                <Text

                  style={styles.item}>
                  Settings
                </Text>
            </View>
          </TouchableOpacity> 
          <TouchableOpacity onPress={() => this.props.onItemSelected('FAQ')}>

            <View style={styles.itemContainer}>

                <Image style={styles.itemImage}
                  source={require('../res/faq.png')}>
                </Image>
                <Text

                  style={styles.item}>
                  FAQ
                </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.props.onItemSelected('Support')}>

            <View style={styles.itemContainer}>

                <Image style={styles.itemImage}
                  source={require('../res/support.png')}>
                </Image>
                <Text

                  style={styles.item}>
                  Support
                </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.props.onItemSelected('Notification')}>

            <View style={styles.itemContainer}>

                <Image style={styles.itemImage}
                  source={require('../res/emailSubscription.png')}>
                </Image>
                <Text

                  style={styles.item}>
                  Notification
                </Text>

                <View style={{marginLeft:50}}>
                 <Switch
                        value={isEmailSubscribe}
                        onValueChange={this.onEmailSubscriptionChange.bind(this)}
                        disabled={false}
                        activeText={''}
                        inActiveText={''}
                        circleSize={22}
                        backgroundActive={'#7ACBBC'}
                        backgroundInactive={'gray'}
                        circleActiveColor={'white'}
                        circleInActiveColor={'white'}
                  />
                
                </View>
            </View>
          </TouchableOpacity>
        </ScrollView>
        </View>

                <View style={styles.logoutContainer}>

                  <Image style={styles.itemImage}
                    source={require('../res/logout.png')}>
                  </Image>
                  <Text onPress={() => this.props.onItemSelected('Logout')} style={styles.logoutText}>Logout</Text>
                </View>

      </Image>

    );
  }
};
