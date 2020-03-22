import React,{useState, useEffect,useRef} from "react";
import {View,Text, Dimensions,StyleSheet,ScrollView} from "react-native";
import {Rating,ListItem,Icon} from "react-native-elements"
import Carousel from "../../components/Carousel";
import ListReviews from "../../components/Business/ListReviews";
import Map from "../../components/Map";
import *as firebase from "firebase";
import ActionButton from "react-native-action-button";

const screenWidth=Dimensions.get("window").width;

export default function Busine(props){

    const{navigation}=props;
    const {business}=navigation.state.params.business.item;
    const [imagesBusiness, setImagesBusiness] = useState([]);
    const [rating, setRating] = useState(business.rating);
    const [isFollow, setIsFollow] = useState(false);
    const [userLogged, setUserLogged] = useState(false);
    const toastRef = useRef();
    
  

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


      const addFollow=()=>{
        console.log("negocio seguido");
        setIsFollow(true);
        
      }

      const removeFollow=()=>{
        console.log("dejaste  de seguir un negocio");
        setIsFollow(false);
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
           <AddProductButton navigation={navigation}
            style={styles.btnAddProduct}/>

        <ListReviews
        navigation={navigation}
        idBusiness={business.id}
        setRating={setRating}
        
      />

           
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
      <ActionButton
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