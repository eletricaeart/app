

import * as React from "react";
import {
   StyleSheet,
   View,
   Text,
   Button 
} from "react-native";
import { 
   Searchbar 
} from "react-native-paper";
import SearchBar from "../widgets/SearchBar";

export default function Home( props ) {
//   const 
//       [ searchQuery, 
//          setSearchQuery ] = React.useState( "" )
//    ;

   return( <>
      <View>
         <SearchBar />
         <Text style={{ color: "#fc0" }}>&lt; Home</Text>
      </View>
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

