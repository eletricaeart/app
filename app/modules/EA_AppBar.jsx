

import React from "react";
import {
   View,
   Text,
   Button, 
   Image,
   StyleSheet
} from "react-native";
import globalStyle from "../assets/stylesheets/globalStyle";
import colors from "../assets/stylesheets/globals/colors";
import appbar from "./EA_AppBar-style";


export default function AppBar( props ) {
   const 
      imgs = {
         ea: require( "../assets/imgs/ea.jpg" )
         ,
         logo: require( "../assets/imgs/EA-logo-ap.png" )
      }
   ;

   return( <>
      <View style={ [ appbar.root, globalStyle.boxShadow ] }>
         <View style={ appbar.rootContent }>
            <View style={ appbar.menuLeft }>
               <View style={ [ appbar.menuLeftContent ] }>
                  <View style={ [ appbar.backBtn ] } id="backBtn">
                     <View style={ [ appbar.backBtnBarCenter ] } id="backBtn_centerBar"></View>
                  </View>
               </View>
            </View>
            <View style={ [ appbar.Logo ] }>
               <View style={ [ appbar.eaLogo ] }>
                  <View style={ [ appbar.logoIcon ] }>
                     <Image 
                        source={ imgs.logo }
                        style={ appbar.logoTitleImage }
                     />
                  </View>
               </View>
            </View>
            <View style={ [ appbar.MenuRight ] }>
               <View style={ [ appbar.MenuRightContent ] } id="">
                  <View style={ [ appbar.trigram ] } id="openDrawer">
                     <View style={ [ appbar.trigramBarBottom ] } id="bottomBar_left"></View>
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
         height: 72,
         zIndex: 9,
         backgroundColor: "#00559C",
      },
      boxShadow: {
         shadowColor: "#333",
         shadowOffset: {
            width: 0,
            height: 5
         },
         shadowOpacity: .5,
         shadowRadius: 4,
         elevation: 10,
      },
   } )

   // appbar = StyleSheet.create( {
   //    root: {
   //       flexBasis: 72,
   //       margin: 0,
   //       padding: 0,
   //       zIndex: 9,
   //       backgroundColor: colors.cardLv1,
   //    }
   //    ,
   //    rootContent: {
   //       flexDirection: "row",
   //       alignItems: "center",
   //       height: "100%",
   //       paddingTop: 0,
   //       paddingBottom: 0,
   //       paddingLeft: 16,
   //       paddingRight: 16,
   //    }
   //    ,
   //    menuLeft: {}
   //    ,
   // } )
;