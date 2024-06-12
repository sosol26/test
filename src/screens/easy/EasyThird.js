import React, { useState ,useEffect } from "react";
import { Image, StyleSheet, Text, View, Alert, TouchableOpacity } from "react-native";
import NextButton from "../../components/NextButton"; 
import { Header } from "../common/Header";
//import {Footer} from "../common/Foorer"

//메인함수 footer를 불러오지 않고 따로 만들기..

const EasyThird = ({ navigation, route }) => {

    const [timeLeft, setTimeLeft] = useState(route.params.time);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const [hintCount1, setHintCount1] = useState(false); //첫번째 퀴즈 힌트
    const [hintCount2, setHintCount2] = useState(false); //두번째 퀴즈 힌트
    const [countQuiz , setContQuiz] = useState(0); //맞춘문제 횟수
    const [countWrongQuiz, setWrongQuiz] = useState(0); //틀린문제 횟수

    const onNext= () =>{
        navigation.navigate('EasyFirst',{time:timeLeft});
    };

    return (
        <View style={styles.container}>
             <Header timeLeft={timeLeft}/>
            <Contents setHintCount1={setHintCount1} setHintCount2={setHintCount2} setContQuiz={setContQuiz} setWrongQuiz={setWrongQuiz} />
            <Footer hintCount1={hintCount1} 
                    hintCount2={hintCount2}
                    countQuiz={countQuiz} 
                    countWrongQuiz={countWrongQuiz}
                    onNext={onNext} />            
            </View>
    );
};

const Contents = ({ setHintCount1, setHintCount2 ,setContQuiz, setWrongQuiz} ) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(null); // 첫 번째 문제 이미지 인덱스
    const [selectedImageIndex2, setSelectedImageIndex2] = useState(null); // 두 번째 문제  이미지 인덱스
    const [buttonDisabled1,setButtonDisabled1] = useState(false);
    const [buttonColorQ1, setButtonColor1] = useState('pink'); //버튼 클릭시 색상변경 가능하게끔 해주기
    const [buttonColorQ2, setButtonColor2] = useState('pink'); //버튼의 두번째 버튼 클릭시 색상변경
    const [countQuiz] = useState(0);
    const [countWrongQuiz] = useState (0);

    const correctAnswer = 4; // 첫 번째 문제 정답(도시사진)
    const correctAnswer2 = 2; // 두 번째 문제 정답 (구두 사진
    const handlePress = (index) => {
        setSelectedImageIndex(index); // 첫번째 문제
        console.log("첫번째 문제:", index);
    };

    const pressSelect2 = (index2) => {
        setSelectedImageIndex2(index2); // 두번째 문제 확인해보기
        console.log("두번째 문제:", index2);
    };

    const checkAnswer = () => { //첫번째 문제 맞추었는지 확인하는 함수
        if (selectedImageIndex === correctAnswer) {
            Alert.alert(
                "정답이에요!",
                "편안하고 조용한 시골에서는 커다란 건물은 잘 보이지 않아요.",
                [{ text: '확인' }]
            );
            setContQuiz(prevCount => prevCount + 1);
            console.log(countQuiz);
        } else {
            Alert.alert(
                "틀렸어요!",
                "무엇이 잘못되었는지 다시 잘 생각해보세요.",
                [{ text: '확인' }]
            );
            setWrongQuiz(prevCount => prevCount + 1);
        }
        setHintCount1(true);
        setButtonDisabled1(true);
        setButtonColor1('lightgray'); //색깔변경!
    };

    const checkAnswer2 = () => { //두번째 문제 맞추었는지 확인하는 함수
        if (selectedImageIndex2 === correctAnswer2) {
            Alert.alert(
                "정답이에요!",
                "울퉁불퉁한 지형인 산에서는 편안한 신발을 신어야 해요.",
                [{ text: '확인' }]
            );
            setContQuiz(prevCount => prevCount + 1);
        } else {
            setHintCount2(false);
            Alert.alert(
                "틀렸어요!",
                "무엇이 잘못되었는지 다시 잘 생각해보세요.",
                [{ text: '확인' }]
            );
            setWrongQuiz( prevCount => prevCount + 1);
        }

        setHintCount2(true);
        setButtonColor2('lightgray'); //색깔변경!


    }; //check Answer2


    return (
        <View style={styles.contents}>
            <Text style={styles.text}>1. 주영이는 오랜만에 할머니집으로 놀러가기로 하였습니다. 할머니집은 조용하고 편안한 시골에 살고계십니다. 다음 중 주영이가 볼 수 있는 풍경으로 알맞지 않은 것은 무엇일까요?</Text>
            <View style={styles.imageContainer}>
                <TouchableOpacity onPress={() => handlePress(1)} style={selectedImageIndex === 1 ? styles.selectedImageButton : styles.imageButton}>
                    <Image source={require('../../../assets/images/problem2/Q_01.png')} style={styles.image} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handlePress(2)} style={selectedImageIndex === 2 ? styles.selectedImageButton : styles.imageButton}>
                    <Image source={require('.../../../assets/images/problem2/Q_02.png')} style={styles.image} />
                </TouchableOpacity>
            </View>

            <View style={styles.imageContainer}>
                <TouchableOpacity onPress={() => handlePress(3)} style={selectedImageIndex === 3 ? styles.selectedImageButton : styles.imageButton}>
                    <Image source={require('../../../assets/images/problem2/Q_03.jpg')} style={styles.image} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handlePress(4)} style={selectedImageIndex === 4 ? styles.selectedImageButton : styles.imageButton}>
                    <Image source={require('../../../assets/images/problem2/Q_04.png')} style={styles.image} />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={[styles.selectClick, { backgroundColor: buttonColorQ1}]} onPress={checkAnswer} disabled={buttonDisabled1}>
                <View ></View>
                <Text style={styles.buttonText}>선택</Text>
            </TouchableOpacity>

            <Text style={styles.text}>2. 철수는 친구들과 등산을 가기로 하였습니다. 다음 중 등산을 가기 위한 준비물로 적절하지 않은 것은 무엇일까요?</Text>

            <View style={styles.imageContainer}>
                <TouchableOpacity onPress={() => pressSelect2(1)} style={selectedImageIndex2 === 1 ? styles.selectedImageButton : styles.imageButton}>
                    <Image source={require('../../../assets/images/problem2/Q_Image_5.jpg')} style={styles.image} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => pressSelect2(2)} style={selectedImageIndex2 === 2 ? styles.selectedImageButton : styles.imageButton}>
                    <Image source={require('../../../assets/images/problem2/Q_Image_8.png')} style={styles.image} />
                </TouchableOpacity>
            </View>
            <View style={styles.imageContainer}>
                <TouchableOpacity onPress={() => pressSelect2(3)} style={selectedImageIndex2 === 3 ? styles.selectedImageButton : styles.imageButton}>
                    <Image source={require('.../../../assets/images/problem2/Q_Image_7.jpg')} style={styles.image} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => pressSelect2(4)} style={selectedImageIndex2 === 4 ? styles.selectedImageButton : styles.imageButton}>
                    <Image source={require('../../../assets/images/problem2/Q_Image_6.jpg')} style={styles.image} />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={[styles.selectClick, {backgroundColor : buttonColorQ2}]} onPress={checkAnswer2}>
                <Text style={styles.buttonText}>선택</Text>
            </TouchableOpacity>
        </View>
    );
};
//힌트 호출함수
const Footer = ({ hintCount1, hintCount2 , countQuiz, countWrongQuiz,onNext}) => {
    const hintPress = () => {
        if (hintCount1 === false) { //jintCount 가 처음에는 false 이기에 , 힌트 1이 뜬다.
            Alert.alert(
                "<문제 1번 힌트>",
                "골은 탁트인 환경을 볼 수 있고, 등산을 위해서는 편안한 옷차림을 가져야합니다!",
                [{ text: '확인' }]
            );
        } else if (hintCount1 === true && hintCount2 === false) { //hint1을 풀었고  , hintDount2 를 풀기전 궁금하다면 !
            Alert.alert(
                "<문제 2번 힌트>",
                "등산을 하기 위해서는 편안한 복장을 입어야합니다!",
                [{ text: '확인' }]
            );
        }
    };
    //힌트가 모두 true이라면 , allCountAnswer 호출하기 (수정필요)

    useEffect(() => {
        if (hintCount1 && hintCount2) {
            allCountAnswer(countQuiz, countWrongQuiz);
        }
    }, [hintCount1, hintCount2, countQuiz, countWrongQuiz]);

    return (
        <View style={[styles.container, styles.footer]}>
            <TouchableOpacity onPress={hintPress} style={styles.button}><Text style={styles.nexButton}>도움</Text></TouchableOpacity>
            <TouchableOpacity onPress={onNext}  style={[styles.button ,styles.nextButtonEx]}><Text style={styles.nexButton}>다음 문제 풀기</Text></TouchableOpacity>
        </View>
    );
};


const allCountAnswer = (countQuiz, countWrongQuiz) =>{ //모든 문제의 정답,오답 집합!하기

        Alert.alert(
            "모든 문제를 풀었어요!!",
            `맞춘 문제: ${countQuiz}, 틀린 문제: ${countWrongQuiz}`,
            [{ text: '확인' }]
        );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      width:'100%',
    },
    header: {
        backgroundColor: '#ffbe98',
        justifyContent:'flex-end',
        flexDirection:'row',
        // flexDirection: 'row',
        // alignItems: 'center',
        // justifyContent: 'space-between',
        // paddingHorizontal: 10,
    },
    contents: {
        backgroundColor: 'white',
        height:800,
        flex: 6.7,
        justifyContent: 'center',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: '#ddd',
        height: 200,
    },
    text: {
        fontSize: 15,
    },
    button: {
        backgroundColor: '#FFE072', // 버튼 배경색상 추가
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 25,
        marginBottom: 20,
    },
    nexButton:{
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold',
    },
    nextButtonEx:{
        backgroundColor: '#B4C6D4',
    },
    buttonText:{
        fontSize:20,
    },
    timerContain:{
        backgroundColor:'pink',
        flexDirection: "row", 
        marginHorizontal: 50,
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginTop: 20,
    },
    image: {
        width: 80,
        height: 80,
        marginHorizontal: 10,
    },
    imageButton: {
        borderWidth: 2,
        borderColor: 'transparent',
        borderRadius: 5,
        padding: 5,
    },
    selectedImageButton: {
        borderWidth: 2,
        borderColor: 'red',
        borderRadius: 5,
        padding: 5,
    },
    selectClick: {
        borderColor: 'red',
        alignItems:'center',
        marginHorizontal: 100,
        marginVertical:5,
    },
});

export default EasyThird;
