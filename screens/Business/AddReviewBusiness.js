import React, { useState,useRef } from "react";
import {StyleSheet,View } from "react-native"
import {AirbnbRating,Button,Input} from "react-native-elements";
import Toast from "react-native-easy-toast";
import Loading from "../../components/Loading";

    import {firebaseApp} from "../../utils/FireBase";
    import firebase from "firebase/app";
    import "firebase/firestore";
    const db=firebase.firestore(firebaseApp);


export default function AddREviewBusiness(props){
    const {navigation}=props;
    const {idBusiness,setReviewsReload}=navigation.state.params;
    const [rating, setRating]=useState(null);
    const [review,setReview]=useState("");
    const toastRef=useRef();
    const [isLoading, setIsLoading]=useState(false);
   
  
    
    const addReview =()=>{
        if(rating===null){
            toastRef.current.show("no has dado ninguna puntuacion",3000);
        } else if(!review){
            toastRef.current.show("no ingreso ningun comentario",3000);
        }else{
           
            setIsLoading(true);
          
                    const user=firebaseApp.auth().currentUser;
                    const payload={
                        idUser:user.uid,
                        avatarUser:user.photoURL,
                        idBusiness:idBusiness,
                        review:review,
                        rating:rating,
                        createAt:new Date()

                    }
                    //en este linea saca el usuario y con user.uid saca el id de el        
                   db.collection("reviews").add(payload).then(()=>{
                    updateBusiness(); 
                }).catch(()=>{
                 toastRef.current.show("Error al Crear el comentario");
                 setIsLoading(false);
                })  
             }  
         }

            const updateBusiness = () => {
                const businessRef = db.collection("business").doc(idBusiness);
            
                businessRef.get().then(response => {
                  const businessData = response.data();
                  const ratingTotal = businessData.ratingTotal + rating;
                  const quantityVoting = businessData.quantityVoting + 1;
                  const ratingResult = ratingTotal / quantityVoting;
            
                  businessRef
                    .update({ rating: ratingResult, ratingTotal, quantityVoting })
                    .then(() => {
                        setReviewsReload(true);
                        setIsLoading(false);
                        navigation.goBack();
                      
                     
                    });
                });
              };
  
    return(
        <View style={styles.viewBody}>
            <View style={styles.viewRating}>
            <AirbnbRating
                count={5}
                reviews={["Pésimo","Deficiente","Normal","Muy Bueno"," Excelente"]}            
                defaultRating={0}
                size={35}
                onFinishRating={value=> setRating(value)}
            />
           </View>
            <View style={styles.formReview}>
               
               <Input
                placeholder="Comentario"
                multiline={true}
                inputContainerStyle={styles.input}
                onChange={e=>setReview(e.nativeEvent.text)}
                />
            <Button
            title="Enviar Comentario"
            onPress={addReview}
            containerStyle={styles.btnContainer}
            buttonStyle={styles.btn}/>
            </View>
            <Toast ref={toastRef} position="center" opacity={0.5} />
            <Loading  isVisible={isLoading} text="Enviado comentario" />
        </View>

    )

}


const styles=StyleSheet.create({


    btn:{
        backgroundColor:"#8f2764"
    },

    btnContainer:{
        flex:1,
        justifyContent:"flex-end",
        marginTop:20,
        marginBottom:10,
        width:"95%"

    },

    textArea:{
        height:150,
        width:"100%",
        padding:0,
        margin:0

    },

    input:{
        marginBottom:10
    },

    formReview:{
        flex:1,
        alignItems:"center",
        margin:10,
        marginTop:40,
       
    },
    viewBody:{
        flex:1
    },
    viewRating:{
        height:110,
        backgroundColor:"#f2f2f2"
    },


})