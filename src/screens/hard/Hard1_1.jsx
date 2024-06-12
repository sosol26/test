import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import NextButton from "../../components/NextButton";
import { useState } from "react";

const Hard1_1 = ({navigation}) => {
    const [result,setResult] = useState('');
    return(
        <View style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
            <Text style={styles.text}>1.석훈 씨는 음식들을 포장하여 다음과 같이 상을 차렸습니다. 가격은 모두 얼마인가요?(메인메뉴의 양은 대 포장시 10% 할인됩니다.</Text>
            <Image resizeMode="contain" style={styles.img} source={require('../../../assets/images/Normal1/img2.png')}/>
            <TextInput value={result} onChangeText={(t)=>{setResult(t)}} style={styles.input} placeholder="입력"/>
            <NextButton  onPress={()=>{
                if(result===54500){
                    //정답
                    navigation.navigate('Hard1-2');
                } else {
                    //오답
                    navigation.navigate('Hard1-2');
                }
            }}/>
        </View>
    )
}


const styles = StyleSheet.create({
    img:{
        width:400,
        marginBottom:-180,
    },
    text:{
        width: '90%',
        fontSize:25,
        marginTop:50,
        marginBottom:-180,
    },
    input:{
        
    }
});


export default Hard1_1;