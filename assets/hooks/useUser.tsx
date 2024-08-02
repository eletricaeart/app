

import { useState, useEffect } from "react";
import { fetchUser } from "../lib/api";

export function useUser( userId: string ) {
   const 
      [ user, setUser ] = useState( null )
      ,
      [ loading, setLoading ] = useState( true )
  ;

   useEffect( () => {
      fetchUser( userId )
      .then( userData => {
         setUser( userData );
         setLoading( false);
   } );
   }, [ userId ] );

   return { user, loading };
}