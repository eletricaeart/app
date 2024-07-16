

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
         <Text style={ style.text }>HomePage 1</Text>
         { props.page  }
      </ScrollView>
   </> );
}

const 
   style = StyleSheet.create( {
      HomePage: {
         backgroundColor: "#1b1d22",
         flex: 1,
      },
      text: {
         color: "#fc0fc0",
      }
   } )
;