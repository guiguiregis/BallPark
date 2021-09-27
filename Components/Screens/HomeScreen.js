import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity,Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Categories from '../../Datas/Categories';
import Terrains from '../../Datas/Terrains'
import TerrainListing from '../TerrainListing';
import {useDispatch, useSelector} from 'react-redux'
import DatePicker from 'react-native-date-picker'

function HomeScreen({ navigation }) {

  const [terrainData, setTerrainData] = useState(Categories);
  const [terrains, setTerrains] = useState(Terrains);
  const [terrain, setTerrain] = useState([]);

    const dispatch = useDispatch();

    const setCategories = (terrains) => dispatch({
      type:"SET_LIST",payload :terrains
    })

    useEffect(()=>{
      setCategories(terrains)
    },[])
  

  return (
    <View style={{flex:1}}>
      <FlatList
        data={terrains}
        contentContainerStyle={styles.grid}
        numColumns={2}
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
          borderRadius: 10,
          backgroundColor: "#fff",
          marginHorizontal: 5,
          marginVertical: 5,
          shadowColor: "black",
          width:180,
      }}>
          <View style={{
              marginVertical: 10
          }} >
              <Image
                  style={{
                      width: '100%',
                      aspectRatio: 4/3,
                      resizeMode: 'cover',
                  }}
                  source={{uri:item.pictures[0]}}
              />
              <Icon style={{position:"absolute",margin:15}} name={item.sportType + "-outline"} size={40} color="#fff" />
              <View style={{ flex:1,flexDirection: "row", alignItems: "center", justifyContent: "space-between", margin: 10 }}>
                  <Text style={{fontWeight:"300",fontSize:15}}>{item.name}</Text>
              </View>
          </View>
      </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  grid: {
    marginBottom: 32,
    marginTop: 16,
    alignItems: "center",
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
});

export default HomeScreen;