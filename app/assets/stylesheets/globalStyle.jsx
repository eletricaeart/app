

import {
   StyleSheet
} from "react-native";

const 
   globalStyle = StyleSheet.create( {
      boxShadow: {
         shadowColor: "#333333",
         shadowOffset: {
            width: 0,
            height: 0
         },
         shadowOpacity: 1,
         shadowRadius: 10,
         elevation: 10,
      },
      boxShadow0: {
         shadowColor: "#000",
         shadowOffset: {
            width: 0,
            height: 5
         },
         shadowOpacity: .3,
         shadowRadius: 4,
         elevation: 10,
      },
      colors: {
         bg: "#e5e5e5",
         bg2: "#f5f5f5",
         ground: "#fff",
         cardLv1: "#00559C",
         cardLv2: "#0075BD",
         cardLv3: "#009ee6",
      
         appbarTitle: "#fff",
         appbarTitleDivider: "#daa520",
         card: "#f5f5f5",
         
         textColor: "#333",
         aHover: "#747bff",
         btnBg: "#27f",
         error: "#f55",
         
      }
   } )
;

export default globalStyle;