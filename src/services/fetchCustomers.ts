

import useCustomersFB from "../hooks/useCustomersFB";
import { useState } from "react";
import { get, child, ref, getDatabase } from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as CStore from "@/src/widgets/clb-dbs";

export default async function FetchUserData() {
   try {
      const 
         userInfo = await CStore.GetObjData( "user" )
      ;
      console.log( "user: ", await CStore.GetObjData( "user" ) );
      await get( 
         child( 
            ref( getDatabase() ), 
            `users/${ userInfo.uid }/customers` 
         ) 
      ).then(
         dataList => { 
            const 
               list: ( ( prevState: never[] ) => never[] ) 
                  | 
                  { key: any; id: any; name: any; email: any; }[] = []
                  // list: SetStateAction<{ id: string; name: string; email: string; }> | { id: any; name: any; email: any; }[] = []
               ;
            
            dataList.forEach( data => {
               const 
                  key = data.key
                  ,
                  value = data.val()
               ;
               // list.push( {
               //    key: key,
               //    id: value.id,
               //    name: value.name,
               //    email: value.email,
               // } );
               list.push( { ...data.val() } )
            } );
            return list;
         }
      ).then( async ( returned ) => {
         await AsyncStorage.setItem( "customers", JSON.stringify( returned ) );
      } );

   } catch( err: any ) {
      console.error( "FetchUserData() err0: \n\n\n", err );
   }
}


      


