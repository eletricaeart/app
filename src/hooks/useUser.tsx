

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
// import { fetchUser } from "../lib/api";


async function FetchUser( userId: string ) {

}

async function FetchLocalUser() {
   try {
      const 
         json = await AsyncStorage.getItem( "user" )
         ,
         user = await JSON.parse( json )
      ;
      return user;
   } catch( err: any ) {
      console.error( "FetchLocalUser() err: \n\n\n", err );
   }
}

async function SetUser() {
   try {
      await FetchLocalUser().then(
         returned => setUser( returned )
      );
   } catch( err: any ) {
      console.error( "SetUser() err: \n\n\n", err );
   }
}

export function useUser( userId: string ) {
   const 
      [ user, setUser ] = useState( null )
      ,
      [ loading, setLoading ] = useState( true )
  ;

   useEffect( () => {
      FetchUser( userId ).then( userData => {
         setUser( userData );
         setLoading( false );
   } );
   }, [ userId ] );

   return { user, loading };
}