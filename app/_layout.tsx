

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
   getAuth,
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



export {
   // Catch any errors thrown by the Layout component.
   ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
   // Ensure that reloading on `/modal` keeps a back button present.
   initialRouteName: "(tabs)",
};

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
   // Expo Router uses Error Boundaries to catch errors in the navigation tree.
   // useEffect( () => {
   //    if( error ) throw error;
   // }, [error] );

   useEffect( () => {
     if( loaded ) {
         SplashScreen.hideAsync();
     }
   }, [loaded] );

   useEffect( () => {
      // onAuthStateChanged( FirebaseAuth, user => {
      onAuthStateChanged( FirebaseAuth, user => {
         console.log( { user } );
         setUser( user ); 
      } );
   }, [] );
 
   if( !loaded ) { return null; }


   return( <>
      {/* {
         User ? (
            <Stack screenOptions={ { ...stack_screenOptions } }>
               <Stack.Screen name="(tabs)" options={ { ...screen_tabs_options } } />
               <Stack.Screen name="index" options={ { ...screen_00_options } } />
               <Stack.Screen name="+not-found" />
            </Stack>
         ) : (
            <Stack screenOptions={ { ...auth_screenOptions } } >
               <Stack.Screen name="(auth)" options={ { ...screen_auth_options } } />
               <Stack.Screen name="+not-found" />
            </Stack>
         )
      } */}
      <Stack>
         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
         {/* <Stack.Screen name="modal" options={{ presentation: "modal" }} /> */}
         <Stack.Screen name="landing" options={{ headerShown: false }} />
         <Stack.Screen name="sign-in" options={{ presentation: "modal" }} />
         <Stack.Screen name="sign-up" options={{ presentation: "modal" }} />
      </Stack>
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