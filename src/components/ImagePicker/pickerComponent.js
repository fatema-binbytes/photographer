import React,{Component} from 'react'
import {View,Text,Image,TouchableOpacity}from 'react-native'
import {Icon,Thumbnail} from 'native-base'
import ImagePicker from 'react-native-image-picker'

export default class ImagePickerComponent extends Component{
    constructor(){
        super()
            this.state={
                
               isUploadImage :0,
               ImageSource: []
              
            
        }
    }
    imageUpload(id){
      var options = {
        title: `Select Image`,
        mediaType: 'photo',
        takePhotoButtonTitle: `Take Photo`
      }
  
          ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
          
            if (response.didCancel) {
             this.setState({isUploadImage:0})
            } else if (response.error) {
              this.setState({isUploadImage:0})
            } else if (response.customButton) {
              this.setState({isUploadImage:0})
            } else {
              const source = response.path 
    
             this.setState({
              ImageSource:source,
               isUploadImage:1
              })
              this.props.onFilePick(id,response.path, response.fileName ,response.type)
            }
          })
        }  
    render(){
        return(
            <View>
                {this.state.isUploadImage == 1 ?  <View style={{backgroundColor:'#01cca1'}}>
           <TouchableOpacity style={{alignSelf: "center",backgroundColor:'#01cca1'}} onPress={()=>this.imageUpload(this.props.id)}>
           
              <Thumbnail
                source={{uri:'file:///'+this.state.ImageSource}}
                style={{width: 80,
                  height: 80,
                  borderRadius: 40,
                  backgroundColor:'#01cca1'}}
              />
         
            </TouchableOpacity>
            </View>
           :
           <TouchableOpacity style={{alignSelf: "center",backgroundColor:'#01cca1'}} onPress={()=>this.imageUpload(this.props.id)}>
           
           <Thumbnail
             source={{uri:'file:///'+this.props.userThumbnail}}
             style={{width: 80,
               height: 80,
               borderRadius: 40,
               backgroundColor:'#01cca1'}}
           />
            <Text style={{textAlign:'center',fontWeight:'bold',color:'black'}}>Profile Pic</Text>
         </TouchableOpacity>
               }
            </View>
            
        )
    }
}