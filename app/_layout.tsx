

import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import { useFonts } from 'expo-font';
import {
   View,
   Text,
   Image,
   Button,
} from "react-native";

import { FirebaseAuth } from "@/FirebaseConfig";
import {
   onAuthStateChanged,
   User,
} from "firebase/auth";

import {
   AppBar,
   AppBarLeft,
   AppBarRight,
   // BottomNavigationBar,
   PageFooter,
} from "@/src/widgets/clb-widgets";

import { Icon } from "@/src/widgets/clb-icons";


SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
   const 
      [ User, setUser ] = useState<User | null>( null )
      , 
      [loaded] = useFonts( {
        SpaceMono: require('@/src/fonts/SpaceMono-Regular.ttf'),
        GodOfThunder: require('@/src/fonts/GodOfThunder.ttf'),
      } )   
   ;

   useEffect( () => {
     if( loaded ) {
         SplashScreen.hideAsync();
     }
   }, [loaded] );

   useEffect( () => {
      onAuthStateChanged( FirebaseAuth, user => {
         console.log( { user } );
         setUser( user ); 
      } );
   }, [] );
 
   if( !loaded ) { return null; }


   return( <>
      {
         User ? (
            <Stack screenOptions={ { ...stack_screenOptions } }>
               <Stack.Screen name="(tabs)" options={ { ...screen_tabs_options } } />
               <Stack.Screen name="index" options={ { ...screen_00_options } } />
               <Stack.Screen name="+not-found" />
            </Stack>
         ) : (
            <Stack screenOptions={ { ...auth_screenOptions } } >
               <Stack.Screen name="(auth)" options={ { ...screen_auth_options } } />
               {/* <Stack.Screen name="index" options={ { ...screen_00_options } } /> */}
               <Stack.Screen name="+not-found" />
            </Stack>
         )
      }
   </> );
}

const 
   stack_screenOptions = {
      headerShown: false,
      headerTitleAlign: "center"
      ,
      headerTintColor: "#e5e5e5"
      ,
      headerTitleStyle: {
         // fontFamily: "GodOfThunder",
         fontWeight: "bold",
         color: "#fff",
      }
      ,
      statusBarColor: "#00559c",
      headerBlurEffect: "regular",
      headerTransparent: true,
   }
   ,
   auth_screenOptions = {
      headerShown: false,
      headerTitleAlign: "center"
      ,
      headerTintColor: "#e5e5e5"
      ,
      headerTitleStyle: {
         // fontFamily: "GodOfThunder",
         fontWeight: "bold",
         color: "#fff",
      }
      ,
      statusBarColor: "#16181c",
      headerBlurEffect: "regular",
      headerTransparent: true,
   }
   ,
   screen_00_options = {
      // headerTitle: "Eletrica & Art",
      headerShown: false,
      statusBarColor: "#1b1d22",
   },
   screen_auth_options = {
      statusBarColor: "#16181c",
   },
   screen_tabs_options = {
      statusBarColor: "#00559c",
   }
;