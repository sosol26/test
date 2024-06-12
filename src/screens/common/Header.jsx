import { StyleSheet, Text, View } from "react-native";

export const Header = ({ timeLeft }) => {
    return (
        <View style={[styles.container, styles.header]}>
            <View style={styles.headerSort}>
                <Text style={{fontSize: 24, paddingRight: 50,}}>난이도 하</Text>
                <Text style={{fontSize: 20, paddingLeft: 20, paddingTop: 3,}}>남은 시간</Text>
                <Text style={{fontSize: 20, paddingLeft: 15, paddingTop: 3,}}>{timeLeft}초</Text>
            </View>
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
    header: {
        flex: 1,
        padding: 0,
        backgroundColor: '#FFBB98',
        flexDirection: 'row',
        alignItems: 'flex-end',
        height: 100,
    },
    headerSort:{
        flexDirection: 'row',
        paddingBottom: 20,
    },
});