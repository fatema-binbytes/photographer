// @flow
import React, {Component} from "react";
import {ImageBackground, TouchableOpacity} from "react-native";

import {NavigationActions} from "react-navigation";
import {
  Container,
  Content,
  Text,
  Icon,
  ListItem,
  Thumbnail,
  View
} from "native-base";
import{inject,observer}from 'mobx-react'
import {Grid, Col} from "react-native-easy-grid";
import {removeKey} from '../../utils/db'

import styles from "./style";

@inject("User")
@observer
class SideBar extends Component {
  logout(){
    
    removeKey
    this.props.User.id = null
    console.log(removeKey)
    this.props.navigation.replace("Login")
  }
  render() {
    const navigation = this.props.navigation;
    return (
      <Container>
        <ImageBackground
          source={require("../../../assets/sidebar-transparent.png")}
          style={styles.background}
        >
          <Content style={styles.drawerContent}>
          <ListItem
              button
              onPress={() => {
                navigation.navigate("Explore");
              }}
              iconLeft
              style={styles.links}
            >
              <Icon name="ios-person-outline" />
              <Text style={styles.linkText}> EXPLORE</Text>
            </ListItem>
            <ListItem
              button
              onPress={() => {
                navigation.navigate("ProfileTabs");
              }}
              iconLeft
              style={styles.links}
            >
              <Icon name="ios-person-outline" />
              <Text style={styles.linkText}> PROFILE</Text>
            </ListItem>
            <ListItem
              button
              onPress={() => {
                navigation.navigate("Settings");
              }}
              iconLeft
              style={styles.links}
            >
              <Icon name="ios-settings-outline" />
              <Text style={styles.linkText}>SETTINGS</Text>
            </ListItem>
            
          </Content>
          <View style={styles.logoutContainer}>
            <View style={styles.logoutbtn} foregroundColor={"white"}>
              <Grid>
                <Col>
                  <TouchableOpacity
                    onPress={() => this.logout()}
                    style={{
                      alignSelf: "flex-start",
                      backgroundColor: "transparent"
                    }}
                  >
                    <Text style={{fontWeight: "bold", color: "#fff"}}>
                     LogOut
                    </Text>
                    <Text note style={{color: "#fff"}}>
                    {this.props.User.userName}
                    </Text>
                  </TouchableOpacity>
                </Col>
                <Col>
                  <TouchableOpacity
                    style={{alignSelf: "flex-end"}}
                    onPress={() => {
                      navigation.navigate("Profile");
                    }}
                  >
                    <Thumbnail
                      source={require("../../../assets/Contacts/user.png")}
                      style={styles.profilePic}
                    />
                  </TouchableOpacity>
                </Col>
              </Grid>
            </View>
          </View>
        </ImageBackground>
      </Container>
    );
  }
}

export default SideBar;
