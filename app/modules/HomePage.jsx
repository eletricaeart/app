

import {
   StyleSheet,
   View, ScrollView,
   Text,
   Button,
} from "react-native";


export default function HomePage( props ) {


   return( <>
      <ScrollView style={ style.HomePage }>
         <Text>HomePage</Text>
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