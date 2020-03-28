import React, {useState,useEffect} from "react";
import {StyleSheet,View, Text } from "react-native";
import ActionButton from "react-native-action-button";
import ListBusiness from "../../components/Business/ListBusiness";
import {firebaseApp} from "../../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";

const db=firebase.firestore(firebaseApp);

export default function Business(props) {
    
  const{navigation}=props;
  const [user,setUser]=useState(null);
  const [business, setBusiness]=useState([]);
  const [startBusiness, setStartBusiness]=useState(null);
  const [isLoading , setIsLoading]=useState(false);
  const [totalBusiness, setTotalBusiness]=useState(0);
  const [isReloadBusiness,setIsReloadBusiness]=useState(false);
  const limiteBusiness=12;
  const [userLogged, setUserLogged]=useState(false);

firebase.auth().onAuthStateChanged(user=>{
user? setUserLogged(true):setUserLogged(false);
})
  

  useEffect(()=>{
    firebase.auth().onAuthStateChanged(userInfo=>{
      setUser(userInfo);
    })
  },[]);

  useEffect(()=>{
    db.collection("business")
    .get().then(snap=>{
      setTotalBusiness(snap.size);
            
    })

      const getDatos = (async () =>{
        const resultBusiness=[];
        const business=db
        .collection("business")
        .orderBy("createAt", "desc")
        .limit(limiteBusiness);

        await business.get().then(response =>{
          setStartBusiness(response.docs[response.docs.length-1]);

          response.forEach(doc =>{
            let business=doc.data();
            business.id=doc.id;
            resultBusiness.push({business});
          })
          setBusiness(resultBusiness);
        })
      })()
      setIsReloadBusiness(false);
    },[isReloadBusiness]);


    handleLoadMore = async()=>{

      const resultBusiness=[];
      business.length < totalBusiness&& setIsLoading (true);
      

      const businessDb =db.collection("business")
      .orderBy("createAt", "desc")
      .startAfter(startBusiness.data().createAt)
      .limit(limiteBusiness);

      await businessDb.get().then(response=>{
        if(response.docs.length>0){
         
          setStartBusiness(response.docs[response.docs.length-1]);
        }else{
          setIsLoading(false);
        }

        response.forEach(doc=>{
          let business=doc.data();
          Business.id=doc.id;
          resultBusiness.push({business});
        })
          setBusiness([...business,...resultBusiness]);

      })

    }



    return(
    <View style={styles.viewBody}>


      
      <ListBusiness
      business={business} 
      isLoading={isLoading}  
      handleLoadMore={handleLoadMore} 
      navigation={navigation}
      />
      {user&& (
      <AddBusinessButton 
      setIsReloadBusiness={setIsReloadBusiness}
       navigation={navigation}
       />
      )} 
    </View>
        )
}

function AddBusinessButton(props){
  const{navigation,setIsReloadBusiness} =props;
  
  return(
    <ActionButton 
    
    buttonColor="#8f2764"
    onPress={() => 
      navigation.navigate("AddBusiness",{setIsReloadBusiness})}
    />
   
  )

}

const styles=StyleSheet.create({

  viewBody:{
    flex:1
  }


})
