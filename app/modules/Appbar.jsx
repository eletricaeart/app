

import * as React from "react";
import {
   Text, 
   Image 
} from "react-native";
import { 
   Appbar,
   Avatar,
} from "react-native-paper";
import colors from "../assets/stylesheets/globals/colors";

export default function AppBar( props ) {
  const 
      _goBack = () => console.log( "Went back" )
      ,
      _handleSearch = () => console.log( "Searching" )
      ,
      _handleMore = () => console.log( "Shown more" )
  ;

   return( <>
      <Appbar.Header 
         theme={ { 
            colors: { 
               primary: "#27f",
               background: "#fc0",
               surface: "#fc0",
               "elevation": {
                  "level0": "transparent",
                  "level1": colors.cardLv1,
                  "level2": colors.cardLv1,
                  "level3": colors.cardLv1,
                  "level4": colors.cardLv1,
                  "level5": colors.cardLv1
               },
               "onSurface": colors.appbarTitle,
            } 
         } } 
         style={ { 
            // backgroundColor: colors.cardLv1,
            color: "#fff"
         } }
         elevated={true}
         mode="center-aligned" 
         statusBarHeight="72"
      >

         <Appbar.BackAction onPress={ _goBack } />
         <Appbar.Content 
            title={ props.title || "Céo" }
            style={ { 
               backgroundColor: colors.cardLv1,
            } } 
         />
         <Appbar.Action icon="magnify" 
            onPress={ _handleSearch } 
            color={ colors.appbarTitle }   
         />
         <Appbar.Action icon="dots-vertical" 
            onPress={ _handleMore } 
            color={ colors.appbarTitle }
            rippleColor={ colors.appbar_rippleColor }
         />
      </Appbar.Header>
   </> );
};
