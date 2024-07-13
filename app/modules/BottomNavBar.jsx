

import {
   StyleSheet,
   View,
   Text,
   Button,
} from "react-native";


export default function BottomNavBar( props ) {


   return( <>
      <View style={ style.BottomNavBar }>
         <Text>BottomNavBar</Text>
      </View>
   </> );
}

const 
   style = StyleSheet.create( {
      BottomNavBar: {
         backgroundColor: "#16181c",
         height: 68,
      }
   } )
;