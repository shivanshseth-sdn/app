import React, { PureComponent } from 'react';
import { View, StyleSheet,AsyncStorage,InteractionManager,Platform } from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import CreateNewPin from './CreateNewPin';
import ResetPassword from './ResetPassword';
import ResetPinFromSetting from './ResetPinFromSetting';
const FirstRoute = () => <View style={ styles.container} ><ResetPassword/></View>;
const SecondRoute = () => <View style={styles.container} ><CreateNewPin/></View>;
const ThirdRoute = () => <View style={styles.container} ><ResetPinFromSetting/></View>;

var array1=[
        { key: '1', title: 'Reset Password' },
        { key: '2', title: 'Quick Access' },
      ]
var array2=[
        { key: '1', title: 'Reset Password' },
        { key: '2', title: 'Reset Access PIN' },
      ]
export default class SettingComponent extends PureComponent {

  constructor() {
      super();

      
      AsyncStorage.getItem("isQuickAccess").then((value) => {
        

              if(value=='true'){
                console.log('in quickAccess AsyncStorage settings');
                 
                 this.setState({isQuickAccess:true},() => console.log(this.state.isQuickAccess));

              }
              else{
                  this.setState({isQuickAccess:false});
              }

    }).done();

    



    
     console.log('setting constructor ==== ');
  }

    state = {
      index: 0,
      routes: [
        { key: '1', title: '' },
        { key: '2', title: '' },
      ],
      isQuickAccess: false,

      
    };


  

 
   componentWillMount(){
      
         console.log("componentWillMount menu settings"+this.state.isQuickAccess);
        console.log('setting componentWillMount ==== ');
    }

   componentWillUpdate(){

     

      console.log("componentWillUpdate menu settings"+this.state.isQuickAccess);

        
  }

  componentDidMount() {
      InteractionManager.runAfterInteractions(() => {
          console.log("after inte settings"+this.state.isQuickAccess);
          this.state.isQuickAccess==false?this.setState({routes:array1}):this.setState({routes:array2});
      });
  }

  _handleChangeTab = index => this.setState({ index });



  _renderHeader = props => <TabBar style={{marginTop:(Platform.OS === 'ios') ? 60 : 50,backgroundColor:'#427E7C'}} labelStyle={{color:'#FFFFFF'}} indicatorStyle={{backgroundColor:'#ffffff'}} {...props} />;

  _renderScene = SceneMap({
    '1': FirstRoute,
    '2': SecondRoute,
  });

  _renderScene2 = SceneMap({
    '1': FirstRoute,
    '2': ThirdRoute,
  });

  render() {

    console.log('setting render== '+this.state.isQuickAccess);
    return (
      <TabViewAnimated
        style={styles.container}
        navigationState={this.state.isQuickAccess==false?this.state:this.state}
        renderScene={this.state.isQuickAccess==false?this._renderScene:this._renderScene2}
        renderHeader={this._renderHeader}
        onRequestChangeTab={this._handleChangeTab}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
});