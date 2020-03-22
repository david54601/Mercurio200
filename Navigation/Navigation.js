import React from "react";
import {Icon}from "react-native-elements";
import {createAppContainer } from "react-navigation";
import {createBottomTabNavigator}from "react-navigation-tabs";

import BusinessScreenStacks from "./BusinessStacks";
import MyAccountScreenStacks from "./MyAccountStacks";
import ProductScreenStacks from "./ProductStacks";
import SearchScreenStacks from "./SearchStacks";

const NavigationStacks = createBottomTabNavigator({

    Business:{
        screen:BusinessScreenStacks,
        
        navigationOptions:()=>({
            tabBarLabel:"Negocios",
            tabBarIcon:({tintcolor})=>(
            <Icon
                type="material-community"         
                name="newspaper"
                size={22}
                color={tintcolor}           
            /> )

        })
    
    },
    MyAccount:{

        screen:MyAccountScreenStacks,
        navigationOptions:()=>({
            tabBarLabel:"Mi cuenta",
            tabBarIcon:({tintcolor})=>(
                <Icon
                type="material-community"
                name="home-outline"
                size={22}
                color={tintcolor}
                />
            )


        })
    },
    Product:{
        screen:ProductScreenStacks,
        navigationOptions:()=>({
            tabBarLabel:"productos",
            tabBarIcon:({tintcolor})=>(
                <Icon
                type="material-community"         
                name="compass-outline"
                size={22}
                color={tintcolor}           
            /> )

        })

    }, Search:{
        screen:SearchScreenStacks,
                navigationOptions:()=>({
            tabBarLabel:"busqueda",
            tabBarIcon:({tintcolor})=>(
            <Icon
                type="material-community"         
                name="magnify"
                size={22}
                color={tintcolor}           
            /> )

        })
    
    }
    

},
{
    initialRouteName:"Business",
    order:["Business","Product","Search","MyAccount"],
    tabBarOptions:{
        inactiveTintColor:"#646464",
        activeTintColor:"#8F2764"
    }
}

);

export default createAppContainer(NavigationStacks);
