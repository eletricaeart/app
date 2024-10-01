

/** == [ @imports ] 
 * == == == == == == == == == */
import { Btn } from "@/src/widgets/ui/animated";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState, useEffect, useRef } from "react";
import { 
   StyleSheet,
   View,
   Text, 
   DrawerLayoutAndroid,
   ScrollView,
   Image,
   Pressable,
} from "react-native";
import { Icon } from "../../clb-icons";


/** == [ properties ]
 * == == == == == == == == == */
type direction = "left" | "right";

type DrawerProps = {
   direction?: direction;
   children?: any;
   open?: () => void;
   close?: () => void;
   openned?: boolean;
   drawer?: any;
};

type ItemProps = {
   title: string;
   bg?: string;
   radius?: number;
   i?: string;
   name?: string;
   size?: number;
   color?: string;
   style?: any;
   onPress?: () => void;
};


function Padding( { ...props }: { pd: number; gap?: number; children: any; } ) {
   return(
      <View
         style={ { padding: props.pd || 16, gap: props.gap || 0, } }
      >
         { props.children }
      </View>
   );
}

function DrawerItem( { ...props }: ItemProps ) {
   return(
      <View style={[ 
         s.drawerItemCapsule, 
         { 
            backgroundColor: props.bg || "#fff",
            borderRadius: props.radius || 13,
         } 
      ]}>
         <Pressable
            style={ s.drawerItem }
            onPress={ () => { props.onPress && props.onPress() } }
         >
            <Icon 
               i={ props.i } 
               name={ props.name } 
               color={ props.color } 
               size={ props.size } 
            />
            <Text style={[ s.drawerText, ]}>{ props.title }</Text>
         </Pressable>
      </View>
   );
}

/** == [ exports ]
 * == == == == == == == == == */
export default function DrawerView( { ...props }: DrawerProps ) {

   return(
      <View
         style={[ s.sheet, { backgroundColor: props.bg || "#212329", } ]}
      >
         <ScrollView>
            <View style={[ s.userInfoWrapper, { backgroundColor: props.bg || "#16181c", } ]}>
               <Image
                  source={{ uri: "https://randomuser.me/api/portraits/men/3.jpg" }}
                  width={80}
                  height={80}
                  style={ s.userImg}
               />
               <View style={ s.userDetailsWrapper}>
                  <Text style={ s.userName}>John Doe</Text>
                  <Text style={ s.userEmail}>john@email.com</Text>
               </View>
            </View>

            <Padding pd={ 8 } gap={ 6 }>
               <DrawerItem 
                  title="DView"
                  bg="#515359"
                  onPress={ () => router.push( "/testes/DView" ) }
                  i="mc"
                  name="google-downasaur"
               />
               <DrawerItem 
                  title="DView"
                  bg="#515359"
                  onPress={ () => router.push( "/testes/DView" ) }
               />
            </Padding>
            
         </ScrollView>
      </View> 
   );
}


/** == [ StyleSheet ]
 * == == == == == == == == == */
const 
   s = StyleSheet.create( {
      sheet: {
         flex: 1,
         // alignItems: "center",
         // justifyContent: "center",
         // backgroundColor: "#212329",
      },
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
      },
      navigationContainer: {
        backgroundColor: '#ecf0f1',
      },
      paragraph: {
        padding: 16,
        fontSize: 15,
        textAlign: 'center',
      },
      navItemLabel: {
        marginLeft: -20,
        fontSize: 18,
      },
      userInfoWrapper: {
        flexDirection: "row",
        paddingHorizontal: 10,
        paddingVertical: 20,
      //   borderBottomColor: "#ccc",
      //   borderBottomWidth: 1,
        marginBottom: 10,
      },
      userImg: {
        borderRadius: 40,
      },
      userDetailsWrapper: {
        marginTop: 25,
        marginLeft: 10,
      },
      userName: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      userEmail: {
        fontSize:16,
        fontStyle: 'italic',
        textDecorationLine: 'underline',
      },

      drawerItemCapsule: {
         height: 46,
         backgroundColor: "#497",
         padding: 8,
      },
      drawerItem: {
         height: "100%",
         // backgroundColor: "#f5f5f5",
         flexDirection: "row",
         gap: 8,
         alignItems: "center",
         // justifyContent: "center",
      },
      drawerText: {
         fontSize: 18,
      }
   } )
;