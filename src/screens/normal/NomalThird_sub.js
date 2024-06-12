import React ,{useEffect,useState} from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Header } from "../common/Header";
import { Footer } from '../common/Footer';

export const Contents = () => {
    return (
        <View style={styles.contents}>
            <View style={styles.imageContainer}>
                <Image source={require('../../../assets/images/problem2/Q_second_1.jpg')} style={styles.image} />
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.text}>
                    영진과 친구들은 <Text style={{ color: 'red' }}>여수밤바다</Text>를 보기위해 <Text style={{ color: 'red' }}>아침 9시에 터미널</Text>에서 만나기로 하였습니다.
                    <Text style={{ color: 'red' }}>한별이</Text>가 총무역할을 해주었고, <Text style={{ color: 'red' }}>경진이</Text>가 호텔을 예매해주었습니다. 영진은 자신의 여행을 위한 준비물로
                    <Text style={{ color: 'red' }}>칫솔, 잠옷, 면도기, 지갑</Text>을 챙겼습니다. 또한 저녁에 삼겹살파티를 하기위해 터미널역 근처 슈퍼에서 <Text style={{ color: 'red' }}>가스버너, 고기, 상추, 일회용품</Text>을
                    사고 가기로 하였습니다.
                </Text>
            </View>
        </View>
    );
}; //이미지와 설명 출력하기

const NomalThird_sub = ({ navigation,route }) => {
    //메인함수
     //수정됨
     const [timeLeft, setTimeLeft] = useState(route.params.time);
    //시간 가져오기
     useEffect(() => {
         const timer = setInterval(() => {
             setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
         }, 1000);
         return () => clearInterval(timer);
     }, []);
    
     //다음함수가져오기
    const nextAnswer = () => {
        navigation.navigate('NomalThird',{time:timeLeft});
    };

    return (
        <View style={styles.first}>
            <Header  timeLeft={timeLeft}/>
            <Contents />
            <Footer onNext={nextAnswer} />
        </View>
    );
};

const styles = StyleSheet.create({
    first: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'column',
    },
    image: {
        width: 300,
        height: 300,
    },
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        backgroundColor: '#ffbe98',
    },
    contents: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-around',
        flex: 6,
        width: '100%',
    },
    footer: {
        backgroundColor: '#ffbe98',
    },
    text: {
        fontSize: 18,
        textAlign: 'center',
    },
    imageContainer: {
        marginBottom: 20,
    },
    textContainer: {
        marginHorizontal: 20,
    },
});

export default NomalThird_sub;
