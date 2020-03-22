import React, {useState} from "react";
import {StyleSheet,View, Text} from "react-native";
import {Input, Button} from "react-native-elements";
import * as firebase from "firebase";
import {reauthenticate} from "../../utils/Api";
import {validateEmail}from "../../utils/Validation/Validation";

export default function ChangeEmailForm(props){
const {email, setIsVisibleModal, setReloadData, toastRef}=props;

    const [newEmail, setNewEmail]=useState("");
    const [password, setPassword]=useState("");
    const [error, setError]=useState({});
    const [hidePassword, setHidePassword]=useState(true);
    const [isLoading, setIsLoading]=useState(false);
    
    const upDateEmail=()=>{
        setError({});

       if(!newEmail || email=== newEmail){
                setError({email:" El email no puede ser igual o estar vacio." })
        }
        else {
            if(!validateEmail(newEmail)){
             setError({email:" El email ingresado no es valido." })
             } 
               else{
            setIsLoading(true);
            reauthenticate(password)
            .then(()=>{                
                firebase
                .auth()
                .currentUser.updateEmail(newEmail).then(()=>{
                    setIsLoading(false);
                    setReloadData(true);
                    toastRef.current.show("Email actualizado.");
                    setIsVisibleModal(false);

                }).catch(()=>{
                    setError({email:"error al actualizar el Email."})
                    setIsLoading(false);
                })           

            })
            .catch(()=>{
                setError({password:"la contraseña no es correcta. "})
                setIsLoading(false);
            })
          }
        }
        
    }


    return(
        <View style={styles.view}>
           <Input
           placeholder="Correo Electronico"
           containerStyle={styles.input}
           defaultValue={email&&email}
           onChange={e=>setNewEmail(e.nativeEvent.text)}
           rightIcon={{
               type:"material-community",
               name:"at",
               color:"#c2c2c2"
           }}
           errorMessage={error.email}
           
           />
           <Input
           placeholder="contraseña"
           containerStyle={styles.input}
           password={true}
           secureTextEntry={hidePassword}
           onChange={e=>setPassword(e.nativeEvent.text)}
           rightIcon={{
            type:"material-community",
            name: hidePassword ? "eye-outline":"eye-off-outline",
            color:"#c2c2c2",
            onPress:()=>setHidePassword(!hidePassword)


           }}
           errorMessage={error.password}
           />
           <Button
           title="Cambiar Email"
           containerStyle={styles.btnContainer}
           buttonStyle={styles.btn}
           onPress={upDateEmail}
           loading={isLoading}

           />
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
        marginBottom:10,
        marginTop:10
    },
    btnContainer:{
        marginTop:20,
        width:"95%"
    },
    btn:{
        backgroundColor:"#8f2764"
    }

})