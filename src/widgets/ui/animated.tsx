

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
   AniButton = ( { ...props } ) => (
      <ViewA style={[]}
         animation="bounceIn"
      >
         <Pressable onPress={ props.onPress }
            style={ ( pressed ) => [ {
               backgroundColor: props.bg || "#0075BD",
               borderRadius: 13,
               overflow: "hidden",
               width: props.width || "100%",
               height: 56,
               marginLeft: "auto",
               marginRight: "auto",
               elevation: props.elevation || 3,
               shadowColor: props.shadow || "#000",
               // borderColor: props.border?.color || "#27f0",
               borderColor: pressed ? "#27f0" : "#daa520",
               // borderWidth: props.border?.width || 2,
               borderWidth: 5,
               alignItems: "center",
               justifyContent: "center",   
            } ] }
         >
            { 
               (props.children)
               ||
               <P style={{ color: "#eee", fontWeight: "bold", fontSize: 20 }}>{ props.text }</P>
            }
         </Pressable>
      </ViewA>
   )
;