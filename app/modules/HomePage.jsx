

import { Children } from "react";
import {
   StyleSheet,
   View, ScrollView,
   Text,
   Button,
} from "react-native";


export default function HomePage( props ) {


   return( <>
      <ScrollView style={ style.HomePage }>
         <Text>HomePage 1</Text>
         {/* { props.page } */}
      </ScrollView>
   </> );
}

const 
   style = StyleSheet.create( {
      HomePage: {
         backgroundColor: "#fff",
         flex: 1,
      }
   } )
;