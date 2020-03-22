import React, {useRef} from "react";
import {StyleSheet, View, Text,Image,} from"react-native";
import RegisterForm from "../../components/Account/RegisterForm"
import Toast from "react-native-easy-toast";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";


export default function Register(){
    const toastRef=useRef();


    return(
  
        <KeyboardAwareScrollView>
            <Image
            source={require("../../assets/img/descarga.png")}
            style={style.logo}
            resizeMode="contain"
            />
            <View style={style.formulario}> 
                <RegisterForm toastRef={toastRef}/>
            </View>
            

            <Toast ref={toastRef} position="center" opacity={0.5}/>
        </KeyboardAwareScrollView>
    );


}

const style=StyleSheet.create({

    logo:{
        width:"100%",
        height:150,
        marginTop:20,
    }, 
    formulario:{
        marginRight:40,
        marginLeft:40

    }

})


