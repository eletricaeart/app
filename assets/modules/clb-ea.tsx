

import React from "react";

import {
   StyleSheet,
   ScrollView,
   View,
   Text,
   Image,
   Button,
   
} from "react-native";

import {
   Avatar,
} from "react-native-paper";

import * as c from "./clb-html";

import { Icon } from "./clb-icons";


export function UsersCard( { ...props } ) {
   const 
      child = props.children 
      ,
      profile = props.profile || require( "../images/Avatar/default_avatar_masc_ico.webp" )
      ,
      name = props.name || "Nome do Cliente"
      ,
      tel = props.tel || "(13) 99148-6078"
   ;

   return( <>
      <View>
         <View style={{
            flexDirection: "row",
            backgroundColor: "#fff",
            borderRadius: 16,
            padding: 16,
            borderColor: "#7777",
            borderWidth: 0,
         }}>
            <View style={{
               borderRadius: 100,
               width: 70,
               aspectRatio: 1,
               flex: .20,
               // overflow: "hidden",
               // backgroundColor: "#27f",
            }}>
               {/* <Image source={ require( "../images/Avatar/default_avatar_masc_ico.webp" ) } */}
               {/* <Image source={ profile }
                  style={{
                     resizeMode: "contain",
                     width: "100%",
                     flex: 1,
                     borderRadius: 100,
                     overflow: "hidden",
                  }}
               /> */}
               <Avatar.Image source={ profile }/>
            </View>
            <View style={{
               justifyContent: "center",
               flex: .75,
               width: 70,
               paddingLeft: 16,
               // backgroundColor: "#4565",
            }}>
               {/* <c.H4>Anselmo Sammarco Nunes</c.H4> */}
               <c.H4 color="#242526">{ name }</c.H4>
               {/* <c.T>(13) 99148-6078</c.T> */}
               <c.T color="#a5a5a5">{ tel }</c.T>
            </View>
            <View style={{
               flex: .05,
               justifyContent: "center",
            }}>
               <Icon i="mc" name="dots-vertical" color="#333"/>
            </View>
         </View>
      </View>
   </> );
}