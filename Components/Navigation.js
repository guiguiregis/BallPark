import React, { useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
//import LoginScreen from './Screens/LoginScreen';
import HomeScreen from './Screens/HomeScreen';
import SearchScreen from './Screens/SearchScreen';
import FavoriteScreen from './Screens/FavoriteScreen';
import ProfileScreen from './Screens/ProfileScreen';
import MessagesScreen from './Screens/MessagesScreen';
import ReservationScreen from './Screens/ReservationScreen';
import TerrainScreen from './Screens/TerrainScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux'
import SearchResultScreen from './Screens/SearchResultScreen';

const Stack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const SearchStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthContext = React.createContext();


function LoginScreen() {


  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');



  const { signIn } = React.useContext(AuthContext);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',margin:20 }}>
      <TextInput style={{ backgroundColor: "#ddd", width: "100%", height: 50, borderRadius: 50, fontWeight: "700", padding: 20, margin: 20 }}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
      style={{ backgroundColor: "#ddd", width: "100%", height: 50, borderRadius: 50, fontWeight: "700", padding: 20, margin: 20 }}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign in" onPress={() => signIn({ username, password })} />
    </View>
  );
}


function Navigation() {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        // Restore token stored in `SecureStore` or any other encrypted storage
        // userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token
        console.log(data.username)
        dispatch({ type: 'SIGN_IN', token: data.username });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: data.username });
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          {state.userToken == null ? (
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          ) :
            (
              <Stack.Group initialRouteName="Home">
                <Stack.Screen name="HomeTab" component={TabNavigation} options={{ headerShown: false }} />
              </Stack.Group>
            )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

function TabNavigation() {

  const cartItems = useSelector((state) => state.cartReducer.selectedItems.items);

  return (
    <Tab.Navigator initialRouteName="Home">

      <Tab.Screen name="Search" component={SearchStackNavigation}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            // You can return any component that you like here!
            return <Icon name="search" size={size} color={color} />;
          },
          headerShown: false
        }}
      />
      
      <Tab.Screen name="Home" component={HomeStackNavigation}
        options={{
          headerRight: () => (
            <TouchableOpacity style={styles.searchButton} onPress={() => alert('This is a button!')}>
              <Icon name="search" size={30} color="#000" />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ focused, color, size }) => {

            // You can return any component that you like here!
            return <Icon name="home" size={size} color={color} />;
          },
          headerShown: false}}
      />
    
      <Tab.Screen name="Reservations" component={ReservationScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <Icon name="receipt" size={size} color={color} />;
          },
          tabBarBadge: (cartItems.length !== 0 ? cartItems.length : undefined)}}
      />

      <Tab.Screen name="Profile" component={ProfileScreen} 
      options={{
        tabBarIcon: ({ focused, color, size }) => {

          // You can return any component that you like here!
          return <Icon name="person" size={size} color={color} />;
        }
      }}
      />
    </Tab.Navigator>
  );
}

function HomeStackNavigation() {
  return (
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen name="Home" component={HomeScreen} 
       options={{ title: 'Acceuil' }}
      />
      <HomeStack.Screen name="Terrain" component={TerrainScreen}
        options={({ route }) => ({ title: route.params.pageName }),
        {
          headerRight: () => (
            <TouchableOpacity style={styles.searchButton} onPress={() => alert('This is a button!')}>
              <Icon name="location" size={30} color="#000" />
            </TouchableOpacity>
          )}}
      />
    </HomeStack.Navigator>
  );
}

function SearchStackNavigation() {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen name="Recherche" component={SearchScreen}/>
      <SearchStack.Screen name="Results" component={SearchResultScreen}/>
    </SearchStack.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#fff",
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
  searchButton: {
    marginRight: 10
  }
});

export default Navigation;