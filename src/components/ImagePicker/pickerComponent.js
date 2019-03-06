import React,{Component} from 'react'
import {View,Text,Image,TouchableOpacity}from 'react-native'
import {Icon} from 'native-base'
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
        const options = {
            title: 'Select Photo',
            customButtons: [{ name: 'Gellary', title: 'Choose Photo from Gellary' }],
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
          };
        
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
                console.log(this.state.ImageSource)
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
                {this.state.isUploadImage == 1 ?  <View style={{backgroundColor:'white'}}>
           <TouchableOpacity onPress={()=>this.imageUpload(this.props.id)}>
            <Image style={{borderColor:4,borderColor:'red',margin:4}} source={{uri:"file:///" + this.state.ImageSource}} height={130} width={150}/>
            </TouchableOpacity>
            </View>
           :
                 <TouchableOpacity style={{margin:4,height:130,width:150,alignItems:'center',justifyContent:'center',backgroundColor:'grey'}}
                 onPress={()=> this.imageUpload(this.props.id)}>
                 <Icon name="md-person-add"  />
                 </TouchableOpacity>
               }
            </View>
            
        )
    }
}