import React,{Component}from 'react'
import {View,Text,Button,TextInput,ScrollView,TouchableOpacity,Dimensions,ImageBackground,Picker} from 'react-native'
import firebase from 'react-native-firebase'
import {inject,observer} from 'mobx-react'
import ImagePicker from 'react-native-image-picker'

import PickerComponent from '../../components/ImagePicker/pickerComponent'
import Utils from '../../utils/rendomName'


@inject("User")
@observer
export default class InviteFriends extends Component{
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
    componentDidMount(){
        this.props.User.userData
        this.setState({name:this.props.User.userData.displayName})
    }
    
    async load(){
        const userData=this.props.User.userData
        console.log(userData.displayName,userData.email,userData.uid)
        const data = firebase.firestore().collection('Users')
        console.log(data,">>>>>")
       const doc = await data.doc().get()
       if(doc.exists){
           console.log(doc.data(),"ifff")
       } else {
           const defaultDoc ={
            Email:userData.email,
            Name:this.state.name,
            About:this.state.aboutUser,
            UserType:this.state.UserType,
            Images :this.images   
           }
           await data.doc().set(defaultDoc)
           console.log(doc,"else")
       }
    }
    imagespush(id, path, filename, mediaType){
      if( this.images.length !=0){
        console.log(this.images)
        for( let i=0;i < this.images.length;i++){
           console.log(id,i,'plante')
            if(this.images[i].id === id){
              this.images.splice(0,3,{path: path, filename:filename,type: mediaType})
              } else if(this.images[i].id !== id){
              this.push(id, path, filename, mediaType)
            return
          }}
        }else{
         this.push(id, path, filename, mediaType)
        }
       }
       push(id, path, filename, mediaType){
          console.log(this.images,'push ')
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
                  })
                )
              })

              return promises
            }
          
    render(){
     
        return(
        <ImageBackground 
              style={{flex: 1,
                width: "100%",
                height: Dimensions.get("window").height,
              }}
              source={require("../../../assets/bg.png")}>
                <ScrollView>
              <View style={{margin:4}}>
              <View style={{flexDirection:'row',paddingLeft:5,marginBottom:15,marginTop:15,justifyContent:'center',alignItems:'center'}}>
              <Text style={{fontWeight:"bold",color:'white',fontSize:30,}}>Hello , </Text>
             <Text style={{fontWeight:"300",color:'white',fontSize:20,}}>{ this.props.User.userData.displayName}</Text>
              </View>
              
             <Text style={{fontWeight:"normal",color:'white',fontSize:15,paddingLeft:5}}>{this.props.User.userData.email}</Text>
                <TextInput 
                style={{color:'white',paddingLeft:15,borderWidth:2,borderRadius:15,borderColor:'white'}}
                
                placeholder ={"your name"}  defaultValue={`${
                              this.props.User.userData.displayName
                            }`}
                            onChangeText={text =>
                              this.setState({
                                name: text
                              })
                            }/>
                            <Text style={{fontWeight:"normal",marginTop:5,color:'white',fontSize:15,paddingLeft:5,paddingBottom:5}}>Place Account Type :</Text>
                     <View style={{borderColor:'white',borderRadius:15,borderWidth:2 }}>
                        <Picker
                            selectedValue={this.state.UserType}
                            onValueChange={(itemValue, itemIndex) => {
                              this.setState({ UserType: itemValue })}}
                            
                          >
                            <Picker.Item label="Photographer" value="Photographer" />
                            <Picker.Item label="Client" value="Client" />
                          </Picker>
                    </View>
                <TextInput style={{color:'white',paddingLeft:15,marginTop:5,borderWidth:2,borderRadius:15,borderColor:'white'}} placeholder={'About yourself'} onChangeText={(text) => this.setState({aboutUser : text})}/>
               <TouchableOpacity style={{backgroundColor:'white',padding:12,justifyContent:'center',alignItems:'center',borderRadius:5,marginTop:5}} onPress={() => this.load()}>
               <Text style={{fontSize:15,color:'green',fontWeight:'bold'}}>Add Data</Text>
               </TouchableOpacity>
               
              </View>
               
               </ScrollView>
               </ImageBackground>
             
           
        )
    }
} 

     
 