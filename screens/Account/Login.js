import React, {useRef} from "react";
 import {StyleSheet, View, ScrollView, Text, Image} from "react-native";
 import {Divider} from "react-native-elements";
 import LoginForm from "../../components/Account/LoginForm";
 import Toast from "react-native-easy-toast";
import LoginFacebook from "../../components/Account/LoginFacebook";

export default function Login(props){
    const {navigation}= props;
    const toastRef=useRef();

    return(
        <ScrollView>
      <Image
      source={require("../../assets/img/descarga.png")} 
      style={style.Logo}
      resizeMode="contain"
            /> 
        <View style={style.viewContainer}>
            <LoginForm toastRef={toastRef}/>  
            <CreateAccount navigation={navigation}/>        
        </View>
        <Divider style={style.Divider}/>
        <View style={style.viewContainer}>
        
            <LoginFacebook toastRef={toastRef} navigation={navigation}/>
        </View>
        <Toast ref={toastRef} position="center" opacity={0.5}/>
        </ScrollView>
      )}


      function CreateAccount(props){
        const{navigation}= props;
       

        return(
            <Text style={style.TextRegister}>
                ¿Aún no estas registrado? {" "}
            
            
            <Text style={style.btnRegister}
            onPress={() => navigation.navigate("Register")}>
                 Regístrate
            </Text>
            </Text>
        )

      }

const style=StyleSheet.create({

    Logo:{
        width:"100%",
        height:150,
        marginTop:20

    },
    viewContainer:{
        marginRight:40,
        marginLeft:40
        
    },
    TextRegister:{
        marginTop:15,
        marginLeft:10,
        marginRight:10
        
    },
    btnRegister:{
        color:"#8f2764",
        fontWeight:"bold"
         

    },

    divider:{
        backgroundColor:"#00a680",
        margin:40 
    }

})



