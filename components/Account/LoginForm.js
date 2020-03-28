import React, {useState} from "react";
import { View,StyleSheet} from "react-native";
import {Input, Icon, Button} from "react-native-elements";
import {validateEmail} from "../../utils/Validation/Validation/";
import { withNavigation}from "react-navigation";
import * as firebase from "firebase";
import Loading from "../../components/Loading";



 function LoginForm(props){
    const {toastRef, navigation}= props;
    const[hidePassword, setHidePassword]= useState(true);
    const[email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [isVisibleLoading, setIsVisibleLoading]=useState(false);
    


    const Login= async (props)=>{
        setIsVisibleLoading(true);

            if(!email || !password){
            toastRef.current.show("Los campos no pueden ir vacios ");
           
        } else{
            if(!validateEmail(email)){
                toastRef.current.show("Email no valido");
            } else{
                await firebase
                .auth()
                .signInWithEmailAndPassword(email,password)
                .then(()=>{

                    navigation.navigate("MyAccount");                    
                    console.log("Login Correcto");
                })
                .catch(()=>{
                    toastRef.current.show("Email o contraseña incorrecta ");
                })

            }

        }
        setIsVisibleLoading(false);
    }

    return(
        <View style={styles.formContainer}>
            <Input
        placeholder="Correo electronico"
        containerStyle={styles.inputForm}
        onChange={event=>setEmail(event.nativeEvent.text.trim())}
        rightIcon={
            <Icon
                type="material-community"
                name="at"
                iconStyle={styles.iconRight}
            />
        }
        
        />
        <Input
        placeholder="Contraseña"
        onChange={e=>setPassword(e.nativeEvent.text)}
        containerStyle={styles.inputForm}
        password={true}
        secureTextEntry={hidePassword} 
               
          
        rightIcon={
            <Icon
            type="material-community"
            name={hidePassword ? "eye-outline":"eye-off-outline"}
            iconStyle={styles.iconRight}
            onPress={()=>setHidePassword(!hidePassword)}
            />

        }
        />

        <Button
        containerStyle={styles.btnContainerLogin}
        buttonStyle={styles.btnLogin}
        title="iniciar sesion"
        onPress={Login}
        />
            <Loading isVisible={isVisibleLoading} text="Iniciando sesión"/>

        </View>
    )
}

export default withNavigation(LoginForm);

const styles=StyleSheet.create({
    
    formContainer:{
    flex:1,
    alignItems:"center",
    justifyContent:"center",
    marginTop:30

    },
    inputForm:{

        width:"100%",
        marginTop:20

    },
    iconRight:{
        color:"#c1c1c1"

    },
    btnContainerLogin:{
        marginTop:20,
        width:"95%"
    },
    btnLogin:{
        backgroundColor:"#8F2764"
    }

})