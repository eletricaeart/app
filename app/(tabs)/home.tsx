

import React, { useState, useEffect } from "react";

import {
   Header,
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
} from "react-native";

import { Appbar, } from "react-native-paper";

import {
   Icon,
} from "@/src/widgets/clb-icons";

import * as c from "@/src/widgets/clb-html";
import { Tiles, Tile } from "@/src/widgets/ui";

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
   ;
 

   return( <>
      <Sheet 
         style={{ backgroundColor: "#fafafa", 
            // alignItems: "center", justifyContent: "center",
         }}>
         <Text>Home (tabs)</Text>
         <Tiles>
            {
               items.map( item => {
                  return( <Tile key={ item.id }>
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

