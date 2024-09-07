
import React, { useState, useEffect, } from "react";
import { router } from "expo-router";

import AsyncStorage from "@react-native-async-storage/async-storage";

export async function LoadCustomerView( customerData ) {
   async function handle() {
      try {
         const json = JSON.stringify( customerData );
         await AsyncStorage.setItem( "customer", json );
      } catch( err: any ) {
         console.error( "LoadCustomerView() err: \n\n\n", err );
      }
   }
   handle().then( () => {
      router.push( "/editCustomer" );
   } );
}