import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import NextButton from '../../components/NextButton';

const koreanFoods = [
    { label: '한우 떡갈비', value: '한우 떡갈비', prices: { small: 20000, large: 22500 } },
    { label: '비빔밥', value: '비빔밥', prices: { small: 6500, large: 7650 } },
    { label: '삼계탕', value: '삼계탕', prices: { small: 10000, large: 10800 } },
];

const japaneseFoods = [
    { label: '우동', value: '우동', prices: { small: 4500, large: 5400 } },
    { label: '장어구이', value: '장어구이', prices: { small: 22000, large: 24300 } },
    { label: '모듬초밥', value: '모듬초밥', prices: { small: 12000, large: 13500 } },
];

const westernFoods = [
    { label: '스테이크', value: '스테이크', prices: { small: 25000, large: 29700 } },
    { label: '스파게티', value: '스파게티', prices: { small: 9000, large: 9900 } },
    { label: '수제 햄버거', value: '수제 햄버거', prices: { small: 10000, large: 11700 } },
];

const sideFoods = [
    { label: '공기밥', value: '공기밥', price: 1000 },
    { label: '모듬튀김', value: '모듬튀김', price: 3500 },
    { label: '샐러드', value: '샐러드', price: 2500 }
];

const Hard1_3 = ({navigation}) => {
    const [koreanFood, setKoreanFood] = useState(null);
    const [japaneseFood, setJapaneseFood] = useState(null);
    const [westernFood, setWesternFood] = useState(null);
    const [sideFood, setSideFood] = useState(null);

    const [koreanFoodSize, setKoreanFoodSize] = useState('small');
    const [japaneseFoodSize, setJapaneseFoodSize] = useState('small');
    const [westernFoodSize, setWesternFoodSize] = useState('small');

    const [koreanFoodCount, setKoreanFoodCount] = useState('');
    const [japaneseFoodCount, setJapaneseFoodCount] = useState('');
    const [westernFoodCount, setWesternFoodCount] = useState('');
    const [sideFoodCount, setSideFoodCount] = useState('');

    const [koreanOpen, setKoreanOpen] = useState(false);
    const [japaneseOpen, setJapaneseOpen] = useState(false);
    const [westernOpen, setWesternOpen] = useState(false);
    const [sideOpen, setSideOpen] = useState(false);
    const [sizeOpen, setSizeOpen] = useState(false);

    const [totalPrice, setTotalPrice] = useState(0);
    const [isValid, setIsValid] = useState(true);

    const calculateTotalPrice = () => {
        let newTotalPrice = 0;

        if (koreanFood && koreanFoodCount) {
            const food = koreanFoods.find(f => f.value === koreanFood);
            newTotalPrice += food.prices[koreanFoodSize] * parseInt(koreanFoodCount);
        }
        if (japaneseFood && japaneseFoodCount) {
            const food = japaneseFoods.find(f => f.value === japaneseFood);
            newTotalPrice += food.prices[japaneseFoodSize] * parseInt(japaneseFoodCount);
        }
        if (westernFood && westernFoodCount) {
            const food = westernFoods.find(f => f.value === westernFood);
            newTotalPrice += food.prices[westernFoodSize] * parseInt(westernFoodCount);
        }
        if (sideFood && sideFoodCount) {
            const food = sideFoods.find(f => f.value === sideFood);
            newTotalPrice += food.price * parseInt(sideFoodCount);
        }

        setTotalPrice(newTotalPrice);
    };

    const checkValidity = () => {
        let valid = true;

        if (koreanFood && koreanFoodCount) {
            const food = koreanFoods.find(f => f.value === koreanFood);
            if (food.prices[koreanFoodSize] * parseInt(koreanFoodCount) > 100000) {
                valid = false;
            }
        }
        if (japaneseFood && japaneseFoodCount) {
            const food = japaneseFoods.find(f => f.value === japaneseFood);
            if (food.prices[japaneseFoodSize] * parseInt(japaneseFoodCount) > 100000) {
                valid = false;
            }
        }
        if (westernFood && westernFoodCount) {
            const food = westernFoods.find(f => f.value === westernFood);
            if (food.prices[westernFoodSize] * parseInt(westernFoodCount) > 100000) {
                valid = false;
            }
        }
        if (sideFood && sideFoodCount) {
            const food = sideFoods.find(f => f.value === sideFood);
            if (food.price * parseInt(sideFoodCount) > 100000) {
                valid = false;
            }
        }

        setIsValid(valid);
    };

    return (
<ScrollView contentContainerStyle={styles.scrollViewContainer}>
    <View style={styles.container}>
        <Text style={styles.title}>음식 선택</Text>

        <Text>한식</Text>
        <DropDownPicker
            open={koreanOpen}
            value={koreanFood}
            items={koreanFoods}
            setOpen={setKoreanOpen}
            setValue={setKoreanFood}
            placeholder="한식 선택"
            style={styles.picker}
            zIndex={koreanOpen ? 1000 : 1}
            elevation={koreanOpen ? 1000 : 1}
        />
        {koreanFood && (
            <DropDownPicker
                open={sizeOpen}
                value={koreanFoodSize}
                items={[
                    { label: '소', value: 'small' },
                    { label: '대', value: 'large' }
                ]}
                setOpen={setSizeOpen}
                setValue={setKoreanFoodSize}
                placeholder="크기 선택"
                style={styles.picker}
                zIndex={sizeOpen ? 900 : 1}
                elevation={sizeOpen ? 900 : 1}
            />
        )}
        <TextInput
            style={styles.input}
            placeholder="개수 입력"
            value={koreanFoodCount}
            onChangeText={setKoreanFoodCount}
            keyboardType="numeric"
        />

        <Text>일식</Text>
        <DropDownPicker
            open={japaneseOpen}
            value={japaneseFood}
            items={japaneseFoods}
            setOpen={setJapaneseOpen}
            setValue={setJapaneseFood}
            placeholder="일식 선택"
            style={styles.picker}
            zIndex={japaneseOpen ? 1000 : 1}
            elevation={japaneseOpen ? 1000 : 1}
        />
        {japaneseFood && (
            <DropDownPicker
                open={sizeOpen}
                value={japaneseFoodSize}
                items={[
                    { label: '소', value: 'small' },
                    { label: '대', value: 'large' }
                ]}
                setOpen={setSizeOpen}
                setValue={setJapaneseFoodSize}
                placeholder="크기 선택"
                style={styles.picker}
                zIndex={sizeOpen ? 900 : 1}
                elevation={sizeOpen ? 900 : 1}
            />
        )}
        <TextInput
            style={styles.input}
            placeholder="개수 입력"
            value={japaneseFoodCount}
            onChangeText={setJapaneseFoodCount}
            keyboardType="numeric"
        />

        <Text>양식</Text>
        <DropDownPicker
            open={westernOpen}
            value={westernFood}
            items={westernFoods}
            setOpen={setWesternOpen}
            setValue={setWesternFood}
            placeholder="양식 선택"
            style={styles.picker}
            zIndex={westernOpen ? 1000 : 1}
            elevation={westernOpen ? 1000 : 1}
        />
        {westernFood && (
            <DropDownPicker
                open={sizeOpen}
                value={westernFoodSize}
                items={[
                    { label: '소', value: 'small' },
                    { label: '대', value: 'large' }
                ]}
                setOpen={setSizeOpen}
                setValue={setWesternFoodSize}
                placeholder="크기 선택"
                style={styles.picker}
                zIndex={sizeOpen ? 900 : 1}
                elevation={sizeOpen ? 900 : 1}
            />
        )}
        <TextInput
            style={styles.input}
            placeholder="개수 입력"
            value={westernFoodCount}
            onChangeText={setWesternFoodCount}
            keyboardType="numeric"
        />

        <Text>사이드</Text>
        <DropDownPicker
            open={sideOpen}
            value={sideFood}
            items={sideFoods}
            setOpen={setSideOpen}
            setValue={setSideFood}
            placeholder="사이드 선택"
            style={styles.picker}
            zIndex={sideOpen ? 1000 : 1}
            elevation={sideOpen ? 1000 : 1}
        />
        <TextInput
            style={styles.input}
            placeholder="개수 입력"
            value={sideFoodCount}
            onChangeText={setSideFoodCount}
            keyboardType="numeric"
        />

        <Button title="계산하기" onPress={calculateTotalPrice} />
        <Button title="유효성 검사" onPress={checkValidity} />

        <Text style={styles.totalText}>총 금액: ${totalPrice.toFixed(2)}</Text>
        <Text style={styles.validityText}>
            {isValid ? '금액이 유효합니다.' : '금액이 유효하지 않습니다.'}
        </Text>
        <NextButton onPress={()=>{navigation.navigate('Normal1')}}/>
    </View>
</ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1,
        padding: 16,
    },
    container: {
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        textAlign: 'center',
    },
    picker: {
        marginBottom: 12,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
        width: '100%',
    },
    totalText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
    },
    validityText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 10,
        color: 'red',
    },
});


export default Hard1_3;
