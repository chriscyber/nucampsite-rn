import React, { Component } from "react";
import { FlatList } from "react-native";
import { Tile } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";

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
        <Tile
          title={item.name}
          caption={item.description}
          featured
          onPress={() => navigate("CampsiteInfo", { campsiteId: item.id })} //ListItem comes with built in onPress prop. When this component pressed, this function will fire.
          imageSrc={{ uri: baseUrl + item.image }}
        />
      );
    };

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
