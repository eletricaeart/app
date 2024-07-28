

/* == [ @ imports ] == == == == == == == == == */
import React, { useState, useEffect } from "react";
import { 
  StyleSheet,
  View,
  Text, 
} from "react-native";


/* == [ properties ] == == == == == == == == == */


/* == [ exports ] == == == == == == == == == */
export default function SignInView( { ...props } ) {


   return( <>
      <View style={[ s.sheet ]}>
         <Text>Sign In</Text>
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