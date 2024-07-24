

import React from "react";

import {
   StyleSheet,
   ScrollView,
   View,
   Text,
   Image,
   Button,

} from "react-native";

import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// <MaterialCommunityIcons name="receipt" size={24} color="black" />
import { MaterialIcons } from '@expo/vector-icons';
// <MaterialIcons name="receipt" size={24} color="black" />
import { AntDesign } from '@expo/vector-icons';
// <AntDesign name="stepforward" size={24} color="black" />
import { Ionicons } from '@expo/vector-icons';
// <Ionicons name="accessibility" size={24} color="black" />
import { SimpleLineIcons } from '@expo/vector-icons';
// <SimpleLineIcons name="user" size={24} color="black" />


/* == [ fontawesome ]
== == == == == == == == == */
export function Icon( { ...props } ) {
   const 
      name = props.name 
      ,
      size = props.size || 24
      ,
      color = props.color || "black"
   ;

   switch( props.i ) {
      case "f": return( <FontAwesome6 name={ name } size={ size } color= { color } /> );
      break;

      case "mc": return( <MaterialCommunityIcons name={ name } size={ size } color= { color } /> );
      break;

      case "mi": return( <MaterialIcons name={ name } size={ size } color= { color } /> );
      break;

      case "a": return( <AntDesign name={ name } size={ size } color= { color } /> );
      break;

      case "i": return( <Ionicons name={ name } size={ size } color= { color } /> );
      break;

      case "l": return( <SimpleLineIcons name={ name } size={ size } color= { color } /> );
      break;
   }
   // return( <>
   //    <FontAwesome6 name={ name } size={ size } color= { color } />
   // </> );
}