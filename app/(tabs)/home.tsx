

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


const 
   items = [
      { id: 1, name: "Google", src: "https://google.com" }
      ,
      { id: 2, name: "Facebook", src: "https://facebook.com" }
      ,
      { id: 3, name: "YouTube", src: "https://youtube.com" }
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
                  {/* Olá { User && User.name } */}
                  Olá  Maluco loko
                  
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
         <Header>
            <T1 style={{ color: "#daa520", }}>Home (tabs)</T1>
         </Header>
         <VSplit />
         <Tiles>
            {
               items.map( item => {
                  return( <Tile key={ item.id }>
                     <Text style={{ fontSize: 22, color: "#333", fontWeight: 800, }}>{ item.name }</Text>
                     <Text style={{ fontSize: 18, color: "#fc0fc0", }}>{ item.id }</Text>
                     <Text style={{ fontSize: 14, color: "#777", }}>{ item.src }</Text>
                  </Tile> );
               } )
            }
         </Tiles>
      </Sheet>
   </> );
}

