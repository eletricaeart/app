


import React, { useEffect, useState } from "react";
import { Slot, Stack, useSegments } from "expo-router";
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
   BottomNavigationBar,
   PageFooter,
} from "@/assets/modules/clb-modules";

import { Icon } from "@/assets/modules/clb-icons";
import { AuthContextProvider, UseAuth } from "@/context/authContext";
import { useRoute } from "@react-navigation/native";


SplashScreen.preventAutoHideAsync();

const 
   MainLayout = () => {
      const 
         { IsAuthenticated } = UseAuth()
         ,
         segments = useSegments()
         ,
         router = useRoute()
      ;
      
      useEffect( () => {
         // 
         if( typeof IsAuthenticated == "undefined" ) { return; }

         const inApp = segments[0] == "(tabs)";

         if( IsAuthenticated && !inApp ) {
            // redirect user to home
            router.replace( "home" );
         } else if( IsAuthenticated == false ) {
            router.replace( "SignIn" );
         }
      }, [ IsAuthenticated ] );
      
      return <Slot />
   }
;

export default function RootLayout() {
   const 
      [ User, setUser ] = useState<User | null>( null )
      , 
      [loaded] = useFonts( {
        SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
        GodOfThunder: require('@/assets/fonts/GodOfThunder.ttf'),
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
      <AuthContextProvider>
         <MainLayout />
      </AuthContextProvider>
      <Stack screenOptions={ { ...stack_screenOptions } } >
         <Stack.Screen name="jf" options={ { ...screen_00_options } } />
         <Stack.Screen name="+not-found" />
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
      // ,
      // headerStyle: {
      //    backgroundColor: "#00559C",
      // }
      ,
      statusBarColor: "#00559c",
      headerBlurEffect: "regular",
      headerTransparent: true,
   }
   ,
   screen_00_options = {
      // headerTitle: "Eletrica & Art",
      headerShown: false,
   }
;