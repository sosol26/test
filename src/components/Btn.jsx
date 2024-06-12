import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";


export const Btn = ({rank,rate,onPress}) => {

    return(
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.rateContainer}>
            {
                Array.from({length:rate}).map((_,index)=>(
                    <Text key={index} style={styles.star}>⭐</Text>
                ))
            }
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.text}>난이도</Text>
                <Text style={styles.textRank}>{rank}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#FFBB98',
        width:284,
        height:132,
        borderRadius:10,
        marginBottom:25,
    },
    textContainer:{
        alignItems:'center',
        display:'flex',
        flexDirection:'row',
    },
    text:{
        color:'white',
        fontSize:23,
        marginRight:20,
    },
    textRank:{
        color:'white',
        fontSize:29,
    },
    star:{
        fontSize: 25,
    },
    rateContainer:{
        display:'flex',
        flexDirection:'row',
    }
})