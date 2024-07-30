

/* == [ @ imports ] == == == == == == == == == */
import React, { useState, useEffect } from "react";
import { 
  StyleSheet,
  View,
  Text,
  Image, 
  Dimensions,
} from "react-native";

import * as Colores from "@/assets/modules/clb-colors";


/* == [ properties ] == == == == == == == == == */
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
         },

         picture: {
            // flexBasis: 100,
            height: "100%",
            aspectRatio: 1, backgroundColor: Colores.colors.blue1,
            borderRadius: 1000,
            alignItems: "center",
            justifyContent: "center",
            // width: "10%"
         },
         img: {
            width: "90%", height: "90%",
            borderRadius: 1000,
         },

         description: {
            backgroundColor: "#742",
            flex: 1,
            alignItems: "center",
         },
         tt: {
            color: "#fff",
            fontSize: width / 22,
            fontWeight: "bold",
            marginBottom: 8,
         },
         sbt: {
            color: "#fff",
            fontSize: width / 32,
            fontWeight: "bold",
         },
         txt: {
            color: "#fff",
            fontSize: width / 36,
         },
         b: {
            color: "#fff",
            fontSize: width / 36,
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


/* == [ exports ] == == == == == == == == == */
export default function Invoice( { ...props } ) {


   return( <>
      <View style={[ s.sheet ]}>
         <EACard />
         {/* <Text>fs</Text> */}
      </View>
   </> );
}


/* == [ StyleSheet ] == == == == == == == == == */
const 
   s = StyleSheet.create( {
      sheet: {
         flex: 1,
         alignItems: "center",
         justifyContent: "center",
      },
   } )
;