import React , {Component} from 'react';
import {View, Text, StyleSheet,Image,TouchableOpacity} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color:'white',
    marginLeft: 12,
    fontSize: 20,
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20
  },
});
export default class Row extends Component{
  constructor(props){
    super(props);
      Text.defaultProps.allowFontScaling=false;
   }
render(){
  return(
<TouchableOpacity  onPress = { () => this.props._onPressButton(this.props)}>
  <View style={styles.container}>
    <Text style={styles.text}>
            {this.props.Name}
    </Text>
  </View>
  </TouchableOpacity>
);
}
}
