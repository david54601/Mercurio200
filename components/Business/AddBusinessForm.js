import React,{useState,useEffect} from "react";
import {StyleSheet,View,ScrollView,Alert,Dimensions} from "react-native"
import {Icon,Avatar,Image,Input,Button} from "react-native-elements";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import MapView from "react-native-maps";
import Modal from "../Modal";
import * as Location from "expo-location";
import uuid from "uuid/v4";


import{firebaseApp} from "../../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";

const db=firebase.firestore(firebaseApp);

const WidthScreen=Dimensions.get("window").width;
const WidthMiniature =(WidthScreen/5)-15;

export default function AddBusinessForm(props){

    const{toastRef,setIsLoading,navigation,setIsReloadBusiness}=props;
    const[imagesSelected, setImagesSelected]=useState([]);
    const[businessName ,setBusinessName]=useState("");
    const[businessAddress,setBusinessAddress]=useState("");
    const[businessPhone,setBusinessPhone]=useState("");
    const[businessDescription,setBusinessDescription]=useState("");
    const[isVisibleMap, setIsVisibleMap]=useState(false);
    const[locationBusiness,setLocationBusiness ]=useState(null);
   

    const addBusiness =()=>{

    if(!businessName || !businessAddress || !businessPhone||!businessDescription ){
        toastRef.current.show("Todos los campos del formulario son obligatorios",3000);
    }     
    else if (imagesSelected.length===0){
        toastRef.current.show("El negocio tiene que contar por lo menos con una foto",3000);
    }else if(!locationBusiness){

        toastRef.current.show("Tienes que Geolocalizar en el mapa ",3000);
    }
    else{

        setIsLoading(true);
        uploadImageStorage(imagesSelected).then(arrayImages=>{
          
          db.collection("business")
          .add({
            name:businessName,
            address: businessAddress,
            description: businessDescription,
            location:locationBusiness,
            phone:businessPhone,
            images:arrayImages,
            rating:0,
            ratingTotal:0,
            quantityVoting:0,
            createAt:new Date(),
            creatBy:firebaseApp.auth().currentUser.uid
          }).then(()=>{
              setIsLoading(false);
              setIsReloadBusiness(true);
              navigation.navigate("Business");
          }).catch(error=>{
              setIsLoading(false);
              toastRef.current.show("Error Al crear el Negocio, por favor intentar más tarde",3000);
              
            
          })
        })   
    }
 }


const uploadImageStorage= async imageArray=>{
    const imageBlob =[];
    
    await Promise.all(
        imageArray.map(async image=>{
            const response = await fetch (image);
            const blob = await response.blob();
            const ref = firebase
            .storage()
            .ref("business-images")
            .child(uuid());

            await ref.put(blob).then(result =>{
                
               imageBlob.push(result.metadata.name);

            })

        })
    )
        return imageBlob;

}


return(
    <ScrollView>
        <ImageBusiness imageBusiness={imagesSelected[0]}/>
        <FormAdd
         setBusinessName={setBusinessName}
         setBusinessAddress={setBusinessAddress}
         setBusinessPhone={setBusinessPhone}
         setBusinessDescription={setBusinessDescription}
         setIsVisibleMap={setIsVisibleMap}
         locationBusiness={locationBusiness}
        />
        <UploadImage
        imagesSelected={imagesSelected}
        setImagesSelected={setImagesSelected}
        toastRef={toastRef} 
        />

        <Button
        title="Crear un nuevo Negocio"
        onPress={addBusiness}
        buttonStyle={styles.btnBusiness}
        />

        <Map 
        isVisibleMap={isVisibleMap}
        setIsVisibleMap={setIsVisibleMap}
        setLocationBusiness={setLocationBusiness}
        toastRef={toastRef}/>
        
      
   
    </ScrollView>)
}

function ImageBusiness(props){

    const{imageBusiness}=props;
 
    return(
        <View style={styles.viewPhoto}>
            {imageBusiness?(
                <Image
                source={{uri:imageBusiness}}
                style={{width:WidthScreen, height:200}}

                />
            ):(
                <Image
                source={require("../../assets/img/no-photo.png")}
                style={{width:WidthScreen, height:200}}
                />
            )}
        </View>
    )
}


function UploadImage(props){
    const{imagesSelected,setImagesSelected,toastRef}=props;


    const imageSelect=async()=>{
        const resultPermission =await
         Permissions.askAsync(
             Permissions.CAMERA_ROLL
            );
            
         const resultPermissionCamera=resultPermission.permissions.cameraRoll.status;

         if(resultPermissionCamera=== "denied"){
             toastRef.current.show("necesita aceptar los permisos para poder agregar una imagen ");5000
         }else{
            const result= await ImagePicker.launchImageLibraryAsync({
                allowsEditing:true,
                aspect:[4,3]

            })
            if(result.cancelled){
                toastRef.current.show("cerraste la galeria de imagen sin selecionar una imagen ");3000
            }else{
                setImagesSelected([...imagesSelected,result.uri]);
            }

         }
    }
    
    const removeImage =image=>{
        const arrayImages=imagesSelected;
        Alert.alert(
            "Eliminar imagen",
            "¿Estas seguro de que desear eliminar la imagen ?",
            [
                {
                    text:"Cancelar",
                    style:"cancel"
                },
                {
                    text:"Eliminar",
                    onPress:()=> setImagesSelected(arrayImages.filter(imageUrl=>imageUrl!==image))
                }
            ],
            {cancelable:false}
        )

    }



    return(
        <View style={styles.viewImage}>

        {imagesSelected.length<5&&( 
            <Icon
            type="material-community"
            name="camera"
            color="#7a7a7a"
            containerStyle={styles.containerIcon}
            onPress={imageSelect}
            />

            )}

        {imagesSelected.map(imageBusiness=>(


            <Avatar
            key={imageBusiness}
            onPress={()=>removeImage(imageBusiness)}
            style={styles.miniatureStyles}
            source={{
                uri:imageBusiness }}            
            />
        ))}
        </View>
    )
}


function FormAdd(props){
    const{setBusinessName,setBusinessAddress,setBusinessPhone,setBusinessDescription,setIsVisibleMap,locationBusiness}=props;

    return(
        <View style={styles.viewForm}>
            <Input
            
            placeholder="Nombre Negocio"
            containerStyle={styles.input}
            onChange={e=>setBusinessName(e.nativeEvent.text)}
            
            />
         
            <Input
                placeholder="Ubicación"
                containerStyle={styles.input}
                onChange={e=>setBusinessAddress(e.nativeEvent.text)}
                rightIcon={{
                    
                    type:"material-community",
                    name:"google-maps",
                    color:locationBusiness  ?"#8F2764": "#c2c2c2",
                    onPress:()=>setIsVisibleMap(true)
                }}
               
                
            />
             <Input
                keyboardType="phone-pad"
                placeholder="Telefono"
                containerStyle={styles.input}
                onChange={e=>setBusinessPhone(e.nativeEvent.text)}
                rightIcon={{
                    type:"material-community",
                    name:"phone",
                    color:"#c2c2c2"
                }}
            />
               <Input
                placeholder="Descripcion Negocio"
                multiline={true}
                containerStyle={styles.textArea}
                onChange={e=>setBusinessDescription(e.nativeEvent.text)}
            />


        </View>
    )
}

function Map(props){
    const{
        isVisibleMap,
         setIsVisibleMap,
         setLocationBusiness,
         toastRef}=props;

         const [location, setLocation]=useState(null);

         
        

         useEffect(()=>{
    (async()=>{
       const resultPermissions= await Permissions.askAsync(Permissions.LOCATION);
        const statusPermissions= resultPermissions.permissions.location.status;

        if(statusPermissions !== "granted"){
            toastRef.current.show(" Debe aceptar los permisos de localización, para poder Buscar un producto ",5000);
        }else{
            const loc= await Location.getCurrentPositionAsync({});
            setLocation({
                latitude:loc.coords.latitude,
                longitude:loc.coords.longitude,
                latitudeDelta:0.001,
                longitudeDelta:0.001

            })
        } 
    })()
         }, [])

         const confirmLocation=()=>{
             setLocationBusiness(location);
             toastRef.current.show("Localización guardada correctamente",3000);
             setIsVisibleMap(false);
         }


         return(
             <Modal
              isVisible={isVisibleMap}
              setIsVisible={setIsVisibleMap}>
                  <View>
                {location && (
                    <MapView style={styles.mapStyle}
                        initialRegion={location}
                        showsUserLocation={true}
                        onRegionChange={region=>setLocation(region)}
                    >
                        <MapView.Marker
                        coordinate={{
                            latitude:location.latitude,
                            longitude:location.longitude
                        }}                        
                        draggable
                        />
                    </MapView>
                )}
        <View style={styles.viewMapBtn}>
            <Button
           title="Guardar ubicación" 
           onPress={confirmLocation}
           containerStyle={styles.viewMapContainerSave}
           buttonStyle={styles.viewMapBtnSave}
            />
             <Button
           title="Cancelar ubicación" 
           onPress={()=>setIsVisibleMap(false)}
           containerStyle={styles.viewMapContainerCancel}
           buttonStyle={styles.viewMapBtnCancel}
           
            />

        </View>
     </View>
   </Modal>
         )

}

const styles=StyleSheet.create({
    
    viewMapBtnCancel:{
    backgroundColor:"#0F8BFF"
    },
    viewMapContainerCancel:{
        paddingLeft:5,
        
    },
    viewMapBtnSave:{
        backgroundColor:"#8F2764"
    },
    viewMapContainerSave:{
        paddingRight:5,

    },
    viewMapBtn:{
      flexDirection:"row",
      justifyContent:"center",
      marginTop:10
    },
    mapStyle:{
        width:"100%",
        height:550
    },
    btnBusiness:{
        backgroundColor:"#8F2764",
        margin:20
    },
    inputNumeros:{

        marginTop:10,
        width:"50%",
       
    },
    textArea:{

        height:100,
        width:"100%",
        padding:0,
        margin:0

    },
    input:{
        marginBottom:10,

    },

    viewForm:{
        marginLeft:10,
        marginRight:10

    },
    viewImage:{
        flexDirection:"row",
        marginLeft:20,
        marginRight:20,
        marginTop:30
    },
    containerIcon:{
        alignItems:"center",
        justifyContent:"center",
        marginRight:10,
        height:70,
        width:70,
        backgroundColor:"#e3e3e3"

    },
    miniatureStyles:{
        width:WidthMiniature,
        height:WidthMiniature,
        marginRight:10,

    },
    viewPhoto:{
        alignItems:"center",
        height:200,
        marginBottom:20

    }


})