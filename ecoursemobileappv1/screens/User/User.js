import { useContext } from "react";
import { Button } from "react-native-paper";
import { MyUserContext } from "../../utils/contexts/MyContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image, Text, View } from "react-native";
import MyStyles from "../../styles/MyStyles";

const User = () => {
    const [user ,dispatch] = useContext(MyUserContext);

    const logout = async () => {
        AsyncStorage.removeItem("token");
        dispatch({
            "type": "logout"
        });
    }

    return (
        <View style={MyStyles.padding}>
            <Text style={MyStyles.title}>WELCOME {user.username}!</Text>

            <View style={{justifyContent: "center", alignItems: "center", padding: 30}}>
                <Image source={{uri: user.image}} style={MyStyles.avatar} />
            </View>

            <Button mode="contained-tonal" icon="account" onPress={logout}>Đăng xuất</Button>
         </View>
    );
}

export default User;