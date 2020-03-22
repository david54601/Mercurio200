import React from "react";
import {StyleSheet, View, ScrollView,Text,Image} from "react-native";
import {Button} from "react-native-elements";
import {withNavigation} from "react-navigation";

 function UserGuest(props) {
     
    const{navigation}= props;

    return(
    <ScrollView style={styles.viewBody} centerContent={true}>
       <Image
        source={require("../../assets/img/Planeta-Mercurio.jpg")}
        style={styles.image}
        resizeMode="contain"
        />
        <Text style={styles.title}>
            Unless 
       </Text>

        <Text style ={styles.description}>
        ¿ya estas listo
        para encontra todos tus productos?
        </Text>
        <View style={styles.viewBtn}>
            
            <Button
            buttonStyle={styles.btnStyles}
            containerStyle={styles.btnContainer}
            title="Ver tu perfil"
            onPress={()=>navigation.navigate("Login")}
            />
                

           

        </View>

    </ScrollView>
    );
}

export default withNavigation (UserGuest);

const styles=StyleSheet.create({
    viewBody:{
        marginLeft:30,
        marginRight:30,

    },
    image:{
        height:300,
        width:"100%",
        marginBottom:40,

    },
     title:{
        
        textAlign:"center",
        fontSize:19,
        fontWeight:"bold",
        marginBottom:10,
      
    },
    description:{
        textAlign:"center",
        marginBottom:10,

    },
    viewBtn:{
        flex:1,
        alignItems:"center"
    },
    btnStyles:{
        backgroundColor:"#8F2764",
        
    },
    btnContainer:{
        
        width:"70%",

    }



})