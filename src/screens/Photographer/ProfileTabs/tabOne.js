// @flow
import React, {Component} from "react";
import {ScrollView, View,FlatList,TouchableOpacity} from "react-native";

import {
  Text,
  Thumbnail,Icon
 } from "native-base";

import { inject, observer } from 'mobx-react'
import styles from "./styles";

import ImageComponent from '../../../components/FlateList/imageComponent'

@inject('User')
@observer
class TabOne extends Component {
  constructor(){
    super()
    this.state = {
      data:[]
    }
  }
  
  async componentDidMount(){
    const user = await this.props.User.getById(this.props.User.uid);
           if(user) {
             this.setState({ data: user});
           }
       }
 
  render() {
   return (
      <ScrollView>
        <View style={{flex:1}}>
        <View style={styles.profileInfoContainer}>
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',position:'relative'}}>
          <View style={{alignSelf: "center"}}>
              <Thumbnail
                source={{uri : 'file:///'+this.state.data.userThumbnail}}
                style={styles.profilePic}
              />
          </View>
          <View style={{position:'absolute',top:0,right:0,paddingRight:4}}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('EditProfiles')}> 
               <Icon name="md-person-add"/>
               </TouchableOpacity>
        </View>
        </View>
       
            <View style={styles.profileInfo}>
              <Text style={styles.profileUser}>{this.state.data.displayName}</Text>
              <Text note style={styles.profileUserInfo}>
                {this.state.data.about}
               </Text>
            </View>
            <View style={{justifyContent:'flex-end',alignItems:'flex-end'}}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('ImageUpdate')}> 
               <Icon name="md-camera"/>
               </TouchableOpacity>
              </View>
          </View>
           
          
            
            <FlatList
             data={this.state.data.images}
             numColumns={2}
             renderItem={(item) => {
             return<ImageComponent  navigation={this.props.navigation}item={item.item}/>
            }}
            
            keyExtractor={(item,index )=>  `${index}`}/>
           </View>
          
           
           </ScrollView>
    
    );
  }
}

export default TabOne

