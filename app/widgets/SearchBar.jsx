

import * as React from "react";
import {
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
      <Text>SearchBar</Text>
      {/* <Searchbar
         placeholder="Search"
         onChangeText={ setSearchQuery }
         value={ searchQuery }
      /> */}
   </> );
};

