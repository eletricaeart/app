

import React, { useState, useEffect } from "react";

import {
   PageFooter,
   BottomNavigationBar,
   Sheet,
} from "@/src/widgets/clb-widgets";

import {
   StyleSheet,
   ScrollView, 
   View,
   Text,
   Image,
   ImageBackground,
   ActivityIndicator,
} from "react-native";

import { Appbar, } from "react-native-paper";

import {
   Icon,
} from "@/src/widgets/clb-icons";

import * as c from "@/src/widgets/clb-html";
import { Tiles, Tile, Header, T1, VSplit, HeaderBanner, T2, T, } from "@/src/widgets/ui";
import { GetObjData, } from "@/src/widgets/clb-dbs";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Home( { ...props } ) {
   const 
      [ Subtitle, setSubtitle ] = useState( "" )
      ,
      [ User, setUser ] = useState( GetObjData( "user" ) )
      ,
      [ Loading, setLoading ] = useState( false )
   ;

   async function FetchLocalUser() {
      try {
         const 
            data = await AsyncStorage.getItem( "user" )
            ,
            jsonData = await JSON.parse( data )
         ;
         return jsonData;
      } catch( err: any ) {
         console.error( "FetchLocalUser() err: \n\n\n", err );
      }
   }

   async function SetUser() {
      try {
         await FetchLocalUser().then(
            returned => setUser( returned )
         );
      } catch( err: any ) {
         console.error( "SetUser() err: \n\n\n", err );
      }
   }


   useEffect( () => {
      SetUser();
   }, [] );

   return( <>
      <Sheet style={{ backgroundColor: "#fafafa", }}>
         <HeaderBanner >
            <Image source={ require( "@/src/images/EA/HeaderBannerBP.png" ) } resizeMode="contain" 
               style={{ width: "100%", height: "100%", }}
            />
            <Header style={{ position: "absolute", }}>
               <T1 style={{ color: "#eee", }}>
                  Olá { User && User.name }
               </T1>
               <T style={{ color: "#ddd", }}>Tudo bem!?</T>
            </Header>
         </HeaderBanner>
         <Header>
            <T1 style={{ color: "#daa520", }}>Cliente</T1>
         </Header>
         <VSplit />
      </Sheet>
   </> );
}

