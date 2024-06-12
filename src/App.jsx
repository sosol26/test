import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import HomeScreen from "./HomeScreen";
import DetailsScreen from "./DetailsScreen";
import Hard1 from './screens/hard/Hard1';
import Hard1_2 from './screens/hard/Hard1_2';
import Hard1_1 from './screens/hard/Hard1_1';
import Hard1_3 from './screens/hard/Hard1_3';
import Normal1 from './screens/normal/Normal1';
import NormalFirst from './screens/normal/NormalFirst';
import EasyFirst from './screens/easy/EasyFirst';
import EasySecond from './screens/easy/EastSecond';
import EasyThird from './screens/easy/EasyThird';
import NomalThird_sub from './screens/normal/NomalThird_sub';
import NomalThird from './screens/normal/NomalThird';


const App = () => {
    const Stack = createStackNavigator();

    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown:false}}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Details" component={DetailsScreen} />

                {/* 이지 */}
                <Stack.Screen name='EasyFirst' component={EasyFirst}/>
                <Stack.Screen name='EasySecond' component={EasySecond}/>
                <Stack.Screen name ='EasyThird' component={EasyThird}/>

                {/* 노말 */}
                <Stack.Screen name='NormalFirst'  component={NormalFirst}/>
                <Stack.Screen name='NormalSecond' component={Normal1}/>
                <Stack.Screen name='NomalThird_sub' component={NomalThird_sub}/>
                <Stack.Screen name='NomalThird' component={NomalThird}/>


                {/* 하드 */}
                <Stack.Screen name='Hard1' component={Hard1}/>
                <Stack.Screen name='Hard1-1' component={Hard1_1}/>
                <Stack.Screen name='Hard1-2'  component={Hard1_2}/>
                <Stack.Screen name='Hard1-3'  component={Hard1_3}/>

            </Stack.Navigator>
        </NavigationContainer>
    )
}

const styled = StyleSheet.create({
    container: {
        display:'flex',
        marginTop:100,
        backgroundColor:'#ffffff',
        alignItems:'center',
        justifyContent:'center',
    },
    title:{
        fontSize: 25,
        marginBottom:30,
    },
    view:{
        marginTop:20,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white',
        borderWidth:1,
        borderRadius:4,
        width:300,
        height: 45,
    },
    input:{
        paddingLeft: 20,
        width:300,
        borderWidth:1,
    }
});

export default App;