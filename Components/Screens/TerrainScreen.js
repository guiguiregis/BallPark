import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image, ScrollView, TouchableOpacity, FlatList, CheckBox } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SliderBox } from "react-native-image-slider-box";
import { Calendar, CalendarList } from 'react-native-calendars';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import ReservationCart from './ReservationCart';
import { useDispatch, useSelector } from 'react-redux'
import DatePicker from 'react-native-date-picker'


function TimeFrame({ ter, timeArray, reserved, setReserved }) {
  const dispatch = useDispatch();

  const selectItem = (item, checkBoxValue) => dispatch({
    type: "ADD_TO_CART", payload: { item, reservationName: ter.name, checkBoxValue: checkBoxValue, priceTag: ter.priceTag }
  })

  const removeItem = (item, checkBoxValue) => dispatch({
    type: "REMOVE_FROM_CART", payload: { item, reservationName: ter.name, checkBoxValue: checkBoxValue, priceTag: ter.priceTag }
  })

  const cartItems = useSelector((state) => state.cartReducer.selectedItems.items);



  function findLinkByName(time) {
    for (const item of ter.scheduled) {
      if (item.time === time) {
        return true;
      }
    }
  }

  const isItemInCartSameName = (item, cartItems) => (
    Boolean(cartItems.find((elem) => elem.item === item && elem.reservationName === ter.name))
  )

  const ScheduleOrganiser = (props) => {
    return (
      <View style={{
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: props.buttonColor,
        width: 110,
        height: 40,
        borderRadius: 20,
        margin: 5,
        //borderWidth:2,
        //borderColor: "pink"
      }}>
        <BouncyCheckbox
          isChecked={isItemInCartSameName(props.time, cartItems)}
          onPress={(checkBoxValue) => { checkBoxValue ? selectItem(props.time, checkBoxValue) : removeItem(props.time, checkBoxValue) }} />
        <Text style={{ color: props.textColor }}>{props.time}</Text>
      </View>
    )
  }

  return (
    <FlatList
      contentContainerStyle={styles.grid}
      numColumns={3}
      style={{flexGrow:0}}
      data={timeArray}
      keyExtractor={(item) => item.toString()}
      renderItem={({ item }) => (
        findLinkByName(item) ?
          <View style={{
            flexDirection: "row",
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: "#F5d5ff",
            width: 110,
            height: 40,
            borderRadius: 20,
            margin: 5,
            //borderWidth:2,
            //borderColor: "pink"
          }}></View>
          :
          <ScheduleOrganiser time={item} buttonColorInactive="#f4ffea" textColorInactive="gray" buttonColor="#F5EAFF" textColor="black" inactive={false} reserved={reserved} setReserved={setReserved} id={(item) => item.toString()} />
      )}

    />
  )
}

function TerrainScreen(props) {


  const terrain = props.route.params.item
  const [ter, setTerrain] = useState(terrain);
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)

  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();

  const timeArray = [
    "8h-9h", "9h-10h", "10h-11h", "11h-12h", "12h-13h", "13h-14h", "14h-15h", "15h-16h", "16h-17h", "17h-18h", "19h-20h", "20h-21h"
  ]

  const dispatch = useDispatch();

  const selectItem = (item, checkBoxValue) => dispatch({
    type: "ADD_TO_CART", payload: { item, reservationName: ter.name, checkBoxValue: checkBoxValue, priceTag: ter.priceTag }
  })

  const removeItem = (item, checkBoxValue) => dispatch({
    type: "REMOVE_FROM_CART", payload: { item, reservationName: ter.name, checkBoxValue: checkBoxValue, priceTag: ter.priceTag }
  })

  const cartItems = useSelector((state) => state.cartReducer.selectedItems.items);

  const isItemInCart = (item, cartItems) => (
    Boolean(cartItems.find((elem) => elem.item === item))
  )

  const scheduleArray = [];

  const [schedule, setSchedule] = useState(scheduleArray);
  const [reserved, setReserved] = useState(false);

  const price = ter.priceTag.toLocaleString("fr",{
    style:"currency",
    currency:"XOF"
})


  return (
    <View style={styles.container}>
      <View>
      <Image
        style={styles.moviePoster}
        source={{ uri: ter.pictures[0] }}
      />
      <View style={{position:"absolute",bottom:0}}>
        <Text style={{fontWeight:"bold",fontSize:20,color:"white",margin:20}}>{ter.name}</Text>
      </View>
      </View>
      <View style={styles.taskBar} >
        <View style={styles.leftTaskbar}>
          <Icon name={ter.sportType + "-outline"} size={45} color="#000" />
          <View>
            <Text style={{fontWeight:"bold",fontSize:15}}>{price}</Text>
            <Text style={{fontWeight:"100",fontSize:12}}>/heure</Text>
          </View>
        </View>
        
        <View style={styles.innerTaskBar} >
        <TouchableOpacity style={styles.searchButton} onPress={() => setDate(new Date())}>
          <Icon name="today" size={55} color="#eef" />
        </TouchableOpacity>
          <View style={styles.dateContainer}>
            <Text>{day}</Text>
          </View>
          <View style={styles.dateContainer}>
            <Text>{month}</Text>
          </View>
          <View style={styles.dateContainer1}>
            <Text>{year}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.searchButton} onPress={() => setOpen(true)}>
          <Icon name="calendar" size={55} color="#ddd" />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, alignContent: "space-between", alignItems: "center", justifyContent: "center" }}>
      <DatePicker
        modal
        locale="fr" 
        mode="date" 
        date={date}
        open={open}
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
        }}
        onCancel={() => {
          setOpen(false)
        }} />
      <TimeFrame ter={ter} timeArray={timeArray} reserved={reserved} setReserved={setReserved}/>
      </View>

      <ReservationCart navigation={props.navigation} />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: "#FFF",
  },
  grid: {
    marginBottom: 32,
    marginTop: 16,
    alignItems: "center",
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    overflow: 'hidden',
    alignItems: 'center',

    borderRadius: 5,
    margin: 8,
    backgroundColor: "#F5EAFF",
  },
  taskBar: {
    //backgroundColor:"#EDDEF4",
    flexDirection: "row",
    flexWrap: 'wrap',
    justifyContent: "space-between",
    height: 60,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
    flexShrink: 4,
  },
  leftTaskbar: {
    alignItems: 'center',
    flexDirection: "row",
  },
  innerTaskBar: {
    flexDirection: "row",
    alignItems: 'center',
  },
  timePickerContainer: {
    flex: 1,
    alignItems: "center",
  },
  innerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
    width: 160,
    height: 180,
    backgroundColor: "#8C6BFF88",
  },
  dateContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#F5EAFF",
    width: 35,
    height: 50,
    borderRadius: 5,
    margin: 5
  },
  dateContainer1: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#F5EAFF",
    width: 45,
    height: 50,
    borderRadius: 5,
    margin: 5
  },
  veil: {
    flex: 1,
    width: 160,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    backgroundColor: "#F5EAFF",
  },
  top: {
    flex: 0.3,
    backgroundColor: "grey",
    borderWidth: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  middle: {
    flex: 0.3,
    backgroundColor: "beige",
    borderWidth: 5,
  },
  bottom: {
    flex: 0.3,
    backgroundColor: "pink",
    borderWidth: 5,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: 10,
    margin: 5
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingTop: 10,
    margin: 2,
    color: "#fff"
  },
  subtitletime: {
    fontSize: 14,
    fontWeight: '300',
    margin: 2,
    color: "#fff"
  },
  image: {
    flex: 1,
    position: 'absolute',
    width: 250,
    height: 330,
    resizeMode: 'cover',
    borderRadius: 5,
    margin: 5,
    zIndex: 1,
  },
  moviePoster: {
    width: '100%',
    aspectRatio: 3 / 2,
    resizeMode: 'cover',
  },
  imageTop: {
    width: '100%',
    aspectRatio: 5 / 3,
    resizeMode: 'stretch',
  }
});

export default TerrainScreen;