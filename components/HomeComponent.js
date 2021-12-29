import React, { Component } from "react";
import { View, Text, Animated } from "react-native";
import { Card } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import Loading from "./Loading";

const mapStateToProps = (state) => {
  // state as props defines here. will be passed in connect later
  return {
    campsites: state.campsites,
    promotions: state.promotions,
    partners: state.partners,
  };
};

function RenderItem(props) {
  const { item } = props;

  if (props.isLoading) {
    console.log("Home is loading");
    return <Loading />;
  }
  if (props.errMess) {
    return (
      <View>
        <Text>{props.errMess}</Text>
      </View>
    );
  }
  if (item) {
    return (
      <Card featuredTitle={item.name} image={{ uri: baseUrl + item.image }}>
        <Text style={{ margin: 10 }}>{item.description}</Text>
      </Card>
    );
  }
  return <View />;
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scaleValue: new Animated.Value(0), //this state value controls scale of component
    };
  }

  animate() {
    Animated.timing(
      this.state.scaleValue, //name of value changing over time
      {
        toValue: 1, //100% of scale
        duration: 1500,
        useNativeDriver: true, //improves performance
      }
    ).start();
  }

  componentDidMount() {
    this.animate();
  }

  static navigationOptions = {
    title: "Home", //setup Home screen
  };

  render() {
    return (
      //scrollview to render lists or groups like flatlist. scrollview renders all at once. flatlist renders only those that will fit on screen.
      <Animated.ScrollView
        style={{ transform: [{ scale: this.state.scaleValue }] }}
      >
        <RenderItem
          item={
            this.props.campsites.campsites.filter(
              (campsite) => campsite.featured
            )[0]
          }
          isLoading={this.props.campsites.isLoading}
          errMess={this.props.campsites.errMess}
        />
        <RenderItem
          item={
            this.props.promotions.promotions.filter(
              (promotion) => promotion.featured
            )[0]
          }
          isLoading={this.props.promotions.isLoading}
          errMess={this.props.promotions.errMess}
        />
        <RenderItem
          item={
            this.props.partners.partners.filter(
              (partner) => partner.featured
            )[0]
          }
          isLoading={this.props.partners.isLoading}
          errMess={this.props.partners.errMess}
        />
      </Animated.ScrollView>
    );
  }
}

export default connect(mapStateToProps)(Home);
