

import React, { useState, } from "react";
import {
   get, child, ref, getDatabase,
} from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";


/**
 * == GetCustomers() 
 * 
 */
export async function GetCustomers() {
   async function Load() {
      try {
         const tempList: any[] | PromiseLike<any[]> = [];

         await get( child( ref( getDatabase() ), "customers" ) )
         . 
         then( Users => {
            Users.forEach( user => {
               let 
                  key = user.key,
                  value = user.val()
               ;

               tempList.push( {
                  id: value.id,
                  name: value.name,
                  email: value.email,
               } );
            } );

            return tempList;
         } )
         . 
         then( returned => {
            setCustomersList( returned );
         } );
      } catch( err ) {
         alert( err );
      }
   }
   Load();
}




/** == [ insert db for test ] 
 * 
 * == == == == == == == == == */
export async function InsertDBs() {
   await AsyncStorage.setItem( "customer_dbs", JSON.stringify( [
      {
         name: "Débora", gender: "feminino", 
         id: uuid.v4(),

      },
      {
         name: "Noely", gender: "feminino", 
         id: uuid.v4(),

      },
      {
         name: "Bernardo", gender: "masculino", 
         id: uuid.v4(),

      },
      {
         name: "Anselmo", gender: "masculino", 
         id: uuid.v4(),

      },
   ] ) );
}
// InsertDBs();