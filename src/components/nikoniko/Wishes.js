import renderIf from './renderIf';
import React,{Component} from 'react';
import * as firebase from 'firebase';
import {View,Text,StyleSheet,Image,ListView,TextInput,TouchableOpacity,KeyboardAvoidingView } from 'react-native';

export default class Reception extends Component{
  constructor(props) {
    super(props);
    Text.defaultProps.allowFontScaling=false;
    this.state = { name: '',message:'',showThanksIndMsg:false};
  }
  static navigationOptions = {
      title:'Your wishes',
      headerStyle:{backgroundColor: '#AA210E',justifyContent:'center'},
      headerTitleStyle :{color:'white',justifyContent:'center'},
      headerTintColor:'white'
    };
    _onPressButton = (state) =>{
      if(this.state.name.length!==0 && this.state.message.length!==0){
          const parentKeyRef = firebase.database().ref().child('DeppuApp');
          const messagesArrayRef = parentKeyRef.child('WeddingWishes');
          let msgObj = {
            name: this.state.name,
            wishes:this.state.message
          };
          messagesArrayRef.push(msgObj);
          this.clearText();
      }
       }
       clearText(){
         this.setState({
           name:'',
           message:'',
           showThanksIndMsg:true
         });
         this.refs.nameInput.blur();
         this.refs.messageInput.blur();
       }

  render(){
    return(
      <KeyboardAvoidingView behavior='padding' style={styles.wrapper}>
        <Image source={require('../../images/darkBG.png')} style={styles.backgroundImage}>

            <View style={{marginTop:30,marginLeft:50,marginRight:50}}>
              <Text style={styles.textSmallFormat}>Nothing as beautiful as a personal</Text>
              <Text style={styles.textSmallFormat}>message, Please leave yours here.</Text>

            <View style={{marginTop:60}}>
              {renderIf(this.state.showThanksIndMsg,
                    <Text style={styles.textThanksFormat}>Thanks! for your message.</Text>
                )}
              <Text style={styles.textSmallFormat}>Name</Text>
                <TextInput
                   autoCorrect={false}
                   ref="nameInput"
                   underlineColorAndroid='transparent'
                  style={{height: 40,marginTop:10, backgroundColor:'white'}}
                  onChangeText={(name) => this.setState({name})}
                  value={this.state.name}
                  />
            </View>
            <View style={{marginTop:30}}>
              <Text style={styles.textSmallFormat}>Your message</Text>
                <TextInput
                  underlineColorAndroid='transparent'
                  autoCorrect={false}
                  ref="messageInput"
                  style={{height: 80,marginTop:10, backgroundColor:'white'}}
                  onChangeText={(message) => this.setState({message})}
                  value={this.state.message}
                  />
            </View>
            <TouchableOpacity
                onPress={ () => this._onPressButton("Home")}
               style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Share Your Wishes</Text>
            </TouchableOpacity>
          </View>


            </Image>
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  wrapper:{
    flex: 1,
    flexDirection: 'column',
  },
  backgroundImage:{
    flex: 1,
    width: null,
    height: null,
  },
  textThanksFormat:{
    fontFamily:'arial',
    fontWeight:'bold',
    color:'#FFEFAE',
    fontSize:15
  },
  textSmallFormat:{
    fontFamily:'arial',
    fontWeight:'bold',
    color:'white',
    fontSize:15
  },photo: {
    height: 200,
    width: 300,
    borderRadius: 10
  }, ornamentphoto:{
    height: 25,
    width: 150,
  }, container: {
      flex: 1,
      padding: 12,
      flexDirection: 'row',
      alignItems: 'center',
    },
    text: {
      color:'white',
      marginLeft: 12,
      fontSize: 20,
    },textWithMargin:{
      marginTop:15,
      fontFamily:'arial',
      fontWeight:'bold',
      color:'white',
      fontSize:20
    },
    buttonText:{
      textAlign:'center',
      color:'#C8185C',
      fontSize:15,
      marginTop:10,
      fontFamily:'arial',
      fontWeight:'bold'
    },
    buttonContainer:{
      backgroundColor:'#FFEFAE',
      height:40,
      borderRadius:20,
      marginTop:50,
      marginLeft:50,
      marginRight:50
    }

});
