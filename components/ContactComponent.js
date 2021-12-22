import React, { Component } from 'react';
import { Text } from 'react-native';
import { Card, } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

class Contact extends Component {

    static navigationOptions = { //static is keyword that sets method on class as opposed to object from class.
        title: 'Contact Us' // tells navigator the title of nav option
    }

    render() {

        return (
            <ScrollView>
                <Card wrapperStyle={{margin: 20}}
                    title="Contact Information">
                    <Text style={{marginBottom: 10}}>
                            1 Nucamp Way{"\n"}
                            Seattle, WA 98001{"\n"}
                            U.S.A.
                    </Text>
                    <Text>
                        Phone: 1-206-555-1234
                    </Text>
                    <Text >
                        Email: campsites@nucamp.co
                    </Text>
                </Card>
            </ScrollView>
        );
    }
}

export default Contact;