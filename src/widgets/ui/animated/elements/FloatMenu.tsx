

import React, { useState, useEffect, } from "react";

import {
   Pressable,
   StyleSheet,
   Text,
   View,
   useWindowDimensions,
} from "react-native";

import {
   View as ViewA, 
} from "react-native-animatable";
// import { P } from ".";


const FloatMenu = ( { ...props } ) => {
   const {
      width, height,
   } = useWindowDimensions();

   const s = StyleSheet.create( {
      btnSlot: {
         width: props.w || "100%",
         padding: 9,
         // backgroundColor: '#fff',
      },
      btn: {
         backgroundColor: props.bg || "#0075BD",
         borderRadius: 13,
         overflow: "hidden",
         width: "100%",
         height: props.h || 48,
         marginHorizontal: "auto",
         elevation: props.elevation || 3,
         shadowColor: props.shadow || "#000",
         alignItems: "center",
         justifyContent: "center",  
      },
   } );
   return( <>
      <View 
         style={{
            flex: 1,
            width: width,
            height: height,
            // backgroundColor: "#27f",
            position: "absolute",
            top: 0, left: - ( width - ( width * .461 ) ),
            zIndex: 99,
         }}
      >
      </View>
         <ViewA style={{ flex: 1, 
         position: "absolute", top: 50, left: -15,
            width: 200, height: 350, backgroundColor: "#f5f5f5",
            borderRadius: 24, elevation: 10,
            padding: 16,
            borderColor: "#7773", borderWidth: 1,
            zIndex: 999,
         }}>
            <Text style={{}}>{ width }</Text>
         </ViewA>
   </> )
};

export default FloatMenu;