import React, { Component } from "react";
import {ScrollView,Image,ToastAndroid} from 'react-native'
import { 
  Container,
  Button,
  Content,
  Icon,
  Picker,
  Form,
  Text,
  View,
  Header,
  Left,
  Right,
  Body,
  Thumbnail
} from "native-base";
import { inject, observer } from "mobx-react";
import firebase from "react-native-firebase";
import ImagePicker from "react-native-image-picker";


import Input from "../../components/Input";
import styles from "./styles";
import ImagePickerComponent from '../../components/ImagePicker/pickerComponent'
const headerLogo = require("../../../assets/header-logo.png");
@inject("User")
@observer
export default class EditProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
     
      displayName: '',
      email: '',
      about: "",
      accountType: "photographer",
      images:[],
      userThumbnail:""
    };
  }

  async componentDidMount() {
    const user = await this.props.User.getById(this.props.User.uid);
    if(user) {
      this.setState({
        uid:user.uid,
        displayName: user.displayName,
        email: user.email,
        about: user.about,
        accountType: user.accountType,
        images:user.images,
        userThumbnail : user.userThumbnail
      });
    }
    
  }

  onValueChange(value) {
    this.setState({
      accountType: value
    });
  }
 
  async updateProfile(){
    const userData = this.props.User
     const defaultDoc ={
      email:userData.email,
      displayName:this.state.displayName,
      about:this.state.about,
      accountType:this.state.accountType,
      images:this.state.images,
       userThumbnail:this.state.userThumbnail
      }

    
        const data = firebase.firestore().collection('Users')
        await data.doc(userData.uid).set(defaultDoc)
     
     ToastAndroid.show( "Profile Updeted",ToastAndroid.LONG )
      this.props.navigation.navigate("Explore")
    }
    userImage(path, filename, mediaType){
      this.setState({userThumbnail:path.filename})
      //this.props.User.userThumbnail = path.filename
      let promises = []
        promises.push(
          new Promise((resolve, reject) => {
           firebase
              .storage()
              .ref('/UserProfilePic/' + this.props.User.displayName)
              .putFile(path.filename)
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
      return promises
    }

  render() {

    return (
      <Container style={styles.container}>
      <ScrollView>
      <Header hasTabs>
        <Left>
          <Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
            <Icon active name="menu" />
          </Button>
        </Left>
        <Body>
          <Image source={headerLogo} style={{ height: 25,width: 95,resizeMode: "contain"}} />
        </Body>
        <Right />
      </Header>
        <Content contentContainerStyle={styles.contentContainer}>
          <Form>
            <ImagePickerComponent  id={this.props.User.uid} userThumbnail={this.state.userThumbnail} onFilePick={(path, filename, mediaType) =>
                this.userImage({ path, filename, mediaType })
              }/>
            <Input label={"Name"} value={this.state.displayName} onChangeText={text => this.setState({displayName: text})} />
            <Input label={"Email"} keyboardType={"email-address"} value={this.props.User.email} editable={false} />
            <Input label={"About"} numberOfLines={4} value={this.state.about} onChangeText={text => this.setState({about: text})} />
            <Text style={styles.subLabel}>Please Account Type : </Text>
            <View style={styles.pickerContainer}>
              <Picker
                mode="dropdown"
                iosIcon={() => <Icon name="arrow-down" />}
                headerStyle={{ backgroundColor: "#b95dd3" }}
                headerBackButtonTextStyle={{ color: "#fff" }}
                headerTitleStyle={{ color: "#fff" }}
                selectedValue={this.state.accountType}
                onValueChange={this.onValueChange.bind(this)}
              >
                <Picker.Item label="Photographer" value="photographer" />
                <Picker.Item label="Client" value="client" />
              </Picker>
            </View>
          </Form>
          <Button onPress={() => this.updateProfile()} style={{marginTop: 64}} light full>
            <Text> EDIT </Text>
          </Button>
        </Content>
        </ScrollView>
      </Container>
    );
  }

  
}