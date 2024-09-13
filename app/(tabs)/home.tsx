

import React, { useState, useEffect } from "react";

import {
   PageFooter,
   // BottomNavigationBar,
   Sheet,
} from "@/src/widgets/clb-widgets";

import {
   StyleSheet,
   ScrollView, 
   View,
   Text,
   Image,
   ImageBackground,
   ActivityIndicator,
   Pressable,
} from "react-native";

import { Appbar, } from "react-native-paper";

import {
   Icon,
} from "@/src/widgets/clb-icons";

import * as c from "@/src/widgets/clb-html";
import { Tiles, Tile, Header, T1, VSplit, HeaderBanner, T2, T, } from "@/src/widgets/ui";
import { GetObjData, } from "@/src/widgets/clb-dbs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth } from "firebase/auth";
import { router } from "expo-router";


const 
   items = [
      { id: 1, name: "Parede de DryWall", src: "/drywallCalc",
         icon: "calculator", icn: "f", iconColor: "#fc0fc0",
         size: 46
      }
      ,
      { id: 2, name: "Forro de DryWall", src: "//drywallCalcRoof",
         icon: "calculator", icn: "f", iconColor: "#fc0",
         size: 46
      }
      ,
   ]
;


export default function Home( { ...props } ) {
   const 
      [ Subtitle, setSubtitle ] = useState( "" )
      ,
      // [ User, setUser ] = useState( GetObjData( "user" ) )
      [ User, setUser ] = useState( {} )
      ,
      [ Loading, setLoading ] = useState( false )
   ;

   async function FetchLocalUser() {
      // fetch & return user from localStorage
      try {
         const 
            user = await AsyncStorage.getItem( "user" ).then( r => JSON.parse( r ) )
         ;
         return user;
      } catch( err: any ) {
         console.error( "() err: \n\n\n", err );
      }
   }

   async function SetUser() {
      // get user from localStorage & setUser( user )
      try {
         FetchLocalUser().then( r => setUser( r ) );
      } catch( err: any ) {
         console.error( "SetUser() err: \n\n\n", err );
      }
   }


   useEffect( () => {
      SetUser();
   }, [] );

   useEffect( () => {
      SetUser();
   }, [User] );

   return( <>
      <Sheet style={{ backgroundColor: "#fafafa", }}>
         <HeaderBanner >
            <Image source={ require( "@/src/images/EA/HeaderBannerBP.png" ) } resizeMode="contain" 
               style={{ width: "100%", height: "100%", }}
            />
            <Header style={{ position: "absolute", }}>
               <T1 style={{ color: "#eee", }}>
                  Olá { User && User.displayName }
                  
                  {/* Olá { 
                     User ? Loading ? (
                        <ActivityIndicator
                        style={{marginTop: 30}}
                        size="large"
                        color="#fc0fc0"
                        />
                     ) : (
                        User
                     )
                  } */}
               </T1>
               <T style={{ color: "#ddd", }}>Tudo bem!?</T>
            </Header>
         </HeaderBanner>
         <Header style={{ flexDirection: "row", gap: 16 }}>
            <Icon name="calculator" i="f" color="#00559C"/>
            <T1 style={{ color: "#daa520", }}>Calculadoras</T1>
         </Header>
         <VSplit />
         <Tiles>
            {
               items.map( item => {
                  return( <>
                     <Tile key={ item.id } >
                        <Pressable onPress={ () => router.push( item.src ) }
                           style={{ flex: 1, }}
                        >
                           <Icon name={ item.icon } color={ item.iconColor } i={ item.icn } size={ item.size }/>
                           <Text style={{ fontSize: 18, color: "#fc0fc0", }}>calculadora</Text>
                           <Text style={{ fontSize: 22, color: "#333", fontWeight: 800, }}>{ item.name }</Text>
                           {/* <Text style={{ fontSize: 14, color: "#777", }}>{ item.src }</Text> */}
                        </Pressable>
                     </Tile>
                  </> );
               } )
            }
         </Tiles>
      </Sheet>
   </> );
}

