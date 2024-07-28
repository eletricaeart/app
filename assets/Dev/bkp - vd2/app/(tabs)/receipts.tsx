

import React from "react";

import {
   PageFooter,
   BottomNavigationBar,
} from "@/assets/modules/clb-modules";

import {
   StyleSheet,
   ScrollView,
   View,
   Text,
   Image,
} from "react-native";


export default function Receipts( { ...props } ) {


   return( <>
      <View style={ { flex: 1, backgroundColor: "#212329", } }>
         <Text style={ { flex: 1, color: "#fc0", } }>Recibos</Text>
         {/* <PageFooter /> */}
      </View>
   </> );
}