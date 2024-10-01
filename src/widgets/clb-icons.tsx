

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
   FontAwesome, 
   FontAwesome6,
   MaterialCommunityIcons,
   MaterialIcons,
   AntDesign,
   Ionicons,
   SimpleLineIcons,
   Entypo,
} from '@expo/vector-icons';
// <MaterialCommunityIcons name="receipt" size={24} color="black" />
// <MaterialIcons name="receipt" size={24} color="black" />
// <AntDesign name="stepforward" size={24} color="black" />
// <Ionicons name="accessibility" size={24} color="black" />
// <SimpleLineIcons name="user" size={24} color="black" />


/* == [ properties ]
== == == == == == == == == */
type IconProps = {
   i?: string;
   name?: string;
   size?: number;
   color?: string;
   style?: any;
   onPress?: () => void;
};

/* == [ fontawesome ]
== == == == == == == == == */
export function Icon( { ...props }: IconProps ) {
   const 
      name = props.name 
      ,
      size = props.size || 24
      ,
      color = props.color || "black"
      ,
      style = props.style 
      ,
      onPress = props.onPress 
   ;

   switch( props.i ) {
      case "f0": return( <FontAwesome name={ name } size={ size } color={ color } style={[ props.style ]}/> );
      break;

      case "f": return( <FontAwesome6 name={ name } size={ size } color={ color } style={[ props.style ]}/> );
      break;

      case "mc": return( <MaterialCommunityIcons name={ name } size={ size } color={ color } style={[ props.style ]}/> );
      break;

      case "mi": return( <MaterialIcons name={ name } size={ size } color={ color } style={[ props.style ]}/> );
      break;

      case "a": return( <AntDesign name={ name } size={ size } color={ color } style={[ props.style ]}/> );
      break;

      case "i": return( <Ionicons name={ name } size={ size } color={ color } style={[ props.style ]}/> );
      break;

      case "l": return( <SimpleLineIcons name={ name } size={ size } color={ color } style={[ props.style ]}/> );
      break;

      case "entypo": return( <Entypo name={ name } size={ size } color={ color } style={[ props.style ]}/> );
      break;
   }
   // return( <>
   //    <FontAwesome6 name={ name } size={ size } color={ color } style={[ props.style ]}/>
   // </> );
}