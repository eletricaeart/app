

import { Icon } from "@/src/widgets/clb-icons";
import React, { useState, useEffect, } from "react";

import {
   Image,
   Modal,
   Pressable,
   StyleSheet,
   Text,
   View,
   useWindowDimensions,
} from "react-native";

import {
   H2,
   P, 
} from "@/src/widgets/ui/index";

import {
   View as DrawerView, 
} from "react-native-animatable";
// import { P } from ".";

const Item = ( { ...props } ) => {
   return( <>
      <Pressable
         // onPress={ props.item.onPress }
         onPress={ props.onPress }
         style={{
            // backgroundColor: "#173",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
            paddingVertical: 12,
            paddingRight: 6,
         }}
      >
         { props.item.icon ? (
            <Icon i={ props.item.iconFamily } name={ props.item.icon }/> 
            ) : ( <></> )
         }
         <Text style={{ fontWeight: "semibold", }}>{ props.item.name }</Text>
      </Pressable>
   </> );
}

const Drawer = ( { ...props } ) => {
   const {
      width, height,
   } = useWindowDimensions();

   const s = StyleSheet.create( {
      btnSlot: {
         width: props.w || "100%",
         padding: 9,
      },
      btn: {
         backgroundColor: props.bg || "#0075BD",
         borderRadius: 13,
         overflow: "hidden",
         width: "100%",
         height: props.h || 48,
         marginHorizontal: "auto",
         elevation: props.elevation || 3,
         shadowColor: props.shadow || "#000",
         alignItems: "center",
         justifyContent: "center",  
      },
   } );
   return( <>
      <Modal transparent={ true } onRequestClose={ props.enable }> 
         <Pressable 
            onPress={ props.enable }
            style={{ flex: 1, width: "100%", height: "100%", zIndex: 99,
               // backgroundColor: "#27f",
            }}
         > 
         </Pressable>
         <DrawerView /* animation='slideInLeft' */ 
            style={{ flex: 1, 
               position: "absolute", top: 0, left: 0,
               width: "75%", 
               height: "100%", 
               backgroundColor: props.bg || "#f5f5f5",
               // borderRadius: 18, 
               borderTopEndRadius: 54,
               elevation: 10,
               shadowColor: "#999",
               padding: 16,
               borderColor: "#7770", borderWidth: 1,
               zIndex: 999,
               // gap: 16,
            }}
         >
            <View>
               <H2 
                  style={{
                     color:"#ccc"
                  }}
               >Anselmo Sammarco</H2>
               <Image source={ require( "../../../images/Avatar/default_avatar_masc_ico.webp" ) }
                  resizeMode="cover" 
                  style={{ 
                     width: 120, 
                     height: 120, 
                     marginVertical: 50,
                     marginHorizontal: "auto",
                     borderRadius: 1000,
                     padding: 8,
                     elevation: 3,
                     borderColor:"#00559C",
                     borderWidth: 6,
                  }}
               />   
            </View>
            <View 
               style={{
                  padding: 16,
                  gap: 16,
               }}
            >
               <View style={{ flexDirection: "row", alignItems: "center", gap: 8,  }}>
                  <Icon i="mc" name="home" color="#eee"/>
                  <P style={{ color: "#eee" }}>Item 1</P>
               </View>
               <View style={{ flexDirection: "row", alignItems: "center", gap: 8,  }}>
                  <Icon i="mc" name="home" color="#eee"/>
                  <P style={{ color: "#eee" }}>Item 2</P>
               </View>
               <View style={{ flexDirection: "row", alignItems: "center", gap: 8,  }}>
                  <Icon i="mc" name="home" color="#eee"/>
                  <P style={{ color: "#eee" }}>Item 3</P>
               </View>
            </View>
            { props.itens &&
               props.itens.map( ( item: { name: string; icon: string; iconFamily: string; onPress: () => void; } ) => (
                  <Item item={ item } onPress={ () => {
                     item.onPress();
                     props.enable();
                  } }
                  />
               ) )
            }
         </DrawerView>
      </Modal>
   </> )
};


export default Drawer;