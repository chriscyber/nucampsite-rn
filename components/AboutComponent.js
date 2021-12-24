import React, { Component } from "react";
import { Text } from "react-native";
import { ListItem, Card } from "react-native-elements";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";

const mapStateToProps = (state) => {
  // state as props defines here. will be passed in connect later
  return {
    partners: state.partners,
  };
};

function Mission() {
  return (
    <Card title="Our Mission">
      <Text style={{ margin: 10 }}>
        We present a curated database of the best campsites in the vast woods
        and backcountry of the World Wide Web Wilderness. We increase access to
        adventure for the public while promoting safe and respectful use of
        resources. The expert wilderness trekkers on our staff personally verify
        each campsite to make sure that they are up to our standards. We also
        present a platform for campers to share reviews on campsites they have
        visited with each other.
      </Text>
    </Card>
  );
}

class About extends Component {
  static navigationOptions = {
    //static is keyword that sets method on class as opposed to object from class.
    title: "About Us", // tells navigator the title of nav option
  };

  render() {
    const renderPartner = ({ item }) => {
      return (
        <ListItem
          title={item.name}
          subtitle={item.description}
          leftAvatar={{ source: { uri: baseUrl + item.image } }}
        />
      );
    };

    return (
      <ScrollView>
        <Mission />
        <Card title="Community Partners">
          <FlatList
            data={this.props.partners.partners}
            renderItem={renderPartner}
            keyExtractor={(item) => item.id.toString()}
          />
        </Card>
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps)(About); //About component can now receive partners props from store
