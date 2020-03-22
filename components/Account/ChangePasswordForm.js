import React,{useState} from "react";
import {StyleSheet,View,Text } from "react-native"
import {Input, Button } from "react-native-elements";
import * as firebase from "firebase";
import {reauthenticate} from "../../utils/Api";

export default function ChangePasswordForm(props){  
    const{setIsVisibleModal,toastRef} =props;
    const [password, setPassword]=useState("");
    const[newPassword, setNewPassword]=useState("");
    const[newPasswordRepeat, setNewPasswordRepeat]=useState("");
    const [error, setError]=useState({});
    const[isLoading, setIsLoading]=useState(false);
    const [hidePassword , setHidePassword]=useState(true);
    const [hideNewPassword, setHideNewPassword]=useState(true);
    const [hideNewPasswordRepeat, setHideNewPasswordRepeat]=useState(true);
    
    const updatePassword =()=>{
        setError({});

        if(!password || !newPassword|| !newPasswordRepeat){
            let objError={};
            !password&& (objError.password=" no puede Estar vacio. ") ;
            !newPassword&& (objError.newPassword=" No puede Estar vacio. ");
            !newPasswordRepeat&& (objError.newPasswordRepeat=" No puede Estar vacio. ");

            setError(objError);
            
          } else {
            if(newPassword!==newPasswordRepeat){
                
                setError({
                    newPassword:"Las nuevas contraseña deben de ser Iguales",
                    newPasswordRepeat:"Las nuevas contraseña deben de ser Iguales",
                })
            } else{

                if(newPassword===password){
                   
                    setError({
                        newPassword:"La contraseña nueva debe de ser diferentes a la actual",
                        newPasswordRepeat:"La contraseña nueva debe de ser diferentes a la actual",
                    })

                }else{
                    setIsLoading(true);
                reauthenticate(password)
                .then(()=>{
                   firebase.auth().currentUser.updatePassword(newPassword).then(()=>{
                    setIsLoading(false);
                    toastRef.current.show("Contraseña actualizada");
                    setIsVisibleModal(false);
                    //firebase.auth().signOut();

                   }).catch(()=>{
                       setError({general:"Error al actualizar la contraseña "})
                       setIsLoading(false);
                   })

                })
                .catch(()=>{
                    setError({password:"La contraseña no es correcta "})
                    setIsLoading(false);
                })
            }
        }
        }

    }


    return(
        <View style={styles.view}>
            <Input
            placeholder="Contraseña Actual"
            containerStyle={styles.input}
            password={true}
            secureTextEntry={hidePassword}
            onChange={e=>setPassword(e.nativeEvent.text)}
            rightIcon={{
                type:"material-community",
                name:hidePassword? "eye-outline":"eye-off-outline",
                color:"#c2c2c2",
                onPress:()=>setHidePassword(!hidePassword)
            }}
            errorMessage={error.password}
            />
            <Input
            placeholder="Nueva Contraseña "
            containerStyle={styles.input}
            password={true}
            secureTextEntry={hideNewPassword}
            onChange={e=>setNewPassword(e.nativeEvent.text)}
            rightIcon={{
                type:"material-community",
                name:hideNewPassword? "eye-outline":"eye-off-outline",
                color:"#c2c2c2",
                onPress:()=>setHideNewPassword(!hideNewPassword)
            }}
            errorMessage={error.newPassword}
            />
            <Input
            placeholder="Repetir Nueva Contraseña "
            password={true}
            secureTextEntry={hideNewPasswordRepeat}
            onChange={e=>setNewPasswordRepeat(e.nativeEvent.text)}
            rightIcon={{
                type:"material-community",
                name:hideNewPasswordRepeat? "eye-outline":"eye-off-outline",
                color:"#c2c2c2",
                onPress:()=>setHideNewPasswordRepeat(!hideNewPasswordRepeat)
            }}
            errorMessage={error.newPasswordRepeat}
            />

            <Button
            title="Cambiar Contraseña"
            buttonStyle={styles.btn}
            containerStyle={styles.bntContainer}
            onPress={updatePassword}
            loading={isLoading}
            />
            <Text>{error.general}</Text>
         </View>
    )

}
const styles=StyleSheet.create({
    view:{
        alignItems:"center",
        paddingTop:10,
        paddingBottom:10
    },
    input:{
        marginBottom:10

    },
    bntContainer:{
        marginTop:20,
        width:"95%"
    },
    btn:{
        backgroundColor:"#8f2764"
    }    


})