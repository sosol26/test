import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import NextButton from '../../components/NextButton';

const mainFoods = [
    { label: '한우 떡갈비', value: '한우 떡갈비', prices: { small: 20000, large: 22500 } },
    { label: '비빔밥', value: '비빔밥', prices: { small: 6500, large: 7650 } },
    { label: '삼계탕', value: '삼계탕', prices: { small: 10000, large: 10800 } },
    { label: '우동', value: '우동', prices: { small: 4500, large: 5400 } },
    { label: '장어구이', value: '장어구이', prices: { small: 22000, large: 24300 } },
    { label: '모듬초밥', value: '모듬초밥', prices: { small: 12000, large: 13500 } },
    { label: '스테이크', value: '스테이크', prices: { small: 25000, large: 29700 } },
    { label: '스파게티', value: '스파게티', prices: { small: 9000, large: 9900 } },
    { label: '수제 햄버거', value: '수제 햄버거', prices: { small: 10000, large: 11700 } }
];

const sideFood = [
    { label: '공기밥', value: '공기밥', price: 1000 },
    { label: '모듬튀김', value: '모듬튀김', price: 3500 },
    { label: '샐러드', value: '샐러드', price: 2500 }
];

const App = ({navigation}) => {
    const [foods, setFoods] = useState([]);
    const [selectedMainFood, setSelectedMainFood] = useState(null);
    const [selectedSideFood, setSelectedSideFood] = useState(null);
    const [mainFoodSize, setMainFoodSize] = useState('small');
    const [mainFoodCount, setMainFoodCount] = useState('');
    const [sideFoodCount, setSideFoodCount] = useState('');
    const [mainOpen, setMainOpen] = useState(false);
    const [sideOpen, setSideOpen] = useState(false);
    const [sizeOpen, setSizeOpen] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);

    const addFood = () => {
        let newFoods = [...foods];
        let newTotalPrice = totalPrice;

        if (selectedMainFood && mainFoodCount) {
            const mainFood = mainFoods.find(food => food.value === selectedMainFood);
            const mainFoodTotalPrice = mainFood.prices[mainFoodSize] * parseInt(mainFoodCount);
            newFoods.push({ name: `${mainFood.label} (${mainFoodSize})`, count: parseInt(mainFoodCount), price: mainFood.prices[mainFoodSize] });
            newTotalPrice += mainFoodTotalPrice;
            setMainFoodCount('');
        }

        if (selectedSideFood && sideFoodCount) {
            const sideFoodItem = sideFood.find(food => food.value === selectedSideFood);
            const sideFoodTotalPrice = sideFoodItem.price * parseInt(sideFoodCount);
            newFoods.push({ name: sideFoodItem.label, count: parseInt(sideFoodCount), price: sideFoodItem.price });
            newTotalPrice += sideFoodTotalPrice;
            setSideFoodCount('');
        }

        setFoods(newFoods);
        setTotalPrice(newTotalPrice);
    };

    const removeFood = (index) => {
        let newFoods = [...foods];
        const removedFood = newFoods.splice(index, 1)[0];
        const newTotalPrice = totalPrice - (removedFood.count * removedFood.price);
        setFoods(newFoods);
        setTotalPrice(newTotalPrice);
    };

    const renderFoodItem = ({ item, index }) => (
        <View style={styles.foodItem}>
            <Text style={styles.foodText}>{item.name}</Text>
            <Text style={styles.foodText}>개수: {item.count}</Text>
            <Text style={styles.foodText}>가격: {item.price}원</Text>
            <Text style={styles.foodText}>총: {(item.count * item.price).toFixed(2)}원</Text>
            <TouchableOpacity onPress={() => removeFood(index)} style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>삭제</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>2. 우현 씨 가족은 외식상품권 10만원을 잔액 없이 모두 사용하려고 합니다. 메뉴를 선택해보세요.</Text>

            <DropDownPicker
                open={mainOpen}
                value={selectedMainFood}
                items={mainFoods}
                setOpen={setMainOpen}
                setValue={setSelectedMainFood}
                placeholder="메인음식을 선택하세요."
                style={styles.picker}
                zIndex={mainOpen ? 1000 : 1}
                elevation={mainOpen ? 1000 : 1}
            />
            {selectedMainFood && (
                <DropDownPicker
                    open={sizeOpen}
                    value={mainFoodSize}
                    items={[
                        { label: 'Small', value: 'small' },
                        { label: 'Large', value: 'large' }
                    ]}
                    setOpen={setSizeOpen}
                    setValue={setMainFoodSize}
                    placeholder="사이즈를 선택하세요."
                    style={styles.picker}
                    zIndex={sizeOpen ? 900 : 1}
                    elevation={sizeOpen ? 900 : 1}
                />
            )}
            <TextInput
                style={styles.input}
                placeholder="몇 개 드시나요?"
                value={mainFoodCount}
                onChangeText={setMainFoodCount}
                keyboardType="numeric"
            />

            <DropDownPicker
                open={sideOpen}
                value={selectedSideFood}
                items={sideFood}
                setOpen={setSideOpen}
                setValue={setSelectedSideFood}
                placeholder="사이드를 선택하세요."
                style={styles.picker}
                zIndex={sideOpen ? 800 : 1}
                elevation={sideOpen ? 800 : 1}
            />
            <TextInput
                style={styles.input}
                placeholder="몇 개 드시나요?"
                value={sideFoodCount}
                onChangeText={setSideFoodCount}
                keyboardType="numeric"
            />

            <Button title="음식 추가하기" onPress={addFood} />

            <FlatList
                data={foods}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderFoodItem}
                style={styles.foodList}
            />

            <View style={styles.totalContainer}>
                <Text style={styles.totalText}>총 금액 : {totalPrice.toFixed(2)}원</Text>
            </View>
            <NextButton onPress={() => {
                if(totalPrice === 100000){
                    navigation.navigate('Hard1-3');
                }else{
                    alert('10만원이 아닙니다.')
                }
                }}/>
        </View>
    );
};

const styles = StyleSheet.create({
    title:{
        marginTop:50,
        marginBottom:50,
        alignSelf:'center',
        width: 400,
        fontSize: 24,
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
    foodList: {
        marginTop: 20,
    },
    foodItem: {
        padding: 16,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    foodText: {
        fontSize: 16,
    },
    deleteButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
    },
    deleteButtonText: {
        color: 'white',
    },
    totalContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    totalText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default App;
