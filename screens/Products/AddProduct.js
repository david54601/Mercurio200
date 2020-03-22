import React, {useState,useRef} from "react";
import {View} from "react-native";
import Toast from "react-native-easy-toast";
import Loading from "../../components/Loading";
import AddProductForm from "../../components/Products/AddProductForm";

export default function AddProduct(props) {
    const {navigation}=props;
    const toastRef =useRef();
const[isLoading, setIsLoading ]=useState(false);


    return(
        <View>
            <AddProductForm 
            navigation={navigation}
            toastRef={toastRef}
            setIsLoading={setIsLoading}
            />
            <Toast ref={toastRef} position="center" opacity={0.5}/>
            <Loading isVisible={isLoading} text="creando Producto"/>
        </View>
    )
}