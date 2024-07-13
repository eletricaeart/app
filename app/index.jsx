

import React from "react";
import {
   StyleSheet,
   View, ScrollView,
   Text,
   Button 
} from "react-native";
import AppBar from "./modules/AppBar";
import HomePage from "./modules/HomePage";
import BottomNavBar from "./modules/BottomNavBar";

export default function App( props ) {
   

   return( <>
      <AppBar></AppBar>
      <HomePage></HomePage>
      <BottomNavBar></BottomNavBar>
   </> );
}

const 
   style = StyleSheet.create( {
      Home: {
         backgroundColor: "#fff",
         flex: 1,
      }
   } )
;