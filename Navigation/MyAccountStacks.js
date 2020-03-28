import { createStackNavigator } from "react-navigation-stack";
import MyAccountScreen from "../screens/Account/MyAccount";
import LoginScreen from "../screens/Account/Login";
import RegisterScreen from "../screens/Account/Register";
import FollowScreen from "../screens/Account/Follow";

 const MyAccountScreenStacks = createStackNavigator({

    MyAccount:{
        screen:MyAccountScreen,
        navigationOptions:()=>({
            title: "mi cuenta"
        })


    }, Login:{
        screen:LoginScreen,
        navigationOptions:()=>({
            title:"login"
        })


    }, Register:{
        screen:RegisterScreen,
        navigationOptions:()=>({
            title:"Registro"
        })
    }

    , Follow:{
        screen:FollowScreen,
        navigationOptions:()=>({
            title:"Seguidos"
        })
    }

});
export default MyAccountScreenStacks;