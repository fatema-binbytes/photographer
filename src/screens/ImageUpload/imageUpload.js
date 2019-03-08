import React, { Component } from "react";
import { ScrollView ,Image,ToastAndroid} from "react-native";
import { 
  Left,
  Right,
  Body,
  Header,
  Icon,
  Container,
  Button,
  Content,
  Text,
  View
} from "native-base";
import { inject ,observer} from "mobx-react";
import { NavigationActions } from "react-navigation";

import PickImage from "./PickImage"
import styles from "./styles";


@inject("User")
@observer
export default class ImageUpload extends Component{
  constructor() {
    super();
    this.state = {
      images: [],
      data : []
    }
  }
   async componentDidMount(){
     let data={
      uid :  this.props.User.uid,
      displayName : this.props.User.displayName,
      email : this.props.User.email,
      accountType :  this.props.User.accountType,
      about :  this.props.User.about
     } 
    this.setState({data : data})
     const user = await this.props.User.getById(this.props.User.uid);
            if(user) {
              this.setState({ images: user.images });
            }
            console.log(this.state.images,"IMAGES")
      }
   
  render() {
      return (
        <Container style={styles.container}>
          <ScrollView>
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
            <Content contentContainerStyle={styles.contentContainer}>
              <Text style={{fontSize: 26, fontWeight: "bold", alignSelf: "center", marginBottom: 16}}>Add Portfolio</Text>
              <View style={{flexGrow: 1, flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between"}}>
                {
                  Array.apply(0, Array(6)).map((x, i) => {
                    const uri = this.state.images[i] ? this.state.images[i].downloadURL : null
                    
                    return <PickImage uri={uri} onFilePick={(path, filename) => this.state.images[i] = {downloadURL: path,name: filename }} key={i} />
                  })
                }
              </View>
              <Button onPress={this.onNext} style={{marginTop: 16}} light full>
                <Text> Done </Text>
              </Button>
            </Content>
            </ScrollView>
        </Container>
      );
    }
  
    onNext = () => {
      console.log(this.state.data,this.state.images)
      this.props.User.createOrUpdate(this.state.data, this.state.images, () => {
       this.props.navigation.navigate("Explore");
      })
      ToastAndroid.show(
        "Image Uploded",
         ToastAndroid.LONG )
    }
  }