import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const Footer = ({ onNext, onHelp, hintsRemaining }) => {
    return (
        <View style={[styles.container, styles.footer]}>
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
        alignItems: 'center',
        justifyContent: 'center',
        height: 600,
        backgroundColor: "#fff",
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
    footer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        
        backgroundColor: '#ddd',
        height: 200,
    },

});