

import React, { useState, useEffect, } from "react";

import {
   Pressable,
   StyleSheet,
} from "react-native";

import {
   View as ViewA, 
} from "react-native-animatable";
import { P } from ".";


export const 
   AniButton = ( { ...props } ) => {
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
      return(
      <ViewA style={ s.btnSlot }
         animation={ props.animation || "bounceIn" }
      >
         <Pressable onPress={ props.onPress }
            style={ ( { pressed } ) => [ { 
               opacity: pressed ? .5 : 1,
            }, s.btn ] }
         >
            { 
               (props.children)
               ||
               <P style={{ color: "#eee", textTransform: "capitalize", fontWeight: "bold", fontSize: 20 }}>
                  { props.title || "send" }
               </P>
            }
         </Pressable>
      </ViewA>
   )
}
;