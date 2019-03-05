import React, { Component } from "react";
import { 
  Container,
  Button,
  Content,
  Icon,
  Picker,
  Form,
  Text,
  View
} from "native-base";
import { inject } from "mobx-react";

import styles from "./styles";

@inject("User")
export default class UserType extends Component {

  constructor(props) {
    super(props);
    this.state = {
      accountType: "photographer"
    };
  }

  onValueChange(value) {
    this.setState({
      accountType: value
    });
  }

  render() {

    const { displayName } = this.props.navigation.state.params;

    return (
      <Container style={styles.container}>
        <Content contentContainerStyle={styles.contentContainer}>
          <Form>
            <Text style={styles.label}>{`Hello, ${displayName}`}</Text>
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
          <Button style={{marginTop: 64}} light full>
            <Text> Next </Text>
          </Button>
        </Content>
      </Container>
    );
  }

  onNext = () => {
    const { email, displayName, uid } = this.props.navigation.state.params;
    this.props.User.create({email, displayName, uid, accountType: this.state.accountType}).then(() =>{
      this.props.User.set({ uid, displayName, email, accountType: this.state.accountType });
      this.props.navigation.replace("Drawer");
    });
  }
}