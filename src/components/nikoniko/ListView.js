  import React,{Component} from 'react';
  import {View,Text,StyleSheet,Image,ListView} from 'react-native';
  import Row from './Row';
  import * as firebase from 'firebase';
  export default class WedSplash extends Component{
    constructor(props){
      super(props);
        Text.defaultProps.allowFontScaling=false;
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {
        dataSource: ds.cloneWithRows(this.props.RowDataSet),
      };
    }
    _onPressButton = (a) =>{
          this.props._onPressButton(a);
       }

    render(){
      return(
        <ListView
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={(data) => <Row _onPressButton={this._onPressButton} {...data} />}
        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
        />
            );
    }
  }
    const styles = StyleSheet.create({
      container: {

      },
      separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: 'white',
      }
    });
