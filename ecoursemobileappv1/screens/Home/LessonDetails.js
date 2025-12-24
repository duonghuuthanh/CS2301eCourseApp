import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import MyStyles from "../../styles/MyStyles";
import { useContext, useEffect, useState } from "react";
import Apis, { authApis, endpoints } from "../../utils/Apis";
import { Button, Card, List, TextInput } from "react-native-paper";
import moment from 'moment';
import RenderHTML from "react-native-render-html";
import 'moment/locale/vi';
import { MyUserContext } from "../../utils/contexts/MyContext";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LessonDetails = ({route}) => {
    const lessonId = route.params?.lessonId;
    const [lesson, setLesson] = useState();
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [user, ] = useContext(MyUserContext);
    const nav = useNavigation();
    const [content, setContent] = useState();

    const loadLesson = async () => {
        try {
            setLoading(true);
            let res = await Apis.get(endpoints['lesson-details'](lessonId));
            setLesson(res.data);
        } catch (ex) {

        } finally {
            setLoading(false);
        }
    }

    const loadComments = async () => {
        let res = await  Apis.get(endpoints['comments'](lessonId));
        setComments(res.data);
    }
    
    const addComment = async () => {
        const token = await AsyncStorage.getItem("token");
        let res = await authApis(token).post(endpoints['comments'](lessonId), {
            "content": content
        });
        console.info(res.data);
        setComments([res.data, ...comments]);
    }

    useEffect(() => {
        loadLesson();
        
    }, [lessonId]);

    useEffect(() => {
        loadComments();
    }, [comments]);

    return (
        <View>
            <Text style={MyStyles.title}>CHI TIẾT BÀI HỌC</Text>
            <ScrollView>
                {loading && <ActivityIndicator size="large" color="blue" />}
                {lesson && <Card>
                    {/* <Card.Title title={lesson.subject} subtitle="Card Subtitle"  /> */}
                    <Card.Cover source={{ uri: lesson.image }} width={200} />
                    <Card.Content>
                        <Text variant="titleLarge">{lesson.subject}</Text>
                        {/* <Text variant="bodyMedium">{parse(lesson.content)}</Text> */}
                        <RenderHTML source={{'html': lesson.content}} />
                    </Card.Content>
                </Card>}

                {user === null ? <>
                    <TouchableOpacity onPress={() => nav.navigate("Login", {"next": "LessonDetails"})}><Text>Vui lòng đăng nhập  để bình luận!</Text></TouchableOpacity>
                </>:
                    <View style={MyStyles.padding} >
                        <TextInput label="Nội dung bình luận..." value={content} onChangeText={setContent} />
                        <Button style={MyStyles.margin} mode="contained-tonal" onPress={addComment}>Thêm bình luận</Button>
                    </View>
                }

                {comments.map(c => <List.Item key={c.id}
                                        title={c.content}
                                        description={moment(c.created_date).fromNow()}
                                        left={props => <Image source={{uri: c.user.image}} style={MyStyles.avatar} />}
                                    />)}
            </ScrollView>
        </View>
    );
}

export default LessonDetails;