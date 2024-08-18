

import { useState, useEffect, SetStateAction, } from "react";
import { get, child, ref,getDatabase, } from "firebase/database";

import * as CStore from "@/src/widgets/clb-dbs";


export default function useCustomersFB( { ...props } ) {
   const 
      [ CustomersFB, setCustomersFB ] = useState( [] /* {
         id: "",
         name: "",
         email: "",
      } */ )
      ,
      [ Loading, setLoading ] = useState( true )
   ;

   useEffect( () => {
      async function FetchData() {
         try {
            const 
               userInfo = await CStore.GetObjData( "user" )
            ;
            await get( child( ref( getDatabase() ), props.path || `users/${ userInfo.uid }/customers` ) )
            .then(
               dataList => { 
                  const 
                     list: ((prevState: never[]) => never[]) | { key: any; id: any; name: any; email: any; }[] = []
                     // list: SetStateAction<{ id: string; name: string; email: string; }> | { id: any; name: any; email: any; }[] = []
                  ;
                  
                  dataList.forEach( data => {
                     const 
                        key = data.key
                        ,
                        value = data.val()
                     ;
                     list.push( {
                        key: key,
                        id: value.id,
                        name: value.name,
                        email: value.email,
                     } );
                  } );
                  setCustomersFB( list );
                  setLoading( false );
               }
            );
         } catch( err: any ) {
            alert( `Deu ruim no FetchData() err: \ncode: ${err.code} \nmsg: ${err.message}` );
         }
      }
      FetchData();
   }, [  ] );

   return { CustomersFB, Loading };
}