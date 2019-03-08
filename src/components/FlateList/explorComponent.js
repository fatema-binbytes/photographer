
import React,{Component} from 'react'
import {TouchableHighlight,ImageBackground,Text,View,Dimensions,Platform} from 'react-native'
const deviceHeight = Dimensions.get("window").height;
export default class ExploreComponent extends Component{
    render(){
        return(
            <TouchableHighlight
            underlayColor={'transparent'}
            
                    onPress={()=>this.props.navigation.navigate(this.props.navi)}
                  >
                    <ImageBackground  transparent style={{
                     margin:0.5,
                      height:Dimensions.get("window").height/ 4 + 10,
                      width:Dimensions.get("window").width / 2 + 2,
                    }} source={{uri:this.props.item.downloadURL}}>
                   {this.props.text ?
                   <View transparent style={{backgroundColor:'#33333399',}}><Text transparent
                       style={{fontSize: 12,
                        
                            fontWeight: "900",
                            marginLeft: 10,
                            bottom:10,
                            marginTop: deviceHeight / 4 - 6,
                           
                            color:'white'
                          }}
                    >
                      {this.props.text}
                    </Text></View>:<View/>}
                    
                    </ImageBackground>
                    </TouchableHighlight>
        )
    }
}
