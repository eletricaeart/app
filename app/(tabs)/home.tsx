

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
} from "react-native";

import { Appbar, } from "react-native-paper";

import {
   Icon,
} from "@/src/widgets/clb-icons";

import * as c from "@/src/widgets/clb-html";
import { Tiles, Tile, Header, T1, VSplit, HeaderBanner, T2, T, } from "@/src/widgets/ui";
import { GetObjData, } from "@/src/widgets/clb-dbs";


const 
   items = [
      { id: 1, name: "Google", src: "https://google.com" }
      ,
      { id: 2, name: "Facebook", src: "https://facebook.com" }
      ,
      { id: 3, name: "YouTube", src: "https://youtube.com" }
   ]
;


export default function Home( { ...props } ) {
   const 
      [ Subtitle, setSubtitle ] = useState( "" )
      ,
      [ User, setUser ] = useState( {} )
   ;

   useEffect( () => {
      GetObjData( "user" ).then( user => {
         setUser( user );
      } ); 
   }, [] );

   return( <>
      <Sheet 
         style={{ backgroundColor: "#fafafa", 
            // alignItems: "center", justifyContent: "center",
         }}
      >
         <HeaderBanner >
            <Image source={ require( "@/src/images/EA/HeaderBannerBP.png" ) } resizeMode="contain" 
               style={{ width: "100%", height: "100%", }}
            />
            <Header style={{ position: "absolute", }}>
               <T1 style={{ color: "#eee", }}>Olá { User && User.name }</T1>
               <T style={{ color: "#ddd", }}>Tudo bem!?</T>
            </Header>
         </HeaderBanner>
         <Header>
            <T1 style={{ color: "#daa520", }}>Home (tabs)</T1>
         </Header>
         <VSplit />
         <Tiles>
            {
               items.map( item => {
                  return( <Tile key={ item.id } style={{ 
                     // shadowOffset: { width: 2, height: 5 }, 
                     // shadowOpacity: .5, 
                     // shadowRadius: 15, 
                     // shadowColor: "#0009",
                     // elevation: 15, 
                     }}>
                     <Text style={{ fontSize: 22, color: "#333", fontWeight: 800, }}>{ item.name }</Text>
                     <Text style={{ fontSize: 18, color: "#fc0fc0", }}>{ item.id }</Text>
                     <Text style={{ fontSize: 14, color: "#777", }}>{ item.src }</Text>
                  </Tile> );
               } )
            }
         </Tiles>
      </Sheet>
   </> );
}

