import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Modal, Image } from 'react-native';
// import EasyImage from '../../../assets/images/EasyImage.png';


const EasyFirst = ({navigation}) => {
    const [answers, setAnswers] = useState({ q1: '', q2: '', q3: '' });
    const [hintsUsed, setHintsUsed] = useState({ q1: false, q2: false, q3: false });
    const [hintCount, setHintCount] = useState(0); // 힌트 개수 카운트
    const [timeLeft, setTimeLeft] = useState(40); // 제한 시간 타이머
    const [prepTimeLeft, setPrepTimeLeft] = useState(3); // 여유 시간 타이머
    
    const correctAnswers = { q1: '라임항공', q2: '나모델', q3: '푸른하늘' };

    // useEffect(() => {
    //     if (timeLeft === 0) {
    //         handleTimeOut();
    //         return;
    //     }

    //     const timerId = setInterval(() => {
    //         setTimeLeft(timeLeft - 1);
    //     }, 1000);

    //     return () => clearInterval(timerId);
    // }, [timeLeft]);
    useEffect(() => {
        if (prepTimeLeft > 0) {
            const prepTimerId = setInterval(() => {
                setPrepTimeLeft(prepTimeLeft - 1);
            }, 1000);
            return () => clearInterval(prepTimerId);
        } else if (timeLeft > 0) {
            const timerId = setInterval(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
            return () => clearInterval(timerId);
        } else {
            handleTimeOut();
        }
    }, [prepTimeLeft, timeLeft]);


    const handleInputChange = (key, value) => {
        setAnswers({ ...answers, [key]: value });
    };

    // '다음 문제 풀기' 버튼 클릭했을 시
    const handleNextQuestion = () => {
        const emptyFields = Object.values(answers).some(answer => answer === '');
        if (emptyFields) {
            Alert.alert('정답을 입력하지 않은 문제가 있습니다.');
        } else {
            const correctCount = Object.keys(answers).reduce((count, key) => {
                const isCorrect = answers[key].trim() === correctAnswers[key];
                const isHintUsed = hintsUsed[key];
                return count + (isCorrect && !isHintUsed ? 1 : 0);
            }, 0);

            const incorrectCount = Object.keys(answers).length - correctCount;

            Alert.alert(
                '다음 문제 풀기',
                `맞춘 개수: ${correctCount}, 틀린 개수: ${incorrectCount}`,[{
                    text:'다음 문제', onPress: ()=>{navigation.navigate('EasySecond',{time:timeLeft})}
                }]
            );
        }
    };

    // '도움' 버튼 클릭했을 시
    const handleHelp = () => {
        // 입력칸이 빈칸일 경우 emptyFields로 정의
        const emptyFields = Object.keys(answers).filter(key => answers[key] === '');
        
        // 힌트 사용시, 입력칸이 빈칸일 경우 정답 값을 랜덤하게 입력
        if (emptyFields.length > 0) {
            const randomKey = emptyFields[Math.floor(Math.random() * emptyFields.length)];
            setAnswers({ ...answers, [randomKey]: correctAnswers[randomKey] });
            setHintsUsed({ ...hintsUsed, [randomKey]: true });
            setHintCount(hintCount + 1); // 힌트 사용 개수 증가
        
        // hintCount 개수가 빈칸 개수보다 많거나 같다면 경고문 출력
        } else if (hintCount >= Object.keys(emptyFields).length) {
            Alert.alert('도움을 모두 사용했습니다.');
                
        }
    };

    // '제한 시간 종료'될 때
    const handleTimeOut = () => {
        const emptyFields = Object.keys(answers).filter(key => answers[key] === '');
        const correctCount = Object.keys(answers).reduce((count, key) => {
            const isCorrect = answers[key].trim() === correctAnswers[key];
            const isHintUsed = hintsUsed[key];
            return count + (isCorrect && !isHintUsed ? 1 : 0);
        }, 0);

        const incorrectCount = Object.keys(answers).length - correctCount;

        Alert.alert(
            '제한 시간 종료',
        );
        navigation.navigate('Home');
    };


    const questions = [
        <Details1 
            key="q1"
            answer={answers.q1}
            onAnswerChange={(value) => handleInputChange('q1', value)}
            isHint={hintsUsed.q1}
        />,
        <Details2 
            key="q2"
            answer={answers.q2}
            onAnswerChange={(value) => handleInputChange('q2', value)}
            isHint={hintsUsed.q2}
        />,
        <Details3 
            key="q3"
            answer={answers.q3}
            onAnswerChange={(value) => handleInputChange('q3', value)}
            isHint={hintsUsed.q3}
        />
        // 여기에 다른 퀴즈 컴포넌트를 추가
    ];
    
    // 리턴
    return (
        <View style={styles.container}>
            <Modal
                transparent={true}
                visible={prepTimeLeft > 0}
                animationType="fade"
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContent}>
                        <Text style={styles.prepText}>START</Text>
                        <Text style={styles.prepText}>{prepTimeLeft}</Text>
                    </View>
                </View>
            </Modal>
            <Header timeLeft={timeLeft} />
            <Text style={styles.questionText}>아래 그림을 보고 문제를 풀어보세요.</Text>
            {/* <View><Image source={EasyImage} style={styles.image} /></View> */}
            {questions}
            <Footer onNext={handleNextQuestion} onHelp={handleHelp}  hintsRemaining={Object.keys(correctAnswers).length - hintCount} />
            
        </View>
    );
}; // EasyFirst


// 세부 문제들
const Details1 = ({ answer, onAnswerChange, isHint }) => {
    return (
        <View style={[styles.container, styles.contents]}>
            <View style={styles.detailsSort}>
                <Text style={styles.detailsText}>1.  </Text>
                <Text style={styles.detailsText}>
                    태훈씨는 예산이 한정되어 있어 가장 저렴한 항공권을 찾고 있습니다. 어느 항공사가 가장 적합할까요?
                </Text>
            </View>
            <TextInput
                style={[styles.input, isHint && styles.hintText]}
                placeholder="정답을 입력하세요"
                value={answer}
                onChangeText={onAnswerChange}
                editable={!isHint}
            />
        </View>
    );
};

const Details2 = ({ answer, onAnswerChange, isHint }) => {
    return (
        <View style={[styles.container, styles.contents]}>
            <View style={styles.detailsSort}>
                <Text style={styles.detailsText}>2.  </Text>
                <Text style={styles.detailsText}>
                지민씨는 배터리 수명이 가장 긴 스마트폰을 우선순위로 구입하려고 합니다. 어느 모델이 가장 적합할까요?
                </Text>
            </View>
            <TextInput
                style={[styles.input, isHint && styles.hintText]}
                placeholder="정답을 입력하세요"
                value={answer}
                onChangeText={onAnswerChange}
                editable={!isHint}
            />
        </View>
    );
};

const Details3 = ({ answer, onAnswerChange, isHint }) => {
    return (
        <View style={[styles.container, styles.contents]}>
            <View style={styles.detailsSort}>
                <Text style={styles.detailsText}>3.  </Text>
                <Text style={styles.detailsText}>
                수연씨는 출퇴근 시간이 오래 걸리는 것을 피하고 싶습니다. 수연씨의 직장에서 가장 가까운 아파트 단지는 어디일까요?
                </Text>
            </View>
            <TextInput
                style={[styles.input, isHint && styles.hintText]}
                placeholder="정답을 입력하세요"
                value={answer}
                onChangeText={onAnswerChange}
                editable={!isHint}
            />
        </View>
    );
};

// 문제 난이도, 남은시간 출력
const Header = ({ timeLeft }) => {
    return (
        <View style={[styles.container, styles.header]}>
            <View style={styles.headerSort}>
                <Text style={{fontSize: 24, paddingRight: 50,}}>난이도 하</Text>
                <Text style={{fontSize: 20, paddingLeft: 20, paddingTop: 3,}}>남은 시간</Text>
                <Text style={{fontSize: 20, paddingLeft: 15, paddingTop: 3,}}>{timeLeft}초</Text>
            </View>
        </View>
    );
};

// 도움 버튼, 다음 문제 풀기 버튼 출력
const Footer = ({ onNext, onHelp, hintsRemaining }) => {
    return (
        <View style={[styles.container, styles.footer]}>
            <TouchableOpacity
                style={[styles.button, hintsRemaining === 0 && styles.disabledButton]}
                onPress={onHelp}
                disabled={hintsRemaining === 0}
            >
                <Text style={styles.buttonText}>도움</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, styles.nextButton]}
                onPress={onNext}>
                <Text style={styles.buttonText}>다음 문제 풀기</Text>
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        width:'100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 600,
        backgroundColor: "#fff",
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'column',
    },
    prepText: {
        fontSize: 50,
        fontWeight: 'bold',
        padding: 20,
    },
    questionText: {
        fontSize: 20,
        paddingTop: 20,
    },
    detailsText: {
        fontSize: 16,
    },
    detailsSort:{
        flexDirection: 'row',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        width: '80%',
        padding: 10,
        marginTop: 10,
    },
    button: {
        backgroundColor: '#FFE072', // 버튼 배경색상 추가
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 25,
        marginBottom: 20,
    },
    disabledButton: {
        backgroundColor: '#B0B0B0',
    },
    buttonText: {
        color: '#000', // 버튼 글자색상 추가
        fontSize: 20,
        fontWeight: 'bold',
    },
    nextButton:{ // 다음 문제 풀기 버튼
        backgroundColor: '#B4C6D4',
    },
    hintText: {
        color: 'red',
    },
    header: {
        flex: 1,
        padding: 0,
        backgroundColor: '#FFBB98',
        flexDirection: 'row',
        alignItems: 'flex-end',
        height: 100,
    },
    headerSort:{
        flexDirection: 'row',
        paddingBottom: 20,
    },
    headerText: {
    },
    contents: {
        flex: 2,
        height: 700,
        paddingLeft: 30,
        paddingRight: 30,
        backgroundColor: '#fff',
    },
    footer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        
        backgroundColor: '#ddd',
        height: 200,
    },
    image: {
        width: 350,
        height: 150,
        marginTop: 20,

    },
});

export default EasyFirst;
