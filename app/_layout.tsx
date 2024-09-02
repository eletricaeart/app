

import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
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

import {
   AppBar,
   AppBarLeft,
   AppBarRight,
   PageFooter,
} from "@/src/widgets/clb-widgets";

import { Icon } from "@/src/widgets/clb-icons";
import {
   DarkTheme,
   DefaultTheme,
   ThemeProvider,
} from "@react-navigation/native";


export {
   // Catch any errors thrown by the Layout component.
   ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
   // Ensure that reloading on `/modal` keeps a back button present.
   // initialRouteName: "(tabs)",
   initialRouteName: "/landing",
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
   // const colorScheme = useColorScheme();
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
      onAuthStateChanged( FirebaseAuth, user => {
         console.log( { user } );
         setUser( user ); 
      } );
   }, [] );
 
   if( !loaded ) { return null; }


   return( <> 
      {/* <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}> */}
         <Stack initialRouteName="landing"
            screenOptions={{ 
               // animation: "none" 
               statusBarColor: "#27f"
            }}
         >
            <Stack.Screen name="landing" options={{ headerShown: false, statusBarColor: "#1b1d22", animation: "fade" }} />
            <Stack.Screen name="index" options={{ headerShown: false, statusBarColor: "#1b1d22" }} />
            {/* <Stack.Screen name="home/(tabs)" options={{ headerShown: false }} /> */}
            <Stack.Screen name="home" options={{ headerShown: false, statusBarColor: "#00559c" }} />
            <Stack.Screen name="auth" options={{ headerShown: false, animation: "none"  }} />
            {/* <Stack.Screen name="modal" options={{ presentation: "modal" }} /> */}
            {/* <Stack.Screen name="signin" options={{ headerShown: false , presentation: "fullScreenModal", statusBarColor: "#1b1d22", animation: "none", }} />
            <Stack.Screen name="signup" options={{ headerShown: false , presentation: "modal", statusBarColor: "#1b1d22", animation: "none", }} /> */}
         </Stack>
      {/* </ThemeProvider> */}
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