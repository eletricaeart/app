

import React from "react";

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


   return( <>
      <c.Header bg="#f5f5f5">
         <c.Content>
            <c.H2 color="#00559C">Home</c.H2>
         </c.Content>
      </c.Header>
      <c.Section bg="#f5f5f5" style={{ flex: 1, }}>
         <c.Content>
            <c.Tiles style={{ flexDirection: "row", justifyContent: "space-between" }}>

               <c.Tile>
                  <c.Content bg="#fff">
                     <c.H4 >Nome</c.H4>
                     <c.P color="#000">
                        hfu ufufsdufhs
                     </c.P>
                  </c.Content>
               </c.Tile>

               <c.Tile>
                  <c.Content bg="#fff">
                     <c.H4 >Nome</c.H4>
                     <c.P color="#000">
                        hfu ufufsdufhs
                     </c.P>
                  </c.Content>
               </c.Tile>
               
               <c.Tile>
                  <c.Content bg="#fff">
                     <c.H4 >Nome</c.H4>
                     <c.P color="#000">
                        hfu ufufsdufhs
                     </c.P>
                  </c.Content>
               </c.Tile>
               
               <c.Tile>
                  <c.Content bg="#fff" style={{ minHeight: 50, }}>
                     <c.H4 >Nome</c.H4>
                     <c.P color="#000">
                        hfu ufufsdufhs
                     </c.P>
                  </c.Content>
               </c.Tile>
               
               <c.Tile>
                  <c.Content bg="#fff">
                     <c.H4 >Nome</c.H4>
                     <c.P color="#000">
                        hfu ufufsdufhs
                     </c.P>
                  </c.Content>
               </c.Tile>

            </c.Tiles>
         </c.Content>
      </c.Section>
   </> );
}

