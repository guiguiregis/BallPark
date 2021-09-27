import * as React from 'react';
import { View, Text,Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';


function MessagesScreen() {

    const navigation = useNavigation();

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>my messaging</Text>
      </View>
    );
  }

export default MessagesScreen;