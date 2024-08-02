

import { 
   StyleSheet,
   View, Text,
   Pressable, 
} from "react-native";
import { Icon } from "react-native-paper";


/** == [ AppBar ] 
 * 
 * == == == == == == == == == */
export function AppBar( { ...props } ) {
   return( <>
      <View 
      style={ {
         backgroundColor: "#00559C",
         elevation: 5,
         borderColor: "#3333",
         borderBottomColor: "#3333",
         borderBottomWidth: 0,
         zIndex: 9,
      } } >
         <View 
         style={ {
            backgroundColor: "#00559C",
            height: 60,
         } }>
         </View>
      </View>
   </> );
} 


// AppBarLeft 
export function AppBarLeft( { ...props } ) {
   return( <>
      <Pressable 
      style={{ 
         borderRadius: 100,
         justifyContent: "center", 
         overflow: "hidden",
         marginLeft: 8,
         aspectRatio: 1,
         width: 45,
      }}
      android_ripple={{ color: "#fff", 
         radius: 24,
         foreground: true,
      }}
      >
         <View style={{ 
            alignItems: "center",
            justifyContent: "center",
         }}>
            <Icon i="f" name="user-circle" color="#fff"/>
         </View>
      </Pressable>
   </> );
} 


// AppBarRight 
export function AppBarRight( { ...props } ) {
   return( <>
      <Pressable 
      style={{ 
         borderRadius: 100,
         justifyContent: "center", 
         overflow: "hidden",
         marginRight: 8,
         aspectRatio: 1,
         width: 45,
      }}
      android_ripple={{ color: "#fff", 
         radius: 24,
         foreground: true,
      }}
      >
         <View style={{ 
            alignItems: "center",
            justifyContent: "center",
         }}>
            <Icon i="mc" name="dots-vertical" color="#fff"/>
         </View>
      </Pressable>
   </> );
} 