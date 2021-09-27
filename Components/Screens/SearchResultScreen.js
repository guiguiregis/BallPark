import * as React from 'react';
import { View, Text, TextInput, FlatList, DatePickerIOSBase, TouchableOpacity, Modal, StyleSheet, Image } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-picker'
import { useState, useEffect } from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { useDispatch, useSelector } from 'react-redux'


function SearchResultScreen({navigation,...props}) {
    const terrain = props.route.params.results
    return (
        <View style={{ alignItems: "center" }}>
            <FlatList
                data={terrain}
                keyExtractor={(item) => item.id}
                renderItem ={({item}) =>(
                    <Terrain navigation={navigation} item={item} />
                )}
            />
        </View>
    );

}

Terrain = ({ navigation,item }) => {
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate("Terrain", {navigation,item})}
            style={{
            borderRadius: 6,
            backgroundColor: "#fff",
            marginHorizontal: 5,
            marginVertical: 5,
        }}>
            <View style={{

                marginVertical: 18
            }} >
                <Image
                    style={{
                        width: '100%',
                        aspectRatio: 6 / 3,
                        resizeMode: 'cover',
                    }}
                    source={{uri:item.pictures[0]}}
                />
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", margin: 5 }}>
                    <Icon name={item.sportType + "-outline"} size={40} color="#000" />
                    <Text>{item.name}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default SearchResultScreen;