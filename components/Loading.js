import React from "react";
import {StyleSheet, View, Text, ActivityIndicator} from "react-native";
import {Overlay}from "react-native-elements"; 


export default function Loading(props) {

    const {isVisible, text}=props;
    return <Overlay
        isVisible={isVisible}
        windowBackgroundColor="rbba(0,0,0,08)"
        overlayBackgroundColor="transparent"
        overlayStyle={styles.Overlay}
        >
            <View style={styles.view}>
            <ActivityIndicator size="large" color="#8F2764"/>
            { text &&(<Text style={styles.text}>{text}</Text>)}
            </View>
    </Overlay>
}


const styles=StyleSheet.create({
Overlay:{
    height:100,
    width:200,
    backgroundColor:"#fff",
    borderColor:"#8F2764",
    borderWidth:2,
    borderRadius:10,  
},

view:{
flex:1,
alignItems:"center",
justifyContent:"center",
},

text:{
    color:"#8F2764",
    textTransform:"uppercase",
    marginTop:10

}

})