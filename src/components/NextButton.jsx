import { StyleSheet, Text, TouchableOpacity } from "react-native"

const NextButton = (props) => {

    return(
        <TouchableOpacity style={styles.container} onPress={props.onPress}>
            <Text style={styles.text}>다음 문제</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        display:'flex',
        backgroundColor:'#FFBB98',
        width: '100%',
        height:50,
        justifyContent:'center',
        alignItems:'center',
    },
    text:{
        fontSize:28,
        color:'white',
    }
});

export default NextButton;