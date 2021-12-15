import React from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';

function RenderCampsite({campsite}) { //destructured campsite prop from campsite object
    if (campsite) {
        return (
            <Card 
                featuredTitle={campsite.name}
                image={require('./images/react-lake.jpg')}
            >
                <Text style={{margin: 10}}> {/*style similar to CSS but is JS */}
                    {campsite.description}
                </Text>
            </Card>
        );
    }
    return <View />; //we have to return something, so if card invalid, return empty view.
}

function CampsiteInfo(props) {
    return <RenderCampsite campsite={props.campsite} />; //campsite object to RenderCampsite component
}

export default CampsiteInfo;