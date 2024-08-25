

import React, { useEffect, useState } from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Icon } from "@/src/widgets/clb-icons";
import { SplashScreen, Stack, Tabs, } from "expo-router";
import { useFonts } from "expo-font";

const Tab = createBottomTabNavigator();

SplashScreen.preventAutoHideAsync();

export default function AuthLayout() {
   const 
      [ ModalMenuVisibility, setModalMenuVisibility ] = useState( false )
      ,
      [ MenuLeftVisibility, setMenuLeftVisibility ] = useState( false )
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
 
   if( !loaded ) { return null; }

  return(
      <Stack screenOptions={{ headerShown: false, statusBarColor: "#1b1d22" }} initialRouteName="sign-in">
         <Stack.Screen name="index" options={{ statusBarColor: "#1b1d22" }}/>
         <Stack.Screen name="sign-in" options={{  }} />
         <Stack.Screen name="sign-up" options={{  }}/>
      </Stack>
  );
}