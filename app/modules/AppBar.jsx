

import React from "react";
import {
   View,
   Text,
   Button,
   StyleSheet
} from "react-native";


export default function AppBar( props ) {


   return( <>
      <View style={ style.appbar }>
         <Text>AppBar</Text>
      </View>
   </> );
}

const 
   style = StyleSheet.create( {
      appbar: {
         height: "72px",
         backgroundColor: "#00559C",
      }
   } )
;