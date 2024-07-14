

import * as React from "react";
import {
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
         <Text>Home</Text>
      </View>
   </> );
};

