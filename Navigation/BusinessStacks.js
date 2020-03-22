 import {createStackNavigator} from "react-navigation-stack";
import BusinessScreen from "../screens/Business";
import AddBusinessScreen from "../screens/Business/AddBusiness";
import BusineScreen from "../screens/Business/Busine";
import AddReviewBusinessScreen from "../screens/Business/AddReviewBusiness";


export const BusinessScreenStacks= createStackNavigator({
   
    Business:{
    screen:BusinessScreen,
    navigationOptions:()=>({
        title:"Negocios"
    })
    
    },
    AddBusiness:{
        screen:AddBusinessScreen,
        navigationOptions:()=>({
            title: "Nuevo Negocio"
        })
    },
    Busine:{
        screen:BusineScreen,
        navigationOptions:props=>({
            title: props.navigation.state.params.business.item.business.name
        })
    }
    ,AddReviewBusiness:{
        screen:AddReviewBusinessScreen,
        navigationOptions:()=>({
            title: "Agregar Comentario"
        })
    },


})

export default BusinessScreenStacks;