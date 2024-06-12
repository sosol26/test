import { StyleSheet, View, Text } from 'react-native';
import { Btn } from './components/Btn';
import { TextWithImg } from './components/TextWithImg';



export default function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.appTitle}>치매 예방 문제 풀기</Text>
      <TextWithImg title='난이도를 선택해주세요'/>
      <Btn rank='하' rate={1} onPress={() => navigation.navigate('EasyFirst')}/>
      <Btn rank='중' rate={2} onPress={()=> navigation.navigate('NormalFirst')}/>
      <Btn rank='상' rate={3} onPress={()=> navigation.navigate('Hard1')}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop:155,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
  },
  appTitle:{
    fontSize:25,
    marginBottom:20,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
