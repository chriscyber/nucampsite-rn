import React, { Component } from "react";
import { FlatList, View, Text } from "react-native";
import { Tile } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import Loading from "./Loading";
import * as Animatable from "react-native-animatable";

const mapStateToProps = (state) => {
  // state as props defines here. will be passed in connect later
  return {
    campsites: state.campsites,
  };
};

class Directory extends Component {
  static navigationOptions = {
    //static is keyword that sets method on class as opposed to object from class.
    title: "Directory", // tells navigator the title of nav option
  };

  render() {
    const { navigate } = this.props.navigation; //destructuring
    const renderDirectoryItem = ({ item }) => {
      return (
        <Animatable.View animation="fadeInRightBig" duration={2000}>
          <Tile
            title={item.name}
            caption={item.description}
            featured
            onPress={() => navigate("CampsiteInfo", { campsiteId: item.id })} //ListItem comes with built in onPress prop. When this component pressed, this function will fire.
            imageSrc={{ uri: baseUrl + item.image }}
          />
        </Animatable.View>
      );
    };

    if (this.props.campsites.isLoading) {
      return <Loading />;
    }
    if (this.props.campsites.errMess) {
      return (
        <View>
          <Text>{this.props.campsites.errMess}</Text>
        </View>
      );
    }
    return (
      <FlatList
        data={this.props.campsites.campsites}
        renderItem={renderDirectoryItem}
        keyExtractor={(item) => item.id.toString()}
      />
    );
  }
}

export default connect(mapStateToProps)(Directory);
