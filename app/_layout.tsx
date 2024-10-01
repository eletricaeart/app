

import React, { useEffect, useState } from "react";
import { router, Stack, useSegments } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import { useFonts } from 'expo-font';
import {
   useColorScheme,
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



export {
   // Catch any errors thrown by the Layout component.
   ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
   initialRouteName: "/landing",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
   const 
      // [ User, setUser ] = useState<User | null>( null )
      [ User, setUser ] = useState<User | null>()
      , 
      [ Initializing, setInitializing ] = useState( true )
      ,
      [loaded] = useFonts( {
        SpaceMono: require('@/src/fonts/SpaceMono-Regular.ttf'),
        GodOfThunder: require('@/src/fonts/GodOfThunder.ttf'),
      } )
      ,
      segments = useSegments()   
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
         if( Initializing ) { setInitializing( false ); }
      } );
   }, [] );

   useEffect( () => {
      if( Initializing ) { return; }
      const inTabs = segments[ 0 ] === "(tabs)";
      if( User && !inTabs ) {
         // router.replace( "/(tabs)/home" )
         router.replace( "/(drawer)" )
      } else if( !User && inTabs ) {
         router.replace( "/" );
      }
   }, [ User, Initializing ] );
 
   if( !loaded ) { return null; }


   return( <> 
         <Stack initialRouteName="landing" 
            screenOptions={{ 
               // animation: "none" 
               statusBarColor: "#27f"
            }}
         >
            <Stack.Screen name="landing" options={{ headerShown: false, statusBarColor: "#1b1d22", animation: "fade" }} />
            <Stack.Screen name="index" options={{ headerShown: false, statusBarColor: "#1b1d22" }} />
            {/* <Stack.Screen name="(tabs)" options={{ headerShown: false, statusBarColor: "#00559c" }} /> */}
            <Stack.Screen name="(drawer)" options={{ headerShown: false, statusBarColor: "#00559c" }} />
            <Stack.Screen name="(home)" options={{ headerShown: false, statusBarColor: "#00559c" }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false, animation: "none"  }} />
            {/* <Stack.Screen name="signup" options={{ headerShown: false , presentation: "modal", statusBarColor: "#1b1d22", animation: "none", }} /> */}
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