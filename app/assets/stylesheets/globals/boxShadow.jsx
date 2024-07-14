

import { StyleSheet } from "react-native";

const
   boxShadow = StyleSheet.create( {
      shadow: {
         shadowColor: "#000",
         shadowOffset: {
            width: 0,
            height: 5
         },
         shadowOpacity: .5,
         shadowRadius: 4,
         elevation: 10,
      }
   } )
;

export default boxShadow;