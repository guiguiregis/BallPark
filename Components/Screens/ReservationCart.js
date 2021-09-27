import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { useLinkProps, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';



export default function ReservationCart() {

    const items = useSelector((state) => state.cartReducer.selectedItems.items);

    const total = items.map((item) => Number(item.priceTag)).reduce((prev,curr) => prev+curr,0);

    const totalCurrency = total.toLocaleString("fr",{
        style:"currency",
        currency:"XOF"
    }
    )

    return (
        <>
        {
            total ? 
            <View style={{
                flex:1,
                alignItems:"center",
                flexDirection:"row",
                position:"absolute",
                bottom:20,
                zIndex:999
            }}>
                <View style={{
                flexDirection:"row",
                justifyContent:"center",
                width:"100%"
                }}>
                <TouchableOpacity style={{
                    marginTop:20,
                    backgroundColor:'black',
                    alignItems:"center",
                    justifyContent:"space-between",
                    padding:13,
                    paddingStart:20,
                    paddingEnd:20,
                    borderRadius:30,
                    width:300,
                    position:"relative",
                    flexDirection:"row"
                }}>
                    <Text style={{ color: "white", fontSize: 20 }}>
                        Total
                    </Text>
                    <Text style={{ color: "white", fontSize: 20,fontWeight:"bold" }}>
                        {totalCurrency}
                    </Text>
                </TouchableOpacity>
            </View>
            </View>
            :
            <></>
        }
        </>
    );
}