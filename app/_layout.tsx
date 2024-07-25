


import React from "react";
import { Stack } from "expo-router";
import {
   View,
   Text,
   Image,
   Button,
} from "react-native";

import {
   AppBar,
   AppBarLeft,
   AppBarRight,
   BottomNavigationBar,
   PageFooter,
} from "@/assets/modules/clb-modules";

import { Icon } from "@/assets/modules/clb-icons";

export default function RootLayout() {
   return( <>
      <Stack 
         screenOptions={
            {
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
               statusBarColor: "#00559c"
            }
         }
      >
         <Stack.Screen
            name="jf"
            options={{
               // headerTitle: "Eletrica & Art",
               headerShown: false,
            }}
         />
      </Stack>
   </> );
}
