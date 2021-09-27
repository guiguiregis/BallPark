import * as React from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import ReservationListing from '../ReservationListing';
import Categories from '../../Datas/Categories';
import { useDispatch, useSelector } from 'react-redux'
import ReservationCart from './ReservationCart';

const dt = Categories

function ReservationScreen(props) {

  const cartItems = useSelector((state) => state.cartReducer.selectedItems.items);

  return (
    cartItems.length !== 0 ?
      <View style={{ flex: 1 }}>
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item }) =>
            <View style={{ padding: 10, backgroundColor: "white", marginBottom: 10 }}>

              <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <View style={{flexDirection: "row",alignItems: "center"}}>
                  <Text style={{ fontWeight: "600", fontSize: 20, opacity: 0.7, padding: 10, paddingLeft: 20 }}>
                    {item.reservationName}
                  </Text>
                  <TouchableOpacity style={{}} onPress={() => alert('This is a button!')}>
                    <Icon name="chevron-forward" size={20} color="#000" />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity style={{}} onPress={() => alert('This is a button!')}>
                  <Icon name="close" size={30} color="#000" />
                </TouchableOpacity>

              </View>


              <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <View style={{
                  flexDirection: "row",
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: "gray",
                  width: 110,
                  height: 40,
                  borderRadius: 20,
                  margin: 5,
                }}>
                  <Text style={{ fontWeight: "600", fontSize: 16, opacity: 0.7 }}>
                    {item.item}
                  </Text>
                </View>

                <Text style={{ fontSize: 13, opacity: 0.7 }}>
                  {item.priceTag.toLocaleString("fr", {
                    style: "currency",
                    currency: "XOF"
                  })}
                </Text>
              </View>

            </View>
          }

        />
        <View>
          <ReservationCart navigation={props.navigation} />
        </View>
      </View>
      :
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Icon name="receipt-outline" size={100} color="#003456" />
        <Text>Aucune reservation</Text>
      </View>
  );
}

export default ReservationScreen;