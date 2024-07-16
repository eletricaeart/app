

import * as React from "react";
import {
   StyleSheet,
   Text 
} from "react-native";
import { 
   Searchbar 
} from "react-native-paper";

export default function SearchBar( props ) {
  const 
      [ searchQuery, 
         setSearchQuery ] = React.useState( "" )
   ;

  return( <>
      <Text style={ s.text }>SearchBar</Text>
      {/* <Searchbar
         placeholder="Search"
         onChangeText={ setSearchQuery }
         value={ searchQuery }
      /> */}
   </> );
}

const 
   s = StyleSheet.create( {
      text: {
         color: "#27f",
      }
      ,
   } )
;
