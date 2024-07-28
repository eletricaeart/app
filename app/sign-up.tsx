

/* == [ @ imports ] == == == == == == == == == */
import React, { useState, useEffect } from "react";
import { 
  StyleSheet,
  View,
  Text, 
} from "react-native";


/* == [ properties ] == == == == == == == == == */


/* == [ exports ] == == == == == == == == == */
export default function SignUpView( { ...props } ) {


   return( <>
      <View style={[ s.sheet ]}>
      <Text>SignUp</Text>
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