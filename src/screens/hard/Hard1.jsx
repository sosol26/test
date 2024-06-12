import { Image, StyleSheet, Text, View } from "react-native";
import NextButton from "../../components/NextButton";

const Hard1 = ({navigation}) => {

    return(
        <>
        <View style={styles.container}>
            <View style={[styles.container, { width: '90%' }]}>
                <Text style={styles.title}>음식가격 계산하기</Text>
                <Text style={{alignSelf:'flex-start'}}>다음의 음식별 가격표를 확인하고 문제를 풀어보세요.</Text>
                <Image resizeMode="contain" style={styles.image} source={require('../../../assets/images/Normal1/img1.png')}/>
            </View>
        </View>
        <NextButton onPress={() => navigation.navigate('Hard1-1')}/>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        alignSelf: 'flex-start',
        marginTop: 50,
        marginBottom: 10,
        fontSize: 20,
    },
    image:{
        width:'100%',
        marginTop:-80,
    }
});
export default Hard1;