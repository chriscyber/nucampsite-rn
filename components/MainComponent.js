import React, { Component } from 'react';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import { View } from 'react-native';
import { CAMPSITES } from '../shared/campsites';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            campsites: CAMPSITES,
            selectedCampsite: null //to keep track of which campsite has been selected, which one to tell CampsiteInfo Component to display
        };
    }

    onCampsiteSelect(campsiteId) {
        this.setState({selectedCampsite: campsiteId}); //state managed by React Native not redux yet
    }

    render() {
        return (
            <View style={{flex: 1}}> 
                <Directory 
                    campsites={this.state.campsites}
                    onPress={campsiteId => this.onCampsiteSelect(campsiteId)} //passing onCampsiteSelect method to Directory component to be called there.
                />
                <CampsiteInfo
                    campsite={this.state.campsites.filter(campsite => campsite.id === this.state.selectedCampsite)[0]}
                    //match selected campsite to list of campsites to render whole campsite object and props. Filter return an array, but we need the object so [0] grabs first item in array of objects. 
                />
            </View>
        );
    }
}

export default Main;