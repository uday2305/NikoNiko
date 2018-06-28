import renderIf from './renderIf';
import React,{Component} from 'react';
import {View} from 'react-native';
import CustomListView from './ListView';

export default class TeamListView extends Component{
  constructor(props) {
    super(props);
    this.state = {dataSource:this.props.navigation.state.params.dataSource};
  }
  static navigationOptions = {
      title:'TeamList',
      headerStyle:{backgroundColor: '#AA210E',justifyContent:'center'},
      headerTitleStyle :{color:'white',justifyContent:'center'},
      headerTintColor:'white'
    };

    _onPressButton = (a) =>{
      this.props.navigation.navigate('NikoCaptureView',{personInfo:a,squadName:this.props.navigation.state.params.squadName});
   }
    
  render(){
    return(
        <View style={{flex:1,backgroundColor: '#AA210E'}}>
          <CustomListView RowDataSet={this.state.dataSource} _onPressButton={this._onPressButton}/>
        </View>
    );
  }
}