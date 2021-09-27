import * as React from 'react';
import { View, Text,Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';


function ProfileScreen() {

    const navigation = useNavigation();

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>my profile photo</Text>
        <Text>name, adresse, email, paymennt info,settings</Text>
        <Text>my schedules</Text>
        <Text>cancel my schedules</Text>
      </View>
    );
  }

export default ProfileScreen;