import React,{useState, useEffect,useRef} from "react";
import {View,Text, Dimensions,StyleSheet,ScrollView} from "react-native";
import {Rating,ListItem,Icon} from "react-native-elements"
import Carousel from "../../components/Carousel";
import ListReviews from "../../components/Business/ListReviews";
import Map from "../../components/Map";
import ActionButton from "react-native-action-button";
import Toast from "react-native-easy-toast";

import {firebaseApp} from "../../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";
const db =firebase.firestore(firebaseApp);

const screenWidth=Dimensions.get("window").width;

export default function Busine(props){

    const{navigation}=props;
    const [user,setUser]=useState(null);
    const {business}=navigation.state.params.business.item;
    const [imagesBusiness, setImagesBusiness] = useState([]);
    const [rating, setRating] = useState(business.rating);
    const [isFollow, setIsFollow] = useState(false);
    const [userLogged, setUserLogged] = useState(false);
    const toastRef = useRef();

    firebase.auth().onAuthStateChanged(user=>{
      user? setUserLogged(true):setUserLogged(false);
      })
    
  

    useEffect(() => {
        const arrayUrls = [];
        (async () => {
          await Promise.all(
            business.images.map(async idImage => {
              await firebase
                .storage()
                .ref(`business-images/${idImage}`)
                .getDownloadURL()
                .then(imageUrl => {
                  arrayUrls.push(imageUrl);
                });
            })
          );
          setImagesBusiness(arrayUrls);
        })();
      }, []);


      useEffect(()=>{

        if(userLogged){


          db.collection("follow")
        .where("idBusiness","==", business.id)
        .where("idUser", "==", firebase.auth().currentUser.uid)
        .get()
        .then(()=>{
          if(Response.docs.length===1){
            
            setIsFollow(true);

          }
        })
        }
      },[userLogged]);

      const addFollow=()=>{
        
      const payload={
        idUser:firebase.auth().currentUser.uid,
        idBusiness:business.id
      }
      db.collection("follow").add(payload).then(()=>{
        setIsFollow(true);
        toastRef.current.show("Empezo a seguir el negocio",3000 );
      }).catch(()=>{
        toastRef.current.show("Erro al añadir el negocio a la lista de seguidos",3000)
      });
        
      }
      const removeFollow=()=>{
        db.collection("follow")
        .where("idBusiness","==", business.id)
        .where("idUser", "==", firebase.auth().currentUser.uid)
        .get()
        .then(response=>{
          response.forEach(doc =>{
            const idFollow=doc.id;
            db.collection("follow")
            .doc(idFollow)
            .delete()
            .then(()=>{
              setIsFollow(false);
              toastRef.current.show("Dejaste de segui el negocio ", 3000);
            }).catch(()=>{
              toastRef.current.show(" Se presento un error al momento de dejar de seguir el negocio",3000);
            })
          })
        })
      }

    return(
        <ScrollView style={styles.viewBody}>
              <View style={styles.viewFollow}>
                <Icon
                type="material-community"
                name={isFollow?"account-plus":"account-plus-outline"}
                onPress={isFollow ? removeFollow : addFollow}
              color={isFollow ? "#8f2764":"#000"}
                size={35}
                underlayColor="transparent"
                />
                
              </View>

           <Carousel
            arrayImages={imagesBusiness}
            width={screenWidth}
            height={200}
           />
            {!user&& (
     
        <AddProductButton navigation={navigation}
            />
             )}

           <TitleBusiness
           name={business.name}
           description={business.description}
            rating={rating}
           
           />
          <BusineInfo
          location={business.location}
          name={business.name}
          phone={business.phone}
          address={business.address}
          
          />

        <ListReviews
        navigation={navigation}
        idBusiness={business.id}
        setRating={setRating}
        
      />
              <Toast ref={toastRef} position="center" opacity={0.5}/>

        </ScrollView>
       
    )
}


function TitleBusiness(props){
    const {name, description,rating}=props;
    return(
        <View style={styles.viewBusinessTitle}>
            <View style={{flexDirection:'row'}}>
            <Text style={styles.nameBusiness}>{name} </Text>
            <Rating
            style={styles.rating}
              imageSize={20}
              readonly
              startingValue={parseFloat(rating)}
            />
            </View>
            <Text style={styles.descriptionBusiness}>{description}</Text>
        </View>

    )
}

function BusineInfo (props){
  const {location, name, address, phone}=props;

  const listInfo = [
    {
      text: address,
      iconName: "map-marker",
      iconType: "material-community",
      action: null
    },
    {
      text: phone,
      iconName: "phone",
      iconType: "material-community",
      action: null
    }
  
  ];


return(
  <View style={styles.viewBusinessInfo}>
    <Text style={styles.businessInfoTitle}> Información sobre el negocio</Text>
    <Map
  location={location}
  name={name}
  height={100}/>
     {listInfo.map((item, index) => (
        <ListItem
          key={index}
          title={item.text}
          leftIcon={{
            name: item.iconName,
            type: item.iconType,
            color: "#8f2764"
          }}
          containerStyle={styles.containerListItem}
        />
      ))}
     
  </View>
 
)}



function AddProductButton(props){
    const{navigation} =props;
    
    return(
      <ActionButton style={{ flex:1}}
      buttonColor="#8f2764"
      onPress={() => navigation.navigate("AddProduct")}
      />
     
    )
  
  }

const styles=StyleSheet.create({

  btnAddProduct:{
    flex:1,
    justifyContent:"flex-end"
  },

  containerListItem:{
    borderBottomColor:"#d8d8d8",
    borderBottomWidth:1

  },

  businessInfoTitle:{
    fontSize:20,
    fontWeight:"bold",
    marginBottom:10

  },
  
  viewBusinessInfo:{
    margin:15,
    marginTop:25
  },


  descriptionBusiness:{
    marginTop:5,
    color:"grey"

  },
  
  viewFollow: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 2,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 100,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 5
  },

    rating:{
        position:"absolute",
        right:0
    },

    viewBody:{
    flex:1
    },
    viewBusinessTitle:{
        margin:15
    },
    nameBusiness:{
        fontSize:20,
        fontWeight:"bold"
    },

})