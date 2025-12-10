import Home from "./screens/Home/Home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Lesson from "./screens/Home/Lesson";
import { NavigationContainer } from "@react-navigation/native";
import Register from "./screens/User/Register";
import Login from "./screens/User/Login";
import { Icon } from "react-native-paper";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createNativeStackNavigator();

const StackNavigatior = () => {
  
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Course" component={Home} options={{title: "Khóa học"}} />
      <Stack.Screen name="Lesson" component={Lesson} options={{title: "Bài học"}} />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={StackNavigatior} options={{title: "Màn hình chính", tabBarIcon: () => <Icon color="blue" source="home" size={30} />}} />
      <Tab.Screen name="Register" component={Register} options={{title: "Đăng ký", tabBarIcon: () => <Icon color="blue" source="account" size={30} />}} />
      <Tab.Screen name="Login" component={Login} options={{title: "Đăng nhập", tabBarIcon: () => <Icon color="blue" source="login" size={30} />}} />
    </Tab.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}

export default App;