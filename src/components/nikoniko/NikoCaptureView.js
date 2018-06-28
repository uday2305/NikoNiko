import React,{Component} from 'react';
import {View, StyleSheet,Image,TouchableOpacity,ToastAndroid,Text,DatePickerAndroid} from 'react-native';
import * as firebase from 'firebase';
const styles = StyleSheet.create({
    container: {
        flex: 5,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    nikoContainer:{
        flex: 4,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    calanderContainer:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
      color:'black',
      marginLeft: 12,
      fontSize: 20,
    },
    photo: {
      height: 100,
      width: 100,
      backgroundColor:'transparent',
      marginBottom:20
    },
    smallphoto:{
        height: 20,
        width: 20,
        backgroundColor:'transparent',
        marginLeft:20
    }
  });
export default class NikoCaptureView extends Component{
  constructor(props) {
    super(props);
    this.state = {
        happy:'',
        neutral:'',
        sad:'',
        moodCapturedDate:this.getYestedaysDate()
    }
    this.state.happy = require('../../images/happy.png');
    this.state.neutral = require('../../images/neutral.png');
    this.state.sad = require('../../images/sad.png');
    this.state.cal = require('../../images/cal.png');
  }
  getYestedaysDate = () =>{
    var $today = new Date();
    $yesterday = new Date($today);
    $yesterday.setDate($today.getDate() - 1);
    var $dd = $yesterday.getDate();
    var $mm = $yesterday.getMonth()+1; //January is 0!

    var $yyyy = $yesterday.getFullYear();
    if($dd<10){
        $dd='0'+dd
    }
     if($mm<10){
         $mm='0'+$mm
    } 
    return $dd+'.'+$mm+'.'+$yyyy;
}
  static navigationOptions = ({navigation}) => {
      return{
        title: navigation.state.params.personInfo.Name+ '\'s Niko Capture View',
        headerStyle:{backgroundColor: '#AA210E',justifyContent:'center'},
        headerTitleStyle :{color:'white',justifyContent:'center'},
        headerTintColor:'white'
      }
    };
    submitNikoNiko = (mood)=>{
        let displayString = this.props.navigation.state.params.personInfo.Name + " Niko Captured Successfully";
        const parentKeyRef = firebase.database().ref().child('niko');
          const messagesArrayRef = parentKeyRef.child('userDetails');
          let msgObj = {
            date: this.state.moodCapturedDate,
            mood:mood,
            squad:this.props.navigation.state.params.squadName,
            username:this.props.navigation.state.params.personInfo.Name
          };
          messagesArrayRef.push(msgObj);
          this.props.navigation.goBack();
        ToastAndroid.showWithGravity(
           displayString,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM
          );  
        }
        async setMoodCaptureDate (){
            var $today = new Date();
    var $yesterday = new Date($today);
    $yesterday.setDate($today.getDate() - 1);
    var $dd = $yesterday.getDate();
    var $mm = $yesterday.getMonth()+1; //January is 0!

    var $yyyy = $yesterday.getFullYear();
    
            try {
                const {action, year, month, day} = await DatePickerAndroid.open({
                  // Use `new Date()` for current date.
                  date: new Date($yyyy, $mm-1, $dd),
                  maxDate : new Date($yyyy, $mm-1, $dd)
                });
                if (action !== DatePickerAndroid.dismissedAction) {
                  $dd = day;
                  $mm = month + 1;
                  $yyyy = year;
                  if($dd<10){
                    $dd='0'+dd
                }
                 if($mm<10){
                     $mm='0'+$mm
                } 
                  this.setState({moodCapturedDate:$dd+'.'+$mm+'.'+$yyyy});
                }
              } catch ({code, message}) {
                console.warn('Cannot open date picker', message);
              }
        }
  render(){
    return(
        <View style={styles.container}>
        
        <View style={styles.calanderContainer}>
        <Text style={styles.text}>{this.state.moodCapturedDate}</Text>
        <TouchableOpacity onPress = { () => this.setMoodCaptureDate()}>
        <Image
          source={this.state.cal}
          style={styles.smallphoto}
        />    
        </TouchableOpacity>    
        </View>
        <View style={styles.nikoContainer}>
        <TouchableOpacity  onPress = { () => this.submitNikoNiko("😁")}>
          <Image
          source={this.state.happy}
          style={styles.photo}
        />
        </TouchableOpacity>
        <TouchableOpacity  onPress = { () => this.submitNikoNiko("😐")}>
        <Image
          source={this.state.neutral}
          style={styles.photo}
        />
        </TouchableOpacity>
        <TouchableOpacity  onPress = { () => this.submitNikoNiko("😔")}>
        <Image
          source={this.state.sad}
          style={styles.photo}
        />
        </TouchableOpacity>
        </View>

        </View>
    );
  }
}