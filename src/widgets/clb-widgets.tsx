
// http://127.0.0.1:8081
import HomeScreen from "@/app-example/app/(tabs)";
import React, { Children, useEffect, useState } from "react";

import {
   StyleSheet,
   ScrollView,
   View,
   Text,
   Image,
   Button,
   TouchableOpacity,
   Linking,
   Platform,
   SafeAreaView,
   Pressable,
} from "react-native";

import { Icon } from "./clb-icons";

import { 
   AnimatedFAB, 
   BottomNavigation,
   Drawer as DrawerRNP,
} from "react-native-paper";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";

import Routes from "@/app/routes";
import Homepage from "@/app/homepage";
import { Str2Brl } from "../utils";
import { H3, P } from "./clb-html";
import { PP, Menu } from "./ui";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

/* == [ AppBar ]
== == == == == == == == == */
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
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
         } }
      >
         {/* <Image source={ require( "@/src/images/EA/EA-appbar-title.png" ) }  */}
         <Image source={ require( "@/src/images/EA/EA-appbar-title-bc.png" ) } 
         style={{ width: "23%", height: "100%" }}
         resizeMode="contain"/>
      </View>
   </> );
} 

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




/* == [ Header ]
== == == == == == == == == */
export function Header( { ...props } ) {
   const 
      child = props.children
   ;

   return( <>
      <View style={ { backgroundColor: props.bg || "#00338C", 
         paddingTop: 24, paddingBottom: 24, 
         paddingLeft: 16, paddingRight: 16,
         marginBottom: props?.mb
      } }>
         <Text style={ { 
            fontSize: 18, color: "#fff",
            fontWeight: "bold",
         } }>
            { props.title }
            { child }
         </Text>
      </View>
   </> );
}



/* == [ Drawer ]
== == == == == == == == == */
export function Drawer( { ...props } ) {
   const 
      [ active, setActive ] = React.useState( "" )
   ;

   return( <>
      <DrawerRNP.Section title="Some title"
         style={{
            backgroundColor: "#212329",
            width: "80%",
            // display: "none",
            position: "absolute",
            top: -10,
         }}
      >
         <DrawerRNP.Item
            label="First Item"
            active={ active === "first" }
            onPress={ () => setActive( "first" ) }
         />
         <DrawerRNP.Item
            label="Second Item"
            active={ active === "second"}
            onPress={ () => setActive( "second" ) }
         />
      </DrawerRNP.Section>
   </> );
}



/* == [ EA Card ]
== == == == == == == == == */
export function EACard( { ...props } ) {
   const 
      child = props.children
   ;

   return( <>
      <View style={ { backgroundColor: "#00338C", 
         paddingTop: 24, paddingBottom: 24, 
         paddingLeft: 16, paddingRight: 16,
      } }>
         <Text style={ { 
            fontSize: 18, color: "#fff",
            fontWeight: "bold",
         } }>
            { props.title }
            { child }
         </Text>
      </View>
   </> );
}



/* == [ Fab ]
== == == == == == == == == */
export function Fab( { ...props } ) {
   const 
      [ isExtended, setIsExtended ] = React.useState( false )
      ,
      isIOS = Platform.OS === "ios"
      ,
      styles = StyleSheet.create({
         container: {
            flexGrow: 1,
         },
         fabStyle: {
            backgroundColor: "#f55",
            color: "#fff",
            bottom: 16,
            right: 16,
            position: "absolute",
         },
      })
      ,
      fabStyle = { [ props.animateFrom ]: 16 }
   ;

   return (
         <AnimatedFAB
            icon={ props.icon || "plus" }
            label={ props.label || "Options" }
            // extended={ isExtended }
            extended={ isExtended }
            onPress={ () => setIsExtended( !isExtended ) }
            visible={ props.visible || "visible" }
            animateFrom={ props.animateFrom || "right" }
            iconMode={ props.iconMode || "static" }
            style={ [ styles.fabStyle, props.style, fabStyle ] }
         />
   );
}


/* == [ Press ]
== == == == == == == == == */
export function Press( { ...props } ) {
   const 
      bg = props.bg || "#bdcfea"
      ,
      color = props.color || "#0075BD"
      ,
      width = props.width 
      ,
      styles = StyleSheet.create( {
         root: {
            height: 56,
            backgroundColor: bg,
            borderColor: "#fff2",
            borderWidth: 1,
            borderStyle: "solid",
            borderRadius: 16,
            width: width,
            paddingTop: 16,
            paddingBottom: 16,
            paddingLeft: 16,
            paddingRight: 16,
            alignItems: "center",
            justifyContent: "center",
         },
         text: {
            fontSize: 18,
            fontWeight: "bold",
            textTransform: "uppercase",
            color: color,
         },
      } )
      ,
      text = props.text || "Press Me"
      ,
      pressedText = props.pressedText || text
   ;

   return( <>
      <Pressable
         { ...props }
         onPress={ props.onPress }
         onPressIn={ props.onPressIn }
         onPressOut={ props.onPressOut }
         style={ ({ pressed }) => [
            {
               backgroundColor: pressed ? "#27f" : "white",
            },
            styles.root,
            props.style
         ] }
      >
         { ({pressed}) => (
            <Text style={ styles.text }>{ pressed ? pressedText : text }</Text>
         ) }
      </Pressable>
   </> );
}


/* == [ touchableopacity ] 
== == == == == == == == == */
export function Touch( { ...props } ) {
   const 
      bg = props.bg || "#bdcfea"
      ,
      color = props.color || "#0075BD"
   ;
   return( <>
      <TouchableOpacity { ...props } style={ [
            {
               height: 56,
               backgroundColor: bg,
               borderColor: "#fff2",
               borderWidth: 1,
               borderStyle: "solid",
               borderRadius: 16,
               paddingTop: 16,
               paddingBottom: 16,
               paddingLeft: 16,
               paddingRight: 16,
               alignItems: "center",
               justifyContent: "center",
            },
            { ...props.touchSty },
         ] } >
         <Text style={ [
            {
               fontSize: 18,
               fontWeight: "bold",
               textTransform: "uppercase",
               color: color,
            },
            { ...props.txtSty },
         ] }>
            { props.txt }
         </Text>
      </TouchableOpacity>
   </> );
}



/* == [ sheet ]
== == == == == == == == == */
export function Sheet( { ...props } ) {

   return( <>
      <View  style={[ props.style, { flex: 1, width: "100%", } ]}>
         { props.children }
      </View>
   </> );
}



/**
 * budget cardlist
 * 
 */
export function BudgetCardList( { ...props } ) {
   const 
      [ MenuState, setMenuState ] = useState<boolean>( false )
   ;

   useEffect( () => {
      setMenuState( false );
   }, [] );
   return(
      <View
         budget={ props }
         // key={ props.id }
         name={ props.name }
         style={{
            // backgroundColor: "#afc",
            height: 120,
            flexDirection: "row",
            marginTop: 4,
            marginBottom: 4,
         }}
      >
         <View style={{
               backgroundColor: "#afb",
               height: "100%",
               flex: .45 - .18,
               paddingTop: 18,
               paddingBottom: 18,
               paddingLeft: 18,
               paddingRight: 9,
               alignItems: "center",
               justifyContent: "center",
            }}
         >
            <View style={{ 
               backgroundColor: "#daa520", 
               alignItems: "center", 
               justifyContent: "center",
               padding: 8,
               borderRadius: 1000, 
            }}
            >
               <Icon i="mc" name="receipt" color="#afb"/>
            </View>
         </View>

         <View style={{
               flex: 1,
               paddingTop: 18,
               paddingBottom: 18,
               paddingLeft: 9,
               paddingRight: 9,
            }}
         >
            <H3>{ props.budget.name }</H3>
            <P style={{ color: "#777" }}>{ Str2Brl( props.budget.receiptValue ) }</P>
         </View>

         <View style={{
               // backgroundColor: "#afb",
               width: "100%",
               height: "100%",
               flex: .45,
               padding: 0,
               alignItems: "center",
               justifyContent: "center",
            }}
         >
            <Pressable
               style={{
                  // backgroundColor: "#27f5",
                  width: "100%",
                  height: "100%",
                  flex: 1,
                  paddingTop: 18,
                  paddingBottom: 18,
                  paddingLeft: 9,
                  paddingRight: 18,
                  alignItems: "center",
                  justifyContent: "center",
               }}
               onPress={ () => setMenuState( !MenuState ) }
            >
               { 
                  props.budget.isPaid ? ( 
                     <View
                        style={{
                           backgroundColor: "#27f3",
                           width: "100%",
                           paddingTop: 2,
                           paddingBottom: 2,
                           paddingLeft: 6,
                           paddingRight: 6,
                           borderRadius: 20,
                           alignItems: "center",
                           justifyContent: "center",
                        }}
                     >
                        <PP style={{ color: "#27f", fontWeight: "bold" }}>
                           Pago
                        </PP>
                     </View>
                  ) : (
                     <View
                        style={{
                           backgroundColor: "#f723",
                           paddingTop: 2,
                           paddingBottom: 2,
                           paddingLeft: 6,
                           paddingRight: 6,
                           borderRadius: 20,
                           alignItems: "center",
                           justifyContent: "center",
                        }}
                     >
                        <PP style={{ color: "#f72", fontWeight: "bold" }}>
                           Receber
                        </PP>
                     </View>
                  )
               }
            </Pressable>
         </View>
               { MenuState &&
                  <Menu style={{}}>
                     <Pressable onPress={ () => {
                        const 
                           budgetHook = {
                              budgetId: props.budget.id,
                              ownerId: props.budget.owner,
                           }
                        ;
                        async function LoadBudget() {
                           async function handle() {
                              try {
                                 const 
                                    json = JSON.stringify( budgetHook )
                                 ;

                                 await AsyncStorage.setItem( "budgetHook", json );
                              } catch( err: any ) {
                                 console.error( "LoadBudget() err: \n\n\n", err );
                              }
                           }
                           handle().then( () => router.push( "../getBudgetPdf" ) );
                        }
                        LoadBudget();
                        setMenuState( !MenuState );
                     } }>
                        <P style={{  }}>ver o documento</P>
                     </Pressable>
                     <Pressable onPress={ () => alert( "oi" ) }>
                        <P style={{  }}>editar</P>
                     </Pressable>
                     <Pressable onPress={ () => alert( "oi" ) }>
                        <P style={{  }}>deletar</P>
                     </Pressable>
                  </Menu>
               }

      </View>
   );
}



/* == [ Page-Footer ]
== == == == == == == == == */
export function PageFooter( { ...props } ) {
   const 
      s = StyleSheet.create( {
         section: {
            
         },
         h3: {
            color: "#fff", alignItems: "center", justifyContent: "center",
            fontSize: 18, fontWeight: "bold",
            textAlign: "center",
         },
         p: {
            color: "#fff", alignItems: "center", justifyContent: "center",
            textAlign: "center",
         },
         taCenter: { textAlign: "center", },
         b: {
            fontWeight: "bold",
         },
         pd: { padding: 6, },
         picture: {
            width: "100%",
            aspectRatio: "1 / .5",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 36,
            marginBottom: 36,
         },
         contact: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
         }
      } ) 
   ;

   return( <>
      <View style={ { 
         backgroundColor: "#000", 
         width: "100%",
         alignItems: "center",
         gap: 3,
         paddingBottom: 36,
      } }>
         <View style={ [s.picture, ] }>
            <Image 
               source={ require( "../images/EA/EA-logo-footer.png" ) }
               style={ {
                  resizeMode: "contain",
                  width: "90%",
               } }
            />
         </View>
         <View style={ s.pd }>
            <Text style={ s.h3 }>CNPJ 32.858.892/0001-52 - IM 67358/0001</Text>
         </View>
         <View>
            <Text style={ s.p }>Rua José Alves Maciel, 40 - Aviação</Text>
         </View>
         <View>
            <Text style={ s.p }>Praia Grande - São Paulo - SP - Cep 11702-440</Text>
         </View>
         <View style={ [ s.pd, { gap: 3, } ] }>
            <View style={ s.contact } onTouchStart={ () => { Linking.openURL( "tel:5513997685853" ) } }>
               <Icon i="mc" name="phone" color="#27f"/>
               <Text style={ [ s.p, s.b, ] }>( 13 ) 99768-5853 </Text>
            </View>
            <View style={ s.contact } onTouchStart={ () => { Linking.openURL( "https://wa.me/5513997685853/?text=%4F%6Cá%20%52%61%66%61%65%6C%21%20%54%75%64%6F%20%62%65%6D%21%3F" ) } }>
               <Icon i="mc" name="whatsapp" color="#0a0"/>
               <Text style={ [ s.p, s.b, ] }>( 13 ) 99768-5853 </Text>
            </View>
         </View>
         <View style={ s.contact } id="v1" onTouchStart={ () => { Linking.openURL( "mailto:rafa.julia.forever@gmail.com" ) } }>
            <Icon i="mc" name="email-seal-outline" color="#f55"/>
            <Text style={ [ s.p, s.b, ] }>rafa.julia.forever@gmail.com</Text>
         </View>
      </View>
   </> );
}