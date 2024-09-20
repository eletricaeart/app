

import useCustomersFB from "../hooks/useCustomersFB";
import { useState } from "react";
import { get, child, ref, getDatabase } from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as CStore from "@/src/widgets/clb-dbs";

export default async function UpdateCustomersBase() {
   try {
      const 
         userInfo = await CStore.GetObjData( "user" )
      ;
      console.log( "user: ", await CStore.GetObjData( "user" ) );
      await get( child( ref( getDatabase() ), props.path || `users/${ userInfo.uid }/customers` ) )
      .then(
         dataList => { 
            const 
               list: (
                  ( prevState: never[] ) => never[] ) 
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
            AsyncStorage.setItem( "customers", JSON.stringify( list ) );
            return list;
            
         }
      );
      
      let
         { CustomersFB, Loading } = useCustomersFB({})
         ,
         tempCustomersFBJson = JSON.stringify( CustomersFB )
      ;

      await AsyncStorage.setItem( "customers", tempCustomersFBJson );

   } catch( err: any ) {
      console.error( "UpdateCustomersBase() err: \n\n\n", err );
   }
}


      


