

import React, { useState, useEffect } from "react";
import firebase from "@/assets/services/FBConnection";

import {
   Header,
   PageFooter,
   BottomNavigationBar,
} from "@/assets/modules/clb-modules";

import {
   StyleSheet,
   ScrollView,
   View,
   Text,
   Image,
   ImageBackground,
} from "react-native";

import {
   Icon,
} from "@/assets/modules/clb-icons";

import * as c from "@/assets/modules/clb-html";


export default function Home( { ...props } ) {
   const 
      [ Subtitle, setSubtitle ] = useState( "" )
   ;
 



   return( <>
   <View style={{ flex: 1, }}>
      <View style={{ backgroundColor: "#f00" }}>
         <c.H2 color="#00559C">Titulo</c.H2>
         <c.H4 color="#777">{ Subtitle || "Subtitulo" }</c.H4>
      </View>

      <View style={{ backgroundColor: "#27f", height: 50, }}>
         <Image source={ require( "@/assets/images/_404.png" ) } resizeMode="contain" style={{ width: "100%" }}/>
      </View>

      <View style={{ backgroundColor: "#00f" }}>
         <Text>...essa página não existe</Text>
      </View>
   </View>
   </> );
}

