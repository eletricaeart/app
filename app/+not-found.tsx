

import React, { useState, useEffect } from "react";
import firebase from "@/assets/services/FBConnection";
import {
   Database,
} from "@react-native-firebase/database";

import {
   Header,
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

import {
   Icon,
} from "@/assets/modules/clb-icons";

import * as c from "@/assets/modules/clb-html";


export default function Home( { ...props } ) {
   const 
      [ Subtitle, setSubtitle ] = useState( "" )
   ;
 



   return( <>
      <c.Header bg="#f5f5f5">
         <c.Content style={{ alignItems: "start", }}>
            <c.H2 color="#00559C">Home</c.H2>
            <c.H4 color="#777">{ Subtitle }</c.H4>
         </c.Content>
      </c.Header>
      <c.Section bg="#f5f5f5" style={{ flex: 1, }}>
         <c.Content>
            <c.H3>...essa página não existe</c.H3>
         </c.Content>
      </c.Section>
   </> );
}

