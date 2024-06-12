import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TextInput, View, ScrollView, Alert, Button } from "react-native";
import NextButton from "../../components/NextButton";
import { Footer } from "../common/Footer";
import { Header } from "../common/Header";

const EasySecond = ({ navigation,route }) => {
    const [timeLeft, setTimeLeft] = useState(route.params.time);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const images = [
        { id: 'result1', src: require('../../../assets/images/Problem1/img1.png') },
        { id: 'result2', src: require('../../../assets/images/Problem1/img2.png') },
        { id: 'result3', src: require('../../../assets/images/Problem1/img3.png') },
        { id: 'result4', src: require('../../../assets/images/Problem1/img4.png') },
        { id: 'result5', src: require('../../../assets/images/Problem1/img5.png') },
        { id: 'result6', src: require('../../../assets/images/Problem1/img6.png') },
    ];

    const result1 = {
        result1: '고무장갑',
        result2: '카메라',
        result3: '선글라스',
        result4: '손톱깎이',
        result5: '드라이기',
        result6: '죽부인',
    };
    const result2 = {
        result1: '죽부인',
        result2: '선글라스',
        result3: '카메라',
    };

    const [input, setInput] = useState({
        result1: '',
        result2: '',
        result3: '',
        result4: '',
        result5: '',
        result6: '',
    });
    const [input2, setInput2] = useState({
        result1: '',
        result2: '',
        result3: '',
    });
    const [hintsRemaining, setHintsRemaining] = useState(3);

    const onChangeHandler = (name, text) => {
        setInput((prevInput) => ({
            ...prevInput,
            [name]: text,
        }));
    };
    const onChangeHandler2 = (name, text) => {
        setInput2((prevInput) => ({
            ...prevInput,
            [name]: text,
        }));
    };

    const checkAnswers = () => {
        const remaining = Object.keys(result1).filter(
            key => input[key] !== result1[key]
        ).length;
        const remaining2 = Object.keys(result2).filter(
            key => input2[key] !== result2[key]
        ).length;
        const remainingAnswerCount = remaining + remaining2;
        Alert.alert(
            '제한 시간 종료',
            `맞춘 개수: ${9 - remainingAnswerCount}, 틀린 개수: ${remainingAnswerCount}`
        );
       navigation.navigate('EasyThird',{time:timeLeft});
    };

    
    //다음문제 선택했을시,

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




    const provideHint = () => {
        if (hintsRemaining > 0) {
            const allResults = { ...result1, ...result2 };
            const allInputs = { ...input, ...input2 };
            const unansweredKeys = Object.keys(allResults).filter(
                key => allInputs[key] !== allResults[key]
            );

            if (unansweredKeys.length > 0) {
                const randomKey = unansweredKeys[Math.floor(Math.random() * unansweredKeys.length)];
                if (result1[randomKey]) {
                    setInput(prevInput => ({
                        ...prevInput,
                        [randomKey]: result1[randomKey]
                    }));
                } else if (result2[randomKey]) {
                    setInput2(prevInput => ({
                        ...prevInput,
                        [randomKey]: result2[randomKey]
                    }));
                }
                setHintsRemaining(prevHints => prevHints - 1);
            } else {
                Alert.alert("모든 정답을 이미 입력했습니다.");
            }
        } else {
            Alert.alert("힌트가 모두 소진되었습니다.");
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Header timeLeft={timeLeft}/>
            <View style={[styles.container, { width: '90%' }]}>
                <Text style={styles.title}>물건 찾기</Text>
                <Text>다음 물건의 이름을 적어보고 제시된 문제에 알맞은 물건을 찾아 적어보세요(1~3)</Text>
            </View>
            <View style={styles.inputContainer}>
                {images.map((image) => (
                    <View key={image.id} style={styles.inputWrapper}>
                        <Image source={image.src} style={styles.image} />
                        <TextInput
                            style={styles.input}
                            placeholder={`입력`}
                            onChangeText={(text) => onChangeHandler(image.id, text)}
                            value={input[image.id]}
                        />
                    </View>
                ))}
            </View>
            <View style={styles.questionsContainer}>
                <Text>1. 정호 씨는 열대야로 잠을 못 이루고 있습니다. 시원하게 잠을 자기 위해 필요한 물건은 무엇일까요?</Text>
                <TextInput style={[styles.input, { width: 200 }]} placeholder="입력" onChangeText={(t) => onChangeHandler2('result1', t)} value={input2.result1} />
                <Text>2. 준희 씨는 햇빛에 눈이 부셔 운전하기 힘듭니다. 필요한 물건은 무엇일까요?</Text>
                <TextInput style={[styles.input, { width: 200 }]} placeholder="입력" onChangeText={(t) => onChangeHandler2('result2', t)} value={input2.result2} />
                <Text>3. 유석 씨는 전망대에 가서 사진을 남기고 싶습니다. 필요한 물건은 무엇일까요?</Text>
                <TextInput style={[styles.input, { width: 200, marginBottom: 100 }]} placeholder="입력" onChangeText={(t) => onChangeHandler2('result3', t)} value={input2.result3} />
            </View> 
            <Footer onNext={checkAnswers} onHelp={provideHint} hintsRemaining={hintsRemaining} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        alignSelf: 'flex-start',
        marginTop: 50,
        marginBottom: 10,
        fontSize: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: 20,
    },
    inputWrapper: {
        margin: 10,
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 8,
        width: '90%',
    },
    questionsContainer: {
        marginTop: 20,
        width: '90%',
    },
});

export default EasySecond;
