import * as React from 'react';
import { View, Text, TextInput, FlatList, DatePickerIOSBase, TouchableOpacity, Modal,StyleSheet,Image } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-picker'
import { useState, useEffect } from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { useDispatch, useSelector } from 'react-redux'


{/*<Text>cherche un sport</Text>
  <Text>quand</Text
  <Text>combien de temps</Text>*/}

const sportList = ["football", "tennisball", "basketball", "golf"]

SearchBar = ({ search, setSearch }) => {
  return (
    <View style={{flexDirection: "row", justifyContent: "center", paddingLeft: 20,paddingRight:20,flexGrow:0, }}>
      <TextInput style={{ backgroundColor: "#eee", width: "100%", height: 50, borderRadius: 50, fontWeight: "700", padding: 20, margin: 20 }}
        placeholder="un stade particulier"
        value={search}
        onChangeText={setSearch}
      />
    </View>
  )
}

SportPicker = ({ setSelectedSport }) => {

  return (
    <View style={{}}>
      <Text style={{ fontWeight: "bold", fontSize: 20, margin: 10 }}>Trouve ton sport</Text>
      <FlatList
        data={sportList}
        horizontal
        style={{ flexGrow: 0 }}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) =>
          <TouchableOpacity
            onPress={() => setSelectedSport(item)}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: "#eee",
              width: 80,
              height: 80,
              borderRadius: 10,
              margin: 5
            }}>
            <Icon name={item + "-outline"} size={55} color="#666" />
          </TouchableOpacity>
        }
      />
    </View>
  )
}

DatePicking = ({ setDate, date }) => {

  //console.log(date);
  return (
    <View style={{ flexDirection: "row", alignItems: "center", margin: 10 }}>
      <View><Text style={{ fontWeight: "bold", fontSize: 20, marginBottom: 10 }}>Quand ?</Text></View>
      <DatePicker locale="fr" mode="date" date={date} onDateChange={setDate} />
    </View>
  )
}

TimePicking = () => {
  const timeArray = [
    "8h-9h", "9h-10h", "10h-11h", "11h-12h", "12h-13h", "13h-14h", "14h-15h", "15h-16h", "16h-17h", "17h-18h", "19h-20h", "20h-21h"
  ]

  return (
    <View style={{flexDirection: "row", justifyContent: "center", paddingLeft: 20,paddingRight:20,flexGrow:0, }}>
      <FlatList
      data={timeArray}
      horizontal
      style={{ flexGrow: 0 }}
      keyExtractor={(item) => item.toString()}
      renderItem={({ item }) =>
        <View style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          backgroundColor: "#eee",
          width: 110,
          height: 50,
          borderRadius: 50,
          margin: 5,
          padding: 5,
        }}>
          <BouncyCheckbox />
          <Text style={{}}>{item}</Text>
        </View>
      }
    />
    </View>
  )
}

SearchResult = ({ setModalVisible, selectedSport, date, results,navigation }) => {
  return (
    <View style={{
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      width: "100%"
    }}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Results", {navigation,results})}
        style={{
          marginTop: 20,
          backgroundColor: 'black',
          alignItems: "center",
          justifyContent: "space-between",
          padding: 13,
          paddingStart: 20,
          paddingEnd: 20,
          borderRadius: 30,
          width: 300,
          position: "relative",
          flexDirection: "row"
        }}>
        <Text style={{ color: "white", fontSize: 20 }}>{results[0].name}</Text>
        <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>{results.length}</Text>
      </TouchableOpacity>
    </View>
  )
}

CheckSearchResultContainer = ({ setModalVisible,results }) => {
  return (
    <View style={{
      backgroundColor: "white",
      padding: 15,

    }}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", flexGrow: 1 }}>
        <Text style={{ textAlign: "center", fontWeight: "600" }}>{results.length}</Text>
        <TouchableOpacity onPress={() => setModalVisible(false)}>
          <Icon name={"close"} size={55} color="#666" />
        </TouchableOpacity>
      </View>
      <FlatList
          data={results}
          renderItem={({ item }) => (
            <TouchableOpacity >
              <View style={styles.innerContainer}>
              <View style={styles.innerContent}>
                <Text style={styles.subtitle}>{item.name}</Text>
                <Icon name={item.sportType+"-outline"} size={55} color="#FFF" />
              </View>
              
              <Image
                style={styles.image}
                source={require('../../Datas/images/hqdefault.jpg')}
              />
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          
      />
      <View style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: "100%"
        }}>
          <TouchableOpacity
            style={{
              backgroundColor: 'black',
              alignItems: "center",
              justifyContent: "space-between",
              padding: 13,
              paddingStart: 20,
              paddingEnd: 20,
              borderRadius: 30,
              width: 300,
              flexDirection: "row"
            }}>
            <Text style={{ color: "white", fontSize: 20 }}>Voir resultat</Text>
          </TouchableOpacity>
        </View>
    </View>
  )
}

CheckSearchResult = ({ setModalVisible,results }) => {
  return (
    <View style={{
      flex: 1,
      
      justifyContent: "flex-end"
    }}>
      <CheckSearchResultContainer setModalVisible={setModalVisible} results={results} />
    </View>
  )
}

function SearchScreen({ navigation }) {

  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedSport, setSelectedSport] = useState("")
  const [selectedStadium, setSelectedStadium] = useState("")
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(true)
  const [visibleRes, setVisibleRes] = useState(false)
  const [results, setResults] = useState([])

  const _terrain = useSelector((state) => state.terrainReducer.categories);

  useEffect(() => {
    if (selectedSport != "" && visibleRes===false) {
      _terrain.filter((itm) => {
        if (itm.sportType == selectedSport) {
          setResults(prev => [...prev, itm])
          //console.log(itm);
        }
      })
      console.log(results);
      setVisibleRes(true)
    }
  }, [selectedSport])


  return (
    <>
      <Modal animationType="slide"  visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <CheckSearchResult setModalVisible={setModalVisible} results={results} />
      </Modal>
      <View style={{ flex: 1, backgroundColor: "white"}}>
        <SearchBar  search={search} setSearch={setSearch} />
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontWeight: "bold", fontSize: 20, marginBottom: 10 }}>OU</Text>
        </View>
        <SportPicker setSelectedSport={setSelectedSport} />
        <DatePicking date={date} setDate={setDate} />
        <TimePicking />
        {visibleRes &&
          <>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center",marginHorizontal:18 }}>
              <SearchResult setModalVisible={setModalVisible} selectedSport={selectedSport} date={date} results={results} navigation={navigation} />
              <TouchableOpacity style={{ margin: 12 }}><Text>Effacer</Text></TouchableOpacity>
            </View>
          </>
        }
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer:{
    flex:1,
    justifyContent: 'center',
    overflow: 'hidden',
    alignItems: 'center',
    width:160,
    height:180,
    borderRadius:5, 
    margin: 8,
    backgroundColor:"#F5EAFF",
  },
  innerContent:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:3,
    width:160,
    height:180,
    backgroundColor:"#8C6BFF88",
  },
  veil:{
    flex:1,
    width:160,
    height:180,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:2,
    backgroundColor:"#F5EAFF",
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
    paddingTop:10,
    margin: 5
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingTop:10,
    margin: 2,
    color:"#fff"
  },
  subtitletime: {
    fontSize: 14,
    fontWeight: '300',
    margin: 2,
    color:"#fff"
  },
  image:{
    flex:1,
    position:'absolute',
    width:250,
    height:330,
    resizeMode:'cover',
    borderRadius:5, 
    margin: 5,
    zIndex:1,
  }
});

export default SearchScreen;