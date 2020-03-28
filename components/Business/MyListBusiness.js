import React, {useState, useEffect} from "react";
import {StyleSheet,View,Text,FlatList,ActivityIndicator,TouchableOpacity}from "react-native";
import {Image} from "react-native-elements";
import * as firebase from "firebase";

export default function ListBusiness(props){
    const {business,isLoading,handleLoadMore,navigation}=props;
        return(
        <View>
            {business?(
                <FlatList
                data={business}
                renderItem={business=> <Business 
                    business={business}
                    navigation={navigation}
                    />}
                keyExtractor={(item,index)=>index.toString()}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
               ListFooterComponent={<FooterList 
                isLoading={isLoading}
                business={business}
               />}
                />
            ):(
                <View style={styles.loaderBusiness}>
                    <ActivityIndicator size="large"/>
                    <Text>Cargando Negocios</Text>

                </View>
            )}
        </View>
    )
}

function Business(props){
    const {business,navigation}=props;
    const{name,address,phone,description,images}= business.item.business;
    const[imageBusiness, setImageBusiness]=useState(null);


    useEffect(()=>{
        const image=images[0];
        firebase.storage()
        .ref(`business-images/${image}`)
        .getDownloadURL()
        .then(result=>{
            setImageBusiness(result);
        })
    })

    return(
        <TouchableOpacity onPress={()=>navigation.navigate("Busine", {business})}>
            <View style={styles.viewBusiness}>
            <View styles={styles.viewBusinessImage}> 
            <Image
            resizeMode="cover"
            source={{uri:imageBusiness}}
            style={styles.imageBusiness}  
            PlaceholderContent={<ActivityIndicator color="fff"/>}          
            />
            </View>
            <View style={styles.businesViewText}>
            <Text style={styles.businessName}>{name}</Text>
         <Text style={styles.businesAddress}>{address}</Text>
         <Text style={styles.businessPhone}>{phone}</Text>
          <Text style={styles.businessDescription}>
            {description.substr(0,60)}...
            </Text>
            </View>
            </View>
        </TouchableOpacity>
    )

}

function FooterList(props){
    const {isLoading, business}=props;
   
        
    if(isLoading){
        return(
            <View style={styles.loadingBusiness}>
                <ActivityIndicator size="large"/>
            </View>
        )
    } else {
        return(
            
         <View style={styles.notFoundBusiness}>
                <Text> No Tienes mas negocios por mostrar </Text>
        </View>
 
        )

       
    }

}

const styles =StyleSheet.create({
    businesViewText:{
        marginLeft:10,
        marginTop:-2

    },

    businessDescription:{
        paddingTop:1,
        color:"grey",
        width:300
    },
    businesAddress:{
        paddingTop:2,
        color:"grey"

    },businessPhone:{
        paddingTop:2,
        color:"grey"

    },

    loadingBusiness:{
        marginTop:20,
        alignItems:"center"
    },
    viewBusiness:{
        flexDirection:"row",
        margin:10
    },
    viewBusinessImage:{
        marginRight:15,
    },
    imageBusiness:{
        width:80,
        height:80
    },
    businessName:{
        fontWeight:"bold"
    },
    loaderBusiness:{
        marginTop:10,
        marginBottom:10,

    },
    notFoundBusiness:{
        marginTop:10,
        marginBottom:20,
        alignItems:"center"

    },

})