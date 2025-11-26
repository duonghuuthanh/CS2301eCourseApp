import Home from "./screens/Home/Home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Lesson from "./screens/Home/Lesson";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

const StackNavigatior = () => {
  
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{title: "Khóa học"}} />
      <Stack.Screen name="Lesson" component={Lesson} options={{title: "Bài học"}} />
    </Stack.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <StackNavigatior />
    </NavigationContainer>
  );
}

export default App;