import React, { Component } from "react";
import { Text } from "react-native";
import { Card, Button, Icon } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import * as Animatable from "react-native-animatable";
import * as MailComposer from "expo-mail-composer";

class Contact extends Component {
  static navigationOptions = {
    //static is keyword that sets method on class as opposed to object from class.
    title: "Contact Us", // tells navigator the title of nav option
  };

  sendMail() {
    MailComposer.composeAsync({
      recipients: ["campsites@nucamp.co"],
      subject: "Inquiry",
      body: "To Whom It May Concern: ",
    });
  }

  render() {
    return (
      <ScrollView>
        <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
          <Card wrapperStyle={{ margin: 20 }} title="Contact Information">
            <Text style={{ marginBottom: 10 }}>
              1 Nucamp Way{"\n"}
              Seattle, WA 98001{"\n"}
              U.S.A.
            </Text>
            <Text>Phone: 1-206-555-1234</Text>
            <Text>Email: campsites@nucamp.co</Text>
            <Button // React Native Element (RNE) button
              title="Send Email"
              buttonStyle={{ backgroundColor: "#5637DD", margin: 40 }}
              icon={
                <Icon
                  name="envelope-o"
                  type="font-awesome"
                  color="#fff"
                  iconStyle={{ marginRight: 10 }}
                />
              }
              onPress={() => this.sendMail()}
            />
          </Card>
        </Animatable.View>
      </ScrollView>
    );
  }
}

export default Contact;
