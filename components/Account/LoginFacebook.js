import React, {useState} from "react";
import {StyleSheet} from "react-native";
import {SocialIcon} from "react-native-elements";
import * as firebase from "firebase";
import * as Facebook from 'expo-facebook';
import {FacebookApi} from "../../utils/Social";
import Loading from "../Loading";


export default function LoginFacebook(props){

    const{toastRef, navigation}=props;
    const[isLoading, setIsLoading]=useState(false);
    
    const login= async()=>{
      
        await Facebook.initializeAsync(FacebookApi.application_id);
       
        const {type, token}=await Facebook.logInWithReadPermissionsAsync(
            {permissions:FacebookApi.permissions}
        )

        

        if(type==="success"){
            setIsLoading(true);
            const credentials=firebase.auth.FacebookAuthProvider.credential(token);
            await firebase
            .auth()
            .signInWithCredential(credentials)
            .then(()=>{
                
                navigation.navigate("myAccount",navigation={navigation});
                
            })
            .catch(()=>{
                toastRef.current.show("Error accediendo con facebook");
                
            })
        } else if(type==="cancel"){
            toastRef.current.show("inicio de sesion cancelado");
        
        } else{
            toastRef.current.show("Error desconocido");
            
        }
        setIsLoading(false);
    }

    return(
        <>
        <SocialIcon style={styles.styleSocialIcon}
        title="Inicia sesión con Facebook "
        button
        type="facebook"
        onPress={login}
        />
        <Loading isVisible={isLoading} text="Iniciando sesión "/>
        </>
    )

}

const styles=StyleSheet.create({

    styleSocialIcon:{
        marginTop:20
    }

})