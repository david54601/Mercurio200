import { createStackNavigator } from "react-navigation-stack";
import ProductScreen from "../screens/Products/Products";
import AddProductScreen from "../screens/Products/AddProduct";


const ProductsScreenStacks =createStackNavigator({
    Products:{
        screen:ProductScreen,
        navigationOptions:()=>({
            title: "Productos"
        })
    },
    AddProduct:{
        screen:AddProductScreen,
        navigationOptions:()=>({
            title: "Nuevo producto"
        })
    }
})


export default ProductsScreenStacks;

