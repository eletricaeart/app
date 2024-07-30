

/* == [ @ imports ] == == == == == == == == == */
import React, { useState, useEffect } from "react";
import { 
  StyleSheet,
  View,
  Text,
  Image, 
} from "react-native";


/* == [ properties ] == == == == == == == == == */
export function EACard() {

   return( <>
      <View style={[ { backgroundColor: "#70c", width: "100%",  } ]}>
         <View style={[ { flex: .25, aspectRatio: 1, backgroundColor: "#fc0",  } ]}>
            <Image 
            source={ { uri: "https://raw.githubusercontent.com/Ceo-js/ea/2e6fdd74866a50968095c8c6942156d1e93e1c34/ea.jp" } }
            style={{ width: "100%", height: "100%", }} resizeMode="contain"/>
         
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