

import React from "react";

import {
   StyleSheet,
   useColorScheme,
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
   
   const 
      colorScheme = useColorScheme()
      ,
      themeTextStyle = colorScheme === 'light' ? 
         styles.lightThemeText 
         : 
         styles.darkThemeText
      ,
      themeContainerStyle = colorScheme === 'light' ? 
         styles.lightContainer 
         : 
         styles.darkContainer
   ;

   return( <>
      <SafeAreaProvider style={ [themeContainerStyle] }>
         <EA_AppBar /> 
         {/* <Text style={[styles.text, themeTextStyle]}>Color scheme: {colorScheme}</Text> */}
         <BottomNavBar style={ styles.bottomNavBar }></BottomNavBar>
      </SafeAreaProvider>
   </> );
}
 
const 
   styles = StyleSheet.create( {

      container: {
         flex: 1,
         alignItems: 'center',
         justifyContent: 'center',
      },
      text: {
         fontSize: 20,
      },
      lightContainer: {
         backgroundColor: '#d0d0c0',
      },
      darkContainer: {
         backgroundColor: '#242c40',
      },
      lightThemeText: {
         color: '#242c40',
      },
      darkThemeText: {
         color: '#d0d0c0',
      },
      
      Home: {
         backgroundColor: "#16181c",
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