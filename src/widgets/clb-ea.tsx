

import React, { useState } from "react";

import {
   StyleSheet,
   ScrollView,
   View,
   Text,
   Image,
   Button,
   Dimensions,
   Pressable,
   ToastAndroid,
} from "react-native";

import {
   Avatar,
} from "react-native-paper";

import * as c from "./clb-html";
import * as Colores from "@/src/widgets/clb-colors";

import { Icon } from "./clb-icons";
import { Link, router, } from "expo-router";
import { H4, Menu, P, T } from "./ui";
import { color } from "native-base/lib/typescript/theme/styled-system";
import CustomerView from "@/app/(file)/customer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoadCustomerView } from "../services/customerServices";
// import { Link, useLinkProps, } from "@react-navigation/native";




/* == [ exports ]
== == == == == == == == == */
export function HeaderTitle( { ...props } ) {
   const hs = StyleSheet.create( {
      text: {
         fontFamily: "GodOfThunder",
         textAlign: "center",
         fontWeight: "bold",
         fontSize: 18,
         margin: 0,
         padding: 0,
         lineHeight: 16,
         color: "#fff",
         textShadowColor: "#0005",
         textShadowRadius: 8,
         textShadowOffset: {
            width: 2, height: 3
         },
      },
      text_e: { color: "#daa520" }
   } );
   return( <>
      {/* <Image source={ require( "@/src/images/EA/EA-logo-appbar-2.png" ) }
         style={ {
            resizeMode: "contain",
            width: 140,
            height: 60,
            alignSelf: "center",
            
         } }
      /> */}
      <Image source={ require( "@/src/images/EA/EA-appbar-title.png" ) }
         style={ {
            resizeMode: "contain",
            width: "23%",
            height: "100%",
            alignSelf: "center",
            
         } }
      />
      {/* <View>
         <Text style={[ hs.text, ]}>Eletrica</Text>
         <Text style={[ hs.text, hs.text_e ]}>&</Text>
         <Text style={[ hs.text, ]}>Art</Text>
      </View> */}
   </> );
}




/**
 * EACard
 * 
 */
export function EACard() {
   const { width } = Dimensions.get( "window" ); // andy: 411.42857142857144 H1-fsz: //0.053472222,
   const 
      logo = {
         // raw: "https://raw.githubusercontent.com/Ceo-js/ea/2e6fdd74866a50968095c8c6942156d1e93e1c34/ea.jpg"
         raw: "https://rawcdn.githack.com/eletricaeart/app/6e75f2fa11d56872a7e284e03c20bd865925ff2c/src/images/EA/globo-de-plasma-300.png?raw=true"
         ,
         local: "@/src/images/EA/globo-de-plasma-700.png"
      }
      ,
      s = StyleSheet.create( {
         card: {
            // backgroundColor: Colores.colors.blue0, 
            backgroundColor: "#19497b", 
            width: "100%", flexDirection: "row",
            padding: 8,
            // aspectRatio: "16 / 6.5",
            aspectRatio: "16 / 5.8",
            // alignItems: "center", justifyContent: "space-between",
            alignItems: "center", justifyContent: "space-around",
         },

         picture: {
            height: "90%",
            aspectRatio: 1, backgroundColor: Colores.colors.blue1,
            borderRadius: 1000,
            alignItems: "center",
            justifyContent: "center",
         },
         img: {
            width: "97%", height: "97%",
            borderRadius: 1000,
         },

         description: {
            flexBasis: 200,
            aspectRatio: 1 / .6,
            alignItems: "center",
            justifyContent: "center",
            // backgroundColor: "#fff3",
         },
         tt: {
            color: "#fff",
            fontSize: width / 22,
            fontWeight: "bold",
            marginBottom: 6,
         },
         sbt: {
            color: "#fff",
            fontSize: width / 39,
            fontWeight: "bold",
            marginBottom: 8,
         },
         txt: {
            color: "#fff",
            fontSize: width / 45,
         },
         b: {
            color: "#fff",
            fontSize: width / 45,
            fontWeight: "bold",
         },
         row: {
            flexDirection: "row",
         },
      } )
   ;

   return( <>
      <View style={[ s.card ]}>

         <View style={[ s.picture ]}>
            <Image 
            source={ { uri: logo.raw } }
            style={[ s.img ]} resizeMode="contain"/>
         </View>

         <View style={[ s.description ]}>
            <Text style={[ s.tt ]}>ELÉTRICA & ART</Text>
            <Text style={[ s.sbt ]}>CNPJ 32.858.892/0001-52 - IM 67358/0001 </Text>
            <Text style={[ s.txt ]}>Rua José Alves Maciel, 40 - Aviação </Text>
            <Text style={[ s.txt ]}>Praia Grande - São Paulo - SP - Cep 11702-440</Text>
            <View style={[ s.row ]}>
               <Text style={[ s.b ]}>Fone  </Text>
               <Text style={[ s.txt ]}>( 13 ) 99768-5853 </Text>
            </View>
            <View style={[ s.row ]}>
               <Text style={[ s.b ]}>WhatsApp  </Text>
               <Text style={[ s.txt ]}>( 13 ) 99768-5853</Text>
            </View>
            <View style={[ s.row ]}>
               <Text style={[ s.b ]}>E-mail  </Text>
               <Text style={[ s.txt ]}>rafa.julia.forever@gmail.com </Text>
            </View>
         </View>

      </View>
   </> );
}



/**
 * usersCard
 * 
 */
export function UsersCard( { ...props } ) {
   const 
      [ MenuState, setMenuSTate ] = useState<boolean>( false )
      ,
      child = props.children 
      ,
      defaultPic = props.data.gender == "Masculino" ?
         require( "@/src/images/Avatar/default_avatar_masc_ico.webp" )
         :
         require( "@/src/images/Avatar/default_avatar_fem_ico.webp" )
      ,
      name = props.name || "Nome do Cliente"
      ,
      tel = props.tel || "(13) 99148-6078"
   ;
   const s = StyleSheet.create( {
      card: {
         flexDirection: "row",
         backgroundColor: "#e5e5e5",
         borderRadius: 16,
         // padding: 16,
         borderColor: "#fc0",
         borderWidth: 0,
         elevation: 3,
         shadowColor: "#7777",
         width: "95%",
         height: 93,
         margin: "auto",
         overflow: "hidden",
      },
      picture: {
         aspectRatio: 1, 
         backgroundColor: "#009ee600",
         // backgroundColor: "#00559c",
         borderRadius: 1000,
         alignItems: "center",
         justifyContent: "center",
         height: "100%",
         padding: 16,
      },
      img: {
         width: "100%", height: "100%",
         borderRadius: 1000,
      },
      customerInfo: {
         justifyContent: "center",
         flex: 1,
         width: 70,
         // paddingLeft: 16,
         // backgroundColor: "#fc7",
      },
      sideBtn: {
         width: "auto",
         padding: 16,
         alignItems: "center",
         justifyContent: "center",
         // backgroundColor: "#fc7",
      },
   } )

   return( <>
      <View style={[ s.card, props.style ]}>

         <Pressable style={[ s.picture ]} onPress={ () => {
            alert( "foto" );
         } }>
            <Image 
               source={ props.data.profilepic || defaultPic }
               style={[ s.img ]} resizeMode="contain"
            />
         </Pressable>

         <Pressable style={ s.customerInfo } onPress={ () => {
            async function LoadCustomerView() {
               async function handle() {
                  try {
                     const json = JSON.stringify( props.data );
                     await AsyncStorage.setItem( "customer", json );
                  } catch( err: any ) {
                     console.error( "LoadCustomerView() err: \n\n\n", err );
                  }
               }
               handle().then( () => {
                  router.push( "/customer" );
               } );
            }
            LoadCustomerView();
            // router.push( { pathname: "/customer", params: { ...props.data } } );
         } }>
            {/* <Link to={{ screen: "customer", params: { id: 'jane' } }}> */}
            {/* <c.H4>Anselmo Sammarco Nunes</c.H4> */}
            <H4 style={{ color:"#242526" }}>{ name }</H4>
            {/* <c.T>(13) 99148-6078</c.T> */}
            <T style={{ color:"#777" }}>{ tel }</T>
         </Pressable>

         <Pressable style={[ s.sideBtn ]} onPress={ () => {
               // ToastAndroid.show(
               //    props.name,
               //    ToastAndroid.SHORT,
               // );
               setMenuSTate( !MenuState );
            } }>
               <Icon i="mc" name="dots-vertical" color="#777"/>
            
         </Pressable>

         <Menu style={{ display: MenuState ? "flex" : "none", backgroundColor: "#0075BD" , zIndex: 999, position: "absolute" }}>
            <Pressable onPress={ () => {
               setMenuSTate( !MenuState );
               LoadCustomerView( props.data );
            } }>
               <P style={{ color: "#eee" }}>Editar</P>
            </Pressable>
            <Pressable onPress={ () => {
               setMenuSTate( !MenuState );
            } }>
               <P style={{ color: "#eee" }}>Deletar</P>
            </Pressable>
         </Menu>
      </View>
   </> );
}



/**
 * CustomersCard
 * 
 */
export function CustomersCard( { ...props } ) {
   const 
      child = props.children 
      ,
      defaultPic = props.data.gender == "Masculino" ?
         require( "@/src/images/Avatar/default_avatar_masc_ico.webp" )
         :
         require( "@/src/images/Avatar/default_avatar_fem_ico.webp" )
      ,
      name = props.name || "Nome do Cliente"
      ,
      tel = props.tel || "(13) 99148-6078"
   ;
   const s = StyleSheet.create( {
      card: {
         flexDirection: "row",
         backgroundColor: "#fff",
         borderRadius: 16,
         padding: 16,
         borderColor: "#fc0",
         borderWidth: 0,
         elevation: 15,
         width: "95%",
         height: 93,
         margin: "auto",
      },
      picture: {
         aspectRatio: 1, 
         backgroundColor: "#009ee6",
         // backgroundColor: "#00559c",
         borderRadius: 1000,
         alignItems: "center",
         justifyContent: "center",
         height: "100%",
      },
      img: {
         width: "100%", height: "100%",
         borderRadius: 1000,
      },
      customerInfo: {
         justifyContent: "center",
         flex: 1,
         width: 70,
         paddingLeft: 16,
         // backgroundColor: "#4565",
      },
      sideBtn: {
         width: "auto",
         // paddingRight: 8,
         alignItems: "center",
         justifyContent: "center",
         // backgroundColor: "#456",
      },
   } )

   return( <>
      <View style={[ s.card, props.style ]}>

         <View style={[ s.picture ]}>
            <Pressable style={[ s.picture ]} onPress={ () => {
               // alert( "foto" );
            } }>
            <Image 
               source={ props.data.profilepic || defaultPic }
               style={[ s.img ]} resizeMode="contain"
            />
            </Pressable>
         </View>

         <View style={ s.customerInfo }>
            {/* <Link to={{ screen: "customer", params: { id: 'jane' } }}> */}
            {/* <Pressable style={{ display: "flex", flexDirection: "column" }}> */}
               <H4 color="#242526">{ name }</H4>
               <T color="#777">{ tel }</T>
            {/* </Pressable>    */}
         </View>

         {/* <View style={ s.sideBtn }>
            <Pressable onPress={ () => {
               alert( props.name || "menu" );
            } }>
               <Icon i="mc" name="dots-vertical" color="#777"/>
            </Pressable>
         </View> */}

      </View>
   </> );
}