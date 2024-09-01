

import { useState, useEffect, SetStateAction, } from "react";
import { get, child, ref,getDatabase, } from "firebase/database";

import * as CStore from "@/src/widgets/clb-dbs";
import { FirebaseDB } from "@/FirebaseConfig";


export default function useBudgetsFB() {
   interface serviceItem_i {
      quantity: string;
      description: string;
      value: string;
      total: number;
   }

   interface service_i { 
      key: any;
      id: any;
      formOfPayment: any;
      isPaid: any;
      name: any;
      notes: any;
      owner: any;
      payday: any;
      receiptValue: any;
      services: serviceItem_i[];
      subtotal: any;
      warranty: any;
      dateOfIssue: any;
      discount: any;
      dueDate: any;
   }

   const 
      [ BudgetsFB, setBudgetsFB ] = useState( [] )
      ,
      [ Loading, setLoading ] = useState( true )
   ;

   useEffect( () => {
      async function FetchData() {
         try {
            const 
               user = await CStore.GetObjData( "user" )
            ;
            console.log( "budgets: ", await CStore.GetObjData( "budgets" ) );
            // await get( child( ref( getDatabase() ), `users/${ user.uid }/budgets` ) )
            await get( child( 
               ref( FirebaseDB ), `users/${ user.uid }/budgets` 
            ) ).then(
               dataList => { 
                  const 
                     list: ( 
                        ( prevState: never[] ) => never[] 
                     ) | service_i[] = []
                     // list: SetStateAction<{ id: string; name: string; email: string; }> | { id: any; name: any; email: any; }[] = []
                  ;
                  
                  dataList.forEach( data => {
                     const 
                        key = data.key
                        ,
                        value = data.val()
                        ,
                        services: serviceItem_i[] = []
                        // list: SetStateAction<{ id: string; name: string; email: string; }> | { id: any; name: any; email: any; }[] = []
                     ;

                     value.services.forEach( service => {
                        const 
                           data = {
                              quantity: service.quantity,
                              description: service.description,
                              value: service.value,
                              total: service.total,
                           }
                        ;
                        // services.push( Object.values( service ) );
                        services.push( data );
                     } );

                     list.push( { 
                        // ...value 
                        key: value.id,
                        id: value.id,
                        formOfPayment: value.formOfPayment,
                        isPaid: value.isPaid,
                        name: value.name,
                        notes: value.notes,
                        owner: value.owner,
                        payday: value.payday,
                        receiptValue: value.receiptValue,
                        services: services,
                        subtotal: value.subtotal,
                        warranty: value.warranty,
                        dateOfIssue: value.dateOfIssue,
                        discount: value.discount,
                        dueDate: value.dueDate,
                     } );
                  } );
                  setBudgetsFB( list );
                  setLoading( false );
               }
            );
         } catch( err: any ) {
            alert( `Deu ruim no FetchData() err: \ncode: ${err.code} \nmsg: ${err.message}` );
         }
      }
      FetchData();
   }, [] );

   return { BudgetsFB, Loading };
}