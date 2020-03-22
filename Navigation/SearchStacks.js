import { createStackNavigator } from "react-navigation-stack";
import SearchScreen from "../screens/Search";

const SearchScreenStacks =createStackNavigator({
    Products:{
        screen:SearchScreen,
        navigationOptions:()=>({
            title: "Busquedas"
        })
    }
})


export default SearchScreenStacks;

