import { grey } from '@material-ui/core/colors';
import * as React from 'react';
import  { useState,useEffect } from 'react';
import { View, Text,StyleSheet,FlatList,Image,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
//import { useNavigation } from '@react-navigation/native';
//AIzaSyB3w6TbNncBDppaolDvK8hcsT90o9ZgoWU

function TerrainListing({navigation,...props}) {

  //const navigation = useNavigation();

    return (
      <View >
        <Text style={styles.title} >{props.data.title}</Text>
        <FlatList
          data={props.data.terrains}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate("Terrain", {navigation,item})}>
              <View style={styles.innerContainer}>
              <View style={styles.innerContent}>
                <Text style={styles.subtitle}>{item.name}</Text>
                <Icon name={item.sportType+"-outline"} size={55} color="#FFF" />
              </View>
              
              <Image
                style={styles.image}
                source={require('../Datas/images/hqdefault.jpg')}
              />
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator = {false}
      />
      </View>
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

export default TerrainListing;