import React, {useState} from "react";
import {StyleSheet, View,ScrollView} from "react-native";
import {Input, Icon, Button} from "react-native-elements";
import {validateEmail} from "../../utils/Validation/Validation";
import * as firebase from "firebase";
import Loading from "../../components/Loading";
import { withNavigation}from "react-navigation";


 function RegisterForm(props){
    const {toastRef, navigation}= props;

     const [hidePassword, setHidePassword]=useState(true);
    const [hideRepeatPassword, sethideRepeatPassword ]=useState(true);

    const [isVisibleLoading, setIsVisibleLoading]=useState(false);
    const [email, setEmail] =useState("");
    const [password, setPassword]=useState("");
    const [repeatPassword, setRepeatPassword]=useState("");
  

    const Register= async()=>{
        setIsVisibleLoading(true);
    
        
       
        if (!email || !password|| !repeatPassword){
           
            toastRef.current.show("todos los campos son obligatorios");
        }else {

            if(!validateEmail(email)){
                toastRef.current.show("Email No valido ");

            }else{

                if(password.length<8|| repeatPassword.length<8){
                    
                    toastRef.current.show("Las contraseñas deben tener mas de 8 caracteres");

                }else{


                    if(password !=repeatPassword){
            
                        toastRef.current.show("Las contraseñas deben ser iguales");
                        }
                        else{
        
                          await firebase
                          .auth()
                          .createUserWithEmailAndPassword(email,password)
                          .then(()=>{
                            navigation.navigate("MyAccount");
                            
                          })
                          .catch(()=>{
                            toastRef.current.show("Ocurrio un error esperado al realizar el registro de usuario");
                          })
                        
                        }



                }
                            
                

            }
         
            
        }
        setIsVisibleLoading(false);
    };

    return(
             
        
    <View style={styles.formContainer} behavior="enabled"> 
   
      <Input 
    placeholder="correo Electronico"
    containerStyle={styles.inputForm}
    onChange={e=>setEmail(e.nativeEvent.text)}
    rightIcon={
        <Icon
        type="material-community"
        name="at"
        iconStyle={styles.iconStyle}
        />
    }
    />
    <Input
    placeholder="contraseña"
    containerStyle={styles.inputForm}
    onChange={e=>setPassword(e.nativeEvent.text)}
    password={true}
    secureTextEntry={hidePassword}   
    rightIcon={
        <Icon
        onPress={()=>setHidePassword(!hidePassword)}
        type="material-community"
        name={hidePassword ? "eye-outline": "eye-off-outline"}
        iconStyle={styles.iconStyle}
        />
    }    
    />
    <Input
    placeholder="Repetir contraseña"
    containerStyle={styles.inputForm}
    onChange={e=>setRepeatPassword(e.nativeEvent.text)}
    password={true}
    secureTextEntry={hideRepeatPassword}
    rightIcon={
        <Icon
        onPress={()=>sethideRepeatPassword(!hideRepeatPassword)}
        type="material-community"
        name={hideRepeatPassword ? "eye-outline": "eye-off-outline"}
        iconStyle={styles.iconStyle}
        />
    }    
    />
    <Button
    title="Registrarse"
    containerStyle={styles.btnContainer}
    buttonStyle={styles.btnRegister}
    onPress={Register}
    
    />

        <Loading text="Creando cuenta" isVisible={isVisibleLoading}/>
      
        </View>
        
       
   
        
    )}
    
    export default withNavigation(RegisterForm);




const styles=StyleSheet.create({

  
    formContainer:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        marginTop:30,
    },
    inputForm:{
        width:"100%",
        marginTop:20

    },


    iconStyle:{
        color:"#c1c1c1"

    },
    btnContainer:{
    marginTop:20,
    width:"95%"
    },
    btnRegister:{
        backgroundColor:"#8F2764"
    },
    scrollView: {
       marginHorizontal: 20,
    },

})