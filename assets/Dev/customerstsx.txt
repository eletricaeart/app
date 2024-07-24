

import React, { useState, useEffect } from "react";

import {
   PageFooter,
   BottomNavigationBar,
   Fab,
} from "../assets/modules/clb-modules";

import * as c from "../assets/modules/clb-html";
import * as ea from "../assets/modules/clb-ea";

import { Icon } from "@/assets/modules/clb-icons";

import {
   StyleSheet,
   ScrollView,
   View,
   Text,
   Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

let customers = [];


async function UpdateCustomersLiveDBs( dbs_name ) {
   let list = [];
   try {
      if( await AsyncStorage.getItem( dbs_name ) ) {
         const 
            listDBs = await AsyncStorage.getItem( dbs_name )
         ;
         list = [ ...await JSON.parse( listDBs ) ]
      }

      return( list );
   } catch( err ) {
     console.log( "\n\n== == == == == ==\nsaving error: \n", err );
   }
}
// UpdateCustomersLiveDBs( "customer_dbs" ).then( res => { /* customers = [ ...res ];  */console.log( "customers:: ", customers ); } );

useEffect( () => {
   UpdateCustomersLiveDBs( "customer_dbs" )
   .
   then( res => {
      return customers = [ ...res ]
   }, [] );
} );

export default function Customers( { ...props } ) {
   const 
      [ liveDB_customers, set_liveDB_customers ] = useState( [ ...customers ] )
   ;


   return( <>
      <c.Section>
         <c.Header>
            <c.Content>
               <c.H2>Clientes</c.H2>
            </c.Content>
         </c.Header>
         <c.Section>
            <c.Content gap={ 8 }>

               { liveDB_customers.map( customer => {
                  if( customer != null ) {
                     return( <>
                        <ea.UsersCard 
                           name={ customer.Name }
                        />
                     </> );
                  } /* else {
                     return( <>
                        <ea.UsersCard 
                           name={ "oi" }
                        />
                     </> );
                  } */
               } ) }
            </c.Content>
         </c.Section>
      </c.Section>
   </> );
}