

import React from "react";

import {
   StyleSheet,
   ScrollView,
   View,
   Text,
   Image,
   Button,
   Dimensions,
} from "react-native";

import {
   Avatar,
} from "react-native-paper";

import * as c from "./clb-html";
import * as Colores from "@/assets/modules/clb-colors";

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




/**
 * EACard
 * 
 */
export function EACard() {
   const { width } = Dimensions.get( "window" ); // andy: 411.42857142857144 H1-fsz: //0.053472222,
   const 
      logo = {
         raw: "https://raw.githubusercontent.com/Ceo-js/ea/2e6fdd74866a50968095c8c6942156d1e93e1c34/ea.jpg"
         ,
         local: "@/assets/images/EA/globo-de-plasma-700.png"
      }
      ,
      s = StyleSheet.create( {
         card: {
            backgroundColor: Colores.colors.blue0, width: "100%", flexDirection: "row",
            padding: 16,
            aspectRatio: "16 / 6.5",
            alignItems: "center", justifyContent: "space-between",
         },

         picture: {
            height: "90%",
            aspectRatio: 1, backgroundColor: Colores.colors.blue1,
            borderRadius: 1000,
            alignItems: "center",
            justifyContent: "center",
         },
         img: {
            width: "90%", height: "90%",
            borderRadius: 1000,
         },

         description: {
            flex: 1 / 1.1,
            alignItems: "center",
         },
         tt: {
            color: "#fff",
            fontSize: width / 22,
            fontWeight: "bold",
            marginBottom: 6,
         },
         sbt: {
            color: "#fff",
            fontSize: width / 39,
            fontWeight: "bold",
            marginBottom: 8,
         },
         txt: {
            color: "#fff",
            fontSize: width / 45,
         },
         b: {
            color: "#fff",
            fontSize: width / 45,
            fontWeight: "bold",
         },
         row: {
            flexDirection: "row",
         },
      } )
   ;

   return( <>
      <View style={[ s.card ]}>

         <View style={[ s.picture ]}>
            <Image 
            source={ { uri: logo.raw } }
            style={[ s.img ]} resizeMode="contain"/>
         </View>

         <View style={[ s.description ]}>
            <Text style={[ s.tt ]}>ELÉTRICA & ART</Text>
            <Text style={[ s.sbt ]}>CNPJ 32.858.892/0001-52 - IM 67358/0001 </Text>
            <Text style={[ s.txt ]}>Rua José Alves Maciel, 40 - Aviação </Text>
            <Text style={[ s.txt ]}>Praia Grande - São Paulo - SP - Cep 11702-440</Text>
            <View style={[ s.row ]}>
               <Text style={[ s.b ]}>Fone  </Text>
               <Text style={[ s.txt ]}>( 13 ) 99768-5853 </Text>
            </View>
            <View style={[ s.row ]}>
               <Text style={[ s.b ]}>WhatsApp  </Text>
               <Text style={[ s.txt ]}>( 13 ) 99768-5853</Text>
            </View>
            <View style={[ s.row ]}>
               <Text style={[ s.b ]}>E-mail  </Text>
               <Text style={[ s.txt ]}>rafa.julia.forever@gmail.com </Text>
            </View>
         </View>

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
   const s = StyleSheet.create( {
      card: {
         flexDirection: "row",
         backgroundColor: "#fff",
         borderRadius: 16,
         padding: 16,
         borderColor: "#fc0",
         borderWidth: 0,
         // elevation: .2,
         height: 93,
      },
      picture: {
         aspectRatio: 1, 
         backgroundColor: "#009ee6",
         // backgroundColor: "#00559c",
         borderRadius: 1000,
         alignItems: "center",
         justifyContent: "center",
         height: "100%",
      },
      img: {
         width: "100%", height: "100%",
         borderRadius: 1000,
      },
      customerInfo: {
         justifyContent: "center",
         flex: 1,
         width: 70,
         paddingLeft: 16,
         // backgroundColor: "#4565",
      },
      sideBtn: {
         width: "auto",
         // paddingRight: 8,
         alignItems: "center",
         justifyContent: "center",
         // backgroundColor: "#456",
      },
   } )

   return( <>
      <View style={ s.card }>

         <View style={[ s.picture ]}>
            <Image source={ profile } style={[ s.img ]} resizeMode="contain"/>
         </View>

         <View style={ s.customerInfo }>
            {/* <c.H4>Anselmo Sammarco Nunes</c.H4> */}
            <c.H4 color="#242526">{ name }</c.H4>
            {/* <c.T>(13) 99148-6078</c.T> */}
            <c.T color="#777">{ tel }</c.T>
         </View>

         <View style={ s.sideBtn }>
            <Icon i="mc" name="dots-vertical" color="#777"/>
         </View>

      </View>
   </> );
}