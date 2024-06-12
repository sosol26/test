import { Image, StyleSheet, Text, View } from "react-native"


export const TextWithImg = ({title}) => {

    return(
        <View style={styles.container}>
            <Image style={styles.img} source={require('../../assets/images/Home/arrow-alt-down.png')}/>
            <Text style={styles.text}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'row',
        marginBottom:20,
    },
    img:{
        width:30,
        height:30,
    },
    text:{
        fontSize:18,
    }
})