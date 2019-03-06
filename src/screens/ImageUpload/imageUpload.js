import React,{Component}from 'react'
import {View,Text,TextInput,Image,ScrollView,TouchableOpacity,Dimensions,ImageBackground,Picker,ToastAndroid} from 'react-native'
import firebase from 'react-native-firebase'
import {inject,observer} from 'mobx-react'
import ImagePicker from 'react-native-image-picker'

import PickerComponent from '../../components/ImagePicker/pickerComponent'
import Utils from '../../utils/rendomName'
import {
  Container,
  Content,
 
  Thumbnail,
  Left,
  Right,
  Body,
  Button,
 Header,
  List,
  ListItem,
 
  Icon
} from "native-base";

@inject("User")
@observer
export default class ImageUpload extends Component{
    constructor(){
        super()
            this.state={
                aboutUser:'',
               name:'',
               isUploadImage :0,
               ImageSource: [],
               UserType:"Photographer",
               ImagePath:[]
              
            
        }
       this.images=[]
    }
    imagespush(id, path, filename, mediaType){
      if( this.images.length !=0){
         for( let i=0;i < this.images.length;i++){
          
            if(this.images[i].id === id){
                 const index = this.images.findIndex(x => x.id==id)
              this.images[index]= {id:id,path: path, filename:filename,type: mediaType}
              } else if(this.images[i].id !== id){
              this.push(id, path, filename, mediaType)
            return
          }}
        }else{
         this.push(id, path, filename, mediaType)
        }
       }
       push(id, path, filename, mediaType){
           let Item ={
            id: id,path: path, filename:filename,type: mediaType
            }
            this.images.push(Item)
       }
    uploadImages(){
       
         let promises = []
              this.images.forEach(image => {
                promises.push(
                  new Promise((resolve, reject) => {
                    firebase
                      .storage()
                      .ref('/Images/' + Utils.getFileName())
                      .putFile(image.path)
                      .then(rImage => {
                        resolve({
                          downloadURL: rImage.downloadURL,
                          contentType: rImage.metadata.contentType,
                          name: rImage.metadata.name
                        })
                      })
                      .catch(err => {
                        console.log(err)
                      })
                      ToastAndroid.show(
                       "Image Uploded",
                        ToastAndroid.LONG )
                  })
                )
              })

              return promises
            }
          
    render(){
        return(
            <View>
        <Header>
                <Left>
                    <Button
                    transparent
                    onPress={() => this.props.navigation.navigate("DrawerOpen")}
                    >
                    <Icon active name="menu" />
                    </Button>
                </Left>
                <Body>
                    <Image source={require("../../../assets/header-logo.png")} style={{height: 25,width: 95,resizeMode: "contain"}} />
                </Body>
              
         <Right/>
        </Header>
                <View style={{flexDirection:'row'}}>
                  <View style={{flex:0.5}}>
                  <PickerComponent id={0} onFilePick={(id,path, filename, mediaType) => this.imagespush(id, path, filename, mediaType)}/>
                  </View>
                   
                  <View style={{flex:0.5}}>
                      <PickerComponent id={1} onFilePick={(id,path, filename, mediaType) => this.imagespush(id, path, filename, mediaType)}/>
                 </View>
               </View>
               <View style={{flexDirection:'row'}}>
                  <View style={{flex:0.5}}>
                  <PickerComponent id={2} onFilePick={(id,path, filename, mediaType) => this.imagespush(id, path, filename, mediaType)}/>
                  </View>
                  <View style={{flex:0.5}}>
                  <PickerComponent id={3} onFilePick={(id,path, filename, mediaType) => this.imagespush(id, path, filename, mediaType)}/>
                  </View>
               </View>
               <View style={{flexDirection:'row'}}>
                  <View style={{flex:0.5}}>
                  <PickerComponent id={4} onFilePick={(id,path, filename, mediaType) => this.imagespush(id, path, filename, mediaType)}/>
                  </View>
                  <View style={{flex:0.5}}>
                  <PickerComponent id={5} onFilePick={(id,path, filename, mediaType) => this.imagespush(id, path, filename, mediaType)}/>
                  </View>
               </View>
               <TouchableOpacity onPress={() => this.uploadImages()} style={{backgroundColor:'#01cca1',padding:12,justifyContent:'center',alignItems:'center',borderRadius:20,marginTop:5}}>
               <Text>Upload Image</Text></TouchableOpacity>
               
            </View>
        )
    }
    }
            