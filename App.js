import React from "react";
import { View, ActivityIndicator, LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//screens
import WelcomeScreen from "./app/screens/WelcomeScreen";
import SignInScreen from "./app/screens/SignInScreen";
import SelectionScreen from "./app/screens/SelectionScreen";
import HomeScreen from "./app/screens/HomeScreen";
import ProductsScreen from "./app/screens/ProductsScreen";
import MapScreen from "./app/screens/MapScreen";
import DetailsPageScreen from "./app/screens/DetailsPageScreen";
import AddProductScreen from "./app/screens/AddProductScreen";
import Setting from "./app/screens/Setting";
import SignUpScreen from "./app/screens/Signup";
import ForgotScreen from "./app/screens/ForgotPass";
import { Provider } from "react-redux";
import store from "./app/redux/store";
import Loading from "./app/components/Loading";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentuser } from "./app/redux/auth/authaction";

const Stack = createNativeStackNavigator();

console.disableYellowBox = true;

export default function App() {
  // Font
  LogBox.ignoreAllLogs();

  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}
const Routes = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const dispatch = useDispatch();
  const userinfo = useSelector((state) => state?.AuthReducer);
  const [loading, setloading] = React.useState(false);

  const gettinguserstate = async () => {
    setloading(true);
    try {
      dispatch(getCurrentuser()).finally(() => setloading(false));
    } catch {
      setloading(false);
    }
  };
  React.useEffect(() => {
    gettinguserstate();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="WelcomeScreen">
        {userinfo?.isLoggedIn === false ? (
          <>
            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
            <Stack.Screen name="SignInScreen" component={SignInScreen} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
            <Stack.Screen name="ForgotScreen" component={ForgotScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="SelectionScreen" component={SelectionScreen} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="SettingScreen" component={Setting} />
            <Stack.Screen name="ProductsScreen" component={ProductsScreen} />
            <Stack.Screen name="MapScreen" component={MapScreen} />
            <Stack.Screen name="DetailsPageScreen" component={DetailsPageScreen} />
            <Stack.Screen name="AddProductScreen" component={AddProductScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Happy Coding :)
