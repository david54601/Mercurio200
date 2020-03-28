import React, {useEffect,useState} from "react";
import {StyleSheet,Text,FlatList,View} from "react-native"
import {Rating,Button,Avatar}from "react-native-elements";

import {firebaseApp} from "../../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";
const db=firebase.firestore(firebaseApp);

export default function ListReviews(props){
const {navigation,idBusiness,setRating}=props;
const [reviews,setReviews]=useState([]);
const [reviewsReload,setReviewsReload]=useState(false);
const [userLogged, setUserLogged]=useState(false);

firebase.auth().onAuthStateChanged(user=>{
user? setUserLogged(true):setUserLogged(false);
})
    

    useEffect(()=>{
        
        (async ()=>{
            const resultReviews=[];
            const arrayRating=[];

            db.collection("reviews")
            .where("idBusiness", "==",idBusiness)
            .get()
            .then(response=>{
                response.forEach(doc =>{
                    resultReviews.push(doc.data());
                    arrayRating.push(doc.data().rating)
                })
                let numSum=0;
                arrayRating.map(value=>{
                    numSum=numSum+value;
                })
                const countRating = arrayRating.length;
                const resultRating= numSum/countRating;
                const resultRatingFinish=resultRating?resultRating:0;
                
                setReviews(resultReviews);
                setRating(resultRatingFinish);
            })

        setReviewsReload(false);
        })()
        
    },[reviewsReload])


    return(
        <View>

            {userLogged ? (


      <Button
     buttonStyle={styles.btnAddReview}
     titleStyle={styles.btnTitleAddReview}
     title="Escribe una opinión"
     icon={{
     type:"material-community",
     name:"square-edit-outline",
     color:"#8f2764"
    
    }}
   onPress={()=>navigation.navigate("AddReviewBusiness", {
     idBusiness:idBusiness,
     setReviewsReload:setReviewsReload
    
     })}
/>

           ) :(
            <View style={{flex:1}}>
            <Text style={{textAlign:"center", padding:20, color:"#8f2764"}}
            onPress={()=>navigation.navigate("Login")}
            >
                 Para Escribir una opinión es necesario estar logeado {" "} 
                 <Text style={{fontWeight:"bold"}}> Pulsa AQUÍ para iniciar sesión </Text>
             </Text>


            </View>

           )}

      
            <FlatList
               data={reviews} 
               renderItem={review=><Review review={review}/>}
               keyExtractor={(item, index)=>index.toString()}

            />
        </View>
    )
}

function Review (props){
   
    const {review,rating,createAt,avatarUser}= props.review.item;
    const createDateReview = new Date(createAt.seconds * 1000);

    return(
      <View style={styles.viewReview}>
      <View style={styles.viewImageAvatar}>
        <Avatar
          size="large"
          rounded
          containerStyle={styles.imageAvatarUser}
          source={{
            url: avatarUser
              ? avatarUser
              : "https://api.adorable.io/avatars/285/abott@adorable.png"
          }}
        />
      </View>
            <View style={styles.viewInfo}>
        <Text style={styles.reviewText}>{review}</Text>
        <Rating imageSize={15} startingValue={rating} readonly />
        <Text style={styles.reviewDate}>
          {createDateReview.getDate()}/{createDateReview.getMonth() + 1}/
          {createDateReview.getFullYear()} - {createDateReview.getHours()}:
          {createDateReview.getMinutes() < 10 ? "0" : ""}
          {createDateReview.getMinutes()}
        </Text>
      </View>
            
        </View>
    )
}

const styles =StyleSheet.create({

    viewReview: {
        flexDirection: "row",
        margin: 10,
        paddingBottom: 20,
        borderBottomColor: "#e3e3e3",
        borderBottomWidth: 1
      },
    btnAddReview:{
        backgroundColor:"transparent"

    },
    btnTitleAddReview:{
        color:"#8f2764"
    },
    viewImageAvatar: {
      marginRight: 15
    },
    viewInfo: {
      flex: 1,
      alignItems: "flex-start"
    },
     reviewText: {
        paddingTop: 2,
        color: "grey",
        marginBottom: 5,
        fontWeight: "bold"
      },
     reviewDate: {
    marginTop: 5,
    color: "grey",
    fontSize: 12,
    position: "absolute",
    right: 0,
    bottom: 0
  }, 
  imageAvatarUser: {
    width: 50,
    height: 50
  },



})