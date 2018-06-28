import React,{Component} from 'react';
import {View,Text,StyleSheet,Image,ListView} from 'react-native';
import CustomListView from './ListView';
import TeamListView from './TeamListView';
import NikoCaptureView from './NikoCaptureView';
import * as firebase from 'firebase';
import { StackNavigator } from 'react-navigation';

var config = {
  apiKey: "AIzaSyD-fgkHKza5PTZVtfo5KnTJB702rtmTMhU",
  authDomain: "niko-niko-c69dc.firebaseapp.com",
  databaseURL: "https://niko-niko-c69dc.firebaseio.com",
  projectId: "niko-niko-c69dc",
  storageBucket: "niko-niko-c69dc.appspot.com",
  messagingSenderId: "973090535607"
};
 firebase.initializeApp(config);
class Home extends Component{
  static navigationOptions = {
      title: '',
      header:null
    };
  constructor(props){
    super(props);
    Text.defaultProps.allowFontScaling=false;
    this.state = {
      dataSource: false
    }
  }
  componentDidMount(){
    var that = this;
    const parentKeyRef = firebase.database().ref().child('niko').child('Squads');
    parentKeyRef.on("value", function(snapshot) {
      console.log(snapshot.val());
      //that.setState('dataSource',snapshot.val().keys());
      var teams = Object.keys(snapshot.val());
      var teamsUpdatedArray = [];
      teams.forEach(element => {
        var obj = {};
        obj.Name = element;
        obj.teamList = snapshot.val()[element];
        teamsUpdatedArray.push(obj); 
      });
      that.setState({dataSource:teamsUpdatedArray});
   }, function (error) {
      console.log("Error: " + error.code);
   });
  }   

  _onPressButton = (a) =>{
        this.props.navigation.navigate('TeamListView',{dataSource:a.teamList,squadName:a.Name});
     }
  render(){
    var component = null;
    if(this.state.dataSource){
      component =  <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <View style={{height: 300}}>
        <CustomListView RowDataSet={this.state.dataSource} _onPressButton={this._onPressButton}/>
      </View>
     </View>;
    }
    else{
      component = 
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Text>Loading!!!!</Text>
        </View>;
    }
    return(
      <View style={styles.wrapper}>
           {component}
      </View>
    );
  }
}
const WebSplash = StackNavigator({
  Home:{screen: Home},
  TeamListView:{screen:TeamListView},
  NikoCaptureView:{screen:NikoCaptureView}
});
export default WebSplash;
  const styles = StyleSheet.create({
    wrapper:{
      flex: 1,
      flexDirection: 'row',
      backgroundColor:'#AA210E'
    },
    title:{
      color:'white',
      fontSize:20,
      fontWeight:'bold'
    },
    textDesc:{
      color:'#ac41f4',
      fontSize:15,
      textAlign:'center',
      width:200,
    },
    subTitle:{
      color:'white',
      marginBottom:8,
      fontSize:12,
      fontWeight:'200',
    },
    titleWrapper:{
      padding:10,
      height: 100
    },
    backgroundImage:{
      flex: 1,
      width: null,
      height: null,
      justifyContent:'center',
      alignItems:'center'
    },
    backgroundImageList:{
      width: 250,
      height: 440,
      borderRadius:50,
      justifyContent:'center',
      alignItems:'center'
    },
    textSmallFormat:{
      marginTop:5,
      fontFamily:'Arial',
      color:'white',
      fontSize:15
    },
    textBigFormat:{
      marginTop:5,
      fontFamily:'Arial',
      color:'white',
      fontSize:25,
    },
    textFormat:{
      fontFamily:'Arial',
      color:'white',
      fontSize:15
    }
  });
