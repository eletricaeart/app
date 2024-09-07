

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
            style={{
               backgroundColor: props.bg || "#0075BD",
               borderRadius: 13,
               overflow: "hidden",
               width: "80%",
               height: 56,
               marginLeft: "auto",
               marginRight: "auto",
               elevation: 3,
               shadowColor: "#27f",
               alignItems: "center",
               justifyContent: "center",   
            }}
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