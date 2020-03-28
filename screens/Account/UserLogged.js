import React, { useState, useEffect,useRef } from "react";
import {StyleSheet,View} from "react-native";
import {Button} from "react-native-elements";
import * as firebase from "firebase";
import InfoUser from "./InfoUser";
import Toast from "react-native-easy-toast";
import Loading from "../../components/Loading";
import AccountOptions from "../Account/AccountOptions";


export default function UserLogged(props) {
    const[userInfo, setUserInfo]=useState({});
    const[reloadData, setReloadData]=useState(false);
    const[isLoading, setIsLoading]=useState(false);
    const[textLoading, setTextLoading]=useState("");
    const toastRef=useRef();
    const {navigation}=props;
    

    
    useEffect(()=>{

        (async()=>{
            const user=await firebase.auth().currentUser;
            setUserInfo(user.providerData[0])
        })();
        setReloadData(false);
    },[reloadData])

    return(
        <View styles={styles.viewUserInfo}> 
            <InfoUser 
            userInfo={userInfo}
             setReloadData={setReloadData} 
             toastRef={toastRef}
             setIsLoading={setIsLoading}
             setTextLoading={setTextLoading}
             />
             <AccountOptions
              userInfo={userInfo}
              setReloadData={setReloadData}
              toastRef={toastRef}
              />
              <View style={styles.containerFollowBusiness}> 

              <Button 
            title="Tiendas"
            buttonStyle={styles.btnBusinessFollow}
            titleStyle={styles.btnCLoseSessionText}
            onPress={()=>firebase.auth().signOut()}
            />
              <Button 
            title="Seguidos"
            buttonStyle={styles.btnBusinessFollow}
            titleStyle={styles.btnCLoseSessionText}
            onPress={()=>navigation.navigate("Follow")}
            />

              </View>

            <Button 
            title="Cerrar sesión"
            buttonStyle={styles.btnCLoseSession}
            titleStyle={styles.btnCLoseSessionText}
            onPress={()=>firebase.auth().signOut()}
            />
    
        <Toast ref={toastRef} position="center" opacity={0.5}/>
        <Loading text={textLoading} isVisible={isLoading}/>

        </View>
    )
    
}
 
const styles=StyleSheet.create({
    

    

    btnBusinessFollow:{
        width:"90%",
        marginTop:15,
        backgroundColor:"#fff",
        paddingBottom:10,
        
        
        
        
    },
    
    containerFollowBusiness:{
        flexDirection:"row",
        width:"100%"
        
      

    },

    btnBusiness:{
        width:"90%",
        marginTop:15,
        backgroundColor:"#fff",
        paddingBottom:10,
            
    },

    viewUserInfo:{
        minHeight:"100%",
        backgroundColor:"#f2f2f2"
    },
    btnCLoseSession:{
        marginTop:30,
        borderRadius:0,
        backgroundColor:"#fff",
        borderTopWidth:1,
        borderTopColor:"#e3e3e3",
        borderBottomWidth:1,
        borderBottomColor:"#e3e3e3",
        paddingTop:10,
        paddingBottom:10

    },
    btnCLoseSessionText:{
        color:"#8f2764"
    }

})

 
