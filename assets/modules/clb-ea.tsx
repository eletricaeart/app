

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



/* == [ exports ]
== == == == == == == == == */
export function HeaderTitle( { ...props } ) {
   const hs = StyleSheet.create( {
      text: {
         fontFamily: "GodOfThunder",
         textAlign: "center",
         fontWeight: "bold",
         fontSize: 18,
         margin: 0,
         padding: 0,
         lineHeight: 16,
         color: "#fff",
         textShadowColor: "#0005",
         textShadowRadius: 8,
         textShadowOffset: {
            width: 2, height: 3
         },
      },
      text_e: { color: "#daa520" }
   } );
   return( <>
      {/* <Image source={ require( "@/assets/images/EA/EA-logo-appbar-2.png" ) }
         style={ {
            resizeMode: "contain",
            width: 140,
            height: 60,
            alignSelf: "center",
            
         } }
      /> */}
      <View>
         <Text style={[ hs.text, ]}>Eletrica</Text>
         <Text style={[ hs.text, hs.text_e ]}>&</Text>
         <Text style={[ hs.text, ]}>Art</Text>
      </View>
   </> );
}


export function UsersCard( { ...props } ) {
   const 
      child = props.children 
      ,
      profile = props.profile || require( "@/assets/images/Avatar/default_avatar_masc_ico.webp" )
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
            }}>
               <Avatar.Image source={ profile }
               // size={ 70 }
               style={{
                  borderRadius: 1100,
                  // overflow: "hidden",
                  // borderColor: "#0cf",
                  // borderWidth: 3,
               }}
               />
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