

import React, { useState, useEffect, Component } from "react";

import {
   PageFooter,
   BottomNavigationBar,
   Fab,
} from "@/assets/modules/clb-modules";

import * as c from "@/assets/modules/clb-html";
import * as ea from "@/assets/modules/clb-ea";

import { Icon } from "@/assets/modules/clb-icons";

import {
   StyleSheet,
   ScrollView,
   View,
   Text,
   Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


/* == [ properties ]
== == == == == == == == == */
async function InsertDBs() {
   await AsyncStorage.setItem( "customer_dbs", JSON.stringify( [
      {
         name: "Débora", gender: "feminino"
      },
      {
         name: "Noely", gender: "feminino"
      },
      {
         name: "Bernardo", gender: "masculino"
      },
      {
         name: "Anselmo", gender: "masculino"
      },
   ] ) );
}
// InsertDBs();


/* == [ exports ]
== == == == == == == == == */
export default function Customers( { ...props } ) {
   const 
      [ Customers, setCustomers ] = useState( [] )
   ;



   useEffect( () => {
      const fetchData = async () => {
        const data = await AsyncStorage.getItem( "customer_dbs" );
        const json = await JSON.parse( data );
         console.log( "json: \n\n\n", json );
        setCustomers( json );
      }
    
      fetchData()
        .catch( console.error );
    }, [] );

   // useEffect( () => { Customers.map( customer => {
   //    return( <>
   //       <ea.UsersCard 
   //          key={ customer.id }
   //          name={ customer.Name }
   //       />
   //    </> );
   // } ) }, [ Customers ] )

   useEffect( () => { Customers.map( customer => {
      return( <>
         <ea.UsersCard 
            key={ customer.id }
            name={ customer.Name }
         />
      </> );
   } ) }, [ AsyncStorage.getItem( "customer_dbs" ) ] )
   

   return( <>
      <ScrollView>
         <c.Section bg="#e2f4fe" style={{ flex: 1, }}>
            <c.Header>
               <c.Content>
                  <c.H2>Clientes</c.H2>
               </c.Content>
            </c.Header>
            <c.Section>
               <c.Content gap={ 16 }>

                  { Customers != null ? 
                     Customers.map( customer => {
                        return( <>
                           <ea.UsersCard 
                              key={ customer.id }
                              name={ customer.Name }
                           />
                        </> );
                     } )
                     : 
                     console.log( "" )
                  }
               </c.Content>
            </c.Section>
         </c.Section>
      </ScrollView>
   </> );
}