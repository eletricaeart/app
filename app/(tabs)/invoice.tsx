

/* == [ @ imports ] == == == == == == == == == */
import React, { useState, useEffect } from "react";
import { 
  StyleSheet,
  View,
  Text,
  Image, 
  Dimensions,
} from "react-native";
import * as Print from "expo-print";
import { shareAsync } from 'expo-sharing';
import * as Colores from "@/src/widgets/clb-colors";
import { EACard } from "@/src/widgets/clb-ea";


/* == [ properties ] == == == == == == == == == */


/* == [ exports ] == == == == == == == == == */
export default function Invoice( { ...props } ) {
   const 
      html = `
         <html>
            <body>
               <p>oi pdf</p>
            </body>
         </html>
      `
   ;

   async function GeneratePDF() {
      const file = await Print.printToFileAsync( {
         html: html, base64: false,
      } )
   }


   return( <>
      <EACard />
      <View style={[ s.sheet ]}>
         {/* <Text>fs</Text> */}
         <Text onPress={ GeneratePDF }>generate pdf</Text>
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
         // backgroundColor: "#fc0",
      },
   } )
;