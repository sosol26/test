import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import { Footer } from "../common/Footer";
import { Header } from "../common/Header";

const Worksheet = ({ navigation,route }) => {
  const [answer1, setAnswer1] = useState('');
  const [answer2, setAnswer2] = useState('');
  const [answer3, setAnswer3] = useState('');
  const [allowance, setAllowance] = useState(50000);
  const [laundryExpense, setLaundryExpense] = useState(0);
  const [chineseFoodExpense, setChineseFoodExpense] = useState(0);
  const [petSnackExpense, setPetSnackExpense] = useState(0);
  const [discount, setDiscount] = useState(5000);
  const [additionalMoney, setAdditionalMoney] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [hintsRemaining, setHintsRemaining] = useState(3);
  const [timeLeft, setTimeLeft] = useState(route.params.time);

  useEffect(() => {
    generateRandomExpenses();
  }, []);
  useEffect(() => {
    const timer = setInterval(() => {
        setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
}, []);

  const generateRandomExpenses = () => {
    let laundry = getRandomInt(10000, 20000);
    let chineseFood = getRandomInt(30000, 50000);
    let petSnack = getRandomInt(5000, 15000);
    let total = laundry + chineseFood + petSnack;
    
    while (total <= allowance) {
      laundry = getRandomInt(10000, 20000);
      chineseFood = getRandomInt(30000, 50000);
      petSnack = getRandomInt(5000, 15000);
      total = laundry + chineseFood + petSnack;
    }

    setLaundryExpense(laundry);
    setChineseFoodExpense(chineseFood);
    setPetSnackExpense(petSnack);
    setTotalExpenses(total);
    setAdditionalMoney(total - allowance + getRandomInt(10000, 20000));
  };

  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const calculateAnswers = () => {
    const missingAmount = totalExpenses - allowance;
    const actualExpenseForPetSnacks = petSnackExpense - discount;
    const newBalance = allowance + additionalMoney - totalExpenses;

    return {
      missingAmount: missingAmount.toString(),
      actualExpenseForPetSnacks: actualExpenseForPetSnacks.toString(),
      newBalance: newBalance.toString()
    };
  };

  const checkAnswers = () => {
    const correctAnswers = calculateAnswers();

    if (answer1 === correctAnswers.missingAmount && answer2 === correctAnswers.actualExpenseForPetSnacks && answer3 === correctAnswers.newBalance) {    //이거 로직 다시 손보기
      Alert.alert("정답입니다!");
    } else {
      Alert.alert("오답입니다. 다시 시도해보세요.");
    }
    navigation.navigate('NomalThird_sub',{time:timeLeft});

  };

  const provideHint = () => {
    if (hintsRemaining > 0) {
      const correctAnswers = calculateAnswers();
      if (!answer1) {
        setAnswer1(correctAnswers.missingAmount);
      } else if (!answer2) {
        setAnswer2(correctAnswers.actualExpenseForPetSnacks);
      } else if (!answer3) {
        setAnswer3(correctAnswers.newBalance);
      }
      setHintsRemaining(hintsRemaining - 1);
    }
  };

  const calculateHintsRemaining = () => {
    let remaining = 0;
    if (!answer1) remaining++;
    if (!answer2) remaining++;
    if (!answer3) remaining++;
    return remaining;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <Header timeLeft={timeLeft}/>
      <Text style={styles.title}>가계부 작성하기</Text>
      <Text style={styles.description}>
        오늘 동진 씨가 사용하고 작성한 가계부입니다. 가계부를 보고 문제를 풀어보세요(1~3).
      </Text>
      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={styles.cellHeader}>목록</Text>
          <Text style={styles.cellHeader}>수입</Text>
          <Text style={styles.cellHeader}>지출</Text>
          <Text style={styles.cellHeader}>잔액</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.cell}>용돈</Text>
          <Text style={styles.cell}>50,000원</Text>
          <Text style={styles.cell}>0원</Text>
          <Text style={styles.cell}>50,000원</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.cell}>세탁소</Text>
          <Text style={styles.cell}>0원</Text>
          <Text style={styles.cell}>{laundryExpense}원</Text>
          <Text style={styles.cell}>?</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.cell}>중화요리</Text>
          <Text style={styles.cell}>0원</Text>
          <Text style={styles.cell}>{chineseFoodExpense}원</Text>
          <Text style={styles.cell}>?</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.cell}>애견 간식</Text>
          <Text style={styles.cell}>0원</Text>
          <Text style={styles.cell}>{petSnackExpense}원</Text>
          <Text style={styles.cell}>?</Text>
        </View>
      </View>
      <Text style={styles.question}>1. 동진 씨가 부족한 돈은 얼마인가요?</Text>
      <TextInput style={styles.input} value={answer1} onChangeText={setAnswer1} />
      <Text style={styles.question}>
        2. 애견 간식은 평소에 모아둔 적립금으로 결제하였고, 중화 요리에서 이벤트로 5천원 할인을 받았습니다. 실제로 사용한 돈은 얼마인가요?
      </Text>
      <TextInput style={styles.input} value={answer2} onChangeText={setAnswer2} />
      <Text style={styles.question}>
        3. 아내가 동진 씨에게 10만원을 더 주었습니다. 현재 동진 씨의 잔액은 총 얼마인가요?
      </Text>
      <TextInput style={styles.input} value={answer3} onChangeText={setAnswer3} />
      <Footer 
        onNext={checkAnswers} 
        onHelp={provideHint} 
        hintsRemaining={calculateHintsRemaining()} 
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  table: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
  },
  cellHeader: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f9f9f9',
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: '#ccc',
    textAlign: 'center',
  },
  cell: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    textAlign: 'center',
  },
  question: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default Worksheet;
