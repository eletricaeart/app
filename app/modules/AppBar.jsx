

import React from "react";
import {
   View,
   Text,
   Button,
   StyleSheet
} from "react-native";


export default function AppBar( props ) {


   return( <>
      <View style={ style.appbar }>
         <View content>
            <View appbar-menu-left>
               <View content>
                  <View back-btn id="backBtn">
                     <View bar id="backBtn_topBar"></View>
                     <View bar id="backBtn_centerBar"></View>
                     <View bar id="backBtn_bottomBar"></View>
                  </View>
               </View>
            </View>
            <View appbar-logo>
               <View ea-logo>
                  <View logo-icon>
                     <img src="./ea.jpg" alt="ea" />
                  </View>
                  <View logo-title>
                     <View content>
                        <Text tt>ELETRICA</Text>
                        <Text tt>&</Text>
                        <Text tt>ART</Text>
                     </View>
                  </View>
               </View>
            </View>
            <View appbar-menu-right>
               <View content id="">
                  <View trigram id="openDrawer">
                     <View bar id="topBar_left"></View>
                     <View bar id="centerBar_left"></View>
                     <View bar id="bottomBar_left"></View>
                  </View>
               </View>
            </View>
         </View>
      </View>
   </> );
}

const 
   style = StyleSheet.create( {
      appbar: {
         height: "72px",
         backgroundColor: "#00559C",
      }
   } )
;