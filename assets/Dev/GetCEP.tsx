

import React, { useEffect, useState, useMemo, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"


/* == [ setItem ]
== == == == == == == == == */
async function UpdateDBs( props ) {
   await AsyncStorage.setItem( props.DBsName, props.DBsData );
}


/* == [ getItem ]
== == == == == == == == == */
const [ Name, setName ] = useState( "" );

async function GetDBsData( props ) {
   await AsyncStorage.getItem( props.DBsName )
      .then( value => {
         setName( value );
      } );
}


/* == [ on update a state ]
== == == == == == == == == */
const [ Item, setItem ] = useState( "" );

useEffect( () => {
   async function SaveToDBs() {
      await AsyncStorage.setItem( "DBsName", Item );
   }
   SaveToDBs();
}, [ Item ] );


/* == [ onMount ]
== == == == == == == == == */
const [ Nomes, setNomes ] = useState( "" )

useEffect( () => {
   async function GetDBsNomes() {
      const DBs_Nomes = await AsyncStorage.getItem( "DBsName" );
      
      if( DBs_Nomes !== null ) {
         setNomes( DBs_Nomes );
      }
   }
   GetDBsNomes();

   // onUnmount
   // return( () => {} );
} );