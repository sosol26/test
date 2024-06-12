import React, {useState, useEffect} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, Modal } from 'react-native';
import Leftfigures from '../../../assets/images/Left.png';
import Rightfigures from '../../../assets/images/Right.png';

const NormalFirst = ({navigation}) => {
    const [lines, setLines] = useState([]); // 그려진 선들
    const [selectedDots, setSelectedDots] = useState([]); // 선택된 점들
    const [correctLineCount, setCorrectLineCount] = useState(0); // 맞춘 선 개수
    const [incorrectLineCount, setIncorrectLineCount] = useState(0); // 틀린 선 개수
    const [hintCount, setHintCount] = useState(0); // 힌트 개수 카운트
    const [timeLeft, setTimeLeft] = useState(40); // 제한 시간 타이머
    const [prepTimeLeft, setPrepTimeLeft] = useState(3); // 여유 시간 타이머
    
    const correctPairs = { 1: 5, 2: 7, 3: 6, 4: 8 }; // 올바른 연결 점들

    //문제 시작 전, 여유 시간 타이머와 제한 시간 타이머
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


    // '다음 문제 풀기' 버튼 클릭했을 시
    const handleNextQuestion = () => {
        Alert.alert(
            '다음 문제 풀기',
            `맞춘 개수: ${correctLineCount}, 틀린 개수: ${incorrectLineCount}`
        );
        navigation.navigate('NormalSecond',{time:timeLeft});
    };

    // '도움' 버튼 클릭했을 시
    const handleHelp = () => {

        if (hintCount >= Object.keys(correctPairs).length) {
            Alert.alert('더 이상 도움을 줄 수 없습니다.');
            return;
        }

        const remainingDots = [1, 2, 3, 4].filter(dot => !lines.some(line => line.start === dot || line.end === dot));
        if (remainingDots.length === 0) {
            Alert.alert('도움 줄 점이 없습니다.');
            return;
        }

        const randomDot = remainingDots[Math.floor(Math.random() * remainingDots.length)];
        const correctPair = correctPairs[randomDot];
        const newLine = { start: randomDot, end: correctPair, color: 'red' };

        setLines([...lines, newLine]);
        setIncorrectLineCount(incorrectLineCount + 1); // 도움으로 그어진 선은 틀린 개수에 포함
        setHintCount(hintCount + 1);
    };

    // '제한 시간 종료'될 때
    const handleTimeOut = () => {

        Alert.alert(
            '제한 시간 종료',
            `맞춘 개수: ${correctLineCount}, 틀린 개수: ${incorrectLineCount}`
        );
    };

    // 점을 클릭하여 선을 그리는 함수
    const handleDotPress = (dotIndex) => {
        if (selectedDots.includes(dotIndex) || lines.some(line => line.start === dotIndex || line.end === dotIndex)) {
            return; // 이미 선택된 점이거나 연결된 점이면 무시
        }

        if (selectedDots.length === 0) {
            setSelectedDots([dotIndex]);
        } else {
            const [firstDot] = selectedDots;
            const newLine = { start: firstDot, end: dotIndex, color: 'black' };
            setLines([...lines, newLine]);

            if (correctPairs[firstDot] === dotIndex || correctPairs[dotIndex] === firstDot) {
                setCorrectLineCount(correctLineCount + 1);
            } else {
                setIncorrectLineCount(incorrectLineCount + 1);
            }
            setSelectedDots([]);
        }
    };


    // 점의 위치 계산 함수
    const calculateDotPosition = (dotIndex) => {
        // 왼쪽 점들의 위치
        const leftDots = [
            { top: 50, left: 0 },
            { top: 150, left: 0 },
            { top: 250, left: 0 },
            { top: 350, left: 0 },
        ];

        // 오른쪽 점들의 위치
        const rightDots = [
            { top: 50, left: 185 },
            { top: 150, left: 185 },
            { top: 250, left: 185 },
            { top: 350, left: 185 },
        ];
        return dotIndex <= 4 ? leftDots[dotIndex - 1] : rightDots[dotIndex - 5];
    };

    // 시작점과 끝점의 좌표를 이용하여 선을 그리는 함수
    const renderLine = (line, index) => {

        const start = calculateDotPosition(line.start);
        const end = calculateDotPosition(line.end);

        const deltaX = end.left - start.left;
        const deltaY = end.top - start.top;
        const angle = Math.atan2(deltaY, deltaX);
        const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        const centerX = (start.left + end.left) / 2;
        const centerY = (start.top + end.top) / 2;

        return (
            <View
                key={index}
                style={[
                    styles.line,
                    {
                        top: centerY,
                        left: centerX - length / 2 + 6.0,
                        width: length,
                        transform: [{ rotate: `${angle}rad` }],
                        backgroundColor: line.color,
                    },
                ]}
            />
        );
    };


    
    // 리턴
    return (
        <View style={styles.container}>
            <Modal transparent={true} visible={prepTimeLeft > 0} animationType="fade">
                <View style={styles.modalBackground}>
                    <View style={styles.modalContent}>
                        <Text style={styles.prepText}>START</Text>
                        <Text style={styles.prepText}>{prepTimeLeft}</Text>
                    </View>
                </View>
            </Modal>
            <Header timeLeft={timeLeft} />
            <Text style={styles.questionText}>서로 반대되는 모양끼리 알맞게 선을 연결해보세요. </Text>
            <View style={{flexDirection:'row', width:'100%',}}>
                <View>
                    <Image source={Leftfigures} style={styles.image} />
                </View>
                <View style={styles.dotsContainer}>
                    {/* 왼쪽 점들 */}
                    {[1, 2, 3, 4].map((i) => (
                        <TouchableOpacity
                            key={i}
                            style={[styles.dot, calculateDotPosition(i)]}
                            onPress={() => handleDotPress(i)}
                        />
                    ))}
                    {/* 오른쪽 점들 */}
                    {[5, 6, 7, 8].map((i) => (
                        <TouchableOpacity
                            key={i}
                            style={[styles.dot, calculateDotPosition(i)]}
                            onPress={() => handleDotPress(i)}
                        />
                    ))}
                    {/* 그려진 선들 */}
                    {lines.map(renderLine)}
                </View>
                <View >
                    <Image source={Rightfigures} style={styles.image} />
                </View>
            </View>
            <Footer onNext={handleNextQuestion} onHelp={handleHelp}  hintsRemaining={Object.keys(correctPairs).length - hintCount} />
            
        </View>
    );
};



// Header 부분 - 문제 난이도, 남은시간 출력
const Header = ({ timeLeft }) => {
    return (
        <View style={[styles.container, styles.header]}>
            <View style={styles.headerSort}>
                <Text style={{fontSize: 24, paddingRight: 50,}}>난이도 중</Text>
                <Text style={{fontSize: 20, paddingLeft: 20, paddingTop: 3,}}>남은 시간</Text>
                <Text style={{fontSize: 20, paddingLeft: 15, paddingTop: 3,}}>{timeLeft}초</Text>
            </View>
        </View>
    );
};

// Footer 부분 - 도움 버튼, 다음 문제 풀기 버튼 출력
const Footer = ({ onNext, onHelp, hintsRemaining }) => {
    return (
        <View style={ [styles.container, styles.footer ]}>
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
        height: 900,
        alignItems: 'center',
        justifyContent: 'center',
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
        paddingBottom: 30,
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
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: 0,
        backgroundColor: '#ddd',
    },
    dotsContainer: {
        position: 'relative',
        width: 200,
        height: 500,
        
    },
    dot: {
        position: 'absolute',
        width: 15,
        height: 15,
        borderRadius: 10,
        backgroundColor: 'black',
    },
    line: {
        position: 'absolute',
        height: 5,
        backgroundColor: 'black',
    },
    image: {
        width: 100,
        height: 400,
    },
});

export default NormalFirst;