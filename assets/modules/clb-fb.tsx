

import { getDatabase, ref, child, get } from "firebase/database";











/**
 * == == == == == Read data once
 * 
 * import { getDatabase, ref, child, get } from "firebase/database";
 * 
 */
export async function GetFBData( { ...props } ) {
   async function GetData() {
      try {
         await get( 
            child( 
               ref( getDatabase() ), 
               props.ref // `users/${userId}` 
            ) 
         ).then( snapshot => {
            if( snapshot.exists() ) {
               console.log( snapshot.val() );
            } else {
               console.log( props.errMsg || "No data available" );
            }
         } )
      } catch( err ) {
         console.error( "GetFBData() err:\n\n\n", err );
      }
   }
   GetData()
}