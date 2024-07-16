

import {
   StyleSheet
} from "react-native";
import {
   SafeAreaView,
   SafeAreaProvider,
} from 'react-native-safe-area-context';
import colors from "../assets/stylesheets/globals/colors";

const 
   appbar = StyleSheet.create( {
      root: {
         flexDirection: "row",
         justifyContent: "space-between",
         flexBasis: 69,
         maxHeight: 69,
         margin: 0,
         padding: 0,
         zIndex: 9,
         backgroundColor: colors.cardLv1,
      }
      ,
      left: {
         flexBasis: 35,
         aspectRatio: 1,
         // backgroundColor: colors.appbarTitle,
         color: "#fff",
         width: 20,
         height: "100%",
         maxHeight: "100%",
         aspectRatio: 1,
      }
      ,
      right: {
         flexBasis: 35,
         aspectRatio: 1,
         // backgroundColor: colors.appbarTitle,
         color: "#29f",
         width: 20,
         height: "100%",
         maxHeight: "100%",
         aspectRatio: 1,
      }
      ,
      center: {
         // backgroundColor: "#fc0",
         flex: 1,

      }
      ,
      logoPlaceholder: {
         // backgroundColor: "#fff",
         flex: 1,
         flexDirection: "row",
         alignItems: "center",
         justifyContent: "center",
      }
      ,
      logoImage: {
         // width: 90,
         height: "70%",
         gap: 8,
         // backgroundColor: "#27f"   
      }
      ,
   } )
;

export default appbar;