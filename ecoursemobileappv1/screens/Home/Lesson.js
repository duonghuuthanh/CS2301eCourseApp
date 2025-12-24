import { useEffect, useEffectEvent, useState } from "react";
import Apis, { endpoints } from "../../utils/Apis";
import { ActivityIndicator, FlatList, Image, TouchableOpacity, View } from "react-native";
import MyStyles from "../../styles/MyStyles";
import { List } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const Lesson = ({ route }) => {
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(false);
    const courseId = route.params?.courseId;
    const nav = useNavigation();

    const loadLessons = async () => {
        try {
            setLoading(true);

            let res = await Apis.get(endpoints['lessons'](courseId));
            setLessons(res.data);
        } catch (ex) {
            console.error(ex);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadLessons();
    }, [courseId]);

    return (
        <View style={MyStyles.padding}>
            <FlatList ListFooterComponent={loading && <ActivityIndicator size="large" />}
                data={lessons} renderItem={({ item }) => <List.Item
                    title={item.subject}
                    description={item.created_date}
                    left={() => <TouchableOpacity onPress={() => nav.navigate("LessonDetails", {"lessonId": item.id})}>
                        <Image source={{ uri: item.image }} style={MyStyles.avatar} />
                    </TouchableOpacity>}
                />} />
        </View>
    );
}

export default Lesson;