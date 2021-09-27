import { grey } from '@material-ui/core/colors';
import * as React from 'react';
import { View, Text,StyleSheet,FlatList,Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';



function ReservationListing({data,title}) {
    return (
      <View >
        <Text style={styles.title} >{title}</Text>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <View style={styles.innerContainer}>
              <View style={styles.innerContent}>
                <Icon name={item.sportType+"-outline"} size={55} color="#FFF" />
                <View  style={styles.timePickerContainer}>
        <ScrollView >
          <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
            <TouchableOpacity disabled={false} style={styles.timeframe} onPress={() => HandleScheduling("8h-9h")}>
              <View>
                <Text>8h-9h</Text>
              </View>
            </TouchableOpacity>
            <ScheduleOrganiser/>
            <View style={styles.timeframe}><Text>10h-11h</Text></View>
            <View style={styles.timeframe}><Text>11h-12h</Text></View>
          </View>
          <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
            <View style={styles.timeframe}><Text>12h-13h</Text></View>
            <View style={styles.timeframe}><Text>13h-14h</Text></View>
            <View style={styles.timeframe}><Text>14h-15h</Text></View>
            <View style={styles.timeframe}><Text>15h-16h</Text></View>
          </View>
          <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
            <View style={styles.timeframe}><Text>16h-17h</Text></View>
            <View style={styles.timeframe}><Text>17h-18h</Text></View>
            <View style={styles.timeframe}><Text>18h-19h</Text></View>
            <View style={styles.timeframe}><Text>19h-20h</Text></View>
          </View>
          <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
            <View style={styles.timeframe}><Text>20h-21h</Text></View>
            <View style={styles.timeframe}><Text>21h-22h</Text></View>
          </View>
        </ScrollView>
        </View>
        </View>
              <Image
                style={styles.image}
                source={require('../Datas/images/hqdefault.jpg')}
              />
            </View>
          )}
          keyExtractor={(item) => item.availability}
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

export default ReservationListing;