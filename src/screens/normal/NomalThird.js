import React,{useState,useEffect} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import { Header } from "../common/Header";
//import { Footer } from '../common/Footer';


const Contents = ({ setHintCount1, setHintCount2, setHintCount3, setContQuiz, setCountWrongQuiz }) => {
    const [answer1, setAnswer1] = useState(null); // OX 퀴즈 정답여부 (총 3개)
    const [answer2, setAnswer2] = useState(null);
    const [answer3, setAnswer3] = useState(null);

    const [selectedImageIndex, setSelectedImageIndex] = useState(null); // 첫 번째 문제의 선택된 이미지 인덱스
    const [selectedImageIndex2, setSelectedImageIndex2] = useState(null); // 두 번째 문제의 선택된 이미지 인덱스

    const correctAnswer = 4; // 첫 번째 문제 정답 
    const correctAnswer2 = 1; // 두 번째 문제  정답

    const [quizCount , setQuizcount]  = useState(0);

    const handlePress = (index) => {
        setSelectedImageIndex(index); // 첫번째 문제 선택했을 시에
        console.log("첫번째 문제:", index);
    };

    const pressSelect2 = (index2) => {
        setSelectedImageIndex2(index2); // 두번째 문제 선택했을 시에
        console.log("두번째 문제:", index2);
    };

    //두개의 이미지형 힌트 정답여부를 묻는 함수, checkAnswer, checkAnswer2 두가지가 있습니다.

    const checkAnswer = () => {
        if (selectedImageIndex === correctAnswer) {
            Alert.alert(
                "정답이에요!",
                "여행의 준비물에서 마이크는 필수품이 아니에요.",
                [{ text: '확인' }]
            );
            setContQuiz(prevCount => prevCount + 1);
        } else {
            Alert.alert(
                "틀렸어요!",
                "무엇이 잘못되었는지 다시 잘 생각해보세요.",
                [{ text: '확인' }]
            );
            setCountWrongQuiz(prevCount => prevCount + 1);
        }
        setHintCount1(true);
    };

    const checkAnswer2 = () => {
        if (selectedImageIndex2 === correctAnswer2) {
            Alert.alert(
                "정답이에요!",
                "삼겹살파티에서 책은 필요하지 않아요.",
                [{ text: '확인' }]
            );
            setContQuiz(prevCount => prevCount + 1);
        } else {
            Alert.alert(
                "틀렸어요!",
                "무엇이 잘못되었는지 다시 잘 생각해보세요.",
                [{ text: '확인' }]
            );
            setCountWrongQuiz(prevCount => prevCount + 1);
        }
        setHintCount2(true);
    };

    //퀴즈형 이미지 정답여부 함수  총 세가지 , 풀때마다 setContQuiz를 해줌 . (수정)

    const quizAnswer = (questionNumber, isCorrect) => {

        if (questionNumber === 1) {
            if (isCorrect) {
                Alert.alert('정답!', '정답입니다!');
                setContQuiz(prevCount => prevCount + 1);
                setAnswer1(true);
            } else {
                Alert.alert('오답!', '오답입니다!');
                setCountWrongQuiz(prevCount => prevCount + 1);
                setAnswer1(false);
            }
        } else if (questionNumber === 2) {
            if (isCorrect) {
                Alert.alert('정답!', '정답입니다!');
                setContQuiz(prevCount => prevCount + 1);
                setAnswer2(true);
            } else {
                Alert.alert('오답!', '오답입니다!');
                setCountWrongQuiz(prevCount => prevCount + 1);
                setAnswer2(false);
            }
        } else if (questionNumber === 3) {
            if (isCorrect) {
                Alert.alert('정답!', '정답입니다!');
                setContQuiz(prevCount => prevCount + 1);
                setAnswer3(true);
            } else {
                Alert.alert('오답!', '오답입니다!');
                setCountWrongQuiz(prevCount => prevCount + 1);
                setAnswer3(false);
            }
        }
        setQuizcount(prevCount => prevCount+1); 
     //세가지문제를 다풀때 setHintCount3  = true , allCountAnswer 함수에 필요함! 
        if(quizCount === 2){
            setHintCount3(true);
        } 
    };

    return (
        <View style={styles.contents}>
            <Text style={styles.text}>1. 영식이가 친구들과 여행을 즐기기 위해, 챙겨야할 준비물이 아닌 것은 다음 중 무엇인가요?</Text>
            <View style={styles.imageContainer}>
                <TouchableOpacity onPress={() => handlePress(1)} style={selectedImageIndex === 1 ? styles.selectedImageButton : styles.imageButton}>
                    <Image source={require('../../../assets/images/problem2/Q_second_2.jpg')} style={styles.image} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handlePress(2)} style={selectedImageIndex === 2 ? styles.selectedImageButton : styles.imageButton}>
                    <Image source={require('../../../assets/images/problem2/Q_second_3.jpg')} style={styles.image} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handlePress(3)} style={selectedImageIndex === 3 ? styles.selectedImageButton : styles.imageButton}>
                    <Image source={require('../../../assets/images/problem2/Q_second_4.jpg')} style={styles.image} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handlePress(4)} style={selectedImageIndex === 4 ? styles.selectedImageButton : styles.imageButton}>
                    <Image source={require('../../../assets/images/problem2/Q_second_5.jpg')} style={styles.image} />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.selectClick} onPress={checkAnswer}>
                <Text style={styles.choose}>선택</Text>
            </TouchableOpacity>

            <Text style={styles.text}>2. 영식이와 친구들은 저녁에 삼겹살파티를 하기로 하였습니다. 영식 친구들이 챙겨야할 목록에서 알맞지 않은 것은 무엇인가요?</Text>
            <View style={styles.imageContainer}>
                <TouchableOpacity onPress={() => pressSelect2(1)} style={selectedImageIndex2 === 1 ? styles.selectedImageButton : styles.imageButton}>
                    <Image source={require('../../../assets/images/problem2/Q_second_10.jpg')} style={styles.image} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => pressSelect2(2)} style={selectedImageIndex2 === 2 ? styles.selectedImageButton : styles.imageButton}>
                    <Image source={require('../../../assets/images/problem2/Q_second_8.png')} style={styles.image} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => pressSelect2(3)} style={selectedImageIndex2 === 3 ? styles.selectedImageButton : styles.imageButton}>
                    <Image source={require('../../../assets/images/problem2/Q_second_6.jpg')} style={styles.image} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => pressSelect2(4)} style={selectedImageIndex2 === 4 ? styles.selectedImageButton : styles.imageButton}>
                    <Image source={require('../../../assets/images/problem2/Q_second_9.jpg')} style={styles.image} />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.selectClick} onPress={checkAnswer2}>
                <Text style={styles.choose}>선택</Text>
            </TouchableOpacity>

            <View style={styles.box}>
                <View style={styles.Main}>
                    <Text>1. 영식과 친구들은 저녁 8시에 만난다.</Text>
                    <TouchableOpacity onPress={() => quizAnswer(1, false)}>
                        <Text style={[styles.basicFont]}>O</Text>
                    </TouchableOpacity>
                    <Text style={[styles.basicFont]}>/</Text>
                    <TouchableOpacity onPress={() => quizAnswer(1, true)}>
                        <Text style={[styles.basicFont, answer1 === true ? styles.answerX : null]}>X</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.Main}>
                    <Text>2. 영식의 친구 한별이가 총무역할을 맡았다.</Text>
                    <TouchableOpacity onPress={() => quizAnswer(2, true)}>
                        <Text style={[styles.basicFont, answer2 === true ? styles.answerO : null]}>O</Text>
                    </TouchableOpacity>
                    <Text style={[styles.basicFont]}>/</Text>
                    <TouchableOpacity onPress={() => quizAnswer(2, false)}>
                        <Text style={[styles.basicFont]}>X</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.Main}>
                    <Text>3. 영식과 친구들은 여수밤바다로 여행을 간다.</Text>
                    <TouchableOpacity onPress={() => quizAnswer(3, true)}>
                        <Text style={[styles.basicFont, answer3 === true ? styles.answerO : null]}>O</Text>
                    </TouchableOpacity>
                    <Text style={[styles.basicFont]}>/</Text>
                    <TouchableOpacity onPress={() => quizAnswer(3, false)}>
                        <Text style={[styles.basicFont]}>X</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const Footer = ({ hintCount1, hintCount2, hintCount3, countQuiz, countWrongQuiz,onNext }) => {

    const hintPress = () => {
        Alert.alert(
            "<힌트>",
            "영진과 친구들은 여수밤바다를 향해 아침 9시에 터미널에서 만나기로 하였습니다. 한별이가 총무역할을 해주었고, 경진이가 호텔을 예매해주었죠. 영진의 준비물은 칫솔, 잠옷, 면도기, 지갑을 챙겼고, 삼겹살파티를 위해 가스버너, 고기, 상추,일회용품을 사기로 했습니다.",
            [{ text: '확인' }]
        );
    };

    useEffect(() => {
        //문제를 풀며 모두 true가 성립된다면, 함수호출!
        if (hintCount1 && hintCount2 && hintCount3) {
            allCountAnswer(countQuiz, countWrongQuiz);
        }
    }, [hintCount1, hintCount2, hintCount3]);

    return (
        <View style={[styles.container, styles.footer]}>
            <TouchableOpacity onPress={hintPress} style={styles.button}><Text style={styles.nexButton}>도움</Text></TouchableOpacity>
            <TouchableOpacity onPress={onNext}  style={[styles.button ,styles.nextButtonEx]}><Text style={styles.nexButton}>다음 문제 풀기</Text></TouchableOpacity>
        </View>
    );
};
//그동안 setContQuiz 또는 setCountWrongQuiz를 해주면서 카운트 되었던것을 호출 (수정필요)

const allCountAnswer = (countQuiz, countWrongQuiz) => {
    Alert.alert(
        "모든 문제를 풀었어요!!",
        `맞춘 문제: ${countQuiz}, 틀린 문제: ${countWrongQuiz}`,
        [{ text: '확인' }]
    );
};


//메인함수

const NomalThird = ({navigation, route}) => {

    const [timeLeft, setTimeLeft] = useState(route.params.time);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const [hintCount1, setHintCount1] = useState(false);
    const [hintCount2, setHintCount2] = useState(false);
    const [hintCount3, setHintCount3] = useState(false);
    const [countQuiz, setContQuiz] = useState(0);
    const [countWrongQuiz, setCountWrongQuiz] = useState(0);
    const [quizCount,setQuizcount] = useState(0);

    const onNext= () =>{
        navigation.navigate('다음문제이름',{time:timeLeft});
    };

    return(
    <View style={styles.container}>
      <Header  timeLeft={timeLeft}/>
      <Contents
        setHintCount1={setHintCount1}
        setHintCount2={setHintCount2}
        setHintCount3={setHintCount3}
        setContQuiz={setContQuiz}
        setCountWrongQuiz={setCountWrongQuiz}
      />
      <Footer 
      
        hintCount1={hintCount1}
        hintCount2={hintCount2}
        hintCount3={hintCount3}
        countQuiz={countQuiz}
        countWrongQuiz={countWrongQuiz}
        onNext={onNext}
            />
     </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    header: {
        backgroundColor: '#ffbe98',
        justifyContent: 'flex-end',
        flexDirection: 'row',
    },
    contents: {
        backgroundColor: 'white',
        height: 800,
        flex: 6,
        alignItems: 'center',
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
    box: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        borderWidth: 1,
        borderColor: 'black',
    },
    Main: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 3, //수직거리 
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
    basicFont: {
        fontSize: 28,
        marginHorizontal: 8, //양옆거리
    },
    answerO: {
        color: 'blue',
    },
    image: {
        width: 70,
        height: 80,
        marginHorizontal: 10,
    },
    answerX: {
        color: 'red',
    },
    imageButton: {
        borderWidth: 2,
        borderColor: 'transparent',
        borderRadius: 5,
        padding: 3,
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        padding: 8,
    },
    selectClick: {
        borderColor: 'red',
        alignItems: 'center'
    },
    selectedImageButton: {
        borderWidth: 2,
        borderColor: 'red',
        borderRadius: 5,
        padding: 5,
    },
    choose: {
        fontSize: 20,
        backgroundColor: 'pink',
        padding: 8,
    },
    timerContain: {
        backgroundColor: 'pink',
        flexDirection: "row",
        marginHorizontal: 50,
    },
});

export default NomalThird;
