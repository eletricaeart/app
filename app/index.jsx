

import React from "react";
import { StatusBar } from "expo-status-bar";
import {
   StyleSheet,
   View, ScrollView,
   Text,
   Button 
} from "react-native";
import {
   SafeAreaView, 
   SafeAreaProvider,
   SafeAreaInsetsContext,
   useSafeAreaInsets,
} from 'react-native-safe-area-context';
import AppBar from "./modules/Appbar";
import EA_AppBar from "./modules/EA_AppBar";
import HomePage from "./modules/HomePage";
import BottomNavBar from "./modules/BottomNavBar";
import colors from "./assets/stylesheets/globals/colors";

export default function App( props ) {
   

   return( <>
      <SafeAreaProvider style={ { backgroundColor: "#fc0",  } }>
         <StatusBar 
            backgroundColor={ "#00559c" } 
            style="light" 
            translucent={ false }
         />
         <EA_AppBar /> 
         <HomePage style={ style.homePage }></HomePage>
         <BottomNavBar style={ style.bottomNavBar }></BottomNavBar>
      </SafeAreaProvider>
   </> );
}
 
const 
   style = StyleSheet.create( {
      Home: {
         backgroundColor: "#fff",
         flex: 1,
      },
      appbar: {
         flexBasis: 1,
      },
      homePage: {
         flex: 1,
         backgroundColor: "#27f"
      },
      bottomNavBar: {
         flexBasis:68,
      }
   } )
;