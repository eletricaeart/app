

import React, { useState, useEffect } from "react";

import {
   Header,
   PageFooter,
   BottomNavigationBar,
   Sheet,
} from "@/src/widgets/clb-widgets";

import {
   StyleSheet,
   ScrollView, 
   View,
   Text,
   Image,
} from "react-native";

import { Appbar, } from "react-native-paper";

import {
   Icon,
} from "@/src/widgets/clb-icons";

import * as c from "@/src/widgets/clb-html";


export default function Home( { ...props } ) {
   const 
      [ Subtitle, setSubtitle ] = useState( "" )
   ;
 

   return( <>
      <Sheet 
         style={{ backgroundColor: "#0000", 
            alignItems: "center", justifyContent: "center",
         }}>
         <Text>Home</Text>
      </Sheet>
   </> );
}

