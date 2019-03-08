import React, { Component } from "react";
import { 
  Container,
  Button,
  Content,
  Icon,
  Picker,
  Form,
  Text,
  View,
  Thumbnail
} from "native-base";
import { inject } from "mobx-react";
import firebase from 'react-native-firebase'

import Input from "../../components/Input";
import styles from "./styles";
import ImagePickerComponent from '../../components/ImagePicker/pickerComponent'

@inject("User")
export default class EditProfile extends Component {

  constructor(props) {
    super(props);

    const { displayName, email, uid } = this.props.navigation.state.params;
    
    this.state = {
      uid: uid,
      displayName: displayName,
      email: email,
      about: "",
      accountType: "photographer",
      userThumbnail : ''
    };
  }

  async componentDidMount() {
    const user = await this.props.User.getById(this.state.uid);
    if(user) {
      this.setState({
        displayName: user.displayName,
        email: user.email,
        about: user.about,
        accountType: user.accountType,
       
      });
    }
  }
  async userImage(path, filename, mediaType){
    this.setState({userThumbnail : path.filename})
      console.log(path.filename,"path",filename,"filename",mediaType,"mideatype")
      let promises = []
        promises.push(
          new Promise((resolve, reject) => {
            firebase
              .storage()
              .ref('/UserProfilePic/' + this.state.displayName)
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
  onValueChange(value) {
    this.setState({
      accountType: value
    });
  }

  render() {

    const { displayName, email, about } = this.state;

    return (
      <Container style={styles.container}>
        <Content contentContainerStyle={styles.contentContainer}>
          <Form>
          <ImagePickerComponent  id={this.props.User.uid}  onFilePick={(path, filename, mediaType) =>
                this.userImage({ path, filename, mediaType })
              }/>
            <Input label={"Name"} value={displayName} onChangeText={text => this.setState({displayName: text})} />
            <Input label={"Email"} keyboardType={"email-address"} value={email} editable={false} />
            <Input label={"About"} numberOfLines={4} value={about} onChangeText={text => this.setState({about: text})} />
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
          <Button onPress={this.onNext} style={{marginTop: 64}} light full>
            <Text> Next </Text>
          </Button>
        </Content>
      </Container>
    );
  }

  onNext = () => {
    this.props.navigation.navigate("ImageUpload", { ...this.state });
  }
}