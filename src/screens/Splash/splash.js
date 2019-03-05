import React,{Component} from 'react'
import {View,Image,Dimensions,ImageBackground,AsyncStorage} from 'react-native'
import {loadKey} from  '../../utils/db'
import {inject,observer} from 'mobx-react'
@inject("User")
@observer
export default class Splash  extends Component{
  async  componentDidMount(){
    //   const key = await AsyncStorage.getItem("USER_KEY")
    //   console.log(key)
    //  setInterval(()=>{
    //   if(key){
    //           this.props.navigation.replace('Drawer')
    //       }
    //       else{
              this.props.navigation.replace('Login')
      //       }
               
      //  },2000)
    }
  

   
    render(){
        return(
          <ImageBackground 
          style={{height:Dimensions.get("window").height,
        width:Dimensions.get("window").width}}

          source={require('../../../assets/launch-screen.png')}>

          </ImageBackground>
        )
    }
}