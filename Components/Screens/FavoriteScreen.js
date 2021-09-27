import * as React from 'react';
import { View, Text,Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';


function FavoriteScreen() {

    const navigation = useNavigation();

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>my selections</Text>
      </View>
    );
  }

export default FavoriteScreen;