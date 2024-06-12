import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Modal, Image } from 'react-native';
import HardImage from '../../../assets/images/HardImage.png';


const HardFirst = () => {
    const [answers, setAnswers] = useState({ q1: { pencil: '', eraser: '', notebook: '' }, q2: { pencil: '', eraser: '', notebook: '' } });
    const [hintsUsed, setHintsUsed] = useState({ q1: false, q2: false });
    const [hintCount, setHintCount] = useState(0); // 힌트 개수 카운트
    const [timeLeft, setTimeLeft] = useState(40); // 제한 시간 타이머
    const [prepTimeLeft, setPrepTimeLeft] = useState(3); // 여유 시간 타이머
    
    const correctAnswers = {
        q1: { pencil: '1', eraser: '2', notebook: '2' },
        q2: { pencil: '4', eraser: '0', notebook: '2' }
    };
    
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


    const handleInputChange = (question, key, value) => {
        setAnswers({ ...answers, [question]: { ...answers[question], [key]: value } });
    };

    // '다음 문제 풀기' 버튼 클릭했을 시
    const handleNextQuestion = () => {
        const emptyFields = Object.keys(answers).some(question =>
            Object.values(answers[question]).some(answer => answer === '')
        );
        if (emptyFields) {
            Alert.alert('정답을 입력하지 않은 문제가 있습니다.');
        } else {
            const correctCount = Object.keys(answers).reduce((count, question) => {
                const isCorrect = Object.keys(answers[question]).every(key =>
                    answers[question][key].trim() === correctAnswers[question][key]
                );
                const isHintUsed = hintsUsed[question];
                return count + (isCorrect && !isHintUsed ? 1 : 0);
            }, 0);

            const incorrectCount = Object.keys(answers).length - correctCount;

            Alert.alert(
                '다음 문제 풀기',
                `맞춘 개수: ${correctCount}, 틀린 개수: ${incorrectCount}`
            );
        }
    };

    // '도움' 버튼 클릭했을 시
    const handleHelp = () => {
        // 입력칸이 빈칸일 경우 emptyFields로 정의
        const emptyFields = Object.keys(answers).filter(question =>
            Object.values(answers[question]).some(answer => answer === '')
        );
        
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
        const emptyFields = Object.keys(answers).filter(question =>
            Object.values(answers[question]).some(answer => answer === '')
        );
        const correctCount = Object.keys(answers).reduce((count, question) => {
            const isCorrect = Object.keys(answers[question]).every(key =>
                answers[question][key].trim() === correctAnswers[question][key]
            );
            const isHintUsed = hintsUsed[question];
            return count + (isCorrect && !isHintUsed ? 1 : 0);
        }, 0);

        const incorrectCount = Object.keys(answers).length - correctCount;

        Alert.alert(
            '제한 시간 종료',
            `맞춘 개수: ${correctCount}, 틀린 개수: ${incorrectCount}`
        );
    };


    const questions = [
        <Details1 
            key="q1"
            answer={answers.q1}
            onAnswerChange={(key, value) => handleInputChange('q1', key, value)}
            isHint={hintsUsed.q1}
        />,
        <Details2 
            key="q2"
            answer={answers.q2}
            onAnswerChange={(key, value) => handleInputChange('q2', key, value)}
            isHint={hintsUsed.q2}
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
            <Text style={styles.questionText}>다음 조건을 만족하도록 연필, 지우개, 공책을 각각 몇 개씩 필요로 하는지 적어보세요.</Text>
            <Image source={HardImage} style={styles.image} />
            {questions}
            <Footer onNext={handleNextQuestion} onHelp={handleHelp}  hintsRemaining={Object.keys(correctAnswers).length - hintCount} />
            
        </View>
    );
};


// 세부 문제들
const Details1 = ({ answer, onAnswerChange, isHint }) => {
    return (
        <View style={[styles.container, styles.contents]}>
            <Text style={styles.detailsText}>1. 총 5개의 학용품으로 9달러를 만들어보세요.</Text>
            <View style={styles.inputRow}>
                <View style={styles.inputRow}>
                    <Text>연필: </Text>
                    <TextInput
                        style={[styles.input, isHint && styles.hintText]}
                        placeholder="연필"
                        value={answer.pencil}
                        onChangeText={value => onAnswerChange('pencil', value)}
                        editable={!isHint}
                    />
                </View>
                <View style={styles.inputRow}>
                    <Text>지우개: </Text>
                    <TextInput
                        style={[styles.input, isHint && styles.hintText]}
                        placeholder="지우개"
                        value={answer.eraser}
                        onChangeText={value => onAnswerChange('eraser', value)}
                        editable={!isHint}
                    />
                </View>
                <View style={styles.inputRow}>
                    <Text>공책: </Text>
                    <TextInput
                        style={[styles.input, isHint && styles.hintText]}
                        placeholder="공책"
                        value={answer.notebook}
                        onChangeText={value => onAnswerChange('notebook', value)}
                        editable={!isHint}
                    />
                </View>
            </View>
        </View>
    );
};

const Details2 = ({ answer, onAnswerChange, isHint }) => {
    return (
        <View style={[styles.container, styles.contents]}>
            <Text style={styles.detailsText}>2. 총 6개의 학용품으로 10달러를 만들어보세요.</Text>
            <View style={styles.inputRow}>
                <View style={styles.inputRow}>
                    <Text>연필: </Text>
                    <TextInput
                        style={[styles.input, isHint && styles.hintText]}
                        placeholder="연필"
                        value={answer.pencil}
                        onChangeText={value => onAnswerChange('pencil', value)}
                        editable={!isHint}
                    />
                </View>
                <View style={styles.inputRow}>
                    <Text>지우개: </Text>
                    <TextInput
                        style={[styles.input, isHint && styles.hintText]}
                        placeholder="지우개"
                        value={answer.eraser}
                        onChangeText={value => onAnswerChange('eraser', value)}
                        editable={!isHint}
                    />
                </View>
                <View style={styles.inputRow}>
                    <Text>공책: </Text>
                    <TextInput
                        style={[styles.input, isHint && styles.hintText]}
                        placeholder="공책"
                        value={answer.notebook}
                        onChangeText={value => onAnswerChange('notebook', value)}
                        editable={!isHint}
                    />
                </View>
            </View>
        </View>
    );
};


// 문제 난이도, 남은시간 출력
const Header = ({ timeLeft }) => {
    return (
        <View style={[styles.container, styles.header]}>
            <View style={styles.headerSort}>
                <Text style={{fontSize: 24, paddingRight: 50,}}>난이도 상</Text>
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
        paddingLeft: 30,
        paddingRight: 30,
    },
    detailsText: {
        fontSize: 16,
        paddingTop: 10,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        padding:10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        width: 50,
        padding: 10,
        marginLeft: 0,
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

export default HardFirst;
