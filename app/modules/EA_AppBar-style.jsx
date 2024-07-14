

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
         flexBasis: 69,
         maxHeight: 69,
         margin: 0,
         padding: 0,
         zIndex: 9,
         backgroundColor: colors.cardLv1,
      }
      ,
      rootContent: {
         flexDirection: "row",
         alignItems: "center",
         height: "100%",
         paddingTop: 0,
         paddingBottom: 0,
         // paddingLeft: 16,
         // paddingRight: 16,
      }
      ,
      menuLeft: {
         aspectRatio: 1,
         color: colors.appbarTitle,
         color: "#fff",
         // flexBasis: "15%",
         height: "100%",
         maxHeight: "100%",
         aspectRatio: 1,
      }
      ,
      menuLeftContent: {}
      ,
      backBtn: {}
      ,
      backBtnBarTop: {}
      ,
      backBtnBarCenter: {}
      ,
      backBtnBarBottom: {}
      ,
      Logo: {
         color: "#fff",
         height: "100%",
         flex: 1,
      }
      ,
      eaLogo: {
         height: "100%",
         flexDirection: "row",
         alignItems: "center",
         justifyContent: "center",
         gap: 8,
         // backgroundColor: "#27f"   
      }
      ,
      logoIcon: {
         width: "100%",
         height: "100%",
         borderRadius: 100,
         alignItems: "center",
         justifyContent: "center",
         // backgroundColor: "#daa520",
      }
      ,
      logoImage: {
         borderRadius: 100,

         aspectRatio: 1,
         width: 54,
         height: 54,
      }
      ,
      logoTitleImage: {
         width: 100,
         height: "80%",
      }
      ,
      logoTitle: {
         alignItems: "center",
         justifyContent: "center",
      }
      ,
      logoTitleContent: {
      }
      ,
      tt: {
         display: "flex",
         color: "#fff",
         // backgroundColor: "#000",
         fontSize: 19,
         lineHeight: 19,
         letterSpacing: 3,
         minWidth: "35%",
         textAlign: "center",
      }
      ,
      MenuRight: {}
      ,
      MenuRightContent: {
         aspectRatio: 1,
         color: colors.appbarTitle,
         color: "#fff",
         height: "100%",
         maxHeight: "100%",
         aspectRatio: 1,
      }
      ,
      trigram: {}
      ,
      trigramBarLeft: {}
      ,
      trigramBarCenter: {}
      ,
      trigramBarBottom: {}
      ,
   } )
;

export default appbar;