import React, { Component } from "react";
import * as Animatable from "react-native-animatable";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Picker,
  Switch,
  Button,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker"; //scoped package syntax
import * as Notifications from "expo-notifications";

//controlled form - state maintained in component

class Reservation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      campers: 1,
      hikeIn: false,
      date: new Date(),
      showCalendar: false,
    };
  }

  static navigationOptions = {
    title: "Reserve Campsite",
  };

  handleReservation() {
    console.log(JSON.stringify(this.state));
    Alert.alert(
      `Begin Search? `,
      `Number of Campers: ${this.state.campers}\n\nHike-In? ${
        this.state.hikeIn
      }\n\nDate: ${this.state.date.toLocaleDateString("en-US")}`,
      [
        {
          text: "Cancel",
          onPress: () => this.resetForm(),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            this.presentLocalNotification(
              this.state.date.toLocaleDateString("en-US")
            );
            this.resetForm();
          },
        },
      ]
    );
  }

  resetForm() {
    this.setState({
      campers: 1,
      hikeIn: false,
      date: new Date(),
      showCalendar: false,
    });
  }

  async presentLocalNotification(date) {
    // async await ES8. async always returns a promise
    function sendNotification() {
      //inner function to call when ready
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
        }),
      });

      Notifications.scheduleNotificationAsync({
        content: {
          title: "Your Campsite Reservation Search",
          body: `Search for ${date} requested`,
        },
        trigger: null, //fire notification to trigger immediately
      });
    }

    let permissions = await Notifications.getPermissionsAsync(); // await can only by used inside async function. similar to then method. result of await function gets assigned to permissions variable.
    if (!permissions.granted) {
      //check if already have permissions to use notifications from OS
      permissions = await Notifications.requestPermissionsAsync();
    }
    if (permissions.granted) {
      sendNotification();
    }
  }

  render() {
    return (
      <ScrollView>
        <Animatable.View animation="zoomIn" duration={2000} delay={1000}>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Number of Campers</Text>
            <Picker
              style={styles.formItem}
              selectedValue={this.state.campers} //built in prop
              onValueChange={(itemValue) =>
                this.setState({ campers: itemValue })
              } //built in prop
              prompt="How many campers are in your party?"
            >
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />
              <Picker.Item label="5" value="5" />
              <Picker.Item label="6" value="6" />
            </Picker>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Hike-In?</Text>
            <Switch
              style={styles.formItem}
              value={this.state.hikeIn}
              trackColor={{ true: "#5637DD", false: null }}
              onValueChange={(value) => this.setState({ hikeIn: value })}
              thumbColor="darkgrey"
            />
          </View>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Date</Text>
            <Button
              onPress={() =>
                this.setState({ showCalendar: !this.state.showCalendar })
              }
              title={this.state.date.toLocaleDateString("en-US")}
              color="#5637DD"
              accessibilityLabel="Tap me to select a reservation date"
            />
          </View>
          {this.state.showCalendar && (
            <DateTimePicker
              value={this.state.date}
              mode={"date"}
              display="default"
              onChange={(event, selectedDate) => {
                selectedDate &&
                  this.setState({ date: selectedDate, showCalendar: false });
              }}
              style={styles.formItem}
            />
          )}
          <View style={styles.formRow}>
            <Button
              onPress={() => this.handleReservation()}
              title="Search Availability"
              color="#5637DD"
              accessibilityLabel="Tap me to search for available campsites to reserve"
            />
          </View>
        </Animatable.View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  formRow: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    margin: 15,
  },
  formLabel: {
    fontSize: 18,
    flex: 2,
  },
  formItem: {
    flex: 1,
  },
});

export default Reservation;
